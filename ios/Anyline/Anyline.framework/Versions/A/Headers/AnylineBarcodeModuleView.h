//
//  AnylineBarcodeModuleView.h
//  
//
//  Created by Daniel Albertini on 29/06/15.
//
//

#import "AnylineAbstractModuleView.h"

/**
 *  Theses are the valid code types to supply to setBarcodeFormats:
 *
 *  @deprecated since 3.4
 */

extern NSString * const kCodeTypeAztec __deprecated_msg("Deprecated since 3.4 Use enum ALBarcodeFormatOptions instead.");
extern NSString * const kCodeTypeCodabar __deprecated_msg("Deprecated since 3.4 Use enum ALBarcodeFormatOptions instead.");
extern NSString * const kCodeTypeCode39 __deprecated_msg("Deprecated since 3.4 Use enum ALBarcodeFormatOptions instead.");
extern NSString * const kCodeTypeCode93 __deprecated_msg("Deprecated since 3.4 Use enum ALBarcodeFormatOptions instead.");
extern NSString * const kCodeTypeCode128 __deprecated_msg("Deprecated since 3.4 Use enum ALBarcodeFormatOptions instead.");
extern NSString * const kCodeTypeDataMatrix __deprecated_msg("Deprecated since 3.4 Use enum ALBarcodeFormatOptions instead.");
extern NSString * const kCodeTypeEAN8 __deprecated_msg("Deprecated since 3.4 Use enum ALBarcodeFormatOptions instead.");
extern NSString * const kCodeTypeEAN13 __deprecated_msg("Deprecated since 3.4 Use enum ALBarcodeFormatOptions instead.");
extern NSString * const kCodeTypeITF __deprecated_msg("Deprecated since 3.4 Use enum ALBarcodeFormatOptions instead.");
extern NSString * const kCodeTypePDF417 __deprecated_msg("Deprecated since 3.4 Use enum ALBarcodeFormatOptions instead.");
extern NSString * const kCodeTypeQR __deprecated_msg("Deprecated since 3.4 Use enum ALBarcodeFormatOptions instead.");
extern NSString * const kCodeTypeRSS14 __deprecated_msg("Deprecated since 3.4 Use enum ALBarcodeFormatOptions instead.");
extern NSString * const kCodeTypeRSSExpanded __deprecated_msg("Deprecated since 3.4 Use enum ALBarcodeFormatOptions instead.");
extern NSString * const kCodeTypeUPCA __deprecated_msg("Deprecated since 3.4 Use enum ALBarcodeFormatOptions instead.");
extern NSString * const kCodeTypeUPCE __deprecated_msg("Deprecated since 3.4 Use enum ALBarcodeFormatOptions instead.");
extern NSString * const kCodeTypeUPCEANExtension __deprecated_msg("Deprecated since 3.4 Use enum ALBarcodeFormatOptions instead.");

/**
 *  Theses are the valid code types to supply to setBarcodeFormatOptions:
 *  Use | do allow multiple formats.
 *
 */
typedef NS_OPTIONS(NSInteger, ALBarcodeFormatOptions) {
    ALCodeTypeAztec             = 1 << 0,
    ALCodeTypeCodabar           = 1 << 1,
    ALCodeTypeCode39            = 1 << 2,
    ALCodeTypeCode93            = 1 << 3,
    ALCodeTypeCode128           = 1 << 4,
    ALCodeTypeDataMatrix        = 1 << 5,
    ALCodeTypeEAN8              = 1 << 6,
    ALCodeTypeEAN13             = 1 << 7,
    ALCodeTypeITF               = 1 << 8,
    ALCodeTypePDF417            = 1 << 9,
    ALCodeTypeQR                = 1 << 10,
    ALCodeTypeRSS14             = 1 << 11,
    ALCodeTypeRSSExpanded       = 1 << 12,
    ALCodeTypeUPCA              = 1 << 13,
    ALCodeTypeUPCE              = 1 << 14,
    ALCodeTypeUPCEANExtension   = 1 << 15,
    
    ALCodeTypeUnknown           = 0,
    
    ALCodeTypeAll = (ALCodeTypeAztec |
                     ALCodeTypeCodabar |
                     ALCodeTypeCode39 |
                     ALCodeTypeCode93 |
                     ALCodeTypeCode128 |
                     ALCodeTypeDataMatrix |
                     ALCodeTypeEAN8 |
                     ALCodeTypeEAN13 |
                     ALCodeTypeITF |
                     ALCodeTypePDF417 |
                     ALCodeTypeQR |
                     ALCodeTypeRSS14 |
                     ALCodeTypeRSSExpanded |
                     ALCodeTypeUPCA |
                     ALCodeTypeUPCE |
                     ALCodeTypeUPCEANExtension),
};

typedef ALBarcodeFormatOptions ALBarcodeFormat;

@protocol AnylineBarcodeModuleDelegate;

/**
 * The AnylineBarcodeModuleView class declares the programmatic interface for an object that manages easy access to Anylines barcode scanning mode. All its capabilities are bundled into this AnylineAbstractModuleView subclass. Management of the scanning process happens within the view object. It is configurable via interface builder.
 *
 * Communication with the host application is managed with a delegate that conforms to AnylineBarcodeModuleDelegate.
 *
 * AnylineBarcodeModuleView is able to scan the most common 1D and 2D codes. The accepted codes are set with setBarcodeFormatOptions.
 *
 */
@interface AnylineBarcodeModuleView : AnylineAbstractModuleView

/**
 *  Sets the type of code to recognize. Valid values are: kCodeTypeAztec, kCodeTypeCodabar, kCodeTypeCode39, kCodeTypeCode93, kCodeTypeCode128, kCodeTypeDataMatrix, kCodeTypeEAN8, kCodeTypeEAN13, kCodeTypeITF, kCodeTypePDF417, kCodeTypeQR, kCodeTypeRSS14, kCodeTypeRSSExpanded, kCodeTypeUPCA, kCodeTypeUPCE, kCodeTypeUPCEANExtension.
 *  Default are all of the above.
 *  
 *  @deprecated since 3.4
 */
@property (nonatomic, strong) NSArray * barcodeFormats __deprecated_msg("Deprecated since 3.4 Use setBarcodeFormats:error: instead.");
/**
 *  Sets the type of code to recognize. Valid values are: kCodeTypeAztec, kCodeTypeCodabar, kCodeTypeCode39, kCodeTypeCode93, kCodeTypeCode128, kCodeTypeDataMatrix, kCodeTypeEAN8, kCodeTypeEAN13, kCodeTypeITF, kCodeTypePDF417, kCodeTypeQR, kCodeTypeRSS14, kCodeTypeRSSExpanded, kCodeTypeUPCA, kCodeTypeUPCE, kCodeTypeUPCEANExtension.
 *  Default are all of the above.
 *
 */
@property (nonatomic, assign) ALBarcodeFormatOptions barcodeFormatOptions;

/**
 *  When set to YES we only use the iOS native Barcode scanning. 
 *  That one uses less computing power, but is worse under low light conditions.
 */
@property (nonatomic, assign) BOOL useOnlyNativeBarcodeScanning;

/**
 *  Sets the license key and delegate.
 *
 *  @param licenseKey The Anyline license key for this application bundle
 *  @param delegate The delegate that will receive the Anyline results (hast to conform to <AnylineBarcodeModuleDelegate>)
 *  @param error The error that occured
 *
 *  @return Boolean indicating the success / failure of the call.
 */
- (BOOL)setupWithLicenseKey:(NSString *)licenseKey
                   delegate:(id<AnylineBarcodeModuleDelegate>)delegate
                      error:(NSError **)error;


@end

@protocol AnylineBarcodeModuleDelegate <NSObject>

@optional
/**
 *  Returns the scanned value
 *
 *  @param anylineBarcodeModuleView The view that scanned the result
 *  @param scanResult The scanned value
 *  @param image The image that was used to scan the barcode
 *
 *  @deprecated since 3.2.1
 */
- (void)anylineBarcodeModuleView:(AnylineBarcodeModuleView *)anylineBarcodeModuleView
               didFindScanResult:(NSString *)scanResult
                         atImage:(UIImage *)image __deprecated_msg("Deprecated since 3.2.1. Use method anylineBarcodeModuleView:didFindScanResult:barcodeFormat:atImage: instead.");

/**
 *  Returns the scanned value
 *
 *  @param anylineBarcodeModuleView The view that scanned the result
 *  @param scanResult The scanned value
 *  @param barcodeFormat The barcode format of the scanned barcode
 *  @param image The image that was used to scan the barcode
 *
 *  @deprecated since 3.4
 */
- (void)anylineBarcodeModuleView:(AnylineBarcodeModuleView *)anylineBarcodeModuleView
               didFindScanResult:(NSString *)scanResult
                   barcodeFormat:(NSString *)barcodeFormat
                         atImage:(UIImage *)image __deprecated_msg("Deprecated since 3.4 Use method anylineBarcodeModuleView:didFindScanResult:withBarcodeFormat:atImage: instead.");

@required

/**
 *  Returns the scanned value
 *
 *  @param anylineBarcodeModuleView The view that scanned the result
 *  @param scanResult The scanned value
 *  @param barcodeFormat The barcode format of the scanned barcode
 *  @param image The image that was used to scan the barcode
 *
 */
- (void)anylineBarcodeModuleView:(AnylineBarcodeModuleView *)anylineBarcodeModuleView
               didFindScanResult:(NSString *)scanResult
               withBarcodeFormat:(ALBarcodeFormat)barcodeFormat
                         atImage:(UIImage *)image;

@end
