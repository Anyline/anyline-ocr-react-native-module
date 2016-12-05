//
//  AnylineOCRModuleView.h
//  Anyline
//
//  Created by Daniel Albertini on 10/11/15.
//  Copyright © 2015 9Yards GmbH. All rights reserved.
//

#import <Anyline/Anyline.h>

/**
 *  ALRange struct to define min & max charHeight for scanning.
 */
struct ALRange {
    NSUInteger min;
    NSUInteger max;
};
typedef struct ALRange ALRange;

/**
 *  Creates a range with min & max parameter
 *
 *  @param min The min value for the range
 *  @param max The max value for the range
 *
 *  @return New ALRange object with min & max values
 */
CG_INLINE ALRange ALRangeMake(NSUInteger min, NSUInteger max) {
    ALRange r;
    r.min = min;
    r.max = max;
    return r;
}

/**
 *  The possible run error codes for this module. 
 *  You can listen to the error codes for each run via the delegate method anylineOCRModuleView:reportsRunFailure:
 */
typedef NS_ENUM(NSInteger, ALOCRError) {
    /**
     *  An unknown error occurred.
     */
    ALOCRErrorUnkown                  = -1,
    /**
     *  No text lines found in imag
     */
    ALOCRErrorNoLinesFound            = -2,
    /**
     *  No text found in lines
     */
    ALOCRErrorNoTextFound             = -3,
    /**
     *  The required min confidence is not reached for this run
     */
    ALOCRErrorConfidenceNotReached    = -4,
    /**
     *  The result does not match the validation regular expression
     */
    ALOCRErrorResultNotValid          = -5,
    /**
     *  The min sharpness for this run is not reached
     */
    ALOCRErrorSharpnessNotReached     = -6,
};
/**
 *  The possible scanModes for the AnylineOCR module
 */
typedef NS_ENUM(NSInteger, ALOCRScanMode) {
    /**
     *  The LINE mode is optimal for scanning one or more lines of variable length or font (like IBANs or addresses).
     */
    ALLine,
    /**
     *  The GRID mode is optimal for characters with equal size laid out in a grid
     *  with a constant font, background and character count (like loyalty codes inside bottle caps).
     */
    ALGrid
};

/**
 *  A class used to configure the Anyline OCR module.
 */
@interface ALOCRConfig : NSObject

- (instancetype)initWithJsonDictionary:(NSDictionary *)configDict;

/**
 *  The scan mode. 
 *  @see ALOCRScanMode
 */
@property (nonatomic, assign) ALOCRScanMode scanMode;
/**
 *  Property to set a custom command file (path not string) to improve scanning for your use-case.
 *  Get in touch with Anyline to receive your custum command file.
 */
@property (nonatomic, strong) NSString *customCmdFilePath;
/**
 *  Property to set a custom command file (string not path) to improve scanning for your use-case.
 *  Get in touch with Anyline to receive your custum command file.
 */
@property (nonatomic, strong) NSString *customCmdFileString;
/**
 *  Property to set the character height.
 */
@property (nonatomic, assign) ALRange charHeight;
/**
 *  Property to set the tesseract tessdata files as Array of Strings. ex. @[@"eng",@"deu"]
 */
@property (nonatomic, strong) NSArray<NSString *> *tesseractLanguages;
/**
 *  Property for the character whitelist you would like to use.
 */
@property (nonatomic, strong) NSString *charWhiteList;
/**
 *  Property for the validation regex.
 */
@property (nonatomic, strong) NSString *validationRegex;
/**
 *  The min confidence to accept the result. Between 0-100, but should normally be at least 50.
 *  The spped / accurracy of Anyline can be controlled with this property.
 */
@property (nonatomic, assign) NSUInteger minConfidence;
/**
 *  Removes small contours as noise.
 *
 *  This property is for Line mode only.
 *
 *  @warming Do not use activate this property when scanning for example i dots or :. 
 *           This would remove those contours.
 */
@property (nonatomic, assign) BOOL removeSmallContours;
/**
 * Set this to true if whitespaces should be removed within a line.
 * Also causes faster processing, because optimizations can be made if whitespaces are not relevant.
 * (only used in {@link ScanMode#LINE} mode)
 *
 * @param removeWhitespaces true if whitespaces should be removed
 */
@property (nonatomic, assign) BOOL removeWhitespaces;
/**
 * <p>
 * Experimental parameter to set the minimum sharpness (value between 0-100; 0 to turn sharpness detection off;
 * only used in {@link ScanMode#LINE}).
 *
 * The goal of the minimum sharpness is to avoid a time consuming ocr step,
 * if the image is blurry and good results are therefor not likely. Detecting sharpness is however difficult,
 * good values for the minimum are use case dependent.
 *
 * The detected sharpness will be reported in anylineOCRModuleView:reportsVariable:value: with identifier
 * "$sharpness" and also in error message in anylineOCRModuleView:reportsRunFailure:,
 * if the minimum sharpness is not reached (with the error code ALOCRErrorSharpnessNotReached).
 * </p><p>
 * <b>NOTE: Experimental means that this may be removed or changed in the future.</b>
 * </p>
 *
 * @since 3.4.1
 */
@property (nonatomic, assign) NSUInteger minSharpness;
/**
 *  The X character count
 *
 *  This property is for Grid mode only.
 */
@property (nonatomic, assign) NSUInteger charCountX;
/**
 *  The Y character count
 *
 *  This property is for Grid mode only.
 */
@property (nonatomic, assign) NSUInteger charCountY;
/**
 *  The average distance between characters in X direction,
 *  measured in percentage of character width.
 *
 *  This property is for Grid mode only.
 */
@property (nonatomic, assign) double charPaddingXFactor;
/**
 *  The average distance between characters in Y direction,
 *  measured in percentage of character height.
 *
 *  This property is for Grid mode only.
 */
@property (nonatomic, assign) double charPaddingYFactor;
/**
 *  YES to set to bright text on dark background,
 *  NO to set to dark text on bright background.
 *
 *  This property is for Grid mode only.
 */
@property (nonatomic, assign) BOOL isBrightTextOnDark;

@end

/**
 *  The result object for the AnylineOCRModule
 */
@interface ALOCRResult : NSObject
/**
 *  The scanned text in the frame.
 */
@property (nonatomic, strong, readonly) NSString *text;
/**
 *  The image where the scanned text was found.
 */
@property (nonatomic, strong, readonly) UIImage *image;
/**
 *  The thresholded image where the scanned text was found
 */
@property (nonatomic, strong, readonly) UIImage *thresholdedImage;

- (instancetype)initWithText:(NSString *)text
                       image:(UIImage *)image
            thresholdedImage:(UIImage *)thresholdedImage;

@end

@protocol AnylineOCRModuleDelegate;
/**
 *  The AnylineOcrScanView can be used to recognize text.
 *  It can be adapted to different kinds of use cases with the {@link AnylineViewConfig} (settings for the camera and UI)
 *  and the {@link AnylineOcrConfig} (settings to adapt the recognition to your use case).
 *
 *  @since 3.4
 */
@interface AnylineOCRModuleView : AnylineAbstractModuleView
/**
 *  Read-only property for the ALOCRConfig
 *
 *  Use method setOCRConfig:error: for setting the config.
 */
@property (nonatomic, strong, readonly) ALOCRConfig *ocrConfig;

/**
 *  Sets the license key and delegate.
 *
 *  @param licenseKey   The Anyline license key for this application bundle
 *  @param delegate     The delegate that will receive the Anyline results (hast to conform to <AnylineOCRModuleDelegate>)
 *  @param ocrConfig    The ocrConfig to use for the scanning
 *  @param error        The error that occured
 *
 *  @return Boolean indicating the success / failure of the call.
 */
- (BOOL)setupWithLicenseKey:(NSString *)licenseKey
                   delegate:(id<AnylineOCRModuleDelegate>)delegate
                  ocrConfig:(ALOCRConfig *)ocrConfig
                      error:(NSError **)error;
/**
 *  Sets a new ALOCRConfig and returns an Error if something failed.
 *
 *  @param ocrConfig The ALOCRConfig to set
 *  @param error     The Error object if something fails
 *
 *  @return Boolean indicating the success / failure of the call.
 */
- (BOOL)setOCRConfig:(ALOCRConfig *)ocrConfig error:(NSError **)error;

- (BOOL)copyTrainedData:(NSString *)trainedDataPath
               fileHash:(NSString *)hash
                  error:(NSError **)error;

@end
/**
 *  The delegate for the AnylineOCRModuleView.
 */
@protocol AnylineOCRModuleDelegate <NSObject>

@required

/**
 *  Called when a result is found
 *
 *  @param anylineOCRModuleView The AnylineOCRModuleView
 *  @param result               The result object
 */
- (void)anylineOCRModuleView:(AnylineOCRModuleView *)anylineOCRModuleView
               didFindResult:(ALOCRResult *)result;

@optional
/**
 * <p>Called with interesting values, that arise during processing.</p>
 * <p>
 * Some possibly reported values:
 * <ul>
 * <li>$brightness - the brightness of the center region of the cutout as a float value </li>
 * <li>$confidence - the confidence, an Integer value between 0 and 100 </li>
 * <li>$thresholdedImage - the current image transformed into black and white (the base image used for OCR)</li>
 * </ul>
 * </p>
 *
 *  @param anylineOCRModuleView The AnylineOCRModuleView
 *  @param variableName         The variable name of the reported value
 *  @param value                The reported value
 */
- (void)anylineOCRModuleView:(AnylineOCRModuleView *)anylineOCRModuleView
             reportsVariable:(NSString *)variableName
                       value:(id)value;
/**
 *  Is called when the processing is aborted for the current image before reaching return.
 *  (If not text is found or confidence is to low, etc.)
 *
 *  @param anylineOCRModuleView The AnylineOCRModuleView
 *  @param error                The error enum
 */
- (void)anylineOCRModuleView:(AnylineOCRModuleView *)anylineOCRModuleView
           reportsRunFailure:(ALOCRError)error;
/**
 *  Called when the outline of a possible text is detected. (currently always a rect with 4 points,
 *  but this may change in the future)
 *
 *  @warning When not implemented Anyline will handle the drawing. Deactivate it by implementing this delegate
 *           and return YES
 *
 *  @param anylineOCRModuleView The AnylineOCRModuleView
 *  @param outline              The ALSquare with the 4 points.
 *
 *  @return YES if you handle drawing by yourself, NO if Anyline should draw the outline.
 */
- (BOOL)anylineOCRModuleView:(AnylineOCRModuleView *)anylineOCRModuleView
         textOutlineDetected:(ALSquare *)outline;

@end
