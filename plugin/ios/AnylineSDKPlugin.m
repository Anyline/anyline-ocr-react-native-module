#import "AnylineSDKPlugin.h"
#import <Anyline/Anyline.h>
#import "AnylineBarcodeScanViewController.h"
#import "AnylineEnergyScanViewController.h"
#import "AnylineMRZScanViewController.h"
#import "AnylineOCRScanViewController.h"
#import "AnylineDocumentScanViewController.h"
#import "AnylineLicensePlateViewController.h"
#import "ALJsonUIConfiguration.h"

@interface AnylineSDKPlugin()<AnylineBaseScanViewControllerDelegate>

@property (nonatomic, strong) AnylineBaseScanViewController *baseScanViewController;
@property (nonatomic, strong) ALUIConfiguration *conf;

@property (nonatomic, strong) NSString *callbackId;
@property (nonatomic, strong) NSString *appKey;
@property (nonatomic, assign) BOOL nativeBarcodeScanning;
@property (nonatomic, strong) NSDictionary *jsonConfigDictionary;
@property (nonatomic, strong) NSDictionary *ocrConfigDict;
@property (nonatomic, strong) ALJsonUIConfiguration *jsonUIConf;

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
   resolve(ALCoreController.versionNumber);
}


-(void)initView:(NSString *)scanMode {
    NSData *data = [self.config dataUsingEncoding:NSUTF8StringEncoding];
    id dictionary = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
    self.jsonConfigDictionary = dictionary;

    self.appKey = [dictionary objectForKey:@"license"];

    BOOL nativeBarcodeScanning = [[dictionary objectForKey:@"nativeBarcodeEnabled"] boolValue];
    self.nativeBarcodeScanning = nativeBarcodeScanning ? nativeBarcodeScanning : NO;

    self.jsonUIConf = [[ALJsonUIConfiguration alloc] initWithDictionary:[dictionary objectForKey:@"options"]];
    self.conf = [[ALUIConfiguration alloc] initWithDictionary:[dictionary objectForKey:@"options"]];
    self.conf.cancelOnResult = true;
    self.ocrConfigDict = [dictionary objectForKey:@"ocr"];

    dispatch_async(dispatch_get_main_queue(), ^{
        AnylineBaseScanViewController* baseViewController = [self ViewControllerFromScanMode:scanMode];  //returns nil if ScanMode is not valid
        if(baseViewController != nil){
            self.baseScanViewController = baseViewController;
            [[[UIApplication sharedApplication] keyWindow].rootViewController presentViewController:self.baseScanViewController animated:YES completion:nil];
        } else {
            [self returnError:[scanMode stringByAppendingString:@" - Unknown ScanMode"]];
        }
    });

}


#pragma mark - AnylineBaseScanViewControllerDelegate
- (void)anylineBaseScanViewController:(AnylineBaseScanViewController *)baseScanViewController didScan:(id)scanResult continueScanning:(BOOL)continueScanning {
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

-(void)anylineBaseScanViewController:(AnylineBaseScanViewController *)baseScanViewController didStopScanning:(id)sender {
    [self returnError:(@"Canceled")];
}

#pragma mark - Utility Funcitons
- (AnylineBaseScanViewController *)ViewControllerFromScanMode:(NSString *)scanMode {

    if([self scanModeIndex:scanMode]){
        if ([[scanMode uppercaseString] isEqualToString:[@"DOCUMENT" uppercaseString]]) {
            AnylineDocumentScanViewController *docVC = [[AnylineDocumentScanViewController alloc] initWithKey:self.appKey configuration:self.conf jsonConfiguration:self.jsonUIConf  delegate:self];
            NSDictionary *options = [self.jsonConfigDictionary valueForKey:@"options"];
            if ([options valueForKey:@"document"]) {
                NSDictionary *docConfig = [options valueForKey:@"document"];
                
                // Check for Document quality Config and set it
                if([docConfig valueForKey:@"quality"]){
                    docVC.quality = [[docConfig valueForKey:@"quality"] integerValue];
                } else {
                    docVC.quality = 100;
                }
                
                // Check for Document PostProcessing and set it
                if([docConfig valueForKey:@"postProcessing"]){
                    docVC.postProcessing = [[docConfig valueForKey:@"postProcessing"] boolValue];
                } else {
                    docVC.postProcessing = true;
                }

                // Check for Document Max Output Config and set it
                if([docConfig valueForKey:@"maxOutputResoultion"]){
                    NSDictionary *maxOutputResoultionConfig = [docConfig valueForKey:@"maxOutputResoultion"];
                    if([maxOutputResoultionConfig valueForKey:@"width"] && [maxOutputResoultionConfig valueForKey:@"height"]){
                        docVC.maxOutputResolution = CGSizeMake([[maxOutputResoultionConfig valueForKey:@"width"] doubleValue], [[maxOutputResoultionConfig valueForKey:@"height"] doubleValue]);
                    }
                }
                
                // Check for Document Ratio Config and set it
                if([docConfig valueForKey:@"ratio"]){
                    NSDictionary *ratioConfig = [docConfig valueForKey:@"ratio"];
                    if([ratioConfig valueForKey:@"ratios"]){
                        docVC.ratios = [ratioConfig valueForKey:@"ratios"];
                    }
                    if([ratioConfig valueForKey:@"deviation"]){
                        docVC.ratioDeviation = [[ratioConfig valueForKey:@"deviation"] doubleValue];
                    }
                }
            }
            return docVC;
        } else if ([[scanMode uppercaseString] isEqualToString:[@"MRZ" uppercaseString]]) {

            AnylineMRZScanViewController *mrzVC = [[AnylineMRZScanViewController alloc] initWithKey:self.appKey configuration:self.conf jsonConfiguration:self.jsonUIConf  delegate:self];
            NSDictionary *options = [self.jsonConfigDictionary valueForKey:@"options"];

            if ([options valueForKey:@"mrz"]) {
                NSDictionary *mrzConfig = [options valueForKey:@"mrz"];

                // Check for Document quality Config and set it
                if([mrzConfig valueForKey:@"strictMode"]){
                    mrzVC.strictMode = [[mrzConfig valueForKey:@"strictMode"] boolValue];
                } else {
                    mrzVC.strictMode = false;
                }
                  // Check for cropAndTransformID Config and set it
                if([mrzConfig valueForKey:@"cropAndTransformID"]){
                    mrzVC.cropAndTransformID = [[mrzConfig valueForKey:@"cropAndTransformID"] boolValue];
                } else {
                    mrzVC.cropAndTransformID = false;
                }
                
                // Check for showPointsOutOfCutoutError Config and set it
                if([mrzConfig valueForKey:@"cropAndTransformErrorMessage"]){
                    NSString *str = [mrzConfig objectForKey:@"cropAndTransformErrorMessage"];
                    mrzVC.cropAndTransformErrorMessage = str;
                } else {
                    mrzVC.cropAndTransformErrorMessage = @"";
                }

            }
            return mrzVC;
        } else if ([[scanMode uppercaseString] isEqualToString:[@"BARCODE" uppercaseString]]) {
            return [[AnylineBarcodeScanViewController alloc] initWithKey:self.appKey configuration:self.conf jsonConfiguration:self.jsonUIConf  delegate:self];
        } else if ([[scanMode uppercaseString] isEqualToString:[@"LICENSE_PLATE" uppercaseString]]) {
            return [[AnylineLicensePlateViewController alloc] initWithKey:self.appKey configuration:self.conf jsonConfiguration:self.jsonUIConf  delegate:self];
        } else if ([[scanMode uppercaseString] isEqualToString:[@"ANYLINE_OCR" uppercaseString]]) {
            AnylineOCRScanViewController *ocrVC = [[AnylineOCRScanViewController alloc] initWithKey:self.appKey configuration:self.conf jsonConfiguration:self.jsonUIConf  delegate:self];
            [ocrVC setOcrConfDict:self.ocrConfigDict];
            return ocrVC;
        } else {
            AnylineEnergyScanViewController *meterVC = [[AnylineEnergyScanViewController alloc] initWithKey:self.appKey configuration:self.conf jsonConfiguration:self.jsonUIConf  delegate:self];

            // Set SerialNumber Configuration
            NSDictionary *options = [self.jsonConfigDictionary valueForKey:@"options"];
            if ([options valueForKey:@"serialNumber"]) {
                NSDictionary *serNumConf = [options valueForKey:@"serialNumber"];

                // Check for Serial Number Whitelist and set it
                if([serNumConf valueForKey:@"numberCharWhitelist"]){
                    meterVC.serialWhitelist = [serNumConf valueForKey:@"numberCharWhitelist"];
                }

                // Check for Serial Number ValidationRegex and set it
                if([serNumConf valueForKey:@"validationRegex"]){
                    meterVC.serialValRegex = [serNumConf valueForKey:@"validationRegex"];
                }
            }

            meterVC.scanMode = [self energyScanModeFromString:scanMode];
            meterVC.nativeBarcodeEnabled = self.nativeBarcodeScanning;
            return meterVC;
        }
    } else {
        return nil;
    }
}

- (ALScanMode)energyScanModeFromString:(NSString *)scanMode{

    if ([[scanMode uppercaseString] isEqualToString:@"ANALOG_METER"]) {
        return ALAnalogMeter;
    } else if ([[scanMode uppercaseString] isEqualToString:@"DIGITAL_METER"]){
        return ALDigitalMeter;
    } else if ([[scanMode uppercaseString] isEqualToString:@"AUTO_ANALOG_DIGITAL_METER"]){
        return ALAutoAnalogDigitalMeter;
    } else if ([[scanMode uppercaseString] isEqualToString:@"DIAL_METER"]){
        return ALDialMeter;
    } else if ([[scanMode uppercaseString] isEqualToString:@"SERIAL_NUMBER"]){
        return ALSerialNumber;
    } else if ([[scanMode uppercaseString] isEqualToString:@"HEAT_METER_4"]){
        return ALHeatMeter4;
    } else if ([[scanMode uppercaseString] isEqualToString:@"HEAT_METER_5"]){
        return ALHeatMeter5;
    } else if ([[scanMode uppercaseString] isEqualToString:@"HEAT_METER_6"]){
        return ALHeatMeter6;
    } else if ([[scanMode uppercaseString] isEqualToString:@"DOT_MATRIX_METER"]){
            return ALDotMatrixMeter;
    } else {
        return ALAutoAnalogDigitalMeter;
    }

}

- (BOOL)scanModeIndex:(NSString *)scanMode{

    NSArray *possibleScanModes = @[@"DOCUMENT", @"MRZ", @"BARCODE", @"LICENSE_PLATE", @"ANYLINE_OCR", @"ANALOG_METER", @"DIGITAL_METER", @"AUTO_ANALOG_DIGITAL_METER",
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
