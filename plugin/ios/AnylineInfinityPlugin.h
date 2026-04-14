
#import <Foundation/Foundation.h>
#import <Anyline/Anyline.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTBridgeModule.h>

@interface AnylineInfinityPlugin : RCTEventEmitter <RCTBridgeModule, ALWrapperSessionClientDelegate>

@end