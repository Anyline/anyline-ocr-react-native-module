
#import "AnylineBarcodeScanViewController.h"
#import <Anyline/Anyline.h>

@interface AnylineBarcodeScanViewController ()<AnylineBarcodeModuleDelegate>

@property (nonatomic, strong) UILabel *label;

@end

@implementation AnylineBarcodeScanViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    AnylineBarcodeModuleView *barcodeModuleView = [[AnylineBarcodeModuleView alloc] initWithFrame:self.view.bounds];

    NSError *error = nil;
    [barcodeModuleView setupWithLicenseKey:self.key delegate:self error:&error];
//        if(!success) {
//            UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Setup failed:" message:error.debugDescription delegate:self cancelButtonTitle:@"Ok" otherButtonTitles:nil];
//            [alert show];
//        }


    barcodeModuleView.currentConfiguration = self.conf;

    self.moduleView = barcodeModuleView;

    [self.view addSubview:self.moduleView];
    
    //Add Label
    self.label = [[UILabel alloc] init];
    self.label.hidden = YES;
    
    [self.label setText:self.jsonConfig.labelText];
    [self.label setTextColor:self.jsonConfig.labelColor];
    self.label.font = [self.label.font fontWithSize:self.jsonConfig.labelSize];
    [self.label sizeToFit];
    [self.view addSubview:self.label];


    [self.view sendSubviewToBack:self.moduleView];

}
    
- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    
    //Label
    self.label.center = CGPointMake(self.moduleView.cutoutRect.origin.x+ self.jsonConfig.labelXPositionOffset/2.5,
                                    self.moduleView.cutoutRect.origin.y + self.jsonConfig.labelYPositionOffset/4);
    self.label.hidden = NO;

    
    [self.moduleView.captureDeviceManager removeBarcodeDelegate:self];
}

#pragma mark - AnylineBarcodeModuleDelegate method


- (void)anylineBarcodeModuleView:(AnylineBarcodeModuleView *)anylineBarcodeModuleView
                   didFindResult:(ALBarcodeResult *)scanResult {
    
    self.scannedLabel.text = (NSString *)scanResult.result;
    [self flashResultFor:0.9];
    
    NSMutableDictionary *dictResult = [NSMutableDictionary dictionaryWithCapacity:2];
    
    [dictResult setObject:(NSString *)scanResult.result forKey:@"value"];
    if (!scanResult.barcodeFormat) {
        [dictResult setObject:@"Unknown" forKey:@"barcodeFormat"];
    } else {
        [dictResult setObject:[self stringFromBarcodeFormat:scanResult.barcodeFormat] forKey:@"barcodeFormat"];
    }
    
    
    NSString *imagePath = [self saveImageToFileSystem:scanResult.image];
    
    [dictResult setValue:imagePath forKey:@"imagePath"];
    
    
    NSString *fullImagePath = [self saveImageToFileSystem:scanResult.fullImage];
    
    [dictResult setValue:fullImagePath forKey:@"fullImagePath"];
    

    [dictResult setValue:@(scanResult.confidence) forKey:@"confidence"];
    [dictResult setValue:[self stringForOutline:scanResult.outline] forKey:@"outline"];

    
    [self.delegate anylineBaseScanViewController:self
                                         didScan:dictResult
                                continueScanning:!self.moduleView.cancelOnResult];
    if (self.moduleView.cancelOnResult) {
        [self dismissViewControllerAnimated:YES completion:NULL];
    }
}


#pragma mark - Private Methods

- (ALBarcodeFormat)barcodeFormatFromString:(NSString *)barcodeFormat {
    NSDictionary<NSString *, NSNumber *> *scanModes = [self barcodesFormatDict];

    return [scanModes[barcodeFormat] integerValue];
}

- (NSString *)stringFromBarcodeFormat:(ALBarcodeFormat)barcodeFormat {
    NSDictionary<NSString *, NSNumber *> *barcodeFormats = [self barcodesFormatDict];
    return [barcodeFormats allKeysForObject:@(barcodeFormat)][0];
}

- (NSDictionary<NSString *, NSNumber *> *)barcodesFormatDict {
    static NSDictionary<NSString *, NSNumber *> * scanModes = nil;

    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        scanModes = @{
                      @"AZTEC" : @(ALCodeTypeAztec),
                      @"CODABAR" : @(ALCodeTypeCodabar),
                      @"CODE_39" : @(ALCodeTypeCode39),
                      @"CODE_93" : @(ALCodeTypeCode93),
                      @"CODE_128" : @(ALCodeTypeCode128),
                      @"DATA_MATRIX" : @(ALCodeTypeDataMatrix),
                      @"EAN_8" : @(ALCodeTypeEAN8),
                      @"EAN_13" : @(ALCodeTypeEAN13),
                      @"ITF" : @(ALCodeTypeITF),
                      @"PDF_417" : @(ALCodeTypePDF417),
                      @"QR_CODE" : @(ALCodeTypeQR),
                      @"RSS_14" : @(ALCodeTypeRSS14),
                      @"RSS_EXPANDED" : @(ALCodeTypeRSSExpanded),
                      @"UPC_A" : @(ALCodeTypeUPCA),
                      @"UPC_E" : @(ALCodeTypeUPCE),
                      @"UPC_EAN_EXTENSION" : @(ALCodeTypeUPCEANExtension),
                      @"UNKNOWN" : @(ALHeatMeter6),
                      };
    });

    return scanModes;
}


@end

