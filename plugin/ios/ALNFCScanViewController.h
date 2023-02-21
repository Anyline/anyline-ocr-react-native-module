#import "ALPluginScanViewController.h"
#import "ALJSONUIConfiguration.h"

NS_ASSUME_NONNULL_BEGIN

@interface ALNFCScanViewController : UIViewController

- (instancetype)initWithLicensekey:(NSString *)licensekey
                     configuration:(NSDictionary *)anylineConfig
                          uiConfig:(ALJSONUIConfiguration *)uiConfig
                          finished:(ALPluginCallback)callback;
@end

NS_ASSUME_NONNULL_END
