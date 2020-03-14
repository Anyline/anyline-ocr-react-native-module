//
//  ALNFCScanViewController.h
//  AnylineExamples
//
//  Created by Angela Brett on 08.10.19.
//

#import "ALPluginScanViewController.h"
#import "ALJsonUIConfiguration.h"

NS_ASSUME_NONNULL_BEGIN

@interface ALNFCScanViewController : UIViewController

@property (nonatomic, assign) BOOL nativeBarcodeEnabled;

@property (nonatomic, strong) NSString *cropAndTransformErrorMessage;

@property (nonatomic, assign) NSUInteger quality;

- (instancetype)initWithLicensekey:(NSString *)licensekey
                     configuration:(NSDictionary *)anylineConfig
                          uiConfig:(ALJsonUIConfiguration *)uiConfig
                          delegate:(id<ALPluginScanViewControllerDelegate>)delegate;
@end

NS_ASSUME_NONNULL_END
