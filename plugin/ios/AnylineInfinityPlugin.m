
#import <React/RCTEventEmitter.h>
#import <React/RCTBridge.h>
#import "AnylineInfinityPlugin.h"
#import "NativeView/NativeViewRegistry.h"
#import "RCTUtils.h"

// Static instance to retain the ALWrapperSessionProvider reference.
static ALWrapperSessionProvider *_infinityWrapperSessionProvider;

static NSString * const kEventOnScanResults = @"INFINITY_ON_SCAN_RESULTS";
static NSString * const kEventOnUiElementClicked = @"INFINITY_ON_UI_ELEMENT_CLICKED";

@interface AnylineInfinityPlugin ()

@property (nonatomic, strong) RCTPromiseResolveBlock sdkInitializationResolve;
@property (nonatomic, strong) RCTPromiseRejectBlock sdkInitializationReject;

@property (nonatomic, strong) RCTPromiseResolveBlock scanResponseResolve;
@property (nonatomic, strong) RCTPromiseRejectBlock scanResponseReject;

@property (nonatomic, strong) RCTPromiseResolveBlock ucrReportResolve;
@property (nonatomic, strong) RCTPromiseRejectBlock ucrReportReject;

@property (nonatomic, strong) RCTPromiseResolveBlock exportCachedEventsResolve;
@property (nonatomic, strong) RCTPromiseRejectBlock exportCachedEventsReject;

@end

@implementation AnylineInfinityPlugin

- (instancetype)init {
    self = [super initWithDisabledObservation];
    if (self && !_infinityWrapperSessionProvider) {
        _infinityWrapperSessionProvider = [[ALWrapperSessionProvider alloc] init];
    }
    return self;
}

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents {
    return @[kEventOnScanResults, kEventOnUiElementClicked];
}

RCT_EXPORT_METHOD(getSDKVersion:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(AnylineSDK.versionNumber);
}

RCT_EXPORT_METHOD(setupWrapperSession:(NSString *)pluginVersion) {
    ALWrapperConfig *wrapperConfig = [ALWrapperConfig reactNative:pluginVersion codename:ALWrapperCodenameInfinity];
    [ALWrapperSessionProvider setupWrapperSessionWithWrapperInfo:wrapperConfig
                                            wrapperSessionClient:self];
}

RCT_EXPORT_METHOD(requestSdkInitialization:(NSString *)request
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    self.sdkInitializationResolve = resolve;
    self.sdkInitializationReject = reject;
    [ALWrapperSessionProvider
        requestSdkInitializationWithInitializationRequestParamsString:request];
}

RCT_EXPORT_METHOD(requestScanStart:(NSString *)request
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    self.scanResponseResolve = resolve;
    self.scanResponseReject = reject;
    [ALWrapperSessionProvider requestScanStartWithScanStartRequestParamsString:[self resolvedScanStartRequestJsonString:request]];
}

RCT_EXPORT_METHOD(requestScanSwitchWithScanStartRequestParams:(NSString *)request) {
    [ALWrapperSessionProvider requestScanSwitchWithScanStartRequestParamsString:[self resolvedScanStartRequestJsonString:request]];
}

RCT_EXPORT_METHOD(requestScanSwitchWithScanViewConfigContentString:(NSString *)request) {
    [ALWrapperSessionProvider requestScanSwitchWithScanViewConfigContentString:request];
}

RCT_EXPORT_METHOD(requestScanStop:(NSString * _Nullable)request) {
    [ALWrapperSessionProvider requestScanStopWithScanStopRequestParamsString:request];
}

RCT_EXPORT_METHOD(requestUCRReport:(NSString *)request
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    self.ucrReportResolve = resolve;
    self.ucrReportReject = reject;
    [ALWrapperSessionProvider
        requestUCRReportWithWrapperSessionUCRReportRequestString:request];
}

RCT_EXPORT_METHOD(requestExportCachedEvents:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    self.exportCachedEventsResolve = resolve;
    self.exportCachedEventsReject = reject;
    [ALWrapperSessionProvider requestExportCachedEvents];
}

-(NSString *)bundlePathFromScanViewConfigPath:(NSString * _Nullable)scanViewConfigPath {
    // Guard against NSNull from JSON deserialization when the field is absent
    if ([scanViewConfigPath isKindOfClass:[NSNull class]]) scanViewConfigPath = nil;
    NSString *absoluteScanViewConfigPath = [[NSBundle mainBundle] bundlePath];
    if (scanViewConfigPath) {
        //append scanViewConfigPath
        absoluteScanViewConfigPath = [absoluteScanViewConfigPath stringByAppendingPathComponent:scanViewConfigPath];
    }
    return absoluteScanViewConfigPath;
}

- (NSString *)resolvedScanStartRequestJsonString:(NSString *)requestJsonString {
    if (!requestJsonString) return requestJsonString;
    NSData *jsonData = [requestJsonString dataUsingEncoding:NSUTF8StringEncoding];
    NSMutableDictionary *requestDict = [[NSJSONSerialization JSONObjectWithData:jsonData options:0 error:nil] mutableCopy];
    if (!requestDict) return requestJsonString;
    NSString *scanViewConfigPath = requestDict[@"scanViewConfigPath"];
    requestDict[@"scanViewConfigPath"] = [self bundlePathFromScanViewConfigPath:scanViewConfigPath];

    NSData *fixedData = [NSJSONSerialization dataWithJSONObject:requestDict options:0 error:nil];
    return fixedData ? [[NSString alloc] initWithData:fixedData encoding:NSUTF8StringEncoding] : requestJsonString;
}

#pragma mark - ALWrapperSessionClientDelegate

- (nullable UIViewController *)getTopViewController {
    UIViewController *topViewController = RCTPresentedViewController();
    if (!topViewController) {
        for (UIScene *scene in [UIApplication sharedApplication].connectedScenes) {
            if ([scene isKindOfClass:[UIWindowScene class]] &&
                scene.activationState == UISceneActivationStateForegroundActive) {
                topViewController = ((UIWindowScene *)scene).windows.firstObject.rootViewController;
                break;
            }
        }
    }
    return topViewController;
}

- (nullable UIView *)getContainerView {
    return [[NativeViewRegistry shared] getLastOrNull];
}

- (void)onSdkInitializationResponse:(nonnull ALWrapperSessionSDKInitializationResponse *)initializationResponse {
    if (self.sdkInitializationResolve) {
        NSDictionary *dict = [initializationResponse toJSONDictionary];
        self.sdkInitializationResolve([dict asJSONString]);
        self.sdkInitializationResolve = nil;
        self.sdkInitializationReject = nil;
    }
}

- (void)onScanResults:(nonnull ALWrapperSessionScanResultsResponse *)scanResultsResponse {
    NSArray<ALExportedScanResult *> *results = (NSArray<ALExportedScanResult *> *)scanResultsResponse.exportedScanResults;
    NSMutableArray<NSDictionary *> *resultDicts = [NSMutableArray array];
    for (ALExportedScanResult *result in results) {
        [resultDicts addObject:[result toJSONDictionary]];
    }
    NSMutableDictionary *dict = [[scanResultsResponse toJSONDictionary] mutableCopy];
    dict[@"exportedScanResults"] = resultDicts;
    [self sendEventWithName:kEventOnScanResults body:[dict asJSONString]];
}

- (void)onScanResponse:(nonnull ALWrapperSessionScanResponse *)scanResponse {
    if (self.scanResponseResolve) {
        NSDictionary *dict = [scanResponse toJSONDictionary];
        self.scanResponseResolve([dict asJSONString]);
        self.scanResponseResolve = nil;
        self.scanResponseReject = nil;
    }
}

- (void)onUIElementClicked:(nonnull ALWrapperSessionScanResultConfig *)scanResultConfig
    uiFeedbackElementConfig:(nonnull ALUIFeedbackElementConfig *)uiFeedbackElementConfig {
    NSDictionary *dict = [uiFeedbackElementConfig performSelector:@selector(JSONDictionary)];
    [self sendEventWithName:kEventOnUiElementClicked body:[dict asJSONString]];
}

- (void)onUCRReportResponse:(nonnull ALWrapperSessionUCRReportResponse *)ucrReportResponse {
    if (self.ucrReportResolve) {
        NSDictionary *dict = [ucrReportResponse toJSONDictionary];
        self.ucrReportResolve([dict asJSONString]);
        self.ucrReportResolve = nil;
        self.ucrReportReject = nil;
    }
}

- (void)onExportCachedEventsResponse:(nonnull ALWrapperSessionExportCachedEventsResponse *)exportCachedEventsResponse {
    if (self.exportCachedEventsResolve) {
        NSDictionary *dict = [exportCachedEventsResponse toJSONDictionary];
        self.exportCachedEventsResolve([dict asJSONString]);
        self.exportCachedEventsResolve = nil;
        self.exportCachedEventsReject = nil;
    }
}

@end