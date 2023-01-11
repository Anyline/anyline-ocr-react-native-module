#import <Anyline/Anyline.h>

#import "ALPluginScanViewController.h"
#import "ALPluginHelper.h"
#import "ALPluginResultHelper.h"
#import "ALRoundedView.h"
#import "ALScanResult+ALUtilities.h"

@interface ALPluginScanViewController () <ALScanPluginDelegate, ALViewPluginCompositeDelegate>

// ACO should it have the `assign` attribute?
@property (nonatomic) ALPluginCallback callback;

@property (nonatomic, strong) NSDictionary *config;

@property (nonatomic, copy) NSString *licenseKey;

@property (nonatomic, strong) ALJSONUIConfiguration *uiConfig;

@property (nonatomic, strong) ALScanView *scanView;

@property (nonatomic, strong) UIButton *doneButton;

@property (nonatomic, assign) BOOL showingLabel; // ACO i think for showing scanning hints with document use case (obsolete)

@property (nonatomic, strong) UILabel *scannedLabel;

@property (nonatomic, strong) ALRoundedView *roundedView;

@property (nonatomic, strong) UISegmentedControl *segment;

@property (nonatomic, strong) NSMutableArray<NSDictionary *> *detectedBarcodes;

@end


@implementation ALPluginScanViewController

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
        self.nativeBarcodeEnabled = NO;
        self.cropAndTransformErrorMessage = @"";
    }
    return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
    NSError *error = nil;

    // ACO is there an equivalent place to that of an AppDelegate on which this could be added?
    [AnylineSDK setupWithLicenseKey:self.licenseKey error:&error];

    if ([self showErrorAlertIfNeeded:error]) {
        return;
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

    [self.scanView startCamera];

    // TODO: add a segmented view to switch between various scan modes.

//    if (self.uiConfig.segmentModes && [self.scanView.scanViewPlugin isKindOfClass:[ALMeterScanViewPlugin class]]) {
//        self.segment = [ALPluginHelper createSegmentForViewController:self
//                                                               config:self.uiConfig
//                                                             scanMode:((ALMeterScanViewPlugin *)self.scanView.scanViewPlugin).meterScanPlugin.scanMode];
//        [(ALMeterScanViewPlugin *)self.scanView.scanViewPlugin addScanViewPluginDelegate:self];
//    }

    // TODO: handle native barcode, if config specifies it.
    
//    if (self.nativeBarcodeEnabled) {
//        error = nil;
//        BOOL success = [self.scanView.captureDeviceManager addBarcodeDelegate:self error:&error];
//        if (!success) {
//            UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"Could not start scanning" message:error.localizedDescription preferredStyle:UIAlertControllerStyleAlert];
//            [self presentViewController:alert animated:YES completion:NULL];
//
//            UIAlertAction *action = [UIAlertAction actionWithTitle:@"Ok" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
//                [self dismissViewControllerAnimated:YES completion:^{
//                    self.callback(nil, @"Canceled");
//                }];
//            }];
//            [alert addAction:action];
//            return;
//        }
//    }
    
//    self.detectedBarcodes = [NSMutableArray array];
    
    self.doneButton = [ALPluginHelper createButtonForViewController:self config:self.uiConfig];

//    self.scannedLabel = [ALPluginHelper createLabelForView:self.view];
}

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];

    // avoid allowing the app to be put to sleep after a long period without touch events
    [UIApplication sharedApplication].idleTimerDisabled = YES;

    NSError *error;
    [self.scanView.scanViewPlugin startWithError:&error];
    [self showErrorAlertIfNeeded:error];

    // TODO: add segment if config asks for it
//    if (self.uiConfig.segmentModes) {
//        self.segment.frame = CGRectMake(self.scanView.scanViewPlugin.cutoutRect.origin.x + self.uiConfig.segmentXPositionOffset / 2.0,
//                                        self.scanView.scanViewPlugin.cutoutRect.origin.y + self.uiConfig.segmentYPositionOffset / 2.0,
//                                        self.view.frame.size.width - 2 * (self.scanView.scanViewPlugin.cutoutRect.origin.x + self.uiConfig.segmentXPositionOffset / 2.0),
//                                        self.segment.frame.size.height);
//        self.segment.hidden = NO;
//    }
    
}

- (void)viewDidDisappear:(BOOL)animated {
    [UIApplication sharedApplication].idleTimerDisabled = NO;
    [super viewDidDisappear:animated];
}

- (BOOL)shouldAutorotate {
    return NO;
}

- (void)doneButtonPressed:(id)sender {
    [self.scanView.scanViewPlugin stop];

    __weak __block typeof(self) weakSelf = self;
    [self dismissViewControllerAnimated:YES completion:^{
        weakSelf.callback(nil, @"Canceled");
    }];
}

- (void)segmentChange:(id)sender {
    // TODO: implement method if still needed.
//    NSString *modeString = self.uiConfig.segmentModes[((UISegmentedControl *)sender).selectedSegmentIndex];
//    ALScanMode scanMode = [ALPluginHelper scanModeFromString:modeString];
//    if ([self.scanView.scanViewPlugin isKindOfClass:[ALMeterScanViewPlugin class]]) {
//        [((ALMeterScanViewPlugin *)self.scanView.scanViewPlugin).meterScanPlugin setScanMode:scanMode error:nil];
//    }
}

// TODO: make a utility method out of this, as it seems to be repeated.
- (BOOL)showErrorAlertIfNeeded:(NSError *)error {
    if (!error) {
        return NO;
    }

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

// MARK: - ALScanPluginDelegate

- (void)scanPlugin:(ALScanPlugin *)scanPlugin resultReceived:(ALScanResult *)scanResult {
    // NOTE: for now the second param in handleResult:result: is not used.
    [self handleResult:scanResult.enhancedDictionary];
}

// MARK: - ALViewPluginCompositeDelegate

- (void)viewPluginComposite:(ALViewPluginComposite *)viewPluginComposite
         allResultsReceived:(NSArray<ALScanResult *> *)scanResults {

    // combine all into an array and create a string version of it.
    NSMutableArray *results = [NSMutableArray arrayWithCapacity:scanResults.count];
    for (ALScanResult *scanResult in scanResults) {
        [results addObject:scanResult.enhancedDictionary];
    }
    // [self handleResult:results];
    [self handleResult:@{ @"results": results }];
}

- (void)handleResult:(id _Nullable)resultObj {

    // TODO: give the string version of the result to the self.scannedLabel label (if applicable)
//    if ([scanResult.result isKindOfClass:[NSString class]]) {
//        self.scannedLabel.text = (NSString *)scanResult.result;
//    }

//    self.detectedBarcodes = [NSMutableArray array];

    NSObject<ALScanViewPluginBase> *scanViewPluginBase = self.scanView.scanViewPlugin;
    // TODO: handle this for composites: cancelOnResult = true? dismiss
    if ([scanViewPluginBase isKindOfClass:ALScanViewPlugin.class]) {
        ALScanViewPlugin *scanViewPlugin = (ALScanViewPlugin *)scanViewPluginBase;
        BOOL cancelOnResult = scanViewPlugin.scanPlugin.scanPluginConfig.cancelOnResult;
        if (cancelOnResult) {
            [self dismissViewControllerAnimated:YES completion:nil];
        }
    } else if ([scanViewPluginBase isKindOfClass:ALViewPluginComposite.class]) {
        // for composites, the cancelOnResult values for each child don't matter
        [self dismissViewControllerAnimated:YES completion:nil];
    }

    // TODO: make the first param a string instead.
    self.callback(resultObj, nil);

}

@end