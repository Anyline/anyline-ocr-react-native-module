//
//  AnylineOCRScanViewController.m
//
//  Created by Daniel Albertini on 30/03/16.
//
//

#import "AnylineOCRScanViewController.h"
#import <Anyline/Anyline.h>

@interface AnylineOCRScanViewController ()<AnylineOCRModuleDelegate>

@property (nonatomic, assign) BOOL drawTextOutline;
@property (nonatomic, strong) UILabel *label;


@end

@implementation AnylineOCRScanViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    AnylineOCRModuleView *ocrModuleView = [[AnylineOCRModuleView alloc] initWithFrame:self.view.bounds];

    ALOCRConfig *ocrConf = [[ALOCRConfig alloc] initWithJsonDictionary:self.ocrConfDict];

    if ([self.ocrConfDict objectForKey:@"aleFile"]) {
        NSString *aleDirectoryPath = [[self.ocrConfDict objectForKey:@"aleFile"] stringByDeletingLastPathComponent];
        NSString *pathResource = [[[self.ocrConfDict objectForKey:@"aleFile"] lastPathComponent] stringByDeletingPathExtension];
        ocrConf.customCmdFilePath = [[NSBundle mainBundle] pathForResource:[[[self.ocrConfDict objectForKey:@"aleFile"] lastPathComponent] stringByDeletingPathExtension] ofType:@"ale" inDirectory:aleDirectoryPath];
    }


    self.drawTextOutline = [[self.ocrConfDict objectForKey:@"drawTextOutline"] boolValue];

    NSArray *tesseractArray = [self.ocrConfDict objectForKey:@"traineddataFiles"];

    NSMutableArray<NSString *> *languages = [NSMutableArray arrayWithCapacity:tesseractArray.count];
    for (NSString *tesseractLang in tesseractArray) {
        NSString *ressourcePath = [[NSBundle mainBundle] pathForResource:[[tesseractLang lastPathComponent] stringByDeletingPathExtension] ofType:[[tesseractLang lastPathComponent] pathExtension] inDirectory:[NSString stringWithFormat:@"%@",[tesseractLang stringByDeletingLastPathComponent]]];
        [languages addObject:ressourcePath];
    }
    ocrConf.languages = languages;
    NSError *error = nil;
    [ocrModuleView setupWithLicenseKey:self.key delegate:self ocrConfig:ocrConf error:&error];
    //        if(!success) {
    //            UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Setup failed:" message:error.debugDescription delegate:self cancelButtonTitle:@"Ok" otherButtonTitles:nil];
    //            [alert show];
    //        }


    ocrModuleView.currentConfiguration = self.conf;

    self.moduleView = ocrModuleView;

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
}

#pragma mark - AnylineEnergyModuleDelegate method

- (void)anylineOCRModuleView:(AnylineOCRModuleView *)anylineOCRModuleView
               didFindResult:(ALOCRResult *)result {

    NSMutableDictionary *dictResult = [NSMutableDictionary dictionaryWithCapacity:4];
    
    [dictResult setObject:result.result forKey:@"text"];
    
    NSString *imagePath = [self saveImageToFileSystem:result.image];
    
    [dictResult setValue:imagePath forKey:@"imagePath"];
    
    [dictResult setValue:@(result.confidence) forKey:@"confidence"];
    [dictResult setValue:[self stringForOutline:result.outline] forKey:@"outline"];
    
    [self.delegate anylineBaseScanViewController:self didScan:dictResult continueScanning:!self.moduleView.cancelOnResult];
    
    if (self.moduleView.cancelOnResult) {
        [self dismissViewControllerAnimated:YES completion:NULL];
    }
}

- (BOOL)anylineOCRModuleView:(AnylineOCRModuleView *)anylineOCRModuleView
         textOutlineDetected:(ALSquare *)outline {
    return !self.drawTextOutline;
}


@end
