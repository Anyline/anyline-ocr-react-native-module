#import "ALJSONUIConfiguration.h"
#import "ALRoundedView.h"

NS_ASSUME_NONNULL_BEGIN

typedef void (^ALPluginCallback)(id _Nullable callbackObj, NSString * _Nullable errorString);


@interface ALPluginHelper : NSObject

+ (void)startScan:(NSDictionary *)config finished:(ALPluginCallback)callback;

+ (NSString *)saveImageToFileSystem:(UIImage *)image;

+ (NSString *)saveImageToFileSystem:(UIImage *)image
                 compressionQuality:(CGFloat)compressionQuality;

+ (UILabel *)createLabelForView:(UIView *)view;

+ (UIButton *)createButtonForViewController:(UIViewController *)viewController
                                     config:(ALJSONUIConfiguration *)config;

+ (ALRoundedView *)createRoundedViewForViewController:(UIViewController *)viewController;

//+ (ALScanMode)scanModeFromString:(NSString *)scanMode;
//
//+ (NSString *)stringFromScanMode:(ALScanMode)scanMode;
//
//+ (NSString *)stringForOutline:(ALSquare *)square;

//+ (NSDictionary<NSString *, NSNumber *> *)scanModesDict;

//+ (UISegmentedControl *)createSegmentForViewController:(UIViewController *)viewController
//                                                config:(ALJsonUIConfiguration *)config
//                                              scanMode:(ALScanMode)scanMode;

//+ (NSString *)barcodeFormatForNativeString:(NSString *)barcodeType;

//+ (NSDictionary *)dictionaryForMeterResult:(ALMeterResult *)scanResult
//                          detectedBarcodes:(NSMutableArray<NSDictionary *> *)detectedBarcodes
//                                   outline:(ALSquare *)outline
//                                   quality:(NSInteger)quality;
//
//+ (NSDictionary *)dictionaryForIDResult:(ALIDResult *)scanResult
//                       detectedBarcodes:(NSMutableArray<NSDictionary *> *)detectedBarcodes
//                                outline:(ALSquare *)outline
//                                quality:(NSInteger)quality;
//
//+ (NSDictionary *)dictionaryForNFCResult:(ALNFCResult *)scanResult
//                                 quality:(NSInteger)quality API_AVAILABLE(ios(13));
//
//+ (NSDictionary *)dictionaryForBarcodeResults:(NSMutableArray<NSDictionary *> *)detectedBarcodes
//                                  barcodeType:(NSString *)barcodeType
//                                   scanResult:(NSString *)scanResult;
//
//+ (NSDictionary *)dictionaryForOCRResult:(ALOCRResult *)scanResult
//                        detectedBarcodes:(NSMutableArray<NSDictionary *> *)detectedBarcodes
//                                 outline:(ALSquare *)outline
//                                 quality:(NSInteger)quality;
//
//+ (NSDictionary *)dictionaryForBarcodeResult:(ALBarcodeResult *)scanResult
//                                     outline:(ALSquare *)outline
//                                     quality:(NSInteger)quality;
//
//+ (NSDictionary *)dictionaryForLicensePlateResult:(ALLicensePlateResult *)scanResult
//                                 detectedBarcodes:(NSMutableArray<NSDictionary *> *)detectedBarcodes
//                                          outline:(ALSquare *)outline
//                                          quality:(NSInteger)quality;
//
//+ (NSDictionary *)dictionaryForTransformedImage:(UIImage *)transformedImage
//                                      fullFrame:(UIImage *)fullFrame
//                                        quality:(NSInteger)quality
//                               detectedBarcodes:(NSMutableArray<NSDictionary *> *)detectedBarcodes
//                                        outline:(ALSquare *)outline;
//
//
//+ (NSDictionary *)dictionaryForCompositeResult:(ALCompositeResult *)scanResult
//                              detectedBarcodes:(NSMutableArray<NSDictionary *> *)detectedBarcodes
//                                       quality:(NSInteger)quality;
//
//+ (NSDictionary *)dictionaryForTireResult:(ALTireResult *)scanResult
//                                  quality:(NSInteger)quality;

@end

NS_ASSUME_NONNULL_END