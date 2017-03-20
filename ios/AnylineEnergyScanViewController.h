
#import <UIKit/UIKit.h>
#import "AnylineBaseScanViewController.h"

@interface AnylineEnergyScanViewController : AnylineBaseScanViewController

@property (nonatomic) ALScanMode scanMode;

@property (nonatomic) NSString* barcodeResult;
@property (nonatomic, assign) BOOL nativeBarcodeEnabled;

@end
