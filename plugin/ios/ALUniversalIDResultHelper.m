#import "ALUniversalIDResultHelper.h"
#import "ALPluginResultHelper.h"
#import <Anyline/Anyline.h>
#import <objc/runtime.h>

@implementation ALUniversalIDResultHelper

// these are shown in order for the ID scan results displayed, unless that field is blank or null for
// the sample. The list of field names can be found in ALIDResult.
+ (NSArray<NSString *> *)universalIDFieldsToSelect {
    return @[
        @"_fullName",
        @"_firstName",
        @"_lastName",
        @"_nationality",
        @"_sex",
        @"_dateOfExpiry",
        @"_dateOfBirth",
        @"_placeOfBirth",
        @"_dateOfIssue",
        @"_address",
        @"_authority",
        @"_documentNumber"
    ];
}

// This generates a list of fields in the ALIDResult during runtime.
+ (NSArray<NSString *> *)fieldNames {
    unsigned int count;
    Ivar* ivars = class_copyIvarList(ALIDResult.class, &count);
    NSMutableArray *ivarArray = [NSMutableArray arrayWithCapacity:count];
    for (int i = 0; i < count ; i++) {
        const char *ivarName = ivar_getName(ivars[i]);
        [ivarArray addObject:[NSString stringWithCString:ivarName encoding:NSUTF8StringEncoding]];
    }
    free(ivars);
    return ivarArray;
}

/// Ordered list of ID field names that should be, when present, on the top of the list
/// displayed.
+ (NSArray *)priorityIDFieldNames {
    return @[
        @"name",
        @"surname",
        @"last name",
        @"given names",
        @"first name",
        @"date of birth",
        @"place of birth",
        @"date of issue",
        @"date of expiry",
        @"document number",
        @"country",
    ];
}

+ (NSArray *)sortedResultListFrom:(NSArray<ALResultEntry *> *)resultData {
    NSArray *priorityFieldsArray = [self.class priorityIDFieldNames];

    NSArray *sortedArray = [resultData sortedArrayUsingComparator:^NSComparisonResult(ALResultEntry * _Nonnull obj1, ALResultEntry * _Nonnull obj2) {
        NSUInteger index1 = [priorityFieldsArray indexOfObjectPassingTest:^BOOL(NSString *title, NSUInteger idx, BOOL * _Nonnull stop) {
            return [obj1.title localizedCaseInsensitiveContainsString:title];
        }];
        NSUInteger index2 = [priorityFieldsArray indexOfObjectPassingTest:^BOOL(NSString *title, NSUInteger idx, BOOL * _Nonnull stop) {
            return [obj2.title localizedCaseInsensitiveContainsString:title];
        }];
        if (index2 == index1) {
            return (NSComparisonResult)NSOrderedSame;
        } else if (index1 == NSNotFound && index2 != NSNotFound) {
            return (NSComparisonResult)NSOrderedDescending;
        } else if (index2 == NSNotFound && index1 != NSNotFound) {
            return (NSComparisonResult)NSOrderedAscending;
        } else if (index2 > index1) {
            return (NSComparisonResult)NSOrderedAscending;
        } else if (index1 > index2) {
            return (NSComparisonResult)NSOrderedDescending;
        }
        return (NSComparisonResult)NSOrderedSame;
    }];

    return sortedArray;
}

+ (NSString *)camelCaseToTitleCaseModified:(NSString *)inputString {
    // split a camel case string into spaces
    NSString *strModified = [inputString stringByReplacingOccurrencesOfString:@"([a-z])([A-Z])"
                                                                   withString:@"$1 $2"
                                                                      options:NSRegularExpressionSearch
                                                                        range:NSMakeRange(0, inputString.length)];

    strModified = strModified.capitalizedString;

    // eg. Date 'Of' Birth => Date of Birth
    strModified = [strModified stringByReplacingOccurrencesOfString:@"Of"
                                                         withString:@"of"
                                                            options:NSLiteralSearch
                                                              range:NSMakeRange(0, inputString.length)];

    return strModified;
}

+ (NSString *)camelCaseToTitleCase:(NSString *)inputString {
    NSString *str = [inputString copy];
    NSMutableString *str2 = [NSMutableString string];

    for (NSInteger i=0; i<str.length; i++){
        NSString *ch = [str substringWithRange:NSMakeRange(i, 1)];
        if ([ch rangeOfCharacterFromSet:[NSCharacterSet uppercaseLetterCharacterSet]].location != NSNotFound) {
            ch = ch.lowercaseString;
            [str2 appendString:@" "];
        }
        [str2 appendString:ch];
    }

    // TODO: use a regular expression replace to deal with [Uppercase Letter-Space-Uppercase Letter]
    [str2 replaceOccurrencesOfString:@"I D" withString:@"ID" options:0 range:NSMakeRange(0, str2.length)];

    return [str2.capitalizedString copy];
}

+ (NSString *)stringForDate:(NSDate *)date {
    if (!date) {
        return @"Date not valid";
    }
    // Sun Apr 12 00:00:00 UTC 1977

    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    [dateFormatter setTimeZone:[NSTimeZone timeZoneWithAbbreviation:@"GMT+0:00"]];
    dateFormatter.dateStyle = NSDateFormatterMediumStyle;
    dateFormatter.timeStyle = NSDateFormatterNoStyle;

    return [dateFormatter stringFromDate:date];
}

+ (NSString *)dateStringFromString:(NSString *)string {
    // From this: "Sun Apr 12 00:00:00 UTC 1977" to this: "04/12/1977"
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    [dateFormatter setTimeZone:[NSTimeZone timeZoneWithAbbreviation:@"GMT+0:00"]];
    dateFormatter.dateFormat = @"E MMM d HH:mm:ss zzz yyyy";
    NSDate *d = [dateFormatter dateFromString:string];
    NSDateFormatter *df2 = [[NSDateFormatter alloc] init];
    df2.dateFormat = @"MM/dd/yyyy";
    return [df2 stringFromDate:d];
}

+ (ALResultEntry * _Nullable)resultEntryFromFieldName:(NSString *)fieldName value:(NSString *)fieldValue {
    return [self resultEntryFromFieldName:fieldName value:fieldValue scriptCode:nil];
}

+ (ALResultEntry * _Nullable)resultEntryFromFieldName:(NSString *)fieldName
                                                value:(NSString *)fieldValue
                                           scriptCode:(NSString * _Nullable)scriptCode {
    // ACO it seems like i don't need the return value as an array.
    if (!fieldValue || fieldValue.length < 1) { return nil; }

    ALResultEntry *resultData;
    NSArray *mandatoryFieldNames = [ALUniversalIDResultHelper priorityIDFieldNames];
    // NSLog(@"%@", fieldName);
    if (fieldValue.length &&
        ![fieldName localizedCaseInsensitiveContainsString:@"String"] && // drivingLicenseString, mrzString
        ![fieldName localizedCaseInsensitiveContainsString:@"checkdigit"] &&
        ![fieldName localizedCaseInsensitiveContainsString:@"confidence"]) {

        NSString *fieldNameTitleCase = [ALUniversalIDResultHelper camelCaseToTitleCaseModified:fieldName];
        NSString *fieldNameDisplay = [NSString stringWithFormat:@"%@", fieldNameTitleCase];
        if (scriptCode.length) {
            fieldNameDisplay = [NSString stringWithFormat:@"%@-%@",
                                fieldNameTitleCase,
                                scriptCode];
        }

        // only non-null values are reported.
        // NSLog(@"ACO field name: %@ value: %@", fieldNameDisplay, fieldValue);

        if (![fieldName localizedCaseInsensitiveContainsString:@"formatted"]) {
            __block ALResultEntry *newEntry = [[ALResultEntry alloc] initWithTitle:fieldNameDisplay
                                                                             value:fieldValue];
            // 'isMandatory' by default in a ALResultEntry is true, run a loop to see if it should
            // be false
            [mandatoryFieldNames enumerateObjectsUsingBlock:^(NSString  * _Nonnull fieldname, NSUInteger idx, BOOL * _Nonnull stop) {
                BOOL isMandatory = [fieldNameDisplay localizedCaseInsensitiveContainsString:fieldname];
                newEntry.isMandatory = isMandatory;
                *stop = isMandatory;
            }];
            resultData = newEntry;
        } else {
            // give "Date of Birth" field the value of "Formatted Date of Birth"
            NSString *title = [fieldNameDisplay stringByReplacingOccurrencesOfString:@"Formatted " withString:@""];
            if ([resultData.title localizedCaseInsensitiveContainsString:title]) {
                [resultData setValue:fieldValue];
            }
        }
    }

    return resultData;
}

@end
