//
//  ALPluginHelper.m
//  Anyline React-Native Example
//
//  Created by Daniel Albertini on 30.10.18.
//

#import "ALPluginHelper.h"

@implementation ALPluginHelper

#pragma mark - String convertions

+ (ALBarcodeFormat)barcodeFormatFromString:(NSString *)barcodeFormat {
    NSDictionary<NSString *, NSNumber *> *scanModes = [self barcodesFormatDict];
    
    return [scanModes[barcodeFormat] integerValue];
}

+ (NSString *)stringFromBarcodeFormat:(ALBarcodeFormat)barcodeFormat {
    NSDictionary<NSString *, NSNumber *> *barcodeFormats = [self barcodesFormatDict];
    return [barcodeFormats allKeysForObject:@(barcodeFormat)][0];
}

+ (NSDictionary<NSString *, NSNumber *> *)barcodesFormatDict {
    static NSDictionary<NSString *, NSNumber *> * scanModes = nil;
    
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        scanModes = @{
                      @"AZTEC" : @(ALCodeTypeAztec),
                      @"CODABAR" : @(ALCodeTypeCodabar),
                      @"CODE_39" : @(ALCodeTypeCode39),
                      @"CODE_93" : @(ALCodeTypeCode93),
                      @"CODE_128" : @(ALCodeTypeCode128),
                      @"DATA_MATRIX" : @(ALCodeTypeDataMatrix),
                      @"EAN_8" : @(ALCodeTypeEAN8),
                      @"EAN_13" : @(ALCodeTypeEAN13),
                      @"ITF" : @(ALCodeTypeITF),
                      @"PDF_417" : @(ALCodeTypePDF417),
                      @"QR_CODE" : @(ALCodeTypeQR),
                      @"RSS_14" : @(ALCodeTypeRSS14),
                      @"RSS_EXPANDED" : @(ALCodeTypeRSSExpanded),
                      @"UPC_A" : @(ALCodeTypeUPCA),
                      @"UPC_E" : @(ALCodeTypeUPCE),
                      @"UPC_EAN_EXTENSION" : @(ALCodeTypeUPCEANExtension),
                      @"UNKNOWN" : @(ALHeatMeter6),
                      };
    });
    
    return scanModes;
}

+ (ALScanMode)scanModeFromString:(NSString *)scanMode {
    NSDictionary<NSString *, NSNumber *> *scanModes = [ALPluginHelper scanModesDict];
    
    return [scanModes[scanMode] integerValue];
}

+ (NSString *)stringFromScanMode:(ALScanMode)scanMode {
    NSDictionary<NSString *, NSNumber *> *scanModes = [ALPluginHelper scanModesDict];
    
    return [scanModes allKeysForObject:@(scanMode)][0];
}

+ (NSString *)stringForOutline:(ALSquare *)square {
    return [NSString stringWithFormat:@"outline : { upLeft : { x : %f, y : %f }, upRight : { x : %f, y : %f }, downRight : { x : %f, y : %f }, downLeft : { x : %f, y : %f } }",square.upLeft.x,square.upLeft.y,square.upRight.x,square.upRight.y,square.downRight.x,square.downRight.y,square.downLeft.x,square.downLeft.y];
}

+ (NSDictionary<NSString *, NSNumber *> *)scanModesDict {
    static NSDictionary<NSString *, NSNumber *> * scanModes = nil;
    
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        scanModes = @{
                      @"AUTO_ANALOG_DIGITAL_METER" : @(ALAutoAnalogDigitalMeter),
                      @"DIAL_METER" : @(ALDialMeter),
                      @"ANALOG_METER" : @(ALAnalogMeter),
                      @"BARCODE" : @(ALBarcode),
                      @"SERIAL_NUMBER" : @(ALSerialNumber),
                      @"DOT_MATRIX_METER" : @(ALDotMatrixMeter),
                      @"DIGITAL_METER" : @(ALDigitalMeter),
                      @"HEAT_METER_4" : @(ALHeatMeter4),
                      @"HEAT_METER_5" : @(ALHeatMeter5),
                      @"HEAT_METER_6" : @(ALHeatMeter6),
                      };
    });
    
    return scanModes;
}

+ (NSString *)barcodeFormatForNativeString:(NSString *)barcodeType {
    
    static NSDictionary<NSString *, NSString *> * barcodeFormats = nil;
    
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"
        barcodeFormats = @{
                           @"AVMetadataObjectTypeUPCECode" : kCodeTypeUPCE,
                           @"AVMetadataObjectTypeCode39Code" : kCodeTypeCode39,
                           @"AVMetadataObjectTypeCode39Mod43Code" : kCodeTypeCode39,
                           @"AVMetadataObjectTypeEAN13Code" : kCodeTypeEAN13,
                           @"AVMetadataObjectTypeEAN8Code" : kCodeTypeEAN8,
                           @"AVMetadataObjectTypeCode93Code" : kCodeTypeCode93,
                           @"AVMetadataObjectTypeCode128Code" : kCodeTypeCode128,
                           @"AVMetadataObjectTypePDF417Code" : kCodeTypePDF417,
                           @"AVMetadataObjectTypeQRCode" : kCodeTypeQR,
                           @"AVMetadataObjectTypeAztecCode" : kCodeTypeAztec,
                           @"AVMetadataObjectTypeInterleaved2of5Code" : kCodeTypeITF,
                           @"AVMetadataObjectTypeITF14Code" : kCodeTypeITF,
                           @"AVMetadataObjectTypeDataMatrixCode" : kCodeTypeDataMatrix,
                           };
#pragma clang diagnostic pop
    });
    
    return barcodeFormats[barcodeType];
}

#pragma mark - Filesystem handling

+ (NSString *)saveImageToFileSystem:(UIImage *)image {
    return [self saveImageToFileSystem:image compressionQuality:0.9];
}

+ (NSString *)saveImageToFileSystem:(UIImage *)image compressionQuality:(CGFloat)compressionQuality {
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES);
    NSString *basePath = ([paths count] > 0) ? [paths objectAtIndex:0] : nil;
    
    
    NSData *binaryImageData = UIImageJPEGRepresentation(image, compressionQuality);
    NSString *uuid = [NSUUID UUID].UUIDString;
    NSString *imagePath = [NSString stringWithFormat:@"%@.jpg",uuid];
    
    NSString *fullPath = [basePath stringByAppendingPathComponent:imagePath];
    [binaryImageData writeToFile:fullPath atomically:YES];
    
    return fullPath;
}

#pragma mark - UI helpers

+ (UILabel *)createLabelForView:(UIView *)view {
    
    UILabel *scannedLabel = [[UILabel alloc] initWithFrame:CGRectMake(0, 0, view.frame.size.width, 44)];
    scannedLabel.center = CGPointMake(view.center.x, view.center.y+166);
    
    scannedLabel.alpha = 0.0;
    scannedLabel.font = [UIFont fontWithName:@"HelveticaNeue" size:33];
    scannedLabel.textColor = [UIColor whiteColor];
    scannedLabel.textAlignment = NSTextAlignmentCenter;
    
    [view addSubview:scannedLabel];
    
    return scannedLabel;
}

+ (UISegmentedControl *)createSegmentForViewController:(UIViewController *)viewController
                                                config:(ALJsonUIConfiguration *)config
                                              scanMode:(ALScanMode)scanMode {
    UISegmentedControl *segment = [[UISegmentedControl alloc] initWithItems:config.segmentTitles];
    
    segment.tintColor = config.segmentTintColor;
    segment.hidden = YES;
    
    NSInteger index = [config.segmentModes indexOfObject:[ALPluginHelper stringFromScanMode:scanMode]];
    [segment setSelectedSegmentIndex:index];
    
    [segment addTarget:viewController action:@selector(segmentChange:) forControlEvents:UIControlEventValueChanged];
    
    [viewController.view addSubview:segment];
    
    return segment;
}

+ (UIButton *)createButtonForViewController:(UIViewController *)viewController
                                     config:(ALJsonUIConfiguration *)config {
    
    UIButton *doneButton = [UIButton buttonWithType:UIButtonTypeCustom];
    [doneButton setTitle:config.buttonDoneTitle
                forState:UIControlStateNormal];
    
    [doneButton addTarget:viewController action:@selector(doneButtonPressed:) forControlEvents:UIControlEventTouchUpInside];
    [viewController.view addSubview:doneButton];
    
    [ALPluginHelper updateButtonPosition:doneButton
                       withConfiguration:config
                                  onView:viewController.view];
    
    return doneButton;
}

+ (ALRoundedView *)createRoundedViewForViewController:(UIViewController *)viewController {
    ALRoundedView *roundedView = [[ALRoundedView alloc] initWithFrame:CGRectMake(20, 115, viewController.view.bounds.size.width - 40, 30)];
    roundedView.fillColor = [UIColor colorWithRed:98.0/255.0 green:39.0/255.0 blue:232.0/255.0 alpha:0.6];
    roundedView.textLabel.text = @"";
    roundedView.alpha = 0;
    [viewController.view addSubview:roundedView];
    
    return roundedView;
}

+ (void)updateButtonPosition:(UIButton *)button
           withConfiguration:(ALJsonUIConfiguration *)conf
                      onView:(UIView *)view {
    
    button.titleLabel.font = [UIFont fontWithName:conf.buttonDoneFontName size:conf.buttonDoneFontSize];
    [button setTitleColor:conf.buttonDoneTextColor forState:UIControlStateNormal];
    [button setTitleColor:conf.buttonDoneTextColorHighlighted forState:UIControlStateHighlighted];
    
    button.backgroundColor = conf.buttonDoneBackgroundColor;
    button.translatesAutoresizingMaskIntoConstraints = NO;
    button.layer.cornerRadius = conf.buttonDoneCornerRadius;
    
    switch (conf.buttonType) {
        case ALButtonTypeFullWidth:
            // Width constraint
            [view addConstraint:[NSLayoutConstraint constraintWithItem:button
                                                             attribute:NSLayoutAttributeWidth
                                                             relatedBy:NSLayoutRelationEqual
                                                                toItem:view
                                                             attribute:NSLayoutAttributeWidth
                                                            multiplier:1.0
                                                              constant:0]];
            break;
            
        case ALButtonTypeRect:
            [button sizeToFit];
            break;
            
        default:
            break;
    }
    
    switch (conf.buttonDoneXAlignment) {
        case ALButtonXAlignmentCenter:
            [view addConstraint:[NSLayoutConstraint constraintWithItem:button
                                                             attribute:NSLayoutAttributeCenterX
                                                             relatedBy:NSLayoutRelationEqual
                                                                toItem:view
                                                             attribute:NSLayoutAttributeCenterX
                                                            multiplier:1.0
                                                              constant:conf.buttonDoneXPositionOffset]];
            break;
        case ALButtonXAlignmentLeft:
            [view addConstraint:[NSLayoutConstraint constraintWithItem:button
                                                             attribute:NSLayoutAttributeLeft
                                                             relatedBy:NSLayoutRelationEqual
                                                                toItem:view
                                                             attribute:NSLayoutAttributeLeft
                                                            multiplier:1.0
                                                              constant:MAX(conf.buttonDoneXPositionOffset,0)]];
            break;
        case ALButtonXAlignmentRight:
            [view addConstraint:[NSLayoutConstraint constraintWithItem:button
                                                             attribute:NSLayoutAttributeRight
                                                             relatedBy:NSLayoutRelationEqual
                                                                toItem:view
                                                             attribute:NSLayoutAttributeRight
                                                            multiplier:1.0
                                                              constant:MIN(conf.buttonDoneXPositionOffset,0)]];
            break;
            
        default:
            break;
    }
    
    switch (conf.buttonDoneYAlignment) {
        case ALButtonYAlignmentTop:
            // Align Top
            [view addConstraint:[NSLayoutConstraint constraintWithItem:button
                                                             attribute:NSLayoutAttributeTop
                                                             relatedBy:NSLayoutRelationEqual
                                                                toItem:view
                                                             attribute:NSLayoutAttributeTop
                                                            multiplier:1.0
                                                              constant:MAX(conf.buttonDoneYPositionOffset,0)]];
            break;
        case ALButtonYAlignmentBottom:
            // Align Bottom
            [view addConstraint:[NSLayoutConstraint constraintWithItem:button
                                                             attribute:NSLayoutAttributeBottom
                                                             relatedBy:NSLayoutRelationEqual
                                                                toItem:view
                                                             attribute:NSLayoutAttributeBottom
                                                            multiplier:1.0
                                                              constant:MIN(conf.buttonDoneYPositionOffset,0)]];
            
            break;
        case ALButtonYAlignmentCenter:
            // Center vertically
            [view addConstraint:[NSLayoutConstraint constraintWithItem:button
                                                             attribute:NSLayoutAttributeCenterY
                                                             relatedBy:NSLayoutRelationEqual
                                                                toItem:view
                                                             attribute:NSLayoutAttributeCenterY
                                                            multiplier:1.0
                                                              constant:conf.buttonDoneYPositionOffset]];
            break;
            
        default:
            break;
    }
}

#pragma mark - Create Result Dictionaries

+ (NSDictionary *)dictionaryForBarcodeResults:(NSMutableArray<NSDictionary *> *)detectedBarcodes
                                  barcodeType:(NSString *)barcodeType
                                   scanResult:(NSString *)scanResult {
    for (NSMutableDictionary<NSString *, NSString *> *barcode in detectedBarcodes) {
        if ([[barcode objectForKey:@"value"] isEqualToString:scanResult]) {
            return nil;
        }
    }
    
    NSMutableDictionary *barcode = [NSMutableDictionary dictionaryWithCapacity:2];
    
    barcode[@"value"] = scanResult;
    barcode[@"format"] = [ALPluginHelper barcodeFormatForNativeString:barcodeType];
    
    return barcode;
}

+ (NSDictionary *)dictionaryForMeterResult:(ALMeterResult *)scanResult
                          detectedBarcodes:(NSMutableArray<NSDictionary *> *)detectedBarcodes
                                   outline:(ALSquare *)outline
                                   quality:(NSInteger)quality {
    CGFloat dividedCompRate = (CGFloat)quality/100;
    
    NSMutableDictionary *dictResult = [NSMutableDictionary dictionaryWithCapacity:4];
    
    switch (scanResult.scanMode) {
        case ALDigitalMeter:
            [dictResult setObject:@"Digital Meter" forKey:@"meterType"];
            break;
        case ALDialMeter:
            [dictResult setObject:@"Dial Meter" forKey:@"meterType"];
            break;
        case ALHeatMeter4:
        case ALHeatMeter5:
        case ALHeatMeter6:
            [dictResult setObject:@"Heat Meter" forKey:@"meterType"];
            break;
        case ALSerialNumber:
            [dictResult setObject:@"Serial Number" forKey:@"meterType"];
            break;
        default:
            [dictResult setObject:@"Electric Meter" forKey:@"meterType"];
            break;
    }
    
    [dictResult setObject:[ALPluginHelper stringFromScanMode:scanResult.scanMode] forKey:@"scanMode"];
    
    [dictResult setObject:scanResult.result forKey:@"reading"];
    
    NSString *imagePath = [ALPluginHelper saveImageToFileSystem:scanResult.image compressionQuality:dividedCompRate];
    
    [dictResult setValue:imagePath forKey:@"imagePath"];
    
    NSString *fullImagePath = [ALPluginHelper saveImageToFileSystem:scanResult.fullImage compressionQuality:dividedCompRate];
    
    [dictResult setValue:fullImagePath forKey:@"fullImagePath"];
    
    if (detectedBarcodes && detectedBarcodes.count != 0) {
        [dictResult setObject:detectedBarcodes forKey:@"detectedBarcodes"];
    }
    
    [dictResult setValue:@(scanResult.confidence) forKey:@"confidence"];
    [dictResult setValue:[ALPluginHelper stringForOutline:outline] forKey:@"outline"];
    
    return dictResult;
}

+ (NSDictionary *)dictionaryForIDResult:(ALIDResult *)scanResult
                       detectedBarcodes:(NSMutableArray<NSDictionary *> *)detectedBarcodes
                                outline:(ALSquare *)outline
                                quality:(NSInteger)quality {
    CGFloat dividedCompRate = (CGFloat)quality/100;
    
    NSMutableDictionary *dictResult = nil;
    
    NSString *imagePath = [self saveImageToFileSystem:scanResult.image compressionQuality:dividedCompRate];
    
    NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
    [formatter setDateFormat:@"yyyy.MM.dd"];
    
    if ([scanResult.result isKindOfClass:[ALMRZIdentification class]]) {
        ALMRZIdentification *mrzIdentification = (ALMRZIdentification *)scanResult.result;
        
        dictResult = [[scanResult.result dictionaryWithValuesForKeys:@[@"surname",
                                                                       @"givenNames",
                                                                       @"dateOfBirth",
                                                                       @"dateOfExpiry",
                                                                       @"documentNumber",
                                                                       @"documentType",
                                                                       @"issuingCountryCode",
                                                                       @"nationalityCountryCode",
                                                                       @"sex",
                                                                       @"personalNumber",
                                                                       @"optionalData",
                                                                       @"mrzString",
                                                                       @"checkdigitExpirationDate",
                                                                       @"dateOfIssue",
                                                                       @"checkDigitDateOfExpiry",
                                                                       @"checkDigitDocumentNumber",
                                                                       @"checkDigitDateOfBirth",
                                                                       @"checkDigitFinal",
                                                                       @"checkDigitPersonalNumber",
                                                                       @"allCheckDigitsValid"]] mutableCopy];
        
        if ([[scanResult.result documentType] isEqualToString:@"ID"] && [[scanResult.result issuingCountryCode] isEqualToString:@"D"]) {
            [dictResult setValue:mrzIdentification.address forKey:@"address"];
        }
        [dictResult setValue:[ALPluginHelper stringForDate:[scanResult.result dayOfBirthDateObject]] forKey:@"dateOfIssueObject"];
    } else if ([scanResult.result isKindOfClass:[ALDrivingLicenseIdentification class]]) {
        dictResult = [[scanResult.result dictionaryWithValuesForKeys:@[@"surname",
                                                                       @"givenNames",
                                                                       @"dateOfBirth",
                                                                       @"placeOfBirth",
                                                                       @"dateOfIssue",
                                                                       @"dateOfExpiry",
                                                                       @"authority",
                                                                       @"documentNumber",
                                                                       @"categories",
                                                                       @"drivingLicenseString"]] mutableCopy];
        [dictResult setValue:[ALPluginHelper stringForDate:[scanResult.result dayOfBirthDateObject]] forKey:@"dateOfIssueObject"];
    } else if ([scanResult.result isKindOfClass:[ALGermanIDFrontIdentification class]]) {
        ALGermanIDFrontIdentification *germanIDFrontIdentification = (ALGermanIDFrontIdentification *)scanResult.result;
        dictResult = [[germanIDFrontIdentification dictionaryWithValuesForKeys:@[@"surname",
                                                                                 @"givenNames",
                                                                                 @"dateOfBirth",
                                                                                 @"nationality",
                                                                                 @"placeOfBirth",
                                                                                 @"dateOfExpiry",
                                                                                 @"documentNumber",
                                                                                 @"cardAccessNumber",
                                                                                 @"germanIdFrontString"]] mutableCopy];
    }
    
    [dictResult setValue:[ALPluginHelper stringForDate:[scanResult.result dayOfBirthDateObject]] forKey:@"dateOfBirthObject"];
    [dictResult setValue:[ALPluginHelper stringForDate:[scanResult.result expirationDateObject]] forKey:@"dateOfExpiryObject"];
    
    [dictResult setValue:imagePath forKey:@"imagePath"];
    
    [dictResult setValue:@(scanResult.confidence) forKey:@"confidence"];
    [dictResult setValue:[self stringForOutline:outline] forKey:@"outline"];
    
    return dictResult;
}
                
+ (NSDictionary *)dictionaryForOCRResult:(ALOCRResult *)scanResult
                        detectedBarcodes:(NSMutableArray<NSDictionary *> *)detectedBarcodes
                                 outline:(ALSquare *)outline
                                 quality:(NSInteger)quality {
    CGFloat dividedCompRate = (CGFloat)quality/100;
    
    NSMutableDictionary *dictResult = [NSMutableDictionary dictionaryWithCapacity:4];
    
    [dictResult setObject:scanResult.result forKey:@"text"];
    
    NSString *imagePath = [ALPluginHelper saveImageToFileSystem:scanResult.image compressionQuality:dividedCompRate];
    
    [dictResult setValue:imagePath forKey:@"imagePath"];
    
    [dictResult setValue:@(scanResult.confidence) forKey:@"confidence"];
    [dictResult setValue:[ALPluginHelper stringForOutline:outline] forKey:@"outline"];
    
    if (detectedBarcodes && detectedBarcodes.count != 0) {
        [dictResult setObject:detectedBarcodes forKey:@"detectedBarcodes"];
    }
    
    return dictResult;
}

+ (NSDictionary *)dictionaryForBarcodeResult:(ALBarcodeResult *)scanResult
                                     outline:(ALSquare *)outline
                                     quality:(NSInteger)quality {
    CGFloat dividedCompRate = (CGFloat)quality/100;
    
    NSMutableDictionary *dictResult = [NSMutableDictionary dictionaryWithCapacity:2];
    
    [dictResult setObject:(NSString *)scanResult.result forKey:@"value"];
    if (!scanResult.barcodeFormat) {
        [dictResult setObject:@"Unknown" forKey:@"barcodeFormat"];
    } else {
        [dictResult setObject:[ALPluginHelper stringFromBarcodeFormat:scanResult.barcodeFormat] forKey:@"barcodeFormat"];
    }
    
    
    NSString *imagePath = [ALPluginHelper saveImageToFileSystem:scanResult.image compressionQuality:dividedCompRate];
    
    [dictResult setValue:imagePath forKey:@"imagePath"];
    
    [dictResult setValue:@(scanResult.confidence) forKey:@"confidence"];
    [dictResult setValue:[ALPluginHelper stringForOutline:outline] forKey:@"outline"];
    
    return dictResult;
}

+ (NSDictionary *)dictionaryForLicensePlateResult:(ALLicensePlateResult *)scanResult
                                 detectedBarcodes:(NSMutableArray<NSDictionary *> *)detectedBarcodes
                                          outline:(ALSquare *)outline
                                          quality:(NSInteger)quality {
    CGFloat dividedCompRate = (CGFloat)quality/100;
    // Get the imagepath from result
    NSString *imagePath = [ALPluginHelper saveImageToFileSystem:scanResult.image compressionQuality:dividedCompRate];
    
    //Create the result Object
    NSMutableDictionary *dictResult = [NSMutableDictionary dictionaryWithCapacity:5];
    [dictResult setValue:scanResult.country forKey:@"country"];
    [dictResult setValue:scanResult.result forKey:@"licensePlate"];
    [dictResult setValue:[ALPluginHelper stringForOutline:outline] forKey:@"outline"];
    [dictResult setValue:@(scanResult.confidence) forKey:@"confidence"];
    [dictResult setValue:imagePath forKey:@"imagePath"];
    
    if (detectedBarcodes && detectedBarcodes.count != 0) {
        [dictResult setObject:detectedBarcodes forKey:@"detectedBarcodes"];
    }
    
    return dictResult;
}

+ (NSDictionary *)dictionaryForTransformedImage:(UIImage *)transformedImage
                                      fullFrame:(UIImage *)fullFrame
                                        quality:(NSInteger)quality
                               detectedBarcodes:(NSMutableArray<NSDictionary *> *)detectedBarcodes
                                        outline:(ALSquare *)outline {
    NSMutableDictionary *dictResult = [NSMutableDictionary dictionaryWithCapacity:4];
    
    CGFloat dividedCompRate = (CGFloat)quality/100;
    NSString *imagePath = [ALPluginHelper saveImageToFileSystem:transformedImage compressionQuality:dividedCompRate];
    NSString *fullImagePath = [ALPluginHelper saveImageToFileSystem:fullFrame compressionQuality:dividedCompRate];
    NSString *outlineString = [ALPluginHelper stringForOutline:outline];
    
    
    [dictResult setValue:imagePath forKey:@"imagePath"];
    [dictResult setValue:fullImagePath forKey:@"fullImagePath"];
    [dictResult setValue:outlineString forKey:@"outline"];
    
    if (detectedBarcodes && detectedBarcodes.count != 0) {
        [dictResult setObject:detectedBarcodes forKey:@"detectedBarcodes"];
    }
    
    return dictResult;
}
                
                
#pragma mark - Date Parsing Utils
                
+ (NSString *)stringForDate:(NSDate *)date {
    if (!date) {
        return nil;
    }
    
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    [dateFormatter setTimeZone:[NSTimeZone timeZoneWithAbbreviation:@"UTC+0:00"]];
    [dateFormatter setDateFormat:@"EEE MMM d hh:mm:ss ZZZZ yyyy"];
    
    //Date will be formatted to string - e.g.: "Fri Jan 11 12:00:00 GMT+0:00 1980"
    NSString *dateString = [dateFormatter stringFromDate:date];
    
    return dateString;
}

@end
