#import "AnylineSDKPlugin.h"
#import <Anyline/Anyline.h>
#import "ALJsonUIConfiguration.h"
#import "ALPluginScanViewController.h"
#import "ALPluginHelper.h"

#import "ALNFCScanViewController.h"

@interface AnylineSDKPlugin()

@property (nonatomic, strong) ALScanViewPluginConfig *conf;

@property (nonatomic, strong) NSString *callbackId;
@property (nonatomic, strong) NSString *appKey;
@property (nonatomic, assign) BOOL nativeBarcodeScanning;
@property (nonatomic, strong) NSDictionary *jsonConfigDictionary;
@property (nonatomic, strong) NSDictionary *ocrConfigDict;
@property (nonatomic, strong) ALJSONUIConfiguration *jsonUIConf;

@property (nonatomic, strong) RCTResponseSenderBlock onResultCallback;
@property (nonatomic, strong) RCTResponseSenderBlock onErrorCallback;

@property (nonatomic, strong) NSString *config;
@property (nonatomic, strong) NSString *returnMethod;

@end


@implementation AnylineSDKPlugin {
    RCTPromiseResolveBlock _resolveBlock;
    RCTPromiseRejectBlock _rejectBlock;
}

RCT_EXPORT_MODULE();
- (UIView *)view
{
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


-(void)initView:(NSString *)scanMode {
    NSData *data = [self.config dataUsingEncoding:NSUTF8StringEncoding];
    if(!data) {
      [NSException raise:@"Config could not be loaded from disk" format:@"Config could not be loaded from disk"];
    }
    
    NSError * error = nil;
    id dictionary = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
  
    if(error) {
      [NSException raise:@"Config could not be parsed to JSON" format:@"Config could not be parsed to JSON: %@", error.localizedDescription];
    }
    NSDictionary *optionsDictionary = [dictionary objectForKey:@"options"];
    self.jsonConfigDictionary = dictionary;

    self.appKey = [dictionary objectForKey:@"license"];

    BOOL nativeBarcodeScanning = [[optionsDictionary objectForKey:@"nativeBarcodeEnabled"] boolValue];
    self.nativeBarcodeScanning = nativeBarcodeScanning ? nativeBarcodeScanning : NO;

    self.jsonUIConf = [[ALJSONUIConfiguration alloc] initWithDictionary:optionsDictionary];
    self.conf = [[ALScanViewPluginConfig alloc] initWithJSONDictionary:optionsDictionary error:&error];
    self.ocrConfigDict = [dictionary objectForKey:@"ocr"];

    dispatch_async(dispatch_get_main_queue(), ^{
        [[UIApplication sharedApplication] keyWindow].rootViewController.modalPresentationStyle = UIModalPresentationFullScreen;
        
        if ([[scanMode uppercaseString] isEqualToString:[@"scan" uppercaseString]]) {
            NSString *customCmdFile = [[dictionary objectForKey:@"options"] valueForKeyPath:@"viewPlugin.plugin.nfcPlugin"];
            if (customCmdFile) {
               if (@available(iOS 13.0, *)) {
                   if ([ALNFCDetector readingAvailable]) {
                       ALPluginScanViewController *nfcScanViewController = [[ALPluginScanViewController alloc] initWithLicensekey:self.appKey
                                                                                                                 configuration:dictionary
                                                                                                               uiConfiguration:self.jsonUIConf finished:^(id  _Nullable callbackObj, NSString * _Nullable errorString) {
                           
                       }];
//                                                                         initWithLicensekey:self.appKey
//                                                                                                              configuration:[dictionary objectForKey:@"options"]
//                                                                                                       uiConfig:self.jsonUIConf
//                                                                                                                   delegate:self];
                       if([self.jsonConfigDictionary valueForKey:@"quality"]){
                           nfcScanViewController.quality = [[self.jsonConfigDictionary valueForKey:@"quality"] integerValue];
                       }
                       
                       if([self.jsonConfigDictionary valueForKey:@"cropAndTransformErrorMessage"]){
                           NSString *str = [self.jsonConfigDictionary objectForKey:@"cropAndTransformErrorMessage"];
                           nfcScanViewController.cropAndTransformErrorMessage = str;
                       }
                       
                       if ([optionsDictionary valueForKey:@"nativeBarcodeEnabled"]) {
                           nfcScanViewController.nativeBarcodeEnabled = [[self.jsonConfigDictionary objectForKey:@"nativeBarcodeEnabled"] boolValue];
                       }
                       
                       if(nfcScanViewController != nil){
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

}];
                
                if([self.jsonConfigDictionary valueForKey:@"quality"]){
                    pluginScanViewController.quality = [[self.jsonConfigDictionary valueForKey:@"quality"] integerValue];
                }
                
                if([self.jsonConfigDictionary valueForKey:@"cropAndTransformErrorMessage"]){
                    NSString *str = [self.jsonConfigDictionary objectForKey:@"cropAndTransformErrorMessage"];
                    pluginScanViewController.cropAndTransformErrorMessage = str;
                }
                
                if ([optionsDictionary valueForKey:@"nativeBarcodeEnabled"]) {
                    pluginScanViewController.nativeBarcodeEnabled = [[self.jsonConfigDictionary objectForKey:@"nativeBarcodeEnabled"] boolValue];
                }
                
                if(pluginScanViewController != nil){
                    [pluginScanViewController setModalPresentationStyle: UIModalPresentationFullScreen];
                    [[[UIApplication sharedApplication] keyWindow].rootViewController presentViewController:pluginScanViewController animated:YES completion:nil];
                }
            }
        } else {
            ALPluginScanViewController *pluginScanViewController =
            [[ALPluginScanViewController alloc] initWithLicensekey:self.appKey
                                                     configuration:dictionary
                                                   uiConfiguration:self.jsonUIConf finished:^(id  _Nullable callbackObj, NSString * _Nullable errorString) {

}];
            
            if([self.jsonConfigDictionary valueForKey:@"quality"]){
                pluginScanViewController.quality = [[self.jsonConfigDictionary valueForKey:@"quality"] integerValue];
            }
            
            if([self.jsonConfigDictionary valueForKey:@"cropAndTransformErrorMessage"]){
                NSString *str = [self.jsonConfigDictionary objectForKey:@"cropAndTransformErrorMessage"];
                pluginScanViewController.cropAndTransformErrorMessage = str;
            }
            
            if ([optionsDictionary valueForKey:@"nativeBarcodeEnabled"]) {
                pluginScanViewController.nativeBarcodeEnabled = [[self.jsonConfigDictionary objectForKey:@"nativeBarcodeEnabled"] boolValue];
            }
            
            if(pluginScanViewController != nil){
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

- (void)returnSuccess:(NSString *)result{
    if([self.returnMethod isEqualToString:@"callback"]) {
        self.onResultCallback(@[result]);
    } else if([self.returnMethod isEqualToString:@"promise"]) {
        _resolveBlock(result);
    }
}

- (void)returnError:(NSString *)error{
    if([self.returnMethod isEqualToString:@"callback"]) {
        self.onErrorCallback(@[error]);
    } else if([self.returnMethod isEqualToString:@"promise"]) {
        _rejectBlock(@"ANYLINE_ERROR", error, nil);
    }
}

@end
