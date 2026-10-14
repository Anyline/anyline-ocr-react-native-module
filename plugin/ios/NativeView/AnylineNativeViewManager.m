#import "AnylineNativeViewManager.h"
#import "NativeViewRegistry.h"
#import <UIKit/UIKit.h>

@implementation AnylineNativeViewManager

RCT_EXPORT_MODULE()

- (UIView *)view {
  UIView *containerView = [[UIView alloc] init];
  containerView.backgroundColor = [UIColor lightGrayColor];

  NSString *containerId = [NSString stringWithFormat:@"%d", 0];
  [[NativeViewRegistry shared] registerView:containerView withId:containerId];

  return containerView;
}

@end
