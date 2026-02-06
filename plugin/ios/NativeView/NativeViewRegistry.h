#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface NativeViewRegistry : NSObject

+ (instancetype)shared;
- (void)registerView:(UIView *)view withId:(NSString *)viewId;
- (UIView *)getViewById:(NSString *)viewId;
- (UIView *)getLastOrNull;

@end
