
#import <React/RCTEventEmitter.h>
#import <React/RCTBridge.h>
#import "AnylineSDKPlugin.h"
#import "NativeView/NativeViewRegistry.h"
#import "RCTUtils.h"

// Static instance to retain the ALWrapperSessionProvider instance
static ALWrapperSessionProvider *_wrapperSessionProvider;
// We're creating a static variable to store the last license used to initialize the SDK
static NSString *license;

static NSString *scanViewConfigPathString;

@interface AnylineSDKPlugin()

@property (nonatomic, copy) NSString *callbackId;

@property (nonatomic, copy) NSString *config;

@property (nonatomic, copy) NSString *returnMethod;

@property (nonatomic, strong) RCTPromiseResolveBlock wrapperSessionSdkInitializationResponsePromiseResolve;
@property (nonatomic, strong) RCTPromiseRejectBlock wrapperSessionSdkInitializationResponsePromiseReject;

@property (nonatomic, strong) RCTPromiseResolveBlock wrapperSessionScanResponsePromiseResolve;
@property (nonatomic, strong) RCTPromiseRejectBlock wrapperSessionScanResponsePromiseReject;

@property (nonatomic, strong) RCTResponseSenderBlock scanResponseResultCallback;
@property (nonatomic, strong) RCTResponseSenderBlock scanResponseErrorCallback;

@property (nonatomic, strong) RCTPromiseResolveBlock wrapperSessionExportCachedEventsPromiseResolve;
@property (nonatomic, strong) RCTPromiseRejectBlock wrapperSessionExportCachedEventsPromiseReject;

@property (nonatomic, strong) RCTResponseSenderBlock reportCorrectedResultResponseCallback;
@property (nonatomic, strong) RCTResponseSenderBlock reportCorrectedResultErrorCallback;

@end


@implementation AnylineSDKPlugin {
    NSMutableArray<NSString *> *supportedRTCEventsArray;
}

- (instancetype)init {
    self = [super initWithDisabledObservation];
    if (self) {
        if (!_wrapperSessionProvider) {
            // Initialize the wrapperSessionProvider static variable
            _wrapperSessionProvider = [[ALWrapperSessionProvider alloc] init];
        }
        supportedRTCEventsArray = [NSMutableArray array];
    }
    return self;
}

+ (BOOL)isInitializedWithLicenseKey:(NSString *)requestedLicense {
    ALWrapperSessionSDKInitializationResponse *currentSdkInitializationResponse = [ALWrapperSessionProvider getCurrentSdkInitializationResponse];
    return (license
            && [currentSdkInitializationResponse.initialized isEqualToNumber:@YES]
            && [license isEqualToString:requestedLicense]);
}

RCT_EXPORT_MODULE();

- (UIView *)view {
    return [[UIView alloc] initWithFrame:CGRectMake(0, 0, 0, 0)];
}

RCT_EXPORT_METHOD(getSDKVersion:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(AnylineSDK.versionNumber);
}

RCT_EXPORT_METHOD(setupWrapperSession:(NSString *)pluginVersion) {
    [self setupWrapperSessionWithPluginVersion:pluginVersion];
}

RCT_EXPORT_METHOD(setViewConfigsPath:(NSString *)path) {
    scanViewConfigPathString = path;
}

RCT_EXPORT_METHOD(setupAnylineSDK:(NSString *)licenseKey
        resolver:(RCTPromiseResolveBlock)resolve
        rejecter:(RCTPromiseRejectBlock)reject) {
    [self setupAnylineSDKWithCacheConfig:licenseKey enableOfflineCache:NO resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(setupAnylineSDKWithCacheConfig:(NSString *)licenseKey
                  enableOfflineCache:(BOOL)enableOfflineCache
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {

    self.wrapperSessionSdkInitializationResponsePromiseResolve = resolve;
    self.wrapperSessionSdkInitializationResponsePromiseReject = reject;
    self.returnMethod = @"promise";

    [self initSdkWithLicenseKey:licenseKey sdkAssetsFolder:nil enableOfflineCache:enableOfflineCache];
}

RCT_EXPORT_METHOD(isInitialized:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    ALWrapperSessionSDKInitializationResponse *currentSdkInitializationResponse = [ALWrapperSessionProvider getCurrentSdkInitializationResponse];
    BOOL isInitialized = ([currentSdkInitializationResponse.initialized isEqualToNumber:@YES]);
    resolve(@(isInitialized));
}

RCT_EXPORT_METHOD(licenseKeyExpiryDate:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    ALWrapperSessionSDKInitializationResponse *currentSdkInitializationResponse = [ALWrapperSessionProvider getCurrentSdkInitializationResponse];
    if ([currentSdkInitializationResponse.initialized isEqualToNumber:@YES]) {
        ALWrapperSessionSDKInitializationResponseInitialized *sdkInitializationResponseInitialized = currentSdkInitializationResponse.succeedInfo;
        if (sdkInitializationResponseInitialized) {
            resolve(sdkInitializationResponseInitialized.expiryDate);
            return;
        }
    }
    // not `reject`, as this will require the method to be used in a try-catch
    resolve(nil);
    return;
}

RCT_EXPORT_METHOD(setDefaultScanStartPlatformOptions:(nullable NSString *)scanStartPlatformOptionsString
                                            resolver:(RCTPromiseResolveBlock)resolve
                                            rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        [ALWrapperSessionProvider setDefaultScanStartPlatformOptionsWithString:scanStartPlatformOptionsString];
        resolve(@"");
    }
    @catch (NSException *exception) {
        reject(@"ANYLINE_ERROR", exception.reason, nil);
    }
}

// Deprecated
RCT_EXPORT_METHOD(setupScanViewWithConfigJson:(NSString *)config scanMode:(NSString *)scanMode onResultCallback:(RCTResponseSenderBlock)onResult onErrorCallback:(RCTResponseSenderBlock)onError) {
    [self setupWithInitializationParameters:nil config:config scanMode:scanMode onResultCallback:onResult onErrorCallback:onError];
}

RCT_EXPORT_METHOD(setup:(NSString *)config scanMode:(NSString *)scanMode onResultCallback:(RCTResponseSenderBlock)onResult onErrorCallback:(RCTResponseSenderBlock)onError) {
    [self setupWithInitializationParameters:nil config:config scanMode:scanMode onResultCallback:onResult onErrorCallback:onError];
}

RCT_EXPORT_METHOD(setupWithInitializationParameters:(NSString * _Nullable)initializationParametersStr config:(NSString *)config scanMode:(NSString *)scanMode onResultCallback:(RCTResponseSenderBlock)onResult onErrorCallback:(RCTResponseSenderBlock)onError) {
    self.scanResponseResultCallback = onResult;
    self.scanResponseErrorCallback = onError;
    self.returnMethod = @"callback";

    [self requestScanStartWithScanViewConfigContent:config
             scanViewInitializationParametersString:initializationParametersStr
                                 scanViewConfigPath:scanViewConfigPathString
                           scanCallbackConfigString:nil];
}

RCT_EXPORT_METHOD(setupPromise:(NSString *)config scanMode:(NSString *)scanMode resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    [self setupPromiseWithInitializationParameters:nil config:config scanMode:scanMode resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(setupPromiseWithInitializationParameters:(NSString * _Nullable)initializationParametersStr
                  config:(NSString *)configStr
                  scanMode:(NSString *)scanMode
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    [self setupPromiseWithInitializationParametersAndScanCallbackConfig:initializationParametersStr
                                                                 config:configStr
                                                               scanMode:scanMode
                                               scanCallbackConfigString:nil
                                                               resolver:resolve
                                                               rejecter:reject];
}

RCT_EXPORT_METHOD(setupPromiseWithScanCallbackConfig:(NSString *)configStr
                  scanMode:(NSString *)scanMode
                  scanCallbackConfigString:(NSString *)scanCallbackConfigString
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    [self setupPromiseWithInitializationParametersAndScanCallbackConfig:nil
                                                                 config:configStr
                                                               scanMode:scanMode
                                               scanCallbackConfigString:scanCallbackConfigString
                                                               resolver:resolve
                                                               rejecter:reject];
}

RCT_EXPORT_METHOD(setupPromiseWithInitializationParametersAndScanCallbackConfig:(NSString * _Nullable)initializationParametersStr
                  config:(NSString *)configStr
                  scanMode:(NSString *)scanMode
                  scanCallbackConfigString:(NSString * _Nullable)scanCallbackConfigString
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    self.wrapperSessionScanResponsePromiseResolve = resolve;
    self.wrapperSessionScanResponsePromiseReject = reject;
    self.returnMethod = @"promise";
    [self requestScanStartWithScanViewConfigContent:configStr
             scanViewInitializationParametersString:initializationParametersStr
                                 scanViewConfigPath:scanViewConfigPathString
                           scanCallbackConfigString:scanCallbackConfigString];
}

RCT_EXPORT_METHOD(trySwitchScan:(NSString *)scanViewConfigContent) {
    [ALWrapperSessionProvider requestScanSwitchWithScanViewConfigContentString:scanViewConfigContent];
}

RCT_EXPORT_METHOD(tryStopScan:(NSString * _Nullable)scanStopRequestParams) {
    [ALWrapperSessionProvider requestScanStopWithScanStopRequestParamsString:scanStopRequestParams];
}

RCT_EXPORT_METHOD(reportCorrectedResult:(NSString *)blobKey
                        correctedResult:(NSString *)correctedResult
                       onResultCallback:(RCTResponseSenderBlock)onResult
                        onErrorCallback:(RCTResponseSenderBlock)onError) {
    self.reportCorrectedResultResponseCallback = onResult;
    self.reportCorrectedResultErrorCallback = onError;

    [self requestUCRReportWithBlobKey:blobKey correctedResult:correctedResult];
}


RCT_EXPORT_METHOD(exportCachedEvents:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    self.wrapperSessionExportCachedEventsPromiseResolve = resolve;
    self.wrapperSessionExportCachedEventsPromiseReject = reject;
    [self exportCachedEvents];
}


- (NSArray<NSString *> *)supportedEvents {
  return supportedRTCEventsArray;
}

- (void)sendEvent:(NSString *)eventName
           params:(id _Nullable) params {

    if (![supportedRTCEventsArray containsObject:eventName]) {
        [supportedRTCEventsArray addObject:eventName];
    }

    [self sendEventWithName:eventName body:params];
}

-(NSString *)bundleRootPath {
    NSString *rootPath = [[NSBundle mainBundle] bundlePath];
    return rootPath;
}

-(NSString *)bundlePathFromScanViewConfigPath:(NSString * _Nullable)scanViewConfigPath {
    //get root folder (ends with ...Runner.app)
    NSString *absoluteScanViewConfigPath = [self bundleRootPath];

    if (scanViewConfigPath) {
        //append scanViewConfigPath
        absoluteScanViewConfigPath = [absoluteScanViewConfigPath stringByAppendingPathComponent:scanViewConfigPath];
    }
    return absoluteScanViewConfigPath;
}

- (void)setupWrapperSessionWithPluginVersion:(NSString *)pluginVersion {
    // Setup wrapper session with this view controller as delegate
    ALWrapperConfig *wrapperConfig = [ALWrapperConfig reactNative:pluginVersion];
    [ALWrapperSessionProvider setupWrapperSessionWithWrapperInfo:wrapperConfig
                                            wrapperSessionClient:self];
}

- (void)initSdkWithLicenseKey:(NSString *)sdkLicenseKey
              sdkAssetsFolder: (NSString *)sdkAssetsFolder
           enableOfflineCache: (BOOL)enableOfflineCache {
    NSDictionary *wrapperSessionSdkInitializationRequestJson = [ALLegacyPluginHelper
            sdkInitializationRequestJsonWithLicenseKey:sdkLicenseKey
                                    enableOfflineCache:enableOfflineCache
                                       assetPathPrefix:sdkAssetsFolder];

    [ALWrapperSessionProvider
            requestSdkInitializationWithInitializationRequestParamsString:[wrapperSessionSdkInitializationRequestJson asJSONString]];
}

- (void)requestScanStartWithScanViewConfigContent:(NSString *)scanViewConfigContent
           scanViewInitializationParametersString:(NSString * _Nullable)scanViewInitializationParametersString
                               scanViewConfigPath:(NSString * _Nullable)scanViewConfigPath
                         scanCallbackConfigString:(NSString * _Nullable)scanCallbackConfigString {
    NSError *error;
    BOOL shouldReturnImages = true;

    ALWrapperSessionScanStartRequest *wrapperSessionScanStartRequest = [ALLegacyPluginHelper
                                        scanStartRequestWithScanViewConfigContentString:scanViewConfigContent
                                                 scanViewInitializationParametersString:scanViewInitializationParametersString
                                                                     scanViewConfigPath:[self bundlePathFromScanViewConfigPath:scanViewConfigPath]
                                                         scanResultCallbackConfigString:scanCallbackConfigString
                                                                     shouldReturnImages:shouldReturnImages
                                                                                  error:&error];
    if (error) {
        [self returnError:error];
    } else {
        NSDictionary *wrapperSessionScanStartRequestDict = [wrapperSessionScanStartRequest toJSONDictionary];
        [ALWrapperSessionProvider requestScanStartWithScanStartRequestParamsString:[wrapperSessionScanStartRequestDict asJSONString]];
    }
}

- (void)requestUCRReportWithBlobKey:(NSString *)blobKey
                    correctedResult:(NSString *)correctedResult {

    ALWrapperSessionUCRReportRequest *wrapperSessionSdkInitializationRequest = [ALLegacyPluginHelper ucrReportRequestWithBlobKey:blobKey
                                                                                  correctedResult:correctedResult];
    [ALWrapperSessionProvider requestUCRReport:wrapperSessionSdkInitializationRequest];
}

-(void)exportCachedEvents {
    [ALWrapperSessionProvider requestExportCachedEvents];
}

- (void)returnCallback:(id _Nullable)callbackObj andError:(NSError * _Nullable)error {
    NSString *resultStr;
    NSError *errorObj;
    if (error) {
            [self returnError:error];
    } else if ([NSJSONSerialization isValidJSONObject:callbackObj]) {
        resultStr = [(NSDictionary *)callbackObj toJSONStringPretty:YES error:&errorObj];
        if (errorObj) {
            [self returnError:errorObj];
        }
        [self returnSuccess:resultStr];
    } else {
        resultStr = @"callback object should be of JSON type";
        [self returnError:[NSError errorWithDomain:@"ALReactDomain" code:100 userInfo:@{NSLocalizedDescriptionKey: resultStr}]];
    }
}

- (void)returnSuccess:(NSString *)result {
    if ([self.returnMethod isEqualToString:@"callback"]) {
        self.scanResponseResultCallback(@[result]);
    } else if ([self.returnMethod isEqualToString:@"promise"]) {
        if (self.wrapperSessionScanResponsePromiseResolve) {
            self.wrapperSessionScanResponsePromiseResolve(result);
        }
        self.wrapperSessionScanResponsePromiseResolve = nil;
    }
}

- (void)returnError:(NSError *)error {
    if ([self.returnMethod isEqualToString:@"callback"]) {
        self.scanResponseErrorCallback(@[error]);
    } else if ([self.returnMethod isEqualToString:@"promise"]) {
        if (self.wrapperSessionScanResponsePromiseReject) {
            self.wrapperSessionScanResponsePromiseReject(@"ANYLINE_ERROR", error.localizedDescription, error);
        }
        self.wrapperSessionScanResponsePromiseReject = nil;
    }
}

#pragma mark - ALWrapperSessionClientDelegate

- (nullable UIViewController *)getTopViewController {
    UIViewController *topViewController = RCTPresentedViewController();
    if (!topViewController) {
        topViewController = [[UIApplication sharedApplication] keyWindow].rootViewController;
        return topViewController;
    }
    return nil;
}

- (nullable UIView *)getContainerView {
    return [[NativeViewRegistry shared] getLastOrNull];
}

- (void)onSdkInitializationResponse:(nonnull ALWrapperSessionSDKInitializationResponse *)initializationResponse {
    if ([initializationResponse.initialized isEqualToNumber:@YES]) {
        self.wrapperSessionSdkInitializationResponsePromiseResolve(@"success");
    } else {
        self.wrapperSessionSdkInitializationResponsePromiseReject(@"ANYLINE_ERROR", [[initializationResponse toJSONDictionary] asJSONString], nil);
    }
}

- (void)onScanResults:(nonnull ALWrapperSessionScanResultsResponse *)scanResultsResponse {
    ALWrapperSessionScanResultConfig *scanResultConfig = scanResultsResponse.scanResultConfig;
    NSArray<ALExportedScanResult *> *exportedScanResultsArray =  (NSArray<ALExportedScanResult *> *) scanResultsResponse.exportedScanResults;
    ALWrapperSessionScanResultExtraInfo *scanResultExtraInfo = scanResultsResponse.scanResultExtraInfo;

    NSError *error;
    NSString *resultsWithImagePathString = [ALLegacyPluginHelper scanResultsWithImagePathFromExportedScanResults:exportedScanResultsArray
                                                                                                          viewPluginType:scanResultExtraInfo.viewPluginType
                                                                                                                   error:&error];

    if (scanResultConfig.callbackConfig && scanResultConfig.callbackConfig.onResultEventName) {
        [self sendEvent:scanResultConfig.callbackConfig.onResultEventName params:resultsWithImagePathString];
    } else {
        [self returnSuccess:resultsWithImagePathString];
    }
}

- (void)onScanResponse:(nonnull ALWrapperSessionScanResponse *)scanResponse {
    if (scanResponse.status == ALWrapperSessionScanResponseStatus.scanSucceeded) {
        ALWrapperSessionScanResultConfig *scanResultConfig = scanResponse.scanResultConfig;
        if (scanResultConfig.callbackConfig && scanResultConfig.callbackConfig.onResultEventName) {
            [self returnSuccess:@""];
        }
    } else if (scanResponse.status == ALWrapperSessionScanResponseStatus.scanFailed) {
        [self returnError:[NSError errorWithDomain:@"ALReactDomain" code:100 userInfo:@{NSLocalizedDescriptionKey: scanResponse.failInfo.lastError}]];
    } else if (scanResponse.status == ALWrapperSessionScanResponseStatus.scanAborted) {
        [self returnError:[NSError errorWithDomain:@"ALReactDomain" code:100 userInfo:@{NSLocalizedDescriptionKey: @"Canceled"}]];
    }
}

- (void)onUIElementClicked:(nonnull ALWrapperSessionScanResultConfig *)scanResultConfig
        uiFeedbackElementConfig:(nonnull ALUIFeedbackElementConfig *)uiFeedbackElementConfig {
    if (scanResultConfig.callbackConfig && scanResultConfig.callbackConfig.onUIElementClickedEventName) {
        [self sendEvent:scanResultConfig.callbackConfig.onUIElementClickedEventName
                 params:uiFeedbackElementConfig];
    }
}

- (void)onUCRReportResponse:(nonnull ALWrapperSessionUCRReportResponse *)ucrReportResponse {
    if (ucrReportResponse.status == ALWrapperSessionUCRReportResponseStatus.ucrReportSucceeded) {
        ALWrapperSessionUCRReportResponseSucceed *ucrReportSucceed = ucrReportResponse.succeedInfo;
        if (self.reportCorrectedResultResponseCallback) {
            self.reportCorrectedResultResponseCallback(@[ucrReportSucceed.message]);
        }
    } else {
        ALWrapperSessionUCRReportResponseFail *ucrReportFail = ucrReportResponse.failInfo;
        if (self.reportCorrectedResultErrorCallback) {
            self.reportCorrectedResultErrorCallback(@[ucrReportFail.lastError]);
        }
    }
}

- (void)onExportCachedEventsResponse:(nonnull ALWrapperSessionExportCachedEventsResponse *)exportCachedEventsResponse {
    if (exportCachedEventsResponse.status == ALWrapperSessionExportCachedEventsResponseStatus.exportSucceeded) {
        ALWrapperSessionExportCachedEventsResponseSucceed *exportCachedEventsSucceed = exportCachedEventsResponse.succeedInfo;
        if (self.wrapperSessionExportCachedEventsPromiseResolve) {
            self.wrapperSessionExportCachedEventsPromiseResolve(@[exportCachedEventsSucceed.exportedFile]);
        }
    } else {
        ALWrapperSessionExportCachedEventsResponseFail *exportCachedEventsFail = exportCachedEventsResponse.failInfo;
        if (self.wrapperSessionExportCachedEventsPromiseReject) {
            self.wrapperSessionExportCachedEventsPromiseReject(@"ANYLINE_ERROR", exportCachedEventsFail.lastError, nil);
        }
    }
}

@end
