
#import <Foundation/Foundation.h>
#import <Anyline/Anyline.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTBridgeModule.h>

__attribute__((deprecated("Use AnylineInfinityPlugin instead.")))
@interface AnylineSDKPlugin : RCTEventEmitter <RCTBridgeModule, ALWrapperSessionClientDelegate>

@end
