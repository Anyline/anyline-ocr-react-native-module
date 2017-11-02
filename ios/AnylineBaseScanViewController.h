
#import <UIKit/UIKit.h>

#import <Anyline/Anyline.h>
#import "ALJsonUIConfiguration.h"

@protocol AnylineBaseScanViewControllerDelegate;

@interface AnylineBaseScanViewController : UIViewController

@property (nonatomic,strong) UILabel *scannedLabel;

@property (nonatomic, strong) ALUIConfiguration *conf;
@property (nonatomic, strong) AnylineAbstractModuleView *moduleView;
@property (nonatomic, weak) id<AnylineBaseScanViewControllerDelegate> delegate;
@property (nonatomic, strong) NSString *key;
@property (nonatomic, strong) ALJsonUIConfiguration *jsonConfig;

-(instancetype)initWithKey:(NSString*)key configuration:(ALUIConfiguration *)conf jsonConfiguration:(ALJsonUIConfiguration*)jsonConf delegate:(id<AnylineBaseScanViewControllerDelegate>)delegate;

- (NSString *)saveImageToFileSystem:(UIImage *)image;

- (NSString *)saveImageToFileSystem:(UIImage *)image compressionQuality:(CGFloat)compressionQuality;

- (void)flashResultFor:(NSTimeInterval) duration;

- (NSString *)stringForOutline:(ALSquare *)square;

@end

@protocol AnylineBaseScanViewControllerDelegate <NSObject>

@required

- (void)anylineBaseScanViewController:(AnylineBaseScanViewController *)baseScanViewController
                              didScan:(id)scanResult
                     continueScanning:(BOOL)continueScanning;

-(void)anylineBaseScanViewController:(AnylineBaseScanViewController *)baseScanViewController didStopScanning:(id)sender;
@end
