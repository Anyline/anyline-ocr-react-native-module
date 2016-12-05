
#import "AnylineEnergyScanViewController.h"
#import <Anyline/Anyline.h>

@interface AnylineEnergyScanViewController ()<AnylineEnergyModuleDelegate, AnylineNativeBarcodeDelegate>

@property (nonatomic, strong) UISegmentedControl *segment;

@end

@implementation AnylineEnergyScanViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    dispatch_async(dispatch_get_main_queue(), ^{
        AnylineEnergyModuleView *energyModuleView = [[AnylineEnergyModuleView alloc] initWithFrame:self.view.bounds];
        
        NSError *error = nil;
        [energyModuleView setupWithLicenseKey:self.key delegate:self error:&error];
//        if(!success) {
//            UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Setup failed:" message:error.debugDescription delegate:self cancelButtonTitle:@"Ok" otherButtonTitles:nil];
//            [alert show];
//        }
        
        energyModuleView.currentConfiguration = self.conf;
      
        [energyModuleView setScanMode:self.scanMode error:nil];
        [energyModuleView.videoView setBarcodeDelegate:self];
      
        self.moduleView = energyModuleView;
        [self.view addSubview:self.moduleView];
        
        [self.view sendSubviewToBack:self.moduleView];
        
        self.segment = [[UISegmentedControl alloc] initWithItems:self.jsonConfig.segmentTitles];
        
        self.segment.tintColor = self.jsonConfig.segmentTintColor;
        self.segment.hidden = YES;
        
        NSInteger index = [self.jsonConfig.segmentModes indexOfObject:[self stringFromScanMode:self.scanMode]];
        [self.segment setSelectedSegmentIndex:index];
        
        [self.segment addTarget:self action:@selector(segmentChange:) forControlEvents:UIControlEventValueChanged];
        
        [self.view addSubview:self.segment];
    });
}

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    
    self.segment.frame = CGRectMake(self.moduleView.cutoutRect.origin.x + self.jsonConfig.segmentXPositionOffset/2,
                                    self.moduleView.cutoutRect.origin.y + self.jsonConfig.segmentYPositionOffset/2,
                                    self.view.frame.size.width - 2*(self.moduleView.cutoutRect.origin.x + self.jsonConfig.segmentXPositionOffset/2),
                                    self.segment.frame.size.height);
    self.segment.hidden = NO;
    
}

#pragma mark - AnylineEnergyModuleDelegate method

- (void)anylineEnergyModuleView:(AnylineEnergyModuleView *)anylineEnergyModuleView
              didFindScanResult:(NSString *)scanResult
                      cropImage:(UIImage *)image
                      fullImage:(UIImage *)fullImage
                         inMode:(ALScanMode)scanMode {
    self.scannedLabel.text = scanResult;
    
    NSMutableDictionary *dictResult = [NSMutableDictionary dictionaryWithCapacity:4];
    
    switch (scanMode) {
        case ALGasMeter:
            [dictResult setObject:@"Gas Meter" forKey:@"meterType"];
            break;
        case ALWaterMeterBlackBackground:
        case ALWaterMeterWhiteBackground:
            [dictResult setObject:@"Water Meter" forKey:@"meterType"];
            break;
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
        case ALElectricMeter:
        case ALElectricMeter5_1:
        case ALElectricMeter6_1:
            [dictResult setObject:@"Electric Meter" forKey:@"meterType"];
            break;
        default:
            [dictResult setObject:@"Analog Meter" forKey:@"meterType"];
            break;
    }
    [dictResult setObject:[self stringFromScanMode:scanMode] forKey:@"scanMode"];
  
    [dictResult setObject:scanResult forKey:@"reading"];
    
    NSString *imagePath = [self saveImageToFileSystem:image];

    [dictResult setValue:imagePath forKey:@"imagePath"];

    [dictResult setValue:[self base64StringFromImage:image] forKey:@"cutoutBase64"];
    
    NSString *fullImagePath = [self saveImageToFileSystem:fullImage];
    [dictResult setValue:fullImagePath forKey:@"fullImagePath"];
  
    [dictResult setValue:[self base64StringFromImage:fullImage] forKey:@"fullImageBase64"];
  
    [dictResult setValue:self.barcodeResult forKey:@"barcodeResult"];
  
    [self.delegate anylineBaseScanViewController:self didScan:dictResult continueScanning:!self.moduleView.cancelOnResult];
    
    if (self.moduleView.cancelOnResult) {
        [self dismissViewControllerAnimated:YES completion:NULL];
    }
}

#pragma mark - AnylineNativeBarcodeDelegate method

- (void)anylineVideoView:(AnylineVideoView *)videoView didFindBarcodeResult:(NSString *)scanResult type:(NSString *)barcodeType {
  dispatch_async(dispatch_get_main_queue(), ^{
    self.barcodeResult = scanResult;
  });
}

#pragma mark - IBActions
    
- (IBAction)segmentChange:(id)sender {
    NSString *modeString = self.jsonConfig.segmentModes[((UISegmentedControl *)sender).selectedSegmentIndex];
    ALScanMode scanMode = [self scanModeFromString:modeString];
    ((AnylineEnergyModuleView *)self.moduleView).scanMode = scanMode;
    
    self.moduleView.currentConfiguration = self.conf;
}
    
#pragma mark - Private Methods
    
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
                      @"ANALOG_METER" : @(ALAnalogMeter),
                      @"ELECTRIC_METER" : @(ALElectricMeter),
                      @"ELECTRIC_METER_5_1" : @(ALElectricMeter5_1),
                      @"ELECTRIC_METER_6_1" : @(ALElectricMeter6_1),
                      @"ANALOG_METER_WHITE" : @(ALAnalogMeterWhite),
                      @"ANALOG_METER_4" : @(ALAnalogMeter4),
                      @"ANALOG_METER_7" : @(ALAnalogMeter7),
                      @"GAS_METER" : @(ALGasMeter),
                      @"GAS_METER_6" : @(ALGasMeter6),
                      @"BARCODE" : @(ALBarcode),
                      @"SERIAL_NUMBER" : @(ALSerialNumber),
                      @"WATER_METER_BLACK" : @(ALWaterMeterBlackBackground),
                      @"WATER_METER_WHITE" : @(ALWaterMeterWhiteBackground),
                      @"DIGITAL_METER" : @(ALDigitalMeter),
                      @"HEAT_METER_4" : @(ALHeatMeter4),
                      @"HEAT_METER_5" : @(ALHeatMeter5),
                      @"HEAT_METER_6" : @(ALHeatMeter6),
                      };
    });

    return scanModes;
}



@end
