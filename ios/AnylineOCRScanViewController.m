//
//  AnylineOCRScanViewController.m
//  HelloCordova
//
//  Created by Daniel Albertini on 30/03/16.
//
//

#import "AnylineOCRScanViewController.h"
#import <Anyline/Anyline.h>

@interface AnylineOCRScanViewController ()<AnylineOCRModuleDelegate>

@property (nonatomic, assign) BOOL drawTextOutline;

@end

@implementation AnylineOCRScanViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    AnylineOCRModuleView *ocrModuleView = [[AnylineOCRModuleView alloc] initWithFrame:self.view.bounds];
    ocrModuleView.currentConfiguration = self.conf;

    ALOCRConfig *ocrConf = [[ALOCRConfig alloc] initWithJsonDictionary:self.ocrConfDict];

    self.drawTextOutline = [[self.ocrConfDict objectForKey:@"drawTextOutline"] boolValue];

    NSArray *tesseractArray = [self.ocrConfDict objectForKey:@"traineddataFiles"];

    NSMutableArray<NSString *> *languages = [NSMutableArray arrayWithCapacity:tesseractArray.count];
    for (NSString *tesseractLang in tesseractArray) {
        NSString *ressourcePath = [[NSBundle mainBundle] pathForResource:[[tesseractLang lastPathComponent] stringByDeletingPathExtension] ofType:[[tesseractLang lastPathComponent] pathExtension] inDirectory:[NSString stringWithFormat:@"%@",[tesseractLang stringByDeletingLastPathComponent]]];
        NSError *copyError = nil;
        [ocrModuleView copyTrainedData:ressourcePath fileHash:nil error:&copyError];
        [languages addObject:[[tesseractLang lastPathComponent] stringByDeletingPathExtension]];
    }
    ocrConf.tesseractLanguages = languages;
    NSError *error = nil;
    [ocrModuleView setupWithLicenseKey:self.key delegate:self ocrConfig:ocrConf error:&error];
    //        if(!success) {
    //            UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Setup failed:" message:error.debugDescription delegate:self cancelButtonTitle:@"Ok" otherButtonTitles:nil];
    //            [alert show];
    //        }

    self.moduleView = ocrModuleView;

    [self.view addSubview:self.moduleView];

    [self.view sendSubviewToBack:self.moduleView];

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
