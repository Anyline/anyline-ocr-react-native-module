#import "ALScanResult+ALUtilities.h"
#import <Anyline/Anyline.h>
#import <objc/runtime.h>
#import "ALPluginHelper.h"
#import "ALPluginResultHelper.h"

NS_ASSUME_NONNULL_BEGIN

@implementation ALScanResult (ALResultHelper)

// TODO: parts of this will have to go back to the SDK.
- (NSDictionary *)enhancedDictionary {

    ALPluginResult *pluginResult = self.pluginResult;
    NSMutableDictionary *resultDictionary = [NSMutableDictionary dictionaryWithDictionary:self. resultDictionary];

    // string with more additional details from the result included.
    NSString *resultString;

    // Use reflection to obtain a list of fields for ALPluginResult, a number of which
    // can hold conform to ALResultListEnumerable. Afterwards, find the field which is
    // non-null (as a rule one of these fields will be) and then obtain its JSON representation.
    for (NSString *fieldName in [self.class fieldNamesForALPluginResult]) {
        if (![pluginResult respondsToSelector:NSSelectorFromString(fieldName)]) {
            continue;
        }
        id obj = [pluginResult valueForKey:fieldName];
        if ([obj conformsToProtocol:@protocol(ALResultListEnumerable)]) {
            NSArray<ALResultEntry *> *resultEntries = [(id<ALResultListEnumerable>)obj resultEntryList];
            resultString = [self.class JSONStringFromArray:resultEntries isPretty:YES];
            break;
        }
    }

    if (resultString) {
        resultDictionary[@"result"] = resultString;
    }

    NSString *imagePath = [ALPluginHelper saveImageToFileSystem:self.croppedImage];
    resultDictionary[@"imagePath"] = imagePath;

    imagePath = [ALPluginHelper saveImageToFileSystem:self.fullSizeImage];
    resultDictionary[@"fullImagePath"] = imagePath;

    return resultDictionary;
}

+ (NSString *)JSONStringFromArray:(NSArray<ALResultEntry *> *)resultEntries isPretty:(BOOL)isPretty {
    NSMutableArray *arrayOfJSON = [NSMutableArray arrayWithCapacity:resultEntries.count];
    for (ALResultEntry *entry in resultEntries) {
        NSString *elementJSONString = [entry asJSONStringPretty:isPretty];
        [arrayOfJSON addObject:[elementJSONString asJSONObject]];
    }
    return [arrayOfJSON asJSONStringPretty:isPretty];
}

+ (NSArray<NSString *> *)fieldNamesForALPluginResult {
    unsigned int count;
    Ivar* ivars = class_copyIvarList(ALPluginResult.class, &count);
    NSMutableArray *ivarArray = [NSMutableArray arrayWithCapacity:count];
    for (int i = 0; i < count ; i++) {
        const char *ivarName = ivar_getName(ivars[i]);
        NSString *dynamicFieldName = [NSString stringWithCString:ivarName encoding:NSUTF8StringEncoding];
        NSString *fieldName = [dynamicFieldName stringByReplacingCharactersInRange:NSMakeRange(0, 1)
                                                                        withString:@""];
        [ivarArray addObject:fieldName];
    }
    free(ivars);
    return ivarArray;
}

@end

NS_ASSUME_NONNULL_END
