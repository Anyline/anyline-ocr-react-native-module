
#import "AnylineMRZScanViewController.h"
#import <Anyline/Anyline.h>
#import "ALRoundedView.h"

@interface AnylineMRZScanViewController ()<AnylineMRZModuleDelegate>

@property (nonatomic, strong) ALRoundedView *roundedView;
@property (nonatomic, assign) NSInteger showingLabel;

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

    // Set CropAndTransform to MRZView
    [mrzModuleView setCropAndTransformID:self.cropAndTransformID];

    mrzModuleView.currentConfiguration = self.conf;

    self.moduleView = mrzModuleView;
    [self.view addSubview:self.moduleView];

    // Set Error Message if set in config
    if (![self.cropAndTransformErrorMessage isEqualToString:@""]) {
        [self.moduleView setDebugDelegate:self];
        
        // This view notifies the user of any problems that occur while he is scanning
        self.roundedView = [[ALRoundedView alloc] initWithFrame:CGRectMake(20, 115, self.view.bounds.size.width - 40, 30)];
        self.roundedView.fillColor = [UIColor colorWithRed:98.0/255.0 green:39.0/255.0 blue:232.0/255.0 alpha:0.6];
        self.roundedView.textLabel.text = @"";
        self.roundedView.alpha = 0;
        self.showingLabel = 0;
        [self.view addSubview:self.roundedView];
    }
    
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
    
    NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
    [formatter setDateFormat:@"yyyy.MM.dd"];

    NSString *expirationDateObject = [formatter stringFromDate:scanResult.result.expirationDateObject];
    NSString *dayOfBirthDateObject = [formatter stringFromDate:scanResult.result.dayOfBirthDateObject];


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
    
    [scanResultDict setValue:expirationDateObject forKey:@"expirationDateObject"];
    [scanResultDict setValue:dayOfBirthDateObject forKey:@"dayOfBirthObject"];

    [scanResultDict setValue:@(scanResult.confidence) forKey:@"confidence"];
    [scanResultDict setValue:[self stringForOutline:scanResult.outline] forKey:@"outline"];
    
    [self.delegate anylineBaseScanViewController:self didScan:scanResultDict continueScanning:!self.moduleView.cancelOnResult];
    
    if (self.moduleView.cancelOnResult) {
        [self dismissViewControllerAnimated:YES completion:NULL];
    }
}

#pragma mark - AnylineControllerDelegate Methods

- (void)anylineModuleView:(AnylineAbstractModuleView *)anylineModuleView runSkipped:(ALRunFailure)runFailure {
    
    switch (runFailure) {
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

@end
