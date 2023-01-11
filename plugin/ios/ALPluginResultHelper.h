#import <Anyline/Anyline.h>

NS_ASSUME_NONNULL_BEGIN

@interface ALResultEntry : NSObject <ALJSONStringRepresentable>

@property (nonatomic, copy) NSString *title;
@property (nonatomic, copy) NSString *value;
@property (nonatomic, assign) BOOL isMandatory;

- (instancetype)initWithTitle:(NSString *)title
                        value:(NSString *)value
                  isMandatory:(BOOL)isMandatory NS_DESIGNATED_INITIALIZER;

- (instancetype)initWithTitle:(NSString *)title value:(NSString *)value;

+ (ALResultEntry *)withTitle:(NSString *)title
                       value:(NSString *)value
                 isMandatory:(BOOL)isMandatory;

+ (ALResultEntry *)withTitle:(NSString *)title
                       value:(NSString *)value;

@end


@interface ALBarcode (ALExtras)

- (NSString *)decoded;

@end


@protocol ALResultListEnumerable

@property (nonatomic, readonly) NSArray<ALResultEntry *> *resultEntryList;

@end


@interface ALMrzResult (ALExtras) <ALResultListEnumerable>
@end

@interface ALUniversalIDResult (ALExtras) <ALResultListEnumerable>
@end

@interface ALTinResult (ALExtras) <ALResultListEnumerable>
@end

@interface ALVehicleRegistrationCertificateResult (ALExtras) <ALResultListEnumerable>
@end

@interface ALCommercialTireIDResult (ALExtras) <ALResultListEnumerable>
@end

@interface ALTireSizeResult (ALExtras) <ALResultListEnumerable>
@end

@interface ALVinResult (ALExtras) <ALResultListEnumerable>
@end

@interface ALLicensePlateResult (ALExtras) <ALResultListEnumerable>
@end

@interface ALMeterResult (ALExtras) <ALResultListEnumerable>
@end

@interface ALBarcodeResult (ALExtras) <ALResultListEnumerable>
@end

@interface ALContainerResult (ALExtras) <ALResultListEnumerable>
@end

@interface ALOcrResult (ALExtras) <ALResultListEnumerable>
@end

// TODO: need to support these (if needed)
// @interface ALJapaneseLandingPermissionResult (ALExtras) <ALResultListEnumerable>
// @end

NS_ASSUME_NONNULL_END
