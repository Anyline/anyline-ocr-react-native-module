#import "ALJSONUIConfiguration.h"
#import "ALRoundedView.h"

NS_ASSUME_NONNULL_BEGIN

@class ALPluginConfig;

typedef void (^ALPluginCallback)(id _Nullable callbackObj, NSString * _Nullable errorString);


@interface ALPluginHelper : NSObject

+ (void)startScan:(NSDictionary *)config finished:(ALPluginCallback)callback;

+ (NSString *)saveImageToFileSystem:(UIImage *)image;

+ (NSString *)saveImageToFileSystem:(UIImage *)image
                 compressionQuality:(CGFloat)compressionQuality;

+ (NSString * _Nullable)applicationCachePath;

+ (UILabel *)createLabelForView:(UIView *)view;

+ (UIButton *)createButtonForViewController:(UIViewController *)viewController
                                     config:(ALJSONUIConfiguration *)config;

+ (ALRoundedView *)createRoundedViewForViewController:(UIViewController *)viewController;

+ (UISegmentedControl * _Nullable)createSegmentForViewController:(UIViewController *)viewController
                                                          config:(ALJSONUIConfiguration *)config
                                                 initialScanMode:(NSString *)scanMode;


+ (void)showErrorAlertWithTitle:(NSString *)title
                        message:(NSString *)message
       presentingViewController:(UIViewController *)presentingViewController;

+ (BOOL)showErrorAlertIfNeeded:(NSError *)error pluginCallback:(ALPluginCallback)callback;

+ (NSError *)errorWithMessage:(NSString *)message;

+ (NSDate *)formattedStringToDate:(NSString *)formattedStr;

+ (NSString *)stringForDate:(NSDate *)date;

+ (NSString * _Nullable)confPropKeyWithScanModeForPluginConfig:(ALPluginConfig *)pluginConfig;

@end

NS_ASSUME_NONNULL_END
