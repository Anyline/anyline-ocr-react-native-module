
#import "AnylineSDKPlugin.h"
#import <Anyline/Anyline.h>
#import "AnylineBarcodeScanViewController.h"
#import "AnylineEnergyScanViewController.h"
#import "AnylineMRZScanViewController.h"
#import "AnylineOCRScanViewController.h"
#import "AnylineDocumentScanViewController.h"
#import "ALJsonUIConfiguration.h"

@interface AnylineSDKPlugin()<AnylineBaseScanViewControllerDelegate>

@property (nonatomic, strong) AnylineBaseScanViewController *baseScanViewController;
@property (nonatomic, strong) ALUIConfiguration *conf;

@property (nonatomic, strong) NSString *callbackId;
@property (nonatomic, strong) NSString *appKey;
@property (nonatomic, strong) NSDictionary *jsonConfigDictionary;
@property (nonatomic, strong) ALJsonUIConfiguration *jsonUIConf;

@property (nonatomic, strong) RCTResponseSenderBlock onResultCallback;
@property (nonatomic, strong) RCTResponseSenderBlock onErrorCallback;
@property (nonatomic, strong) RCTResponseSenderBlock onCancelCallback;

@end


@implementation AnylineSDKPlugin

RCT_EXPORT_MODULE();
- (UIView *)view
{
  return [[UIView alloc] initWithFrame:CGRectMake(0, 0, 0, 0)];
}

RCT_EXPORT_METHOD(setupScanViewWithConfigJson:(NSString *)config scanMode:(NSString *)scanMode onResultCallback:(RCTResponseSenderBlock)onResult onErrorCallback:(RCTResponseSenderBlock)onError onCancelCallback:(RCTResponseSenderBlock)onCancel) {
  self.onResultCallback = onResult;
  self.onErrorCallback = onError;
  self.onCancelCallback = onCancel;

  NSData *data = [config dataUsingEncoding:NSUTF8StringEncoding];
  id dictionary = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
  self.jsonConfigDictionary = dictionary;

  self.appKey = [dictionary objectForKey:@"license"];
  self.jsonUIConf = [[ALJsonUIConfiguration alloc] initWithDictionary:[dictionary objectForKey:@"options"]];
  self.conf = [[ALUIConfiguration alloc] initWithDictionary:[dictionary objectForKey:@"options"] bundlePath:nil];

  dispatch_async(dispatch_get_main_queue(), ^{
    self.baseScanViewController = [self ViewControllerFromScanMode:scanMode];
    [[[UIApplication sharedApplication] keyWindow].rootViewController presentViewController:self.baseScanViewController animated:YES completion:nil];
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
  self.onResultCallback(@[resultJson]);
}

-(void)anylineBaseScanViewController:(AnylineBaseScanViewController *)baseScanViewController didStopScanning:(id)sender {
  self.onCancelCallback();
}

#pragma mark - Utility Funcitons
- (AnylineBaseScanViewController *)ViewControllerFromScanMode:(NSString *)scanMode {

  if ([[scanMode uppercaseString] isEqualToString:[@"ANALOG_METER" uppercaseString]]) {
    AnylineEnergyScanViewController *analogMeterVC = [[AnylineEnergyScanViewController alloc] initWithKey:self.appKey configuration:self.conf jsonConfiguration:self.jsonUIConf  delegate:self];
    analogMeterVC.scanMode = ALAnalogMeter;
    return analogMeterVC;
  }if ([[scanMode uppercaseString] isEqualToString:[@"DIGITAL_METER" uppercaseString]]) {
    AnylineEnergyScanViewController *digitalMeterVC = [[AnylineEnergyScanViewController alloc] initWithKey:self.appKey configuration:self.conf jsonConfiguration:self.jsonUIConf  delegate:self];
    digitalMeterVC.scanMode = ALDigitalMeter;
    return digitalMeterVC;
  } else if ([[scanMode uppercaseString] isEqualToString:[@"DOCUMENT" uppercaseString]]) {
    return [[AnylineDocumentScanViewController alloc] initWithKey:self.appKey configuration:self.conf jsonConfiguration:self.jsonUIConf  delegate:self];
  } else if ([[scanMode uppercaseString] isEqualToString:[@"MRZ" uppercaseString]]) {
    return [[AnylineMRZScanViewController alloc] initWithKey:self.appKey configuration:self.conf jsonConfiguration:self.jsonUIConf  delegate:self];
  } else if ([[scanMode uppercaseString] isEqualToString:[@"BARCODE" uppercaseString]]) {
    return [[AnylineBarcodeScanViewController alloc] initWithKey:self.appKey configuration:self.conf jsonConfiguration:self.jsonUIConf  delegate:self];
  } else if ([[scanMode uppercaseString] isEqualToString:[@"ANYLINE_OCR" uppercaseString]]) {
    AnylineOCRScanViewController *ocrVC = [[AnylineOCRScanViewController alloc] initWithKey:self.appKey configuration:self.conf jsonConfiguration:self.jsonUIConf  delegate:self];
    [ocrVC setOcrConfDict:self.jsonConfigDictionary];
    return ocrVC;
  } else {
    self.onErrorCallback(@[@"unkown scanMode: %@", scanMode]);
    return nil;
  }
}

@end
