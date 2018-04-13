
#import "AnylineMRZScanViewController.h"
#import <Anyline/Anyline.h>

@interface AnylineMRZScanViewController ()<AnylineMRZModuleDelegate>

@property (nonatomic, strong) UILabel *label;

@end

@implementation AnylineMRZScanViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    AnylineMRZModuleView *mrzModuleView = [[AnylineMRZModuleView alloc] initWithFrame:self.view.bounds];

    NSError *error = nil;
    [mrzModuleView setupWithLicenseKey:self.key delegate:self error:&error];

    // Set strictMode to MRZView
    [mrzModuleView setStrictMode:self.strictMode];

    mrzModuleView.currentConfiguration = self.conf;

    self.moduleView = mrzModuleView;

    [self.view addSubview:self.moduleView];

    // Add Label
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
}

#pragma mark - AnylineMRZModuleDelegate method


-(void)anylineMRZModuleView:(AnylineMRZModuleView *)anylineMRZModuleView didFindResult:(ALMRZResult *)scanResult {
    
    
    NSMutableDictionary *scanResultDict = [[scanResult.result dictionaryWithValuesForKeys:@[@"documentType",
                                                                                            @"nationalityCountryCode",
                                                                                            @"issuingCountryCode",
                                                                                            @"surNames",
                                                                                            @"givenNames",
                                                                                            @"documentNumber",
                                                                                            @"checkdigitNumber",
                                                                                            @"dayOfBirth",
                                                                                            @"checkdigitDayOfBirth",
                                                                                            @"sex",
                                                                                            @"expirationDate",
                                                                                            @"checkdigitExpirationDate",
                                                                                            @"personalNumber",
                                                                                            @"checkDigitPersonalNumber",
                                                                                            @"checkdigitFinal"]] mutableCopy];
    self.scannedLabel.text = scanResultDict.description;
    
    NSString *imagePath = [self saveImageToFileSystem:scanResult.image];
    NSString *fullImagePath = [self saveImageToFileSystem:scanResult.fullImage];

    [scanResultDict setValue:imagePath forKey:@"imagePath"];
    [scanResultDict setValue:fullImagePath forKey:@"fullImagePath"];

    [scanResultDict setValue:@(scanResult.allCheckDigitsValid) forKey:@"allCheckDigitsValid"];
    
    

    
    [scanResultDict setValue:@(scanResult.confidence) forKey:@"confidence"];
    [scanResultDict setValue:[self stringForOutline:scanResult.outline] forKey:@"outline"];
    
    [self.delegate anylineBaseScanViewController:self didScan:scanResultDict continueScanning:!self.moduleView.cancelOnResult];
    
    if (self.moduleView.cancelOnResult) {
        [self dismissViewControllerAnimated:YES completion:NULL];
    }
}

@end
