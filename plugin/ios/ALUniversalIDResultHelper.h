#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@class ALResultEntry;

@interface ALUniversalIDResultHelper : NSObject

// these are shown in order for the ID scan results displayed, unless that field is blank or null for
// the sample. The list of field names can be found in ALIDResult.
+ (NSArray<NSString *> *)universalIDFieldsToSelect;

// This generates a list of fields in the ALIDResult during runtime.
+ (NSArray<NSString *> *)fieldNames;

/// Ordered list of ID field names that should be, when present, on the top of the list
/// displayed.
+ (NSArray *)priorityIDFieldNames;

+ (NSArray *)sortedResultListFrom:(NSArray<ALResultEntry *> *)resultData;

+ (NSString *)camelCaseToTitleCaseModified:(NSString *)inputString;

+ (NSString *)camelCaseToTitleCase:(NSString *)inputString;

+ (NSString *)stringForDate:(NSDate *)date;

+ (NSString *)dateStringFromString:(NSString *)string;

+ (ALResultEntry * _Nullable)resultEntryFromFieldName:(NSString *)fieldName value:(NSString *)fieldValue;

+ (ALResultEntry * _Nullable)resultEntryFromFieldName:(NSString *)fieldName
                                                value:(NSString *)fieldValue
                                           scriptCode:(NSString * _Nullable)scriptCode;


@end

NS_ASSUME_NONNULL_END

