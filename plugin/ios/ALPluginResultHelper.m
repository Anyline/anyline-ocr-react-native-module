#import "ALPluginResultHelper.h"
#import <Anyline/Anyline.h>
#import "ALUniversalIDResultHelper.h"
#import <objc/runtime.h>

NS_ASSUME_NONNULL_BEGIN

@implementation ALResultEntry

- (instancetype)init {
    return [self initWithTitle:@"" value:@"" isMandatory:YES];
}

- (instancetype)initWithTitle:(NSString *)title value:(NSString *)value isMandatory:(BOOL)isMandatory {
    if (self = [super init]) {
        self.title = title;
        self.value = value;
        self.isMandatory = isMandatory;
    }
    return self;
}

- (instancetype)initWithTitle:(NSString *)title value:(NSString *)value {
    return [self initWithTitle:title value:value isMandatory:YES];
}

+ (ALResultEntry *)withTitle:(NSString *)title value:(NSString *)value isMandatory:(BOOL)isMandatory {
    return [[ALResultEntry alloc] initWithTitle:title value:value isMandatory:isMandatory];
}

+ (ALResultEntry *)withTitle:(NSString *)title value:(NSString *)value {
    return [self.class withTitle:title value:value isMandatory:YES];
}

- (nonnull NSString *)asJSONString {
    return [self asJSONStringPretty:NO];
}

- (nonnull NSString *)asJSONStringPretty:(BOOL)isPretty {
    return [self toJSONStringPretty:isPretty error:nil];
}

- (NSString * _Nullable)toJSONString:(NSError *__autoreleasing  _Nullable * _Nullable)error {
    return [self toJSONStringPretty:NO error:error];
}

- (NSString * _Nullable)toJSONStringPretty:(BOOL)isPretty
                                     error:(NSError *__autoreleasing  _Nullable * _Nullable)error {
    return [@{
        @"field": self.title,
        @"value": self.value,
    } toJSONStringPretty:isPretty error:error];
}

@end


@interface ALPluginResultHelper

+ (NSString *)dateStringFromString:(NSString *)string;

@end


@interface ALUniversalIDResultField (ALExtras)

- (NSString * _Nullable)latinText;
- (NSString * _Nullable)arabicText;
- (NSString * _Nullable)cyrillicText;

@end


@interface NSMutableArray (ALExtras)

- (BOOL)appendValue:(NSString * _Nullable)value forKey:(NSString *)key;
- (BOOL)appendValue:(NSString * _Nullable)value forKey:(NSString *)key
         scriptCode:(NSString * _Nullable)scriptCode;
- (BOOL)appendValue:(NSString * _Nullable)value forKey:(NSString *)key
         scriptCode:(NSString * _Nullable)scriptCode
           spellOut:(BOOL)spellOut;

@end


@interface NSString (ALExtras)

- (NSString *)formattedDate;

@end


@implementation ALResultEntry (ALExtras)

- (NSString *)description {
    return [NSString stringWithFormat:@"ALResultEntry: %@: %@", self.title, self.value];
}

@end


@implementation NSMutableArray (ALExtras)

- (BOOL)appendValue:(NSString * _Nullable)value
             forKey:(NSString *)key
         scriptCode:(NSString * _Nullable)scriptCode
           spellOut:(BOOL)spellOut {
    if (!value.length) {
        return NO;
    }
    value = [value stringByTrimmingCharactersInSet:NSCharacterSet.whitespaceCharacterSet];
    if (scriptCode.length) {
        key = [NSString stringWithFormat:@"%@-%@", key, scriptCode];
    }
    [self addObject:[ALResultEntry withTitle:key value:value]];
    return YES;
}

- (BOOL)appendValue:(NSString * _Nullable)value forKey:(NSString *)key {
    return [self appendValue:value forKey:key scriptCode:nil];
}

- (BOOL)appendValue:(NSString * _Nullable)value forKey:(NSString *)key scriptCode:(NSString * _Nullable)scriptCode {
    return [self appendValue:value forKey:key scriptCode:scriptCode spellOut:NO];
}

@end


@implementation NSString (ALExtras)

- (NSString *)formattedDate {
    return [ALUniversalIDResultHelper dateStringFromString:self];
}

@end


@implementation ALTinResult (ALExtras)

- (NSArray<ALResultEntry *> *)resultEntryList {
    return @[ [ALResultEntry withTitle:@"Tire Identification Number" value:self.text] ];
}

@end


@implementation ALCommercialTireIDResult (ALExtras)

- (NSArray<ALResultEntry *> *)resultEntryList {
    return @[ [ALResultEntry withTitle:@"Commercial Tire ID" value:self.text] ];
}

@end


@implementation ALTireSizeResult (ALExtras)

- (NSArray<ALResultEntry *> *)resultEntryList {
    return @[ [ALResultEntry withTitle:@"Tire Size Configuration" value:self.text.text] ];
}

@end


@implementation ALVinResult (ALExtras)

- (NSArray<ALResultEntry *> *)resultEntryList {
    return @[ [ALResultEntry withTitle:@"Vehicle Identification Number" value:self.text] ];
}

@end

@implementation ALContainerResult (ALExtras)

- (NSArray<ALResultEntry *> *)resultEntryList {
    return @[ [ALResultEntry withTitle:@"Shipping Container Number" value:self.text] ];
}

@end

@implementation ALOcrResult (ALExtras)

- (NSArray<ALResultEntry *> *)resultEntryList {
    return @[ [ALResultEntry withTitle:@"OCR Result" value:self.text] ];
}

@end

@implementation ALVehicleRegistrationCertificateResult (ALExtras)

- (NSArray<ALResultEntry *> *)resultEntryList {

    NSMutableArray<ALResultEntry *> *ret = [NSMutableArray array];

    [ret appendValue:self.result.firstName.text forKey:@"First Name"];
    [ret appendValue:self.result.lastName.text forKey:@"Last Name"];
    [ret appendValue:self.result.address.text forKey:@"Address"];
    [ret appendValue:self.result.brand.text forKey:@"Brand"];
    [ret appendValue:self.result.documentNumber.text forKey:@"Document Number"];
    [ret appendValue:self.result.firstIssued.text forKey:@"First Issued"];
    [ret appendValue:self.result.licensePlate.text forKey:@"License Plate"];
    [ret appendValue:self.result.vehicleIdentificationNumber.text forKey:@"Vehicle Identification Number"];

    [ret appendValue:self.result.vehicleType.text forKey:@"Vehicle Type"];
    [ret appendValue:self.result.displacement.text forKey:@"Displacement"];
    [ret appendValue:self.result.tire.text forKey:@"Tire"];

    [ret appendValue:self.result.manufacturerCode.text forKey:@"Manufacturer Code"];
    [ret appendValue:self.result.vehicleTypeCode.text forKey:@"Vehicle Type Code"];

    // OTHER KNOWN FIELDS:
    //    documentCategoryDefinition;
    //    documentRegionDefinition;
    //    documentSideDefinition;
    //    documentTypeDefinition;
    //    documentVersionsDefinition;
    //    formattedFirstIssued;
    return ret;
}

@end


@implementation ALUniversalIDResult (ALExtras)

- (NSArray<ALResultEntry *> *)resultEntryList {

    NSMutableArray<ALResultEntry *> *resultData = [NSMutableArray array];
    NSCharacterSet *underscores = [NSCharacterSet characterSetWithCharactersInString:@"_"];
    NSArray <NSString*> *fieldNames = [ALUniversalIDResultHelper fieldNames];
    [fieldNames enumerateObjectsUsingBlock:^(NSString *fieldNameWithUnderscore,
                                             NSUInteger idx,
                                             BOOL * _Nonnull stop) {

        // ACO: uninteresting fields (those that end with "Definition")
        if ([fieldNameWithUnderscore hasSuffix:@"Definition"]) {
            return; // skip
        }

        NSString *fieldName = [fieldNameWithUnderscore stringByTrimmingCharactersInSet:underscores];

        // must work because the field names were obtained via reflection
        ALUniversalIDResultField *field = [self.result valueForKey:fieldName];
        if (![fieldName localizedCaseInsensitiveContainsString:@"formatted"]) {
            ALResultEntry *entry;
            entry = [ALUniversalIDResultHelper resultEntryFromFieldName:fieldName value:field.latinText];
            if (entry) {
                [resultData addObject:entry];
            }
            entry = [ALUniversalIDResultHelper resultEntryFromFieldName:fieldName value:field.arabicText scriptCode:@"ara"];
            if (entry) {
                [resultData addObject:entry];
            }
            entry = [ALUniversalIDResultHelper resultEntryFromFieldName:fieldName value:field.cyrillicText scriptCode:@"cyr"];
            if (entry) {
                [resultData addObject:entry];
            }
        } else {
            NSString *fieldNameTitleCase = [ALUniversalIDResultHelper camelCaseToTitleCaseModified:fieldName];
            NSString *fieldNameDisplay = [NSString stringWithFormat:@"%@", fieldNameTitleCase];

            // The idea is to replace an map with the same key without "Formatted "
            // so if "Date of Birth" and "Formatted Date of Birth" are both found, then only the "Date of Birth" entry is
            // found, but it takes on the value from what would be "Formatted Date of Birth"
            [resultData enumerateObjectsUsingBlock:^(ALResultEntry * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
                NSString *title = [fieldNameDisplay stringByReplacingOccurrencesOfString:@"Formatted " withString:@""];
                if ([obj.title localizedCaseInsensitiveContainsString:title]) {
                    obj.value = field.latinText;
                }
            }];
        }
    }];
    return [ALUniversalIDResultHelper sortedResultListFrom:resultData];
}

@end


@implementation ALMrzResult (ALExtras)

- (NSArray<ALResultEntry *> *)resultEntryList {

    NSMutableArray<ALResultEntry *> *resultData = [NSMutableArray array];

    // ACO I think we give VIZ fields priority if they are found
    [resultData appendValue:self.givenNames forKey:@"Given Names"];
    [resultData appendValue:self.surname forKey:@"Surname"];
    [resultData appendValue:self.sex forKey:@"Sex"];
    [resultData appendValue:self.dateOfBirthObject.formattedDate forKey:@"Date of Birth"];
    [resultData appendValue:self.documentType forKey:@"Document Type"];
    [resultData appendValue:self.documentNumber forKey:@"Document Number"];
    [resultData appendValue:self.dateOfExpiryObject.formattedDate forKey:@"Date of Expiry"];
    [resultData appendValue:self.nationalityCountryCode forKey:@"Nationality"];
    [resultData appendValue:self.personalNumber forKey:@"Personal Number" scriptCode:nil spellOut:YES];

    // VIZ fields
    [resultData appendValue:self.vizGivenNames forKey:@"Given Names (VIZ)"];
    [resultData appendValue:self.vizSurname forKey:@"Surname (VIZ)"];
    [resultData appendValue:self.vizAddress forKey:@"Address (VIZ)"];
    [resultData appendValue:self.vizDateOfBirthObject.formattedDate forKey:@"Date of Birth (VIZ)"];
    [resultData appendValue:self.vizDateOfExpiry.formattedDate forKey:@"Date of Expiry (VIZ)"];
    [resultData appendValue:self.vizDateOfIssueObject.formattedDate forKey:@"Date of Issue (VIZ)"];

    return resultData;
}

@end


@implementation ALUniversalIDResultField (ALExtras)

- (NSString * _Nullable)latinText {
    return [self.textValues.latin.text stringByTrimmingCharactersInSet:NSCharacterSet.whitespaceCharacterSet];
}

- (NSString * _Nullable)arabicText {
    return [self.textValues.arabic.text stringByTrimmingCharactersInSet:NSCharacterSet.whitespaceCharacterSet];
}

- (NSString * _Nullable)cyrillicText {
    return [self.textValues.cyrillic.text stringByTrimmingCharactersInSet:NSCharacterSet.whitespaceCharacterSet];
}

@end


@implementation ALLicensePlateResult (ALExtras)

- (NSArray<ALResultEntry *> *)resultEntryList {
    NSMutableArray<ALResultEntry *> *ret = [NSMutableArray array];
    [ret appendValue:self.plateText forKey:@"Plate Text"];
    [ret appendValue:self.country.value forKey:@"Country"];
    [ret appendValue:self.area.value forKey:@"Area"];
    return ret;
}

@end


@implementation ALBarcodeResult (ALExtras)

- (NSArray<ALResultEntry *> *)resultEntryList {
    NSMutableArray<ALResultEntry *> *ret = [NSMutableArray array];
    for (ALBarcode *barcode in self.barcodes) {
        ALBodyPart *aamvaData = barcode.aamva.bodyPart;
        if (aamvaData) { // PDF417 special standard
            NSCharacterSet *underscores = [NSCharacterSet characterSetWithCharactersInString:@"_"];
            NSArray<NSString *> *fields = [self.class aamvaFieldNames];
            for (NSString *field in fields) {
                NSString *value;
                if ((value = [aamvaData valueForKey:field])) {

                    NSString *betterFieldName = [ALUniversalIDResultHelper camelCaseToTitleCaseModified:[field stringByTrimmingCharactersInSet:underscores]];
                    // "City", "DateOfBirth", etc
                    [ret appendValue:value forKey:[NSString stringWithFormat:@"%@ (AAMVA)", betterFieldName]];
                }
            }
        } else {
            [ret appendValue:barcode.decoded forKey:@"Barcode"];
            [ret appendValue:barcode.format forKey:@"Format"];

            // coordinates (as a comma separated string)
            NSMutableArray<NSString *> *coordStrArr = [NSMutableArray array];
            for (NSNumber *number in barcode.coordinates) {
                [coordStrArr addObject:[number stringValue]];
            }
            [ret appendValue:[coordStrArr componentsJoinedByString:@","] forKey:@"Coordinates"];
        }
    }
    return ret;
}

// This generates a list of fields found in ALBodyPart (an ALAamva property) during runtime.
+ (NSArray<NSString *> *)aamvaFieldNames {
    // ------------
    unsigned int count;
    Ivar* ivars = class_copyIvarList(ALBodyPart.class, &count);
    NSMutableArray *ivarArray = [NSMutableArray arrayWithCapacity:count];
    for (int i = 0; i < count ; i++) {
        const char *ivarName = ivar_getName(ivars[i]);
        [ivarArray addObject:[NSString stringWithCString:ivarName encoding:NSUTF8StringEncoding]];
    }
    free(ivars);
    return ivarArray;
}

@end


@implementation ALMeterResult (ALExtras)

- (NSArray<ALResultEntry *> *)resultEntryList {
    NSMutableArray<ALResultEntry *> *ret = [NSMutableArray array];
    NSString *reading = self.value;
    if (self.unit.length) {
        reading = [NSString stringWithFormat:@"%@ %@", reading, self.unit];
    }
    [ret appendValue:reading forKey:@"Meter Reading"];
    return ret;
}

@end


@implementation ALBarcode (ALExtras)

- (NSString *)decoded {
    NSString *barcodeResultStr = self.value;
    if (self.isBase64) {
        barcodeResultStr = self.value; // set the fallback if this fails
        NSData *data = [[NSData alloc] initWithBase64EncodedString:self.value
                                                           options:0];
        if (data) {
            NSString *decodedStr = [[NSString alloc] initWithData:data
                                                         encoding:NSUTF8StringEncoding];
            if (decodedStr.length > 0) {
                barcodeResultStr = decodedStr;
            }
        }
    }
    return barcodeResultStr;
}

@end

NS_ASSUME_NONNULL_END
