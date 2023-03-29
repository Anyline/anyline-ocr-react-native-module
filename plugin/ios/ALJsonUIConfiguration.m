#import "ALJSONUIConfiguration.h"
#import <Anyline/Anyline.h>

NSString * const DONE_BUTTON = @"doneButtonConfig";
NSString * const DONE_BUTTON_TITLE = @"title";
NSString * const DONE_BUTTON_COLOR = @"textColor";
NSString * const DONE_BUTTON_COLOR_HIGHLIGHTED = @"textColorHighlighted";
NSString * const DONE_BUTTON_FONT_SIZE = @"fontSize";
NSString * const DONE_BUTTON_FONT_NAME = @"fontName";
NSString * const DONE_BUTTON_X_ALIGNMENT = @"positionXAlignment";
NSString * const DONE_BUTTON_Y_ALIGNMENT = @"positionYAlignment";
NSString * const DONE_BUTTON_BACKGROUND_COLOR = @"backgroundColor";
NSString * const DONE_BUTTON_TYPE = @"type";
NSString * const DONE_BUTTON_CORNER_RADIUS = @"cornerRadius";

NSString * const SEGMENT = @"segmentConfig";
NSString * const SEGMENT_TITLES = @"titles";
NSString * const SEGMENT_MODES = @"modes";
NSString * const SEGMENT_TINT_COLOR = @"tintColor";

NSString * const OFFSET = @"offset";
NSString * const OFFSET_X = @"offset.x";
NSString * const OFFSET_Y = @"offset.y";

NSString * const LABEL = @"labelConfig";
NSString * const LABEL_TEXT = @"text";
NSString * const LABEL_COLOR = @"color";
NSString * const LABEL_SIZE = @"size";

NSString * const LABEL_OFFSET = @"labelOffset";
NSString * const LABEL_OFFSET_X = @"offset.x";
NSString * const LABEL_OFFSET_Y = @"offset.y";

NSString * const ENABLE_NATIVE_BARCODE = @"nativeBarcodeScanningFormats";

@implementation ALJSONUIConfiguration

- (instancetype)initWithDictionary:(NSDictionary *)dictionary {
    if (self = [super init]) {

        _buttonDoneFontName = @"Avenir Next"; // @"HelveticaNeue";
        _buttonDoneTextColor = [UIColor whiteColor];
        _buttonDoneTextColorHighlighted = [UIColor grayColor];
        _buttonDoneBackgroundColor = [UIColor clearColor];
        _buttonDoneFontSize = 32.0;
        _buttonType = ALButtonTypeFullWidth;
        _buttonDoneTitle = NSLocalizedString(@"OK", @"Done button title");
        _buttonDoneXAlignment = ALButtonXAlignmentCenter;
        _buttonDoneYAlignment = ALButtonYAlignmentBottom;
        _buttonDoneYPositionOffset = -88.0;
        _buttonDoneXPositionOffset = 0;
        _buttonDoneCornerRadius = 4.0;

        _labelSize = 32.0f;
        _labelText = @"";
        _labelColor = UIColor.whiteColor;
        _labelXPositionOffset = 0.0f;
        _labelYPositionOffset = 0.0f;

        // (ACO) 20230313
        // nativeBarcodeFormats = [] would be interpreted as ['ALL']
        _nativeBarcodeFormats = nil;

        if ([dictionary valueForKey:ENABLE_NATIVE_BARCODE]) {
            NSArray<NSString *> *formats = [dictionary valueForKey:ENABLE_NATIVE_BARCODE];

            NSMutableArray *nativeBarcodeFormats = [NSMutableArray arrayWithCapacity:formats.count];

            for (NSString *format in formats) {
                NSString *nativeBarcodeFormat = [self.class barcodeFormatToNativeString:format];
                if (nativeBarcodeFormat) {
                    [nativeBarcodeFormats addObject:nativeBarcodeFormat];
                }
            }

            self.nativeBarcodeFormats = nativeBarcodeFormats;
        }
        
        if ([dictionary valueForKey:DONE_BUTTON]) {
            NSDictionary *btnDict = [dictionary valueForKey:DONE_BUTTON];
            
            if ([btnDict valueForKey:DONE_BUTTON_FONT_NAME]) {
                _buttonDoneFontName = [btnDict valueForKeyPath:DONE_BUTTON_FONT_NAME];
            }

            if ([btnDict valueForKey:DONE_BUTTON_COLOR]) {
                _buttonDoneTextColor = [ALJSONUIConfiguration colorFromHexString:[btnDict valueForKeyPath:DONE_BUTTON_COLOR]];
            }
            
            if ([btnDict valueForKey:DONE_BUTTON_COLOR_HIGHLIGHTED]) {
                _buttonDoneTextColorHighlighted = [ALJSONUIConfiguration colorFromHexString:[btnDict valueForKeyPath:DONE_BUTTON_COLOR_HIGHLIGHTED]];
            }
            
            if ([btnDict valueForKey:DONE_BUTTON_FONT_SIZE]) {
                _buttonDoneFontSize = [[btnDict valueForKeyPath:DONE_BUTTON_FONT_SIZE] floatValue];
            }
            
            if ([btnDict valueForKey:DONE_BUTTON_TYPE]) {
                _buttonType =  [ALJSONUIConfiguration stringToButtonType:[btnDict valueForKeyPath:DONE_BUTTON_TYPE]];
            }
            
            if ([btnDict valueForKey:DONE_BUTTON_BACKGROUND_COLOR]) {
                _buttonDoneBackgroundColor = [ALJSONUIConfiguration colorFromHexString:[btnDict valueForKey:DONE_BUTTON_BACKGROUND_COLOR]];
            }
            
            if ([btnDict valueForKey:DONE_BUTTON_TITLE]) {
                _buttonDoneTitle = [btnDict valueForKeyPath:DONE_BUTTON_TITLE];
            }
            
            if ([btnDict valueForKey:DONE_BUTTON_X_ALIGNMENT]) {
                _buttonDoneXAlignment = [ALJSONUIConfiguration stringToButtonXAlignment:[btnDict valueForKeyPath:DONE_BUTTON_X_ALIGNMENT]];
            }
            
            if ([btnDict valueForKey:DONE_BUTTON_Y_ALIGNMENT]) {
                _buttonDoneYAlignment = [ALJSONUIConfiguration stringToButtonYAlignment:[btnDict valueForKeyPath:DONE_BUTTON_Y_ALIGNMENT]];
            }

            if ([btnDict valueForKeyPath:OFFSET_X]) {
                _buttonDoneXPositionOffset = [[btnDict valueForKeyPath:OFFSET_X] floatValue];
            }
            
            if ([btnDict valueForKeyPath:OFFSET_Y]) {
                _buttonDoneYPositionOffset = [[btnDict valueForKeyPath:OFFSET_Y] floatValue];
            }
            
            if ([btnDict valueForKey:DONE_BUTTON_CORNER_RADIUS]) {
                _buttonDoneCornerRadius = [[btnDict valueForKeyPath:DONE_BUTTON_CORNER_RADIUS] floatValue];
            }
        }
        
        if ([dictionary valueForKey:SEGMENT]) {
            NSDictionary *segDict = [dictionary valueForKey:SEGMENT];
            
            if ([segDict valueForKey:SEGMENT_TITLES]) {
                _segmentTitles = [segDict valueForKey:SEGMENT_TITLES];
            }
            
            if ([segDict valueForKey:SEGMENT_MODES]) {
                _segmentModes = [segDict valueForKey:SEGMENT_MODES];
            }
            
            if ([segDict valueForKey:SEGMENT_TINT_COLOR]) {
                _segmentTintColor = [ALJSONUIConfiguration colorFromHexString:[segDict valueForKey:SEGMENT_TINT_COLOR]];
            }
            
            if ([segDict valueForKeyPath:OFFSET_X]) {
                _segmentXPositionOffset = [[segDict valueForKeyPath:OFFSET_X] floatValue];
            }
            
            if ([segDict valueForKeyPath:OFFSET_Y]) {
                _segmentYPositionOffset = [[segDict valueForKeyPath:OFFSET_Y] floatValue];
            }
        }
        
        if ([dictionary valueForKey:LABEL]) {
            NSDictionary *labDict = [dictionary valueForKey:LABEL];
            
            if ([labDict valueForKey:LABEL_TEXT]) {
                _labelText = [labDict valueForKey:LABEL_TEXT];
            }
            
            if ([labDict valueForKey:LABEL_SIZE]) {
                _labelSize = [[labDict valueForKeyPath:LABEL_SIZE] floatValue];
            }
            
            if ([labDict valueForKey:LABEL_COLOR]) {
                _labelColor = [ALJSONUIConfiguration colorFromHexString:[labDict valueForKey:LABEL_COLOR]];
            }
            
            if ([labDict valueForKeyPath:LABEL_OFFSET_X]) {
                _labelXPositionOffset = [[labDict valueForKeyPath:LABEL_OFFSET_X] floatValue];
            }
            
            if ([labDict valueForKeyPath:LABEL_OFFSET_Y]) {
                _labelYPositionOffset = [[labDict valueForKeyPath:LABEL_OFFSET_Y] floatValue];
            }
        }

    }
    return self;
}

+ (ALButtonXAlignment)stringToButtonXAlignment:(NSString *)str {
    NSDictionary *map = @{
        @"LEFT": @(ALButtonXAlignmentLeft),
        @"CENTER": @(ALButtonXAlignmentCenter),
        @"RIGHT": @(ALButtonXAlignmentRight),
    };
    
    return [[map valueForKey:str.uppercaseString] integerValue];
}

+ (ALButtonYAlignment)stringToButtonYAlignment:(NSString *)str {
    NSDictionary *map = @{
        @"TOP": @(ALButtonYAlignmentTop),
        @"CENTER": @(ALButtonYAlignmentCenter),
        @"BOTTOM": @(ALButtonYAlignmentBottom),
    };
    return [[map valueForKey:str.uppercaseString] integerValue];
}

+ (ALButtonType)stringToButtonType:(NSString *)str {
    NSDictionary *map = @{
        @"FULLWIDTH": @(ALButtonTypeFullWidth),
        @"RECT": @(ALButtonTypeRect)
    };
    return [[map valueForKey:str.uppercaseString] integerValue];
}

+ (UIColor *)colorFromHexString:(NSString *)hexString {
    unsigned rgbValue = 0;
    NSScanner *scanner = [NSScanner scannerWithString:hexString];
    // [scanner setScanLocation:1]; // bypass '#' character
    [scanner scanHexInt:&rgbValue];
    return [UIColor colorWithRed:((rgbValue & 0xFF0000) >> 16)/255.0
                           green:((rgbValue & 0xFF00) >> 8)/255.0
                            blue:(rgbValue & 0xFF)/255.0 alpha:1.0];
}


+ (NSString * _Nullable)barcodeFormatToNativeString:(NSString *)barcodeType {
    static NSDictionary<NSString *, NSString *> * barcodeFormats = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        barcodeFormats = @{
            kCodeTypeAztec: @"org.iso.Aztec",
            kCodeTypeCode128: @"org.iso.Code128",
            kCodeTypeCode39: @"org.iso.Code39",
            kCodeTypeCode93: @"com.intermec.Code93",
            kCodeTypeDataMatrix: @"org.iso.DataMatrix",
            kCodeTypeEAN13: @"org.gs1.EAN-13",
            kCodeTypeEAN8: @"org.gs1.EAN-8",
            kCodeTypeMATRIX_2_5: @"org.ansi.Interleaved2of5",
            kCodeTypeITF: @"org.gs1.ITF14",
            kCodeTypePDF417: @"org.iso.PDF417",
            kCodeTypeQR: @"org.iso.QRCode",
            kCodeTypeUPCE: @"org.gs1.UPC-E",
            kCodeTypeCodabar: @"Codabar",
            kCodeTypeDATABAR: @"org.gs1.GS1DataBar",
            kCodeTypeMICRO_QR: @"org.iso.MicroQR",
            kCodeTypeMICRO_PDF: @"org.iso.MicroPDF417"
        };
    });
    return barcodeFormats[barcodeType.uppercaseString];
}

@end

