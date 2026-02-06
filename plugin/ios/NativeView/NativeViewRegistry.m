#import "NativeViewRegistry.h"

@interface NativeViewRegistry ()
@property(nonatomic, strong) NSMapTable<NSString *, UIView *> *views;
@end

@implementation NativeViewRegistry

+ (instancetype)shared {
    static NativeViewRegistry *instance;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        instance = [[NativeViewRegistry alloc] init];
        instance.views = [NSMapTable strongToWeakObjectsMapTable];
    });
    return instance;
}

- (void)registerView:(UIView *)view withId:(NSString *)viewId {
    [self.views setObject:view forKey:viewId];
}

- (UIView *)getViewById:(NSString *)viewId {
    return [self.views objectForKey:viewId];
}

- (UIView *)getLastOrNull {
    NSArray *allKeys = self.views.keyEnumerator.allObjects;
    if (allKeys.count > 0) {
        NSString *lastKey = [allKeys lastObject];
        return [self.views objectForKey:lastKey];
    } else {
        return nil;
    }
}

@end