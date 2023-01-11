#import <Anyline/Anyline.h>
#import "ALNFCScanViewController.h"
#import "ALPluginHelper.h"

API_AVAILABLE(ios(13.0))
@interface ALNFCScanViewController () <ALNFCDetectorDelegate, ALScanPluginDelegate>

@property (nonatomic, strong) ALScanViewPlugin *mrzScanViewPlugin;

@property (nonatomic, strong) ALScanView *scanView;

@property (nonatomic, strong) ALNFCDetector *nfcDetector;

@property (nonatomic, strong) UIView *hintView;

@property (nonatomic, strong) UIButton *doneButton;

// keep the last values we read from the MRZ so we can retry reading NFC
// if NFC failed for reasons other than getting these details wrong
@property (nonatomic, copy) NSString *passportNumberForNFC;

@property (nonatomic, strong) NSDate *dateOfBirth;

@property (nonatomic, strong) NSDate *dateOfExpiry;

@property (nonatomic, strong) NSDictionary *anylineConfig;

@property (nonatomic, assign) ALPluginCallback callback;

@property (nonatomic, strong) NSString *licensekey;

@property (nonatomic, strong) ALJSONUIConfiguration *uiConfig;

@property (nonatomic, strong) NSMutableDictionary *anylineResult;

@property (nonatomic, strong) NSMutableArray<NSDictionary *> *detectedBarcodes;

@end


@implementation ALNFCScanViewController

- (instancetype)initWithLicensekey:(NSString *)licensekey
                     configuration:(NSDictionary *)anylineConfig
                          uiConfig:(ALJSONUIConfiguration *)uiConfig
                          finished:(ALPluginCallback)callback {
    if (self = [super init]) {
        _licensekey = licensekey;
        _callback = callback;
        _anylineConfig = anylineConfig;
        _uiConfig = uiConfig;
        
        self.quality = 100;
        self.nativeBarcodeEnabled = NO;
        self.cropAndTransformErrorMessage = @"";
    }
    return self;
}

+ (UIView *)hintView {
    CGFloat hintMargin = 7;
    UILabel *hintViewLabel = [[UILabel alloc] initWithFrame:CGRectZero];
    UIView *hintView = [[UILabel alloc] initWithFrame:CGRectZero];
    hintViewLabel.text = @"Scan MRZ";
    [hintViewLabel sizeToFit];
    [hintView addSubview:hintViewLabel];
    hintView.frame = UIEdgeInsetsInsetRect(hintViewLabel.frame, UIEdgeInsetsMake(-hintMargin, -hintMargin, -hintMargin, -hintMargin));
//    hintView.center = CGPointMake(self.view.center.x, 0);
    hintViewLabel.translatesAutoresizingMaskIntoConstraints = NO;
    [hintViewLabel.centerYAnchor constraintEqualToAnchor:hintView.centerYAnchor constant:0].active = YES;
    [hintViewLabel.centerXAnchor constraintEqualToAnchor:hintView.centerXAnchor constant:0].active = YES;
    hintView.layer.cornerRadius = 8;
    hintView.layer.masksToBounds = true;
    hintView.backgroundColor = [[UIColor blackColor] colorWithAlphaComponent:0.5];
    hintViewLabel.textColor = [UIColor whiteColor];
    return hintView;
}

- (void)viewDidLoad {
    [super viewDidLoad];

    if (@available(iOS 13.0, *)) {
        self.nfcDetector = [[ALNFCDetector alloc] initWithDelegate:self];
    } else {
        // Fallback on earlier versions
        // TODO: prepare an alert sayig that NFC is not yet supported for this version.
    }

    self.anylineResult = [[NSMutableDictionary alloc] init];
    self.detectedBarcodes = [NSMutableArray array];

    self.doneButton = [ALPluginHelper createButtonForViewController:self config:self.uiConfig];
    
    self.title = @"Passport NFC";

    // Set the background color to black to have a nicer transition
    self.view.backgroundColor = [UIColor blackColor];
    
    self.hintView = [self.class hintView];
    [self.view addSubview:self.hintView];
    
    // Initializing the scan view. It's a UIView subclass. We set the frame to fill the whole screen
    CGRect frame = [self scanViewFrame];
    
    NSDictionary *mrzConfigDict = [self.anylineConfig valueForKeyPath:@"viewPlugin.plugin.nfcPlugin.mrzConfig"];

    // TODO: tweak the MRZ config (override the given field confidences and scan options)
//    ALMRZConfig *mrzConfig;
//    if (mrzConfigDict) {
//        mrzConfig = [[ALMRZConfig alloc] initWithJsonDictionary:mrzConfigDict];
//    } else {
//        mrzConfig = [[ALMRZConfig alloc] init];
//        //we want to be quite confident of these fields to ensure we can read the NFC with them
//        ALMRZFieldConfidences *fieldConfidences = [[ALMRZFieldConfidences alloc] init];
//        fieldConfidences.documentNumber = 90;
//        fieldConfidences.dateOfBirth = 90;
//        fieldConfidences.dateOfExpiry = 90;
//        mrzConfig.idFieldConfidences = fieldConfidences;
//
//        //Create fieldScanOptions to configure individual scannable fields
//        ALMRZFieldScanOptions *scanOptions = [[ALMRZFieldScanOptions alloc] init];
//        scanOptions.vizAddress = ALDefault;
//        scanOptions.vizDateOfIssue = ALDefault;
//        scanOptions.vizSurname = ALDefault;
//        scanOptions.vizGivenNames = ALDefault;
//        scanOptions.vizDateOfBirth = ALDefault;
//        scanOptions.vizDateOfExpiry = ALDefault;
//
//        //Set scanOptions for MRZConfig
//        mrzConfig.idFieldScanOptions = scanOptions;
//    }

    NSError *error = nil;
    [AnylineSDK setupWithLicenseKey:self.licensekey error:&error];
    if ([self showErrorAlertIfNeeded:error]) {
        return;
    }

    self.scanView = [ALScanViewFactory withJSONDictionary:mrzConfigDict delegate:self error:&error];

    if ([self showErrorAlertIfNeeded:error]) {
        return;
    }

    self.mrzScanViewPlugin = (ALScanViewPlugin *)self.scanView.scanViewPlugin;

    // TODO: force the flash alignment to go top left.
    // self.scanView.flashButtonConfig.flashAlignment = ALFlashAlignmentTopLeft;
    
    [self.view addSubview:self.scanView];

    // TODO: lay out the scan view.

    [self.scanView startCamera];
}

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    [self startMRZScanning];
}

- (void)viewWillDisappear:(BOOL)animated {
    [self stopMRZScanning];
    [super viewWillDisappear:animated];
}


- (void)updateHintPosition:(CGFloat)newPosition {
    self.hintView.center = CGPointMake(self.hintView.center.x, newPosition);
}



- (BOOL)showErrorAlertIfNeeded:(NSError *)error {
    if (error) {
        UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"Could not start scanning"
                                                                       message:error.localizedDescription
                                                                preferredStyle:UIAlertControllerStyleAlert];

        UIAlertAction *action = [UIAlertAction actionWithTitle:@"Ok"
                                                         style:UIAlertActionStyleDefault
                                                       handler:^(UIAlertAction * _Nonnull action) {
            [[UIApplication sharedApplication].keyWindow.rootViewController dismissViewControllerAnimated:YES completion:^{
                self.callback(nil, @"Canceled");
            }];
        }];

        [alert addAction:action];

        [[UIApplication sharedApplication].keyWindow.rootViewController presentViewController:alert
                                                                                     animated:YES
                                                                                   completion:NULL];
        return YES;
    }
    return NO;
}


- (void)startMRZScanning {

    NSError *error;
    [self.mrzScanViewPlugin startWithError:&error];

    if (error) { // TODO: handle this
        NSLog(@"error: ");
    }

    self.hintView.hidden = NO;
}

- (void)stopMRZScanning {
    [self.mrzScanViewPlugin stop];
    self.hintView.hidden = YES;
}

- (void)readNFCChip {
    [self.nfcDetector startNfcDetectionWithPassportNumber:self.passportNumberForNFC
                                              dateOfBirth:self.dateOfBirth
                                           expirationDate:self.dateOfExpiry];
}

// MARK: - ALIDPluginDelegate

- (void)scanPlugin:(ALScanPlugin *)scanPlugin resultReceived:(ALScanResult *)scanResult {
    // TODO: get the passport no, dob, doe, and MRZ string
    // stop scanning mrz, start reading nfc chip
}

//- (void)anylineIDScanPlugin:(ALIDScanPlugin *)anylineIDScanPlugin didFindResult:(ALIDResult *)scanResult {
//    ALMRZIdentification *identification = (ALMRZIdentification*)scanResult.result;
//
//    self.anylineResult = [[ALPluginHelper dictionaryForIDResult:scanResult detectedBarcodes:self.detectedBarcodes outline:self.scanView.scanViewPlugin.outline quality:_quality] mutableCopy];
//
//    NSString *passportNumber = [[identification documentNumber] stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceCharacterSet]];
//    NSDate *dateOfBirth = [identification dateOfBirthObject];
//    NSDate *dateOfExpiry = [identification dateOfExpiryObject];
//    //The passport number passed to the NFC chip must have a trailing < if there is one in the MRZ string.
//    NSString *mrzString = [identification mrzString];
//    NSMutableString *passportNumberForNFC = [passportNumber mutableCopy];
//    NSRange passportNumberRange = [mrzString rangeOfString:passportNumber];
//    if (passportNumberRange.location != NSNotFound) {
//        if ([mrzString characterAtIndex:NSMaxRange(passportNumberRange)] == '<') {
//            [passportNumberForNFC appendString:@"<"];
//        }
//    }
//    [self stopMRZScanning];
//    self.passportNumberForNFC = passportNumberForNFC;
//    self.dateOfBirth = dateOfBirth;
//    self.dateOfExpiry = dateOfExpiry;
//    dispatch_async(dispatch_get_main_queue(), ^{
//        [self readNFCChip];
//    });
//}

// MARK: - ALNFCDetectorDelegate

- (void)nfcSucceededWithResult:(ALNFCResult * _Nonnull)nfcResult API_AVAILABLE(ios(13.0)) {
    dispatch_async(dispatch_get_main_queue(), ^{
//        [self.anylineResult setObject:[ALPluginHelper dictionaryForNFCResult:nfcResult quality:self.quality] forKey:@"nfcResult"];
//        [self handleResult:self.anylineResult result:nil];
    });
}

- (void)nfcFailedWithError:(NSError * _Nonnull)error {
    dispatch_async(dispatch_get_main_queue(), ^{
        if (error.code == ALNFCTagErrorNFCNotSupported) {
            [self showAlertWithTitle:@"NFC Not Supported" message:@"NFC passport reading is not supported on this device."];
        }
        if (error.code == ALNFCTagErrorResponseError || // MRZ key was likely wrong
            error.code == ALNFCTagErrorUnexpectedError) { // can mean the user pressed the 'Cancel' button while scanning, or the phone lost the connection with the NFC chip because it was moved
            [self startMRZScanning]; //run the MRZ scanner so we can try again.
        } else {
            // the MRZ details are correct, but something else went wrong. We can try reading
            // the NFC chip again without rescanning the MRZ.
            [self readNFCChip];
        }
    });
}

- (NSString *)stringForDate:(NSDate *)date {
    if (!date) {
        return @"Date not valid";
    }
    
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    [dateFormatter setTimeZone:[NSTimeZone timeZoneWithAbbreviation:@"GMT+0:00"]];
    dateFormatter.dateStyle = NSDateFormatterMediumStyle;
    dateFormatter.timeStyle = NSDateFormatterNoStyle;
    
    return [dateFormatter stringFromDate:date];
}

//- (void)anylineScanViewPlugin:(ALAbstractScanViewPlugin *)anylineScanViewPlugin updatedCutout:(CGRect)cutoutRect {
//    [self updateHintPosition:cutoutRect.origin.y + self.scanView.frame.origin.y - 50];
//}

- (void)showAlertWithTitle:(NSString *)title message:(NSString *)message {
    UIAlertController *alertController = [UIAlertController alertControllerWithTitle:title
                                                                             message:message
                                                                      preferredStyle:UIAlertControllerStyleAlert];
    UIAlertAction *dismissAction = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleCancel handler:nil];
    [alertController addAction:dismissAction];
    [self.navigationController presentViewController:alertController animated:YES completion:nil];
}

- (CGRect)scanViewFrame {
    CGRect frame = [[UIScreen mainScreen] bounds];
    frame = CGRectMake(frame.origin.x, frame.origin.y + CGRectGetMaxY(self.navigationController.navigationBar.frame), frame.size.width, frame.size.height - CGRectGetMaxY(self.navigationController.navigationBar.frame));
    return frame;
}

- (void)handleResult:(NSDictionary *)dictResult result:(ALScanResult *)scanResult {
    
    self.callback(dictResult, nil);
    
    if ([self.scanView.scanViewPlugin isKindOfClass:ALScanViewPlugin.class]) {
        if (((ALScanViewPlugin *)self.scanView.scanViewPlugin).scanPlugin.scanPluginConfig.cancelOnResult) {
            [self dismissViewControllerAnimated:YES completion:nil];
        }
    }

    self.detectedBarcodes = [NSMutableArray array];
}

- (void)doneButtonPressed:(id)sender {
    [self stopMRZScanning];

    [self dismissViewControllerAnimated:YES completion:^{
        self.callback(nil, @"Canceled");
    }];
}

@end