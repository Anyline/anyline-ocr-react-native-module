#import <Anyline/Anyline.h>

#import "ALPluginScanViewController.h"
#import "ALPluginHelper.h"
#import "ALRoundedView.h"
#import "AnylineSDKPlugin.h"

@interface ALPluginScanViewController () <ALScanPluginDelegate, ALViewPluginCompositeDelegate, ALScanViewDelegate>

// ACO should it have the `assign` attribute?
@property (nonatomic, strong) ALPluginCallback callback;

@property (nonatomic, strong) NSDictionary *config;

@property (nonatomic, copy) NSString *licenseKey;

@property (nonatomic, strong) ALJSONUIConfiguration *uiConfig;

@property (nonatomic, strong) ALScanView *scanView;

@property (nonatomic, strong) UIButton *doneButton;

@property (nonatomic, strong) UILabel *scannedLabel;

@property (nonatomic, strong) ALRoundedView *roundedView;

@property (nonatomic, strong) UISegmentedControl *segment;

@property (nonatomic, strong) NSMutableArray<NSDictionary *> *detectedBarcodes;

@property (nonatomic, strong) NSLayoutConstraint *labelHorizontalOffsetConstraint;

@property (nonatomic, strong) NSLayoutConstraint *labelVerticalOffsetConstraint;

/// Applicable to non-composites (otherwise null)
@property (nonatomic, readonly, nullable) ALPluginConfig *pluginConfig;

@end


@implementation ALPluginScanViewController

- (void)dealloc {
    // NSLog(@"ACO dealloc ALPluginScanViewController");
}

- (instancetype)initWithLicensekey:(NSString *)licenseKey
                     configuration:(NSDictionary *)config
                   uiConfiguration:(ALJSONUIConfiguration *)JSONUIConfig
                          finished:(ALPluginCallback)callback {

    if (self = [super init]) {
        _licenseKey = licenseKey;
        _callback = callback;
        _config = config;
        _uiConfig = JSONUIConfig;
        
        self.quality = 100;
    }
    return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
    NSError *error = nil;

    self.view.backgroundColor = [UIColor blackColor];

    // Make an isInitialized check. If already initialized, happily move along.
    // Otherwise, make a license key check here.
    BOOL isInitialized = [ALLicenseUtil sharedInstance].isLicenseValid;
    if (!isInitialized) {
        [AnylineSDK setupWithLicenseKey:self.licenseKey cacheConfig:nil wrapperConfig:wrapperConfig error:&error];
        if ([self showErrorAlertIfNeeded:error]) {
            return;
        }
    }

    self.scanView = [ALScanViewFactory withJSONDictionary:self.config
                                                 delegate:self
                                                    error:&error];

    if ([self showErrorAlertIfNeeded:error]) {
        return;
    }

    [self.view addSubview:self.scanView];

    self.scanView.translatesAutoresizingMaskIntoConstraints = false;
    [self.scanView.leftAnchor constraintEqualToAnchor:self.view.leftAnchor].active = YES;
    [self.scanView.rightAnchor constraintEqualToAnchor:self.view.rightAnchor].active = YES;
    [self.scanView.topAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.topAnchor].active = YES;
    [self.scanView.bottomAnchor constraintEqualToAnchor:self.view.bottomAnchor].active = YES;

    self.scanView.supportedNativeBarcodeFormats = self.uiConfig.nativeBarcodeFormats;
    self.scanView.delegate = self;
    self.detectedBarcodes = [NSMutableArray array];

    self.doneButton = [ALPluginHelper createButtonForViewController:self config:self.uiConfig];

    self.scannedLabel = [ALPluginHelper createLabelForView:self.view];

    [self configureLabel:self.scannedLabel config:self.uiConfig];

    [self configureSegmentControl];
}

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
    [self.scanView startCamera];
}

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];

    // avoid allowing the app to be put to sleep after a long period without touch events
    [UIApplication sharedApplication].idleTimerDisabled = YES;

    NSError *error;
    [self.scanView.scanViewPlugin startWithError:&error];
    [self showErrorAlertIfNeeded:error];
}

- (void)viewDidDisappear:(BOOL)animated {
    [UIApplication sharedApplication].idleTimerDisabled = NO;
    [super viewDidDisappear:animated];
}

- (BOOL)shouldAutorotate {
    return NO;
}

/// The segment control contains a list of scan modes each of which, when selected, reloads the scan view with
/// the appropriate scan mode for the active plugin (keeping everything else the same)
- (void)configureSegmentControl {

    NSString *scanMode = [self currentScanMode];
    if (!scanMode) {
        // Do nothing else: our plugin does not support scan modes.
        return;
    }

    NSLog(@"The scan mode: %@", scanMode);

    // At this point, you can safely create segment controls.
    if (!self.uiConfig.segmentModes) {
        return;
    }

    if (![self segmentModesAreValid]) {
        return;
    }

    // Give it the current scanmode that's initially defined already in the config JSON
    self.segment = [ALPluginHelper createSegmentForViewController:self
                                                           config:self.uiConfig
                                                  initialScanMode:scanMode];

    self.segment.hidden = NO;
    self.segment.translatesAutoresizingMaskIntoConstraints = NO;
    [self.segment.centerXAnchor constraintEqualToAnchor:self.view.centerXAnchor].active = YES;
    [self.segment.bottomAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.bottomAnchor
                                              constant:self.uiConfig.segmentYPositionOffset].active = YES;

    // NOTE: uncomment this to show the segment full width
    [self.segment.leftAnchor constraintEqualToAnchor:self.view.leftAnchor constant:10].active = YES;
}

- (void)configureLabel:(UILabel *)label config:(ALJSONUIConfiguration *)config {

    if (config.labelText.length < 1) {
        return;
    }

    label.alpha = 1;
    label.text = config.labelText;
    label.font = [UIFont fontWithName:@"HelveticaNeue" size:config.labelSize];
    label.textColor = config.labelColor;
    label.translatesAutoresizingMaskIntoConstraints = NO;

    [label.leftAnchor constraintEqualToAnchor:self.view.leftAnchor constant:10].active = YES;

    self.labelHorizontalOffsetConstraint = [label.centerXAnchor
                                            constraintEqualToAnchor:self.view.centerXAnchor constant:0];
    self.labelVerticalOffsetConstraint = [label.bottomAnchor
                                          constraintEqualToAnchor:self.view.topAnchor
                                          constant:0];

    self.labelHorizontalOffsetConstraint.active = YES;
    self.labelVerticalOffsetConstraint.active = YES;
}

- (void)handleResult:(id _Nullable)resultObj {

    NSMutableDictionary *resultDictionary = [NSMutableDictionary dictionaryWithDictionary:resultObj];

    if (self.detectedBarcodes.count) {
        resultDictionary[@"nativeBarcodesDetected"] = self.detectedBarcodes;
    }

    // dismiss the view controller, if cancelOnResult for the config is true
    NSObject<ALScanViewPluginBase> *scanViewPluginBase = self.scanView.scanViewPlugin;
    if ([scanViewPluginBase isKindOfClass:ALScanViewPlugin.class]) {
        ALScanViewPlugin *scanViewPlugin = (ALScanViewPlugin *)scanViewPluginBase;
        BOOL cancelOnResult = scanViewPlugin.scanPlugin.pluginConfig.cancelOnResult;
        if (cancelOnResult) {
            __weak __block typeof(self) weakSelf = self;
            [self dismissViewControllerAnimated:YES completion:^{
                weakSelf.callback(resultDictionary, nil);
            }];
        }
    } else if ([scanViewPluginBase isKindOfClass:ALViewPluginComposite.class]) {
        // for composites, the cancelOnResult values for each child don't matter
        [self dismissViewControllerAnimated:YES completion:nil];
        self.callback(resultDictionary, nil);
    }
}

// MARK: - ALScanPluginDelegate

- (void)scanPlugin:(ALScanPlugin *)scanPlugin resultReceived:(ALScanResult *)scanResult {

    CGFloat compressionQuality = self.quality / 100.0f;

    NSMutableDictionary *resultDictMutable = [NSMutableDictionary dictionaryWithDictionary:scanResult.resultDictionary];

    NSString *imagePath = [ALPluginHelper saveImageToFileSystem:scanResult.croppedImage
                                             compressionQuality:compressionQuality];
    resultDictMutable[@"imagePath"] = imagePath;

    imagePath = [ALPluginHelper saveImageToFileSystem:scanResult.fullSizeImage
                                   compressionQuality:compressionQuality];

    resultDictMutable[@"fullImagePath"] = imagePath;

    [self handleResult:resultDictMutable];
}


// MARK: - ALViewPluginCompositeDelegate

- (void)viewPluginComposite:(ALViewPluginComposite *)viewPluginComposite
         allResultsReceived:(NSArray<ALScanResult *> *)scanResults {
    // combine all into an array and create a string version of it.
    NSMutableDictionary *results = [NSMutableDictionary dictionaryWithCapacity:scanResults.count];
    CGFloat compressionQuality = self.quality / 100.0f;

    for (ALScanResult *scanResult in scanResults) {
        NSMutableDictionary *resultDictMutable = [NSMutableDictionary dictionaryWithDictionary:scanResult.resultDictionary];
        NSString *imagePath = [ALPluginHelper saveImageToFileSystem:scanResult.croppedImage
                                                 compressionQuality:compressionQuality];
        resultDictMutable[@"imagePath"] = imagePath;
        imagePath = [ALPluginHelper saveImageToFileSystem:scanResult.fullSizeImage
                                       compressionQuality:compressionQuality];
        resultDictMutable[@"fullImagePath"] = imagePath;
        results[scanResult.pluginID] = resultDictMutable;
    }
    [self handleResult:results];
}

// MARK: - ALScanViewDelegate

- (void)scanView:(ALScanView *)scanView updatedCutoutWithPluginID:(NSString *)pluginID frame:(CGRect)frame {

    if (CGRectIsEmpty(frame)) {
        return;
    }

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

// MARK: - Getters and Setters

- (ALPluginConfig * _Nullable)pluginConfig {
    // applic. only to non-composites
    NSObject<ALScanViewPluginBase> *scanVwPluginBase = self.scanView.scanViewPlugin;
    if ([scanVwPluginBase isKindOfClass:ALScanViewPlugin.class]) {
        return ((ALScanViewPlugin *)scanVwPluginBase).scanPlugin.pluginConfig;
    }
    return nil;
}

// MARK: - Selector Actions

- (void)doneButtonPressed:(id)sender {
    [self.scanView.scanViewPlugin stop];

    __weak __block typeof(self) weakSelf = self;
    [self dismissViewControllerAnimated:YES completion:^{
        weakSelf.callback(nil, @"Canceled");
    }];
}

- (void)segmentChange:(id)sender {
    NSString *newMode = self.uiConfig.segmentModes[((UISegmentedControl *)sender).selectedSegmentIndex];
    [self updateScanModeWithValue:newMode];
}

// MARK: - Handle scan mode switching

- (void)updateScanModeWithValue:(NSString *)modeString {
    ALPluginConfig *pluginConfig = self.pluginConfig;

    id key = [ALPluginHelper confPropKeyWithScanModeForPluginConfig:pluginConfig];

    // obj is something like an ALMeterConfig instance, that you can call scanMode: (or setScanMode:) on
    id obj = [self.pluginConfig valueForKey:key];
    NSAssert(obj, @"obj shouldn't be nil!");

    id scanModeObj = [obj valueForKey:@"scanMode"];
    NSString *newScanMode;

    // does the equivalent of +[ALConfigMeterScanMode withValue:modeString],
    // (or whatever scan mode object gets evaluated) avoiding warnings:
    // https://stackoverflow.com/a/20058585
    SEL selector = NSSelectorFromString(@"withValue:");
    IMP imp = [[scanModeObj class] methodForSelector:selector];
    NSString *(*func)(id, SEL, NSString *) = (void *)imp;
    newScanMode = func([scanModeObj class], selector, modeString);

    NSAssert(newScanMode, @"newScanMode is not nil!");

    // like obj, pluginSubConfig should be the the plugin-specific config object
    // (e.g. ALLicensePlateConfig) which responds to setScanMode:.
    selector = NSSelectorFromString(@"setScanMode:");
    imp = [obj methodForSelector:selector];
    id (*func2)(id, SEL, id) = (void *)imp;
    id pluginSubConfig = func2(obj, selector, newScanMode);

    [pluginConfig setValue:pluginSubConfig forKey:key];

    NSError *error;
    BOOL success = [self updatePluginConfig:pluginConfig error:&error];

    if (!success) {
        // check error
        NSLog(@"there was an error changing the scan mode: %@", error.localizedDescription);
    }
}

// assume that pluginConfig carries the updated scanMode or whatever value that you wish to refresh.
- (BOOL)updatePluginConfig:(ALPluginConfig *)pluginConfig error:(NSError * _Nullable * _Nullable)error {
    ALScanViewPluginConfig *origSVPConfig = ((ALScanViewPlugin *)self.scanView.scanViewPlugin).scanViewPluginConfig;
    ALScanViewPluginConfig *scanViewPluginConfig = [ALScanViewPluginConfig withPluginConfig:pluginConfig
                                                                               cutoutConfig:origSVPConfig.cutoutConfig
                                                                         scanFeedbackConfig:origSVPConfig.scanFeedbackConfig];
    ALScanViewPlugin *newScanViewPlugin = [[ALScanViewPlugin alloc] initWithConfig:scanViewPluginConfig error:error];
    if (!newScanViewPlugin) {
        return NO;
    }

    newScanViewPlugin.scanPlugin.delegate = self;

    BOOL success = [self.scanView setScanViewPlugin:newScanViewPlugin error:error];
    if (!success) {
        return NO;
    }

    success = [[self.scanView scanViewPlugin] startWithError:error];
    if (!success) {
        // check error
        return NO;
    }
    return YES;
}


/// If the running plugin supports a scan mode, this returns the string representation of it.
- (NSString * _Nullable)currentScanMode {
    // Does our running plugin contain a property named something like `XXXConfig`?
    // If yes, is there a `scanMode` inside?
    NSString * _Nullable pluginConfigPropertyWithScanMode = [ALPluginHelper confPropKeyWithScanModeForPluginConfig:self.pluginConfig];
    if (!pluginConfigPropertyWithScanMode) {
        return nil;
    }
    // obj is something like an ALMeterConfig instance
    id obj = [self.pluginConfig valueForKey:pluginConfigPropertyWithScanMode];
    NSAssert(obj, @"obj shouldn't be nil!");
    id scanModeObj = [obj valueForKey:@"scanMode"];
    return [scanModeObj valueForKey:@"value"];
}

// Check whether the scan modes indicated in options > segmentConfig are valid.
// Otherwise, the segment control is not shown.
- (BOOL)segmentModesAreValid {
    if (self.uiConfig.segmentModes.count < 1) {
        return NO;
    }

    // easy question first: is there an identical number of segModes and segTitles?
    if (self.uiConfig.segmentModes.count != self.uiConfig.segmentTitles.count) {
        NSLog(@"Error: should have the same number of segment modes and segment titles!");
        return NO;
    }

    NSString *propKey = [ALPluginHelper confPropKeyWithScanModeForPluginConfig:self.pluginConfig];
    id obj = [self.pluginConfig valueForKey:propKey];
    NSAssert(obj, @"obj shouldn't be nil!");

    // go through each self.segmentMode. Each call below should be non-nil.
    // NOTE: for now (24.01.2023) TIN and Container scanModes should be named in the JSON config
    // in all UPPERCASE (because the schema demands it to be so).
    for (NSString *scanModeStr in self.uiConfig.segmentModes) {
        if (![[[obj scanMode] class] withValue:scanModeStr]) {
            NSLog(@"Error: %@ is not a valid scan mode for the current plugin", scanModeStr);
            return NO;
        }
    }

    return YES;
}

// MARK: - Miscellaneous

- (BOOL)showErrorAlertIfNeeded:(NSError *)error {
    return [ALPluginHelper showErrorAlertIfNeeded:error pluginCallback:self.callback];
}

@end
