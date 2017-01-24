
#import "AnylineBarcodeScanViewController.h"
#import <Anyline/Anyline.h>

@interface AnylineBarcodeScanViewController ()<AnylineBarcodeModuleDelegate>

@end

@implementation AnylineBarcodeScanViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    dispatch_async(dispatch_get_main_queue(), ^{
        AnylineBarcodeModuleView *barcodeModuleView = [[AnylineBarcodeModuleView alloc] initWithFrame:self.view.bounds];
        barcodeModuleView.currentConfiguration = self.conf;
        
        NSError *error = nil;
        [barcodeModuleView setupWithLicenseKey:self.key delegate:self error:&error];
//        if(!success) {
//            UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Setup failed:" message:error.debugDescription delegate:self cancelButtonTitle:@"Ok" otherButtonTitles:nil];
//            [alert show];
//        }
        
        self.moduleView = barcodeModuleView;
        
        [self.view addSubview:self.moduleView];
        
        [self.view sendSubviewToBack:self.moduleView];
    });
}

#pragma mark - AnylineBarcodeModuleDelegate method


- (void)anylineBarcodeModuleView:(AnylineBarcodeModuleView *)anylineBarcodeModuleView
               didFindScanResult:(NSString *)scanResult
               withBarcodeFormat:(ALBarcodeFormat)barcodeFormat
                         atImage:(UIImage *)image {
    self.scannedLabel.text = scanResult;
    [self flashResultFor:0.9];

    NSMutableDictionary *dictResult = [NSMutableDictionary dictionaryWithCapacity:2];

    [dictResult setObject:scanResult forKey:@"value"];
    [dictResult setObject:@(barcodeFormat) forKey:@"barcodeFormat"];

    NSString *imagePath = [self saveImageToFileSystem:image];

    [dictResult setValue:imagePath forKey:@"imagePath"];
    [dictResult setValue:[self base64StringFromImage:image] forKey:@"cutoutBase64"];
  
    [self.delegate anylineBaseScanViewController:self
                                         didScan:dictResult
                                continueScanning:!self.moduleView.cancelOnResult];
    if (self.moduleView.cancelOnResult) {
        [self dismissViewControllerAnimated:YES completion:NULL];
    }
}

@end
