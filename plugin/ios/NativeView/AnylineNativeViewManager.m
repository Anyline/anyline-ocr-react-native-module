#import "AnylineNativeViewManager.h"
#import "NativeViewRegistry.h"
#import <React/RCTUtils.h>
#import <UIKit/UIKit.h>

@implementation AnylineNativeViewManager

RCT_EXPORT_MODULE()

- (UIView *)view {
  UIView *containerView = [[UIView alloc] init];

  NSString *containerId = [NSString stringWithFormat:@"%d", 0];
  [[NativeViewRegistry shared] registerView:containerView withId:containerId];

  UIViewController *vc = [[UIViewController alloc] init];
  vc.view.frame = containerView.bounds;
  vc.view.backgroundColor = [UIColor lightGrayColor];

  // Scene-based hosts have no delegate.window; RCTKeyWindow() goes through the window scene
  UIViewController *rootVC = RCTKeyWindow().rootViewController;
  [rootVC addChildViewController:vc];
  [containerView addSubview:vc.view];
  [vc didMoveToParentViewController:rootVC];

  return containerView;
}

@end
