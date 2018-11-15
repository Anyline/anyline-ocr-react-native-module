//
//  ALPluginScanViewController.m
//  Anyline React-Native Example
//
//  Created by Daniel Albertini on 30.10.18.
//

#import "ALPluginScanViewController.h"
#import <Anyline/Anyline.h>
#import "ALPluginHelper.h"
#import "ALRoundedView.h"


@interface ALPluginScanViewController ()<ALIDPluginDelegate,ALOCRScanPluginDelegate,ALBarcodeScanPluginDelegate,ALMeterScanPluginDelegate,ALLicensePlateScanPluginDelegate,ALDocumentScanPluginDelegate,AnylineNativeBarcodeDelegate, ALInfoDelegate, ALScanViewPluginDelegate, ALDocumentInfoDelegate>

@property (nonatomic, strong) NSDictionary *anylineConfig;
@property (nonatomic, weak) id<ALPluginScanViewControllerDelegate> delegate;
@property (nonatomic, strong) NSString *licensekey;
@property (nonatomic, strong) ALJsonUIConfiguration *uiConfig;

@property (nonatomic,strong) UIButton *doneButton;
@property (nonatomic,strong) UILabel *scannedLabel;

@property (nonatomic, strong) UISegmentedControl *segment;

@property (nonatomic, strong) ALRoundedView *roundedView;
@property (nonatomic, assign) BOOL showingLabel;

@property (nonatomic, strong) ALScanView *scanView;

@property (nonatomic, strong) NSMutableArray<NSDictionary *> *detectedBarcodes;

@end

@implementation ALPluginScanViewController

- (instancetype)initWithLicensekey:(NSString *)licensekey
                     configuration:(NSDictionary *)anylineConfig
              uiConfiguration:(ALJsonUIConfiguration *)jsonUIConfig
                          delegate:(id<ALPluginScanViewControllerDelegate>)delegate {
    self = [super init];
    if(self) {
        _licensekey = licensekey;
        _delegate = delegate;
        _anylineConfig = anylineConfig;
        _uiConfig = jsonUIConfig;
        
        self.quality = 100;
        self.nativeBarcodeEnabled = NO;
        self.cropAndTransformErrorMessage = @"";
    }
    return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
    NSError *error = nil;
    
    
    self.scanView = [ALScanView scanViewForFrame:self.view.bounds
                                      configDict:self.anylineConfig
                                      licenseKey:self.licensekey
                                        delegate:self
                                           error:&error];
    
    if ([self.scanView.scanViewPlugin isKindOfClass:[ALDocumentScanViewPlugin class]]) {
        [(ALDocumentScanViewPlugin *)self.scanView.scanViewPlugin addScanViewPluginDelegate:self];
        [((ALDocumentScanViewPlugin *)self.scanView.scanViewPlugin).documentScanPlugin addInfoDelegate:self];
        
        ((ALDocumentScanViewPlugin *)self.scanView.scanViewPlugin).documentScanPlugin.justDetectCornersIfPossible = NO;
        [((ALDocumentScanViewPlugin *)self.scanView.scanViewPlugin) setValue:self forKey:@"tmpOutlineDelegate"];
        
        
        self.roundedView = [ALPluginHelper createRoundedViewForViewController:self];
        
        self.scanView.cameraConfig = [ALCameraConfig defaultCameraConfig];
    }
    
    if(!self.scanView) {
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Could not start scanning" message:error.localizedDescription delegate:self cancelButtonTitle:@"Ok" otherButtonTitles:nil];
        [alert show];
        
        return;
    }

    if ([self.scanView.scanViewPlugin isKindOfClass:[ALOCRScanViewPlugin class]]) {
    NSString *customCmdFile = [self.anylineConfig valueForKeyPath:@"viewPlugin.plugin.ocrPlugin.customCmdFile"];
    
        if (customCmdFile) {
            NSString *fileName = [self.anylineConfig valueForKeyPath:@"viewPlugin.plugin.ocrPlugin.customCmdFile"];
            if (fileName) {
                NSString *cmdFileDirectoryPath = [NSString stringWithFormat:@"%@/%@",@"ale", [fileName stringByDeletingLastPathComponent]];
                NSString *pathResource = [[fileName lastPathComponent] stringByDeletingPathExtension];
                NSString *filePath =  [[NSBundle mainBundle] pathForResource:pathResource ofType:@"ale" inDirectory:cmdFileDirectoryPath];
                
                ALOCRConfig *ocrConfig = ((ALOCRScanViewPlugin *)self.scanView.scanViewPlugin).ocrScanPlugin.ocrConfig;
                [ocrConfig setCustomCmdFilePath:filePath];
                [((ALOCRScanViewPlugin *)self.scanView.scanViewPlugin).ocrScanPlugin setOCRConfig:ocrConfig error:nil];
            }
            
        }
    }
    
    [self.scanView startCamera];
    
    [self.view addSubview:self.scanView];
    
    if (self.uiConfig.segmentModes && [self.scanView.scanViewPlugin isKindOfClass:[ALMeterScanViewPlugin class]]) {
        self.segment = [ALPluginHelper createSegmentForViewController:self
                                                               config:self.uiConfig
                                                             scanMode:((ALMeterScanViewPlugin *)self.scanView.scanViewPlugin).meterScanPlugin.scanMode];
        [(ALMeterScanViewPlugin *)self.scanView.scanViewPlugin addScanViewPluginDelegate:self];
    }
    
    
    
    if (self.nativeBarcodeEnabled) {
        error = nil;
        BOOL success = [self.scanView.captureDeviceManager addBarcodeDelegate:self error:&error];
        
        if(!success) {
            UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Could not start scanning" message:error.localizedDescription delegate:self cancelButtonTitle:@"Ok" otherButtonTitles:nil];
            [alert show];
            
            return;
        }
    }
    
    self.detectedBarcodes = [NSMutableArray array];
    
    self.doneButton = [ALPluginHelper createButtonForViewController:self config:self.uiConfig];
    
    self.scannedLabel = [ALPluginHelper createLabelForView:self.view];
}

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    
    [UIApplication sharedApplication].idleTimerDisabled = YES;
    
    NSError *error;
    BOOL success = [self.scanView.scanViewPlugin startAndReturnError:&error];
    if(!success) {
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Could not start scanning" message:error.localizedDescription delegate:self cancelButtonTitle:@"Ok" otherButtonTitles:nil];
        [alert show];
    }
    
    
    
    if(self.uiConfig.segmentModes){
        self.segment.frame = CGRectMake(self.scanView.scanViewPlugin.cutoutRect.origin.x + self.uiConfig.segmentXPositionOffset/2,
                                        self.scanView.scanViewPlugin.cutoutRect.origin.y + self.uiConfig.segmentYPositionOffset/2,
                                        self.view.frame.size.width - 2*(self.scanView.scanViewPlugin.cutoutRect.origin.x + self.uiConfig.segmentXPositionOffset/2),
                                        self.segment.frame.size.height);
        self.segment.hidden = NO;
    }
}

- (void)viewDidDisappear:(BOOL)animated {
    [UIApplication sharedApplication].idleTimerDisabled = NO;
}

- (BOOL)shouldAutorotate {
    return NO;
}

- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex {
    [self dismissViewControllerAnimated:YES completion:^{
        [self.delegate pluginScanViewController:self didStopScanning:self];
    }];
}

- (void)doneButtonPressed:(id)sender {
    [self.scanView.scanViewPlugin stopAndReturnError:nil];
    [self dismissViewControllerAnimated:YES completion:^{
        [self.delegate pluginScanViewController:self didStopScanning:sender];
    }];
}

- (void)segmentChange:(id)sender {
    NSString *modeString = self.uiConfig.segmentModes[((UISegmentedControl *)sender).selectedSegmentIndex];
    ALScanMode scanMode = [ALPluginHelper scanModeFromString:modeString];
    if ([self.scanView.scanViewPlugin isKindOfClass:[ALMeterScanViewPlugin class]]) {
        [((ALMeterScanViewPlugin *)self.scanView.scanViewPlugin).meterScanPlugin setScanMode:scanMode error:nil];
    }
}

#pragma mark - ALScanViewPluginDelegate Delegate Methods

//Update the position and size of the segment control, after cutout has been updated.
- (void)anylineScanViewPlugin:(ALAbstractScanViewPlugin *)anylineScanViewPlugin updatedCutout:(CGRect)cutoutRect {
    //Handle Cutout related positions here. E.g. Warning Views/Icons
    //SegmentControl is not modified here, because it will move with cutout changes (=> origin.y changes from analog to digital meter scanMode)
}


#pragma mark - Anyline Result Delegate Methods
- (void)anylineIDScanPlugin:(ALIDScanPlugin * _Nonnull)anylineIDScanPlugin
              didFindResult:(ALIDResult * _Nonnull)scanResult {
    NSDictionary *dictResult = [ALPluginHelper dictionaryForIDResult:scanResult
                                                    detectedBarcodes:self.detectedBarcodes
                                                             outline:self.scanView.scanViewPlugin.outline
                                                             quality:self.quality];
    
    [self handleResult:dictResult result:scanResult];
}

- (void)anylineOCRScanPlugin:(ALOCRScanPlugin * _Nonnull)anylineOCRScanPlugin
               didFindResult:(ALOCRResult * _Nonnull)scanResult {
    NSDictionary *dictResult = [ALPluginHelper dictionaryForOCRResult:scanResult
                                                     detectedBarcodes:self.detectedBarcodes
                                                              outline:self.scanView.scanViewPlugin.outline
                                                              quality:self.quality];
    
    [self handleResult:dictResult result:scanResult];
}

- (void)anylineBarcodeScanPlugin:(ALBarcodeScanPlugin * _Nonnull)anylineBarcodeScanPlugin
                   didFindResult:(ALBarcodeResult * _Nonnull)scanResult {
    NSDictionary *dictResult = [ALPluginHelper dictionaryForBarcodeResult:scanResult
                                                                  outline:self.scanView.scanViewPlugin.outline
                                                                  quality:self.quality];
    
    [self handleResult:dictResult result:scanResult];
}

- (void)anylineMeterScanPlugin:(ALMeterScanPlugin * _Nonnull)anylineMeterScanPlugin
                 didFindResult:(ALMeterResult * _Nonnull)scanResult {
    NSDictionary *dictResult = [ALPluginHelper dictionaryForMeterResult:scanResult
                                                       detectedBarcodes:self.detectedBarcodes
                                                                outline:self.scanView.scanViewPlugin.outline
                                                                quality:self.quality];
    
    [self handleResult:dictResult result:scanResult];
}

- (void)anylineLicensePlateScanPlugin:(ALLicensePlateScanPlugin * _Nonnull)anylineLicensePlateScanPlugin
                        didFindResult:(ALLicensePlateResult * _Nonnull)scanResult {
    NSDictionary *dictResult = [ALPluginHelper dictionaryForLicensePlateResult:scanResult
                                                              detectedBarcodes:self.detectedBarcodes
                                                                       outline:self.scanView.scanViewPlugin.outline
                                                                       quality:self.quality];
    
    [self handleResult:dictResult result:scanResult];
}

- (void)anylineDocumentScanPlugin:(ALDocumentScanPlugin * _Nonnull)anylineDocumentScanPlugin
                        hasResult:(UIImage * _Nonnull)transformedImage
                        fullImage:(UIImage * _Nonnull)fullFrame
                  documentCorners:(ALSquare * _Nonnull)corners {
    NSDictionary *dictResult = [ALPluginHelper dictionaryForTransformedImage:transformedImage
                                                                   fullFrame:fullFrame
                                                                     quality:self.quality
                                                            detectedBarcodes:self.detectedBarcodes
                                                                     outline:corners];
    
    [self handleResult:dictResult result:nil];
}

- (void)anylineCaptureDeviceManager:(ALCaptureDeviceManager * _Nonnull)captureDeviceManager
               didFindBarcodeResult:(NSString * _Nonnull)scanResult
                               type:(NSString * _Nonnull)barcodeType {
    [self.detectedBarcodes addObject:[ALPluginHelper dictionaryForBarcodeResults:self.detectedBarcodes
                                                                     barcodeType:barcodeType
                                                                      scanResult:scanResult]];
}

/*
 This method receives errors that occured during the scan.
 */
-(void)anylineDocumentScanPlugin:(ALDocumentScanPlugin *)anylineDocumentScanPlugin reportsPictureProcessingFailure:(ALDocumentError)error {
    [self showUserLabel:error];
}

/*
 This method receives errors that occured during the scan.
 */

-(void)anylineDocumentScanPlugin:(ALDocumentScanPlugin *)anylineDocumentScanPlugin reportsPreviewProcessingFailure:(ALDocumentError)error {
    [self showUserLabel:error];
}
- (void)anylineScanPlugin:(ALAbstractScanPlugin * _Nonnull)anylineScanPlugin
               runSkipped:(ALRunSkippedReason * _Nonnull)runSkippedReason {
    
    switch (runSkippedReason.reason) {
        case ALRunFailurePointsOutOfCutout: {
            NSLog(@"Failure: points out of bounce");
            
            self.roundedView.textLabel.text = self.cropAndTransformErrorMessage;
            
            // Animate the appearance of the label
            CGFloat fadeDuration = 1.5;
            
            // Check for Strict Mode and set it
            if( self.showingLabel == 0){
                self.showingLabel = 1;
                [UIView animateWithDuration:fadeDuration animations:^{
                    self.roundedView.alpha = 1;
                } completion:^(BOOL finished) {
                    [UIView animateWithDuration:fadeDuration animations:^{
                        self.roundedView.alpha = 0;
                    } completion:^(BOOL finished) {
                        self.showingLabel = 0;
                    }];
                }];
            }
            break;
        }
        default:
        break;
    }
}

- (void)handleResult:(NSDictionary *)dictResult result:(ALScanResult *)scanResult {
    if ([scanResult.result isKindOfClass:[NSString class]]) {
        self.scannedLabel.text = (NSString *)scanResult.result;
    }
    
    [self.delegate pluginScanViewController:self
                                    didScan:dictResult
                           continueScanning:!self.scanView.scanViewPlugin.scanViewPluginConfig.cancelOnResult];
    
    if (self.scanView.scanViewPlugin.scanViewPluginConfig.cancelOnResult) {
        [self dismissViewControllerAnimated:YES completion:NULL];
    }
    self.detectedBarcodes = [NSMutableArray array];
}

- (void)showUserLabel:(ALDocumentError)error {
    NSString *helpString = nil;
    switch (error) {
        case ALDocumentErrorNotSharp:
        helpString = @"Document not Sharp";
        break;
        case ALDocumentErrorSkewTooHigh:
        helpString = @"Wrong Perspective";
        break;
        case ALDocumentErrorImageTooDark:
        helpString = @"Too Dark";
        break;
        case ALDocumentErrorShakeDetected:
        helpString = @"Too much shaking";
        break;
        default:
        break;
    }
    
    // The error is not in the list above or a label is on screen at the moment
    if(!helpString || self.showingLabel) {
        return;
    }
    
    self.showingLabel = YES;
    self.roundedView.textLabel.text = helpString;
    
    
    // Animate the appearance of the label
    CGFloat fadeDuration = 0.8;
    [UIView animateWithDuration:fadeDuration animations:^{
        self.roundedView.alpha = 1;
    } completion:^(BOOL finished) {
        [UIView animateWithDuration:fadeDuration animations:^{
            self.roundedView.alpha = 0;
        } completion:^(BOOL finished) {
            self.showingLabel = NO;
        }];
    }];
}

@end
