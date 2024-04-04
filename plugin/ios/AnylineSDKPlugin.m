#import <Anyline/Anyline.h>
#import "AnylineSDKPlugin.h"
#import "ALJsonUIConfiguration.h"
#import "ALPluginScanViewController.h"
#import "ALPluginHelper.h"

#import "ALNFCScanViewController.h"

ALWrapperConfig *wrapperConfig = nil;

@interface AnylineSDKPlugin()

@property (nonatomic, strong) ALScanViewPluginConfig *conf;

@property (nonatomic, copy) NSString *callbackId;
@property (nonatomic, copy) NSString *appKey;
@property (nonatomic, assign) BOOL nativeBarcodeScanning;
@property (nonatomic, strong) NSDictionary *jsonConfigDictionary;
@property (nonatomic, strong) NSDictionary *ocrConfigDict;
@property (nonatomic, strong) ALJSONUIConfiguration *jsonUIConf;

@property (nonatomic, strong) RCTResponseSenderBlock onResultCallback;
@property (nonatomic, strong) RCTResponseSenderBlock onErrorCallback;

@property (nonatomic, copy) NSString *config;
@property (nonatomic, copy) NSString *licenseKey;

@property (nonatomic, copy) NSString *returnMethod;

@end


@implementation AnylineSDKPlugin {
    RCTPromiseResolveBlock _resolveBlock;
    RCTPromiseRejectBlock _rejectBlock;
}

RCT_EXPORT_MODULE();
- (UIView *)view {
    return [[UIView alloc] initWithFrame:CGRectMake(0, 0, 0, 0)];
}

// Deprecated
RCT_EXPORT_METHOD(setupScanViewWithConfigJson:(NSString *)config scanMode:(NSString *)scanMode onResultCallback:(RCTResponseSenderBlock)onResult onErrorCallback:(RCTResponseSenderBlock)onError) {
    self.onResultCallback = onResult;
    self.onErrorCallback = onError;
    self.returnMethod = @"callback";
    self.config = config;
    [self initView:scanMode];
}

RCT_EXPORT_METHOD(setup:(NSString *)config scanMode:(NSString *)scanMode onResultCallback:(RCTResponseSenderBlock)onResult onErrorCallback:(RCTResponseSenderBlock)onError) {
    self.onResultCallback = onResult;
    self.onErrorCallback = onError;
    self.returnMethod = @"callback";
    self.config = config;
    [self initView:scanMode];
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

    _resolveBlock = resolve;
    _rejectBlock = reject;
    self.returnMethod = @"promise";
    self.licenseKey = licenseKey;

    ALCacheConfig *cacheConfig = enableOfflineCache ? [ALCacheConfig offlineLicenseCachingEnabled] : nil;
    NSError *error;
    BOOL success = [AnylineSDK setupWithLicenseKey:licenseKey cacheConfig:cacheConfig wrapperConfig:wrapperConfig error:&error];

    NSString *errorString = nil;
    NSDictionary *successObj = nil;

    if (!success) {
        NSLog(@"error: %@", error.localizedDescription);
        errorString = @"Unable to initialize the Anyline SDK. Please check your license key.";
        [self returnError:errorString];
        return;
    }

    successObj = @{ @"success": @(true) };
    [self returnSuccess:@"success"];
}

RCT_EXPORT_METHOD(setupPromise:(NSString *)config scanMode:(NSString *)scanMode resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    _resolveBlock = resolve;
    _rejectBlock = reject;
    self.returnMethod = @"promise";
    self.config = config;
    [self initView:scanMode];
}

RCT_EXPORT_METHOD(getSDKVersion:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(AnylineSDK.versionNumber);
}

RCT_EXPORT_METHOD(setPluginVersion:(NSString *)pluginVersion) {
    wrapperConfig = [ALWrapperConfig reactNative:pluginVersion];
}

RCT_EXPORT_METHOD(licenseKeyExpiryDate:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    BOOL isInitialized = [[ALLicenseUtil sharedInstance] isLicenseValid];
    if (!isInitialized) {
        // not `reject`, as this will require the method to be used in a try-catch
        resolve(nil);
        return;
    }
    resolve([AnylineSDK licenseExpirationDate]);
}

RCT_EXPORT_METHOD(exportCachedEvents:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    _resolveBlock = resolve;
    _rejectBlock = reject;
    self.returnMethod = @"promise";

    NSError *error;
    NSString *exportPath = [AnylineSDK exportCachedEvents:&error];

    if (!exportPath) {
        NSString *errorString = @"Event cache is empty.";
        [self returnError:errorString];
    } else {
        [self returnSuccess:exportPath];
    }
}


- (void)initView:(NSString *)scanMode {
    NSData *data = [self.config dataUsingEncoding:NSUTF8StringEncoding];
    if (!data) {
        [NSException raise:@"Config could not be loaded from disk" format:@"Config could not be loaded from disk"];
    }
    
    NSError *error = nil;
    id dictionary = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];

    if (error) {
        [NSException raise:@"Config could not be parsed to JSON" format:@"Config could not be parsed to JSON: %@", error.localizedDescription];
    }
    NSDictionary *optionsDictionary = [dictionary objectForKey:@"options"];
    self.jsonConfigDictionary = dictionary;

    self.appKey = [dictionary objectForKey:@"license"];
    if (!self.appKey) {
        self.appKey = [dictionary objectForKey:@"licenseKey"];
    }

    BOOL nativeBarcodeScanning = [[optionsDictionary objectForKey:@"nativeBarcodeEnabled"] boolValue];
    self.nativeBarcodeScanning = nativeBarcodeScanning ? nativeBarcodeScanning : NO;

    self.jsonUIConf = [[ALJSONUIConfiguration alloc] initWithDictionary:optionsDictionary];
    self.conf = [[ALScanViewPluginConfig alloc] initWithJSONDictionary:optionsDictionary error:&error];
    self.ocrConfigDict = [dictionary objectForKey:@"ocr"];

    dispatch_async(dispatch_get_main_queue(), ^{
        [[UIApplication sharedApplication] keyWindow].rootViewController.modalPresentationStyle = UIModalPresentationFullScreen;
        
        if ([[scanMode uppercaseString] isEqualToString:[@"scan" uppercaseString]]) {
            BOOL isNFC = [optionsDictionary objectForKey:@"enableNFCWithMRZ"];
            if (isNFC) {
                if (@available(iOS 13.0, *)) {
                    if ([ALNFCDetector readingAvailable]) {
                        ALNFCScanViewController *nfcScanViewController = [[ALNFCScanViewController alloc] initWithLicensekey:self.appKey
                                                                                                               configuration:dictionary
                                                                                                                    uiConfig:self.jsonUIConf
                                                                                                                    finished:^(id  _Nullable callbackObj, NSString * _Nullable errorString) {
                            [self returnCallback:callbackObj andErrorString:errorString];
                        }];

                        if (nfcScanViewController != nil){
                            [nfcScanViewController setModalPresentationStyle: UIModalPresentationFullScreen];
                            [[[UIApplication sharedApplication] keyWindow].rootViewController presentViewController:nfcScanViewController animated:YES completion:nil];
                        }
                    } else {
                        [self returnError:@"NFC passport reading is not supported on this device or app."];
                    }
                } else {
                    [self returnError:@"NFC passport reading is only supported on iOS 13 and later."];
                }
            } else {
                ALPluginScanViewController *pluginScanViewController =
                [[ALPluginScanViewController alloc] initWithLicensekey:self.appKey
                                                         configuration:dictionary
                                                       uiConfiguration:self.jsonUIConf finished:^(id  _Nullable callbackObj, NSString * _Nullable errorString) {
                    [self returnCallback:callbackObj andErrorString:errorString];
                }];
                
                if (pluginScanViewController != nil){
                    [pluginScanViewController setModalPresentationStyle: UIModalPresentationFullScreen];
                    [[[UIApplication sharedApplication] keyWindow].rootViewController presentViewController:pluginScanViewController animated:YES completion:nil];
                }
            }
        } else {
            ALPluginScanViewController *pluginScanViewController =
            [[ALPluginScanViewController alloc] initWithLicensekey:self.appKey
                                                     configuration:dictionary
                                                   uiConfiguration:self.jsonUIConf finished:^(id  _Nullable callbackObj, NSString * _Nullable errorString) {
                [self returnCallback:callbackObj andErrorString:errorString];
            }];
            
            if (pluginScanViewController != nil){
                [pluginScanViewController setModalPresentationStyle: UIModalPresentationFullScreen];
                [[[UIApplication sharedApplication] keyWindow].rootViewController presentViewController:pluginScanViewController animated:YES completion:nil];
            }
        }
    });

}

#pragma mark - ALPluginScanViewControllerDelegate

- (void)pluginScanViewController:(nonnull ALPluginScanViewController *)pluginScanViewController didScan:(nonnull id)scanResult continueScanning:(BOOL)continueScanning {
    NSString *resultJson = @"";
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: scanResult
                                                       options:0
                                                         error:&error];
    
    if (! jsonData) {
        NSLog(@"bv_jsonStringWithPrettyPrint: error: %@", error.localizedDescription);
    } else {
        resultJson = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    }
    [self returnSuccess:resultJson];
}

- (void)pluginScanViewController:(nonnull ALPluginScanViewController *)pluginScanViewController didStopScanning:(nonnull id)sender {
    [self returnError:(@"Canceled")];
}

- (void)pluginScanViewController:(ALPluginScanViewController *)pluginScanViewController didStopScanning:(id)sender error:(NSError *)error {
    [self returnError:error.debugDescription];
}

- (BOOL)scanModeIndex:(NSString *)scanMode{

    NSArray *possibleScanModes = @[@"DOCUMENT", @"MRZ", @"BARCODE", @"LICENSE_PLATE", @"LICENSE_PLATE_US", @"ANYLINE_OCR", @"TIRE", @"ANALOG_METER", @"DIGITAL_METER", @"AUTO_ANALOG_DIGITAL_METER",
                                   @"DIAL_METER", @"SERIAL_NUMBER", @"HEAT_METER_4", @"HEAT_METER_5", @"HEAT_METER_6", @"DOT_MATRIX_METER"];

    return [possibleScanModes containsObject: [scanMode uppercaseString]];

}

- (void)returnCallback:(id _Nullable)callbackObj andErrorString:(NSString * _Nullable)errorString {
    NSString *resultStr;
    NSError *error;
    if (errorString) {
        [self returnError:errorString];
    } else if ([NSJSONSerialization isValidJSONObject:callbackObj]) {
        resultStr = [(NSDictionary *)callbackObj toJSONStringPretty:YES error:&error];
        if (error) {
            [self returnError:error.debugDescription];
        }
        [self returnSuccess:resultStr];
    } else {
        resultStr = @"callback object should be of JSON type";
        [self returnError:resultStr];
    }
}

- (void)returnSuccess:(NSString *)result {
    if ([self.returnMethod isEqualToString:@"callback"]) {
        self.onResultCallback(@[result]);
    } else if ([self.returnMethod isEqualToString:@"promise"]) {
        _resolveBlock(result);
    }
}

- (void)returnError:(NSString *)error {
    if ([self.returnMethod isEqualToString:@"callback"]) {
        self.onErrorCallback(@[error]);
    } else if ([self.returnMethod isEqualToString:@"promise"]) {
        _rejectBlock(@"ANYLINE_ERROR", error, nil);
    }
}

@end
