
#import "AnylineEnergyScanViewController.h"
#import <Anyline/Anyline.h>

@interface AnylineEnergyScanViewController ()<AnylineEnergyModuleDelegate, AnylineNativeBarcodeDelegate>

@property (nonatomic, strong) UISegmentedControl *segment;

@property (nonatomic, strong) UILabel *label;

@property (nonatomic, strong) NSString *detectedBarcode;

@end

@implementation AnylineEnergyScanViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    AnylineEnergyModuleView *energyModuleView = [[AnylineEnergyModuleView alloc] initWithFrame:self.view.bounds];

    NSError *error = nil;
    [energyModuleView setupWithLicenseKey:self.key delegate:self error:&error];



    [energyModuleView setScanMode:self.scanMode error:nil];
    [energyModuleView.captureDeviceManager addBarcodeDelegate:self];

    if (self.nativeBarcodeEnabled) {
        [energyModuleView.captureDeviceManager addBarcodeDelegate:self];
    }

    // Set Serial Number specific configurations
    // Set Validation Regex
    if (self.serialValRegex) {
        NSLog(@"ValidationRegex %@", self.serialValRegex);
        energyModuleView.serialNumberValidationRegex = self.serialValRegex;
    }
    // Set Whitelist
    if (self.serialWhitelist) {
        NSLog(@"Whitelist %@", self.serialWhitelist);
        energyModuleView.serialNumberCharWhitelist = self.serialWhitelist;
    }


    energyModuleView.currentConfiguration = self.conf;

    self.moduleView = energyModuleView;
    [self.view addSubview:self.moduleView];

    [self.view sendSubviewToBack:self.moduleView];


    // Add Segment
    if(self.jsonConfig.segmentModes){
        self.segment = [[UISegmentedControl alloc] initWithItems:self.jsonConfig.segmentTitles];

        self.segment.tintColor = self.jsonConfig.segmentTintColor;
        self.segment.hidden = YES;

        NSInteger index = [self.jsonConfig.segmentModes indexOfObject:[self stringFromScanMode:self.scanMode]];
        [self.segment setSelectedSegmentIndex:index];
        [self.segment addTarget:self action:@selector(segmentChange:) forControlEvents:UIControlEventValueChanged];
        [self.view addSubview:self.segment];
    }

    // Add Label
    self.label = [[UILabel alloc] init];
    self.label.hidden = YES;

    [self.label setText:self.jsonConfig.labelText];
    [self.label setTextColor:self.jsonConfig.labelColor];
    self.label.font = [self.label.font fontWithSize:self.jsonConfig.labelSize];
    [self.label sizeToFit];
    [self.view addSubview:self.label];



    self.detectedBarcode = @"";

}

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];

    if(self.jsonConfig.segmentModes){
        //Segment
        self.segment.frame = CGRectMake(self.moduleView.cutoutRect.origin.x + self.jsonConfig.segmentXPositionOffset/2,
                                        self.moduleView.cutoutRect.origin.y + self.jsonConfig.segmentYPositionOffset/2,
                                        self.view.frame.size.width - 2*(self.moduleView.cutoutRect.origin.x + self.jsonConfig.segmentXPositionOffset/2),
                                        self.segment.frame.size.height);
        self.segment.hidden = NO;
    }

    //Label
    self.label.center = CGPointMake(self.moduleView.cutoutRect.origin.x+ self.jsonConfig.labelXPositionOffset/2.5,
                                    self.moduleView.cutoutRect.origin.y + self.jsonConfig.labelYPositionOffset/4);
    self.label.hidden = NO;

}

#pragma mark - AnylineEnergyModuleDelegate method

- (void)anylineEnergyModuleView:(AnylineEnergyModuleView *)anylineEnergyModuleView didFindResult:(ALEnergyResult *)scanResult {
    /*
     To present the scanned result to the user we use a custom view controller.
     */
    self.scannedLabel.text = (NSString *)scanResult.result;



    NSMutableDictionary *dictResult = [NSMutableDictionary dictionaryWithCapacity:4];

    switch (scanResult.scanMode) {
        case ALDigitalMeter:
            [dictResult setObject:@"Digital Meter" forKey:@"meterType"];
            break;
        case ALHeatMeter4:
        case ALHeatMeter5:
        case ALHeatMeter6:
            [dictResult setObject:@"Heat Meter" forKey:@"meterType"];
            break;
        case ALSerialNumber:
            [dictResult setObject:@"Serial Number" forKey:@"meterType"];
            break;
        default:
            [dictResult setObject:@"Electric Meter" forKey:@"meterType"];
            break;
    }
    if(scanResult.scanMode){
        [dictResult setObject:[self stringFromScanMode:scanResult.scanMode] forKey:@"scanMode"];
    }
    [dictResult setObject:scanResult.result forKey:@"reading"];

    NSString *imagePath = [self saveImageToFileSystem:scanResult.image];

    [dictResult setValue:imagePath forKey:@"imagePath"];

    NSString *fullImagePath = [self saveImageToFileSystem:scanResult.fullImage];

    [dictResult setValue:fullImagePath forKey:@"fullImagePath"];

    [dictResult setObject:self.detectedBarcode forKey:@"barcodeResult"];

    [dictResult setValue:@(scanResult.confidence) forKey:@"confidence"];
    [dictResult setValue:[self stringForOutline:scanResult.outline] forKey:@"outline"];

    [self.delegate anylineBaseScanViewController:self didScan:dictResult continueScanning:!self.moduleView.cancelOnResult];

    if (self.moduleView.cancelOnResult) {
        [self dismissViewControllerAnimated:YES completion:NULL];
    }
    self.detectedBarcode = @"";
}


#pragma mark - AnylineCaptureDeviceManager
- (void)anylineCaptureDeviceManager:(ALCaptureDeviceManager *)captureDeviceManager
               didFindBarcodeResult:(NSString *)scanResult
                               type:(NSString *)barcodeType {
    self.detectedBarcode = scanResult;
}

#pragma mark - IBActions

- (IBAction)segmentChange:(id)sender {
    NSString *modeString = self.jsonConfig.segmentModes[((UISegmentedControl *)sender).selectedSegmentIndex];
    ALScanMode scanMode = [self scanModeFromString:modeString];
    [((AnylineEnergyModuleView *)self.moduleView) setScanMode:scanMode error:nil];

    self.moduleView.currentConfiguration = self.conf;
}

#pragma mark - Private Methods

- (NSString *)barcodeFormatForNativeString:(NSString *)barcodeType {

    static NSDictionary<NSString *, NSString *> * barcodeFormats = nil;

    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"
        barcodeFormats = @{
                           @"AVMetadataObjectTypeUPCECode" : kCodeTypeUPCE,
                           @"AVMetadataObjectTypeCode39Code" : kCodeTypeCode39,
                           @"AVMetadataObjectTypeCode39Mod43Code" : kCodeTypeCode39,
                           @"AVMetadataObjectTypeEAN13Code" : kCodeTypeEAN13,
                           @"AVMetadataObjectTypeEAN8Code" : kCodeTypeEAN8,
                           @"AVMetadataObjectTypeCode93Code" : kCodeTypeCode93,
                           @"AVMetadataObjectTypeCode128Code" : kCodeTypeCode128,
                           @"AVMetadataObjectTypePDF417Code" : kCodeTypePDF417,
                           @"AVMetadataObjectTypeQRCode" : kCodeTypeQR,
                           @"AVMetadataObjectTypeAztecCode" : kCodeTypeAztec,
                           @"AVMetadataObjectTypeInterleaved2of5Code" : kCodeTypeITF,
                           @"AVMetadataObjectTypeITF14Code" : kCodeTypeITF,
                           @"AVMetadataObjectTypeDataMatrixCode" : kCodeTypeDataMatrix,
                           };
#pragma clang diagnostic pop
    });

    return barcodeFormats[barcodeType];
}

- (ALScanMode)scanModeFromString:(NSString *)scanMode {
    NSDictionary<NSString *, NSNumber *> *scanModes = [self scanModesDict];

    return [scanModes[scanMode] integerValue];
}

- (NSString *)stringFromScanMode:(ALScanMode)scanMode {
    NSDictionary<NSString *, NSNumber *> *scanModes = [self scanModesDict];

    return [scanModes allKeysForObject:@(scanMode)][0];
}

- (NSDictionary<NSString *, NSNumber *> *)scanModesDict {
    static NSDictionary<NSString *, NSNumber *> * scanModes = nil;

    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        scanModes = @{
                      @"AUTO_ANALOG_DIGITAL_METER" : @(ALAutoAnalogDigitalMeter),
                      @"ANALOG_METER" : @(ALAnalogMeter),
                      @"DIAL_METER" : @(ALDialMeter),
                      @"BARCODE" : @(ALBarcode),
                      @"SERIAL_NUMBER" : @(ALSerialNumber),
                      @"DIGITAL_METER" : @(ALDigitalMeter),
                      @"DOT_MATRIX_METER" : @(ALDotMatrixMeter),
                      @"HEAT_METER_4" : @(ALHeatMeter4),
                      @"HEAT_METER_5" : @(ALHeatMeter5),
                      @"HEAT_METER_6" : @(ALHeatMeter6),
                      
                      };
    });
    
    return scanModes;
}


@end
