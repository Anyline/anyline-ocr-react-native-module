#import <Anyline/Anyline.h>
#import "ALNFCScanViewController.h"
#import "ALPluginHelper.h"
#import "AnylineSDKPlugin.h"


API_AVAILABLE(ios(13.0))
@interface ALNFCScanViewController () <ALNFCDetectorDelegate, ALScanPluginDelegate, ALScanViewDelegate>

@property (nonatomic, strong) ALPluginCallback callback;

@property (nonatomic, strong) NSDictionary *config;

@property (nonatomic, copy) NSString *licenseKey;

@property (nonatomic, strong) ALScanView *scanView;

@property (nonatomic, strong) ALScanViewPlugin *mrzScanViewPlugin;

@property (nonatomic, strong) ALNFCDetector *nfcDetector;

// the result from NFC scanning is retained while NFC reading is initiated, and the results aggregated later
@property (nonatomic, strong) NSMutableDictionary *resultDict;

@property (nonatomic, strong) ALJSONUIConfiguration *uiConfig;

@property (nonatomic, strong) UIView *hintView;

@property (nonatomic, strong) UILabel *hintViewLabel;

@property (nonatomic, strong) NSLayoutConstraint *labelHorizontalOffsetConstraint;

@property (nonatomic, strong) NSLayoutConstraint *labelVerticalOffsetConstraint;

@property (nonatomic, strong) UIButton *doneButton;

// keep the last values we read from the MRZ so we can retry reading NFC
// if NFC failed for reasons other than getting these details wrong
@property (nonatomic, copy) NSString *passportNumberForNFC;

@property (nonatomic, strong) NSDate *dateOfBirth;

@property (nonatomic, strong) NSDate *dateOfExpiry;

@property (nonatomic, strong) NSMutableArray<NSDictionary *> *detectedBarcodes;

// JPEG compression quality 0-100
@property (nonatomic, assign) NSUInteger quality;


@end


@implementation ALNFCScanViewController

- (instancetype)initWithLicensekey:(NSString *)licensekey
                     configuration:(NSDictionary *)anylineConfig
                          uiConfig:(ALJSONUIConfiguration *)uiConfig
                          finished:(ALPluginCallback)callback {
    if (self = [super init]) {
        _licenseKey = licensekey;
        _callback = callback;
        _config = anylineConfig;
        _uiConfig = uiConfig;
        
        self.quality = 90;
    }
    return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
    // NOTE: NFCDetector can throw an exception if the AnylineSDK isn't initialized
    // first as it will check the scope value of the license.
    //
    // If already initialized, happily move along. Otherwise, make a license key
    // check here.
    NSError *error;
    BOOL isInitialized = [ALLicenseUtil sharedInstance].isLicenseValid;
    if (!isInitialized) {
        [AnylineSDK setupWithLicenseKey:self.licenseKey cacheConfig:nil wrapperConfig:wrapperConfig error:&error];
        if ([self showErrorAlertIfNeeded:error]) {
            return;
        }
    }
    
    if (@available(iOS 13.0, *)) {
        self.nfcDetector = [self.class getNFCDetectorWithDelegate:self error:&error];
    } else {
        error = [ALPluginHelper errorWithMessage:@"iOS 13.0 or newer is required to scan with MRZ / NFC."];
    }
    
    if ([self showErrorAlertIfNeeded:error]) {
        return;
    }
    
    [self.view addSubview:self.scanView];
    
    self.resultDict = [[NSMutableDictionary alloc] init];
    self.detectedBarcodes = [NSMutableArray array];
    
    self.scanView = [ALScanViewFactory withJSONDictionary:self.config delegate:self error:&error];
    self.scanView.delegate = self;
    
    [self configureMRZPlugin];
    
    if ([self showErrorAlertIfNeeded:error]) {
        return;
    }
    
    self.mrzScanViewPlugin = (ALScanViewPlugin *)self.scanView.scanViewPlugin;
    
    self.scanView.supportedNativeBarcodeFormats = self.uiConfig.nativeBarcodeFormats;
    self.scanView.delegate = self;
    self.detectedBarcodes = [NSMutableArray array];
    
    [self.view addSubview:self.scanView];
    
    self.scanView.translatesAutoresizingMaskIntoConstraints = false;
    [self.scanView.leftAnchor constraintEqualToAnchor:self.view.leftAnchor].active = YES;
    [self.scanView.rightAnchor constraintEqualToAnchor:self.view.rightAnchor].active = YES;
    [self.scanView.topAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.topAnchor].active = YES;
    [self.scanView.bottomAnchor constraintEqualToAnchor:self.view.bottomAnchor].active = YES;
    
    [self.scanView startCamera];
    
    [self setupHintView];
    
    self.doneButton = [ALPluginHelper createButtonForViewController:self config:self.uiConfig];
}

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    
    NSError *error;
    [self startMRZScanning:&error];
    [self showErrorAlertIfNeeded:error];
}

- (void)viewDidDisappear:(BOOL)animated {
    [self stopMRZScanning];
    [super viewDidDisappear:animated];
}

- (void)startMRZScanning:(NSError **)error {
    [self.mrzScanViewPlugin startWithError:error];
    self.hintView.hidden = NO;
}

- (void)stopMRZScanning {
    [self.mrzScanViewPlugin stop];
    self.hintView.hidden = YES;
}

- (void)configureMRZPlugin {
    
    ALScanViewPlugin *scanViewPlugin = (ALScanViewPlugin *)self.scanView.scanViewPlugin;
    if (![scanViewPlugin isKindOfClass:ALScanViewPlugin.class]) {
        return;
    }
    
    ALCutoutConfig *cutoutConfig = scanViewPlugin.scanViewPluginConfig.cutoutConfig;
    ALScanFeedbackConfig *scanFeedbackConfig = scanViewPlugin.scanViewPluginConfig.scanFeedbackConfig;
    
    ALPluginConfig *pluginConfig = scanViewPlugin.scanPlugin.pluginConfig;
    ALMrzConfig *mrzConfig = pluginConfig.mrzConfig;
    
    // a bit lengthy but this is how you properly change the config (mrzFieldScanOptions and mrzMinFieldConfidences)
    // taking into account the readonly config fields
    mrzConfig.mrzFieldScanOptions = [[ALMrzFieldScanOptions alloc] init];
    
    mrzConfig.mrzFieldScanOptions.vizAddress = ALMrzScanOption.mrzScanOptionDefault;
    mrzConfig.mrzFieldScanOptions.vizDateOfIssue = ALMrzScanOption.mrzScanOptionDefault;
    mrzConfig.mrzFieldScanOptions.vizSurname = ALMrzScanOption.mrzScanOptionDefault;
    mrzConfig.mrzFieldScanOptions.vizGivenNames = ALMrzScanOption.mrzScanOptionDefault;
    mrzConfig.mrzFieldScanOptions.vizDateOfBirth = ALMrzScanOption.mrzScanOptionDefault;
    mrzConfig.mrzFieldScanOptions.vizDateOfExpiry = ALMrzScanOption.mrzScanOptionDefault;
    
    mrzConfig.mrzMinFieldConfidences = [[ALMrzMinFieldConfidences alloc] init];
    mrzConfig.mrzMinFieldConfidences.documentNumber = @(90);
    mrzConfig.mrzMinFieldConfidences.dateOfBirth = @(90);
    mrzConfig.mrzMinFieldConfidences.dateOfExpiry = @(90);
    
    NSError *error;
    ALScanViewPluginConfig *scanViewPluginConfig = [ALScanViewPluginConfig withPluginConfig:pluginConfig
                                                                               cutoutConfig:cutoutConfig
                                                                         scanFeedbackConfig:scanFeedbackConfig];
    ALScanViewPlugin *updatedScanViewPlugin = [[ALScanViewPlugin alloc] initWithConfig:scanViewPluginConfig error:&error];
    [self.scanView setScanViewPlugin:updatedScanViewPlugin error:&error];
    
    // the delegate binding was lost when you recreated the ScanPlugin it so you have to bring it back here
    scanViewPlugin = (ALScanViewPlugin *)self.scanView.scanViewPlugin;
    scanViewPlugin.scanPlugin.delegate = self;
}

// MARK: - ALIDPluginDelegate

- (void)scanPlugin:(ALScanPlugin *)scanPlugin resultReceived:(ALScanResult *)scanResult {
    
    CGFloat compressionQuality = self.quality / 100.0f;
    
    // ACO just a failsafe for when cancelOnResult is not true
    [self stopMRZScanning];
    
    self.resultDict = [NSMutableDictionary dictionaryWithDictionary:scanResult.resultDictionary];
    
    NSString *imagePath = [ALPluginHelper saveImageToFileSystem:scanResult.croppedImage
                                             compressionQuality:compressionQuality];
    self.resultDict[@"imagePath"] = imagePath;
    
    imagePath = [ALPluginHelper saveImageToFileSystem:scanResult.fullSizeImage
                                   compressionQuality:compressionQuality];
    
    self.resultDict[@"fullImagePath"] = imagePath;
    
    ALMrzResult *MRZResult = scanResult.pluginResult.mrzResult;
    NSString *passportNumber = [MRZResult.documentNumber stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceCharacterSet]];
    
    self.dateOfBirth = [ALPluginHelper formattedStringToDate:MRZResult.dateOfBirthObject];
    
    self.dateOfExpiry = [ALPluginHelper formattedStringToDate:MRZResult.dateOfExpiryObject];
    
    NSMutableString *passportNumberForNFC = [passportNumber mutableCopy];
    NSRange passportNumberRange = [MRZResult.mrzString rangeOfString:passportNumber];
    if (passportNumberRange.location != NSNotFound) {
        if ([MRZResult.mrzString characterAtIndex:NSMaxRange(passportNumberRange)] == '<') {
            [passportNumberForNFC appendString:@"<"];
        }
    }
    
    self.passportNumberForNFC = passportNumberForNFC;
    
    [self.nfcDetector startNfcDetectionWithPassportNumber:self.passportNumberForNFC
                                              dateOfBirth:self.dateOfBirth
                                           expirationDate:self.dateOfExpiry];
}

- (void)handleResult:(id _Nullable)resultObj {
    
    NSMutableDictionary *resultDictionary = [NSMutableDictionary dictionaryWithDictionary:resultObj];
    if (self.detectedBarcodes.count) {
        resultDictionary[@"nativeBarcodesDetected"] = self.detectedBarcodes;
    }
    
    NSObject<ALScanViewPluginBase> *scanViewPluginBase = self.scanView.scanViewPlugin;
    if ([scanViewPluginBase isKindOfClass:ALScanViewPlugin.class]) {
        ALScanViewPlugin *scanViewPlugin = (ALScanViewPlugin *)scanViewPluginBase;
        BOOL cancelOnResult = scanViewPlugin.scanPlugin.pluginConfig.cancelOnResult;
        if (cancelOnResult) {
            [self dismissViewControllerAnimated:YES completion:nil];
        }
    } else if ([scanViewPluginBase isKindOfClass:ALViewPluginComposite.class]) {
        // for composites, the cancelOnResult values for each child don't matter
        [self dismissViewControllerAnimated:YES completion:nil];
    }
    self.callback(resultDictionary, nil);
}

- (void)doneButtonPressed:(id)sender {
    [self stopMRZScanning];
    
    __weak __block typeof(self) weakSelf = self;
    [self dismissViewControllerAnimated:YES completion:^{
        weakSelf.callback(nil, @"Canceled");
    }];
}

// MARK: - ALNFCDetectorDelegate

- (void)nfcSucceededWithResult:(ALNFCResult * _Nonnull)nfcResult API_AVAILABLE(ios(13.0)) {
    
    // DataGroup1
    NSMutableDictionary *dictResultDataGroup1 = [[NSMutableDictionary alloc] init];
    
    
    [dictResultDataGroup1 setValue:[ALPluginHelper stringForDate:nfcResult.dataGroup1.dateOfBirth]
                            forKey:@"dateOfBirth"];
    [dictResultDataGroup1 setValue:[ALPluginHelper stringForDate:nfcResult.dataGroup1.dateOfExpiry]
                            forKey:@"dateOfExpiry"];
    [dictResultDataGroup1 setValue:nfcResult.dataGroup1.documentNumber forKey:@"documentNumber"];
    [dictResultDataGroup1 setValue:nfcResult.dataGroup1.documentType forKey:@"documentType"];
    [dictResultDataGroup1 setValue:nfcResult.dataGroup1.firstName forKey:@"firstName"];
    [dictResultDataGroup1 setValue:nfcResult.dataGroup1.gender forKey:@"gender"];
    [dictResultDataGroup1 setValue:nfcResult.dataGroup1.issuingStateCode forKey:@"issuingStateCode"];
    [dictResultDataGroup1 setValue:nfcResult.dataGroup1.lastName forKey:@"lastName"];
    [dictResultDataGroup1 setValue:nfcResult.dataGroup1.nationality forKey:@"nationality"];
    
    [self.resultDict setObject:dictResultDataGroup1 forKey:@"dataGroup1"];
    
    // DataGroup2
    // ACO: we don't put the path into a separate 'dataGroup' category for the wrapper
    NSString *imagePath = [ALPluginHelper saveImageToFileSystem:nfcResult.dataGroup2.faceImage
                                             compressionQuality:self.quality / (CGFloat)100.0f];
    if (imagePath) {
        [self.resultDict setValue:imagePath forKey:@"imagePath"];
    }
    
    // SOD (Passport metadata)
    NSMutableDictionary *dictResultSOD = [[NSMutableDictionary alloc] init];
    
    [dictResultSOD setValue:nfcResult.sod.issuerCertificationAuthority forKey:@"issuerCertificationAuthority"];
    [dictResultSOD setValue:nfcResult.sod.issuerCountry forKey:@"issuerCountry"];
    [dictResultSOD setValue:nfcResult.sod.issuerOrganization forKey:@"issuerOrganization"];
    [dictResultSOD setValue:nfcResult.sod.issuerOrganizationalUnit forKey:@"issuerOrganizationalUnit"];
    [dictResultSOD setValue:nfcResult.sod.ldsHashAlgorithm forKey:@"ldsHashAlgorithm"];
    
    // ACO need to disable this because AppStoreConnect produces a warning with this enabled:
    // https://anyline.atlassian.net/browse/SDKY-1509?focusedCommentId=71554
    // [dictResultSOB setValue:nfcResult.sod.signatureAlgorithm forKey:@"signatureAlgorithm"];
    
    [dictResultSOD setValue:nfcResult.sod.validFromString forKey:@"validFromString"];
    [dictResultSOD setValue:nfcResult.sod.validUntilString forKey:@"validUntilString"];
    
    [self.resultDict setObject:dictResultSOD forKey:@"sod"];
    
    __weak __block typeof(self) weakSelf = self;
    dispatch_async(dispatch_get_main_queue(), ^{
        [weakSelf handleResult:weakSelf.resultDict];
    });
}

- (void)nfcFailedWithError:(NSError * _Nonnull)error {
    dispatch_async(dispatch_get_main_queue(), ^{
        if (error.code == ALNFCTagErrorNFCNotSupported) {
            [self showAlertWithTitle:@"NFC Not Supported"
                             message:@"NFC passport reading is not supported on this device."];
        }
        if (error.code == ALNFCTagErrorResponseError || // MRZ key was likely wrong
            error.code == ALNFCTagErrorUnexpectedError) {
            // can mean the user pressed the 'Cancel' button while scanning, or the phone lost the
            // connection with the NFC chip because it was moved
            [self startMRZScanning:nil]; //run the MRZ scanner so we can try again.
        } else {
            // the MRZ details are correct, but something else went wrong. We can try reading
            // the NFC chip again without rescanning the MRZ.
            __weak __block typeof(self) weakSelf = self;
            dispatch_async(dispatch_get_main_queue(), ^{
                [weakSelf.nfcDetector startNfcDetectionWithPassportNumber:weakSelf.passportNumberForNFC
                                                              dateOfBirth:weakSelf.dateOfBirth
                                                           expirationDate:weakSelf.dateOfExpiry];
            });
        }
    });
}

// MARK: - ALScanViewDelegate

- (void)scanView:(ALScanView *)scanView updatedCutoutWithPluginID:(NSString *)pluginID
           frame:(CGRect)frame {
    
    if (CGRectIsEmpty(frame)) {
        return;
    }
    
    self.hintView.hidden = NO;
    
    CGFloat xOffset = self.uiConfig.labelXPositionOffset;
    CGFloat yOffset = self.uiConfig.labelYPositionOffset;
    
    // takes into account that frame reported for a cutout is in relation to
    // its scan view's coordinate system
    yOffset += [self.scanView convertRect:frame toView:self.scanView.superview].origin.y;
    
    self.labelHorizontalOffsetConstraint.constant = xOffset;
    self.labelVerticalOffsetConstraint.constant = yOffset;
}

- (void)scanView:(ALScanView *)scanView didReceiveNativeBarcodeResult:(ALScanResult *)scanResult {
    // for this implementation we just take the last detected (we can show a list of it)
    [self.detectedBarcodes removeAllObjects];
    [self.detectedBarcodes addObject:scanResult.resultDictionary];
}


// MARK: - ALNFCDetector

+ (ALNFCDetector * _Nullable)getNFCDetectorWithDelegate:(id<ALNFCDetectorDelegate> _Nonnull)delegate
                                                  error:(NSError * _Nullable * _Nullable)error API_AVAILABLE(ios(13.0)) {
    ALNFCDetector *NFCDetector;
    if (![ALNFCDetector readingAvailable]) {
        if (error) {
            *error = [ALPluginHelper errorWithMessage:@"NFC is not available for this device."];
        }
        return nil;
    }
    NFCDetector = [[ALNFCDetector alloc] initWithDelegate:delegate error:error];
    if (!NFCDetector) {
        return nil;
    }
    return NFCDetector;
}

// MARK: - Alerts

- (void)showAlertWithTitle:(NSString *)title message:(NSString *)message {
    [ALPluginHelper showErrorAlertWithTitle:title message:message
                   presentingViewController:self.navigationController];
}

- (BOOL)showErrorAlertIfNeeded:(NSError *)error {
    return [ALPluginHelper showErrorAlertIfNeeded:error pluginCallback:self.callback];
}

// MARK: - User Interface

- (void)setupHintView {
    
    UIView *hintView = [[UIView alloc] initWithFrame:CGRectZero];
    hintView.layer.cornerRadius = 8;
    hintView.layer.masksToBounds = true;
    hintView.backgroundColor = [[UIColor blackColor] colorWithAlphaComponent:0.5];
    
    hintView.translatesAutoresizingMaskIntoConstraints = NO;
    [self.view addSubview:hintView];
    
    self.labelHorizontalOffsetConstraint = [hintView.centerXAnchor constraintEqualToAnchor:self.view.centerXAnchor constant:0];
    
    // at 0, the bottom of the label (container) should be touching the cutout top when the updatedCutoutRect report
    // is made
    self.labelVerticalOffsetConstraint = [hintView.bottomAnchor constraintEqualToAnchor:self.view.topAnchor constant:0];
    
    self.labelHorizontalOffsetConstraint.active = YES;
    self.labelVerticalOffsetConstraint.active = YES;
    
    UILabel *hintViewLabel = [[UILabel alloc] initWithFrame:CGRectZero];
    
    hintViewLabel.text = @"Scan MRZ";
    if (self.uiConfig.labelText.length) {
        hintViewLabel.text = self.uiConfig.labelText;
    }
    
    hintViewLabel.font = [UIFont fontWithName:@"HelveticaNeue"
                                         size:self.uiConfig.labelSize];
    hintViewLabel.textColor = self.uiConfig.labelColor;
    hintViewLabel.textAlignment = NSTextAlignmentCenter;
    hintViewLabel.translatesAutoresizingMaskIntoConstraints = NO;
    [hintViewLabel sizeToFit];
    [hintView addSubview:hintViewLabel];
    
    [hintViewLabel.centerXAnchor constraintEqualToAnchor:hintView.centerXAnchor].active = YES;
    [hintViewLabel.centerYAnchor constraintEqualToAnchor:hintView.centerYAnchor].active = YES;
    
    NSLayoutConstraint *cnst = [hintView.widthAnchor constraintGreaterThanOrEqualToAnchor:hintViewLabel.widthAnchor
                                                                                 constant:20];
    cnst.active = YES;
    cnst = [hintView.heightAnchor constraintEqualToAnchor:hintViewLabel.heightAnchor constant:20];
    cnst.active = YES;
    
    self.hintView = hintView;
    self.hintViewLabel = hintViewLabel;
}

@end
