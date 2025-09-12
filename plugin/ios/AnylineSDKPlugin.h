
#import <Foundation/Foundation.h>
#import <Anyline/Anyline.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTBridgeModule.h>

@interface AnylineSDKPlugin : RCTEventEmitter <RCTBridgeModule, ALWrapperSessionClientDelegate>

@end
