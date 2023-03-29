#import "ALPluginHelper.h"
#import "ALNFCScanViewController.h" // because NFC-specific code is there
#import <Anyline/Anyline.h>
#import <objc/runtime.h>

// Predefined domain for errors from most AppKit and Foundation APIs.
NSErrorDomain const ALDefaultDomain = @"ALDefaultErrorDomain";

@implementation ALPluginHelper

#pragma mark - Launch Anyline

+ (void)startScan:(NSDictionary *)config finished:(ALPluginCallback)callback {
    
    NSDictionary *pluginConf = config;
    
    NSString *licenseKey = [config objectForKey:@"licenseKey"];
    
    [[UIApplication sharedApplication] keyWindow].rootViewController.modalPresentationStyle = UIModalPresentationFullScreen;
    
    NSDictionary *optionsDict = [config objectForKey:@"options"];
    ALJSONUIConfiguration *jsonUIConf = [[ALJSONUIConfiguration alloc] initWithDictionary:optionsDict];
    
    BOOL isNFC = [optionsDict[@"enableNFCWithMRZ"] boolValue];
    
    if (isNFC) {
        if (@available(iOS 13.0, *)) {
            
            if (![ALNFCDetector readingAvailable]) {
                callback(nil, @"NFC passport reading is not supported on this device or app.");
                return;
            }
            
            ALNFCScanViewController *nfcScanViewController = [[ALNFCScanViewController alloc] initWithLicensekey:licenseKey
                                                                                                   configuration:pluginConf
                                                                                                        uiConfig:jsonUIConf
                                                                                                        finished:callback];            
            if (nfcScanViewController != nil) {
                [nfcScanViewController setModalPresentationStyle:UIModalPresentationFullScreen];
                [[[UIApplication sharedApplication] keyWindow].rootViewController presentViewController:nfcScanViewController
                                                                                               animated:YES
                                                                                             completion:nil];
            }
        } else {
            callback(nil, @"NFC passport reading is only supported on iOS 13 and later.");
            return;
        }
    } else {
        ALPluginScanViewController *pluginScanViewController = [[ALPluginScanViewController alloc] initWithLicensekey:licenseKey
                                                                                                        configuration:pluginConf
                                                                                                      uiConfiguration:jsonUIConf
                                                                                                             finished:callback];
        
        if ([pluginConf valueForKey:@"quality"]){
            pluginScanViewController.quality = [[pluginConf valueForKey:@"quality"] integerValue];
        }
        
        if (pluginScanViewController) {
            [pluginScanViewController setModalPresentationStyle:UIModalPresentationFullScreen];
            [[[UIApplication sharedApplication] keyWindow].rootViewController presentViewController:pluginScanViewController
                                                                                           animated:YES
                                                                                         completion:nil];
        }
    }
}

#pragma mark - Filesystem handling

+ (NSString *)saveImageToFileSystem:(UIImage *)image {
    return [self saveImageToFileSystem:image compressionQuality:0.9];
}

+ (NSString *)saveImageToFileSystem:(UIImage *)image compressionQuality:(CGFloat)compressionQuality {
    NSString *basePath = [self applicationCachePath];
    NSData *binaryImageData = UIImageJPEGRepresentation(image, compressionQuality);
    NSString *uuid = [NSUUID UUID].UUIDString;
    NSString *imagePath = [NSString stringWithFormat:@"%@.jpg",uuid];
    NSString *fullPath = [basePath stringByAppendingPathComponent:imagePath];
    [binaryImageData writeToFile:fullPath atomically:YES];
    return fullPath;
}

+ (NSString *)applicationCachePath {
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES);
    return ([paths count] > 0) ? [paths objectAtIndex:0] : nil;
}

#pragma mark - UI helpers

+ (UILabel *)createLabelForView:(UIView *)view {
    
    UILabel *scannedLabel = [[UILabel alloc] initWithFrame:CGRectMake(0, 0, view.frame.size.width, 44)];
    scannedLabel.center = CGPointMake(view.center.x, view.center.y + 166);
    scannedLabel.alpha = 0.0;
    scannedLabel.font = [UIFont fontWithName:@"HelveticaNeue" size:32];
    scannedLabel.textColor = [UIColor whiteColor];
    scannedLabel.numberOfLines = 0;
    scannedLabel.textAlignment = NSTextAlignmentCenter;
    
    [view addSubview:scannedLabel];
    
    return scannedLabel;
}

+ (UISegmentedControl *)createSegmentForViewController:(UIViewController *)viewController
                                                config:(ALJSONUIConfiguration *)config
                                       initialScanMode:(NSString *)initialScanMode {
    UISegmentedControl *segment = [[UISegmentedControl alloc] initWithItems:config.segmentTitles];

    // This doesn't appear to be changing the color
    // segment.tintColor = ...

    segment.backgroundColor = [UIColor colorWithWhite:1 alpha:0.6];
    if (@available(iOS 13.0, *)) {
        segment.selectedSegmentTintColor = config.segmentTintColor;
    }

    segment.hidden = YES;
    
    NSUInteger index = [config.segmentModes indexOfObject:initialScanMode];
    if (index == NSNotFound) {
        return nil;
    }
    
    [segment setSelectedSegmentIndex:index];
    
    // has a warning here but is okay as long as the target implements this selector.
    [segment addTarget:viewController action:@selector(segmentChange:) forControlEvents:UIControlEventValueChanged];
    
    [viewController.view addSubview:segment];
    
    return segment;
}

+ (UIButton *)createButtonForViewController:(UIViewController *)viewController
                                     config:(ALJSONUIConfiguration *)config {
    
    UIButton *doneButton = [UIButton buttonWithType:UIButtonTypeCustom];
    [doneButton setTitle:config.buttonDoneTitle forState:UIControlStateNormal];
    
    // NOTE: there'll be a warning here from Xcode but just have to make sure
    // doneButtonPressed: is a valid selector in the target
    [doneButton addTarget:viewController action:@selector(doneButtonPressed:)
         forControlEvents:UIControlEventTouchUpInside];
    
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

+ (void)updateButtonPosition:(UIButton *)button withConfiguration:(ALJSONUIConfiguration *)config
                      onView:(UIView *)view {
    
    button.titleLabel.font = [UIFont fontWithName:config.buttonDoneFontName size:config.buttonDoneFontSize];
    [button setTitleColor:config.buttonDoneTextColor forState:UIControlStateNormal];
    [button setTitleColor:config.buttonDoneTextColorHighlighted forState:UIControlStateHighlighted];
    button.contentEdgeInsets = UIEdgeInsetsMake(6, 10, 6, 10);
    
    
    button.backgroundColor = config.buttonDoneBackgroundColor;
    button.translatesAutoresizingMaskIntoConstraints = NO;
    
    // corner radius is overridden to 0 when "full-width" type is used
    button.layer.cornerRadius = config.buttonDoneCornerRadius;
    
    switch (config.buttonType) {
        case ALButtonTypeFullWidth: // "FULLWIDTH"
            [view addConstraint:[button.leftAnchor constraintEqualToAnchor:view.leftAnchor constant:0]];
            [view addConstraint:[button.rightAnchor constraintEqualToAnchor:view.rightAnchor constant:0]];
            button.layer.cornerRadius = 0;
            break;
        case ALButtonTypeRect: // "RECT"
            [button sizeToFit];
            break;
            
        default:
            break;
    }
    
    switch (config.buttonDoneXAlignment) {
        case ALButtonXAlignmentCenter:
            [view addConstraint:[NSLayoutConstraint constraintWithItem:button
                                                             attribute:NSLayoutAttributeCenterX
                                                             relatedBy:NSLayoutRelationEqual
                                                                toItem:view
                                                             attribute:NSLayoutAttributeCenterX
                                                            multiplier:1.0
                                                              constant:config.buttonDoneXPositionOffset]];
            break;
        case ALButtonXAlignmentLeft:
            [view addConstraint:[NSLayoutConstraint constraintWithItem:button
                                                             attribute:NSLayoutAttributeLeft
                                                             relatedBy:NSLayoutRelationEqual
                                                                toItem:view
                                                             attribute:NSLayoutAttributeLeft
                                                            multiplier:1.0
                                                              constant:MAX(config.buttonDoneXPositionOffset, 0)]];
            break;
        case ALButtonXAlignmentRight:
            [view addConstraint:[NSLayoutConstraint constraintWithItem:button
                                                             attribute:NSLayoutAttributeRight
                                                             relatedBy:NSLayoutRelationEqual
                                                                toItem:view
                                                             attribute:NSLayoutAttributeRight
                                                            multiplier:1.0
                                                              constant:MIN(config.buttonDoneXPositionOffset, 0)]];
            break;
            
        default:
            break;
    }
    
    switch (config.buttonDoneYAlignment) {
        case ALButtonYAlignmentTop:
            // Align Top
            [view addConstraint:[NSLayoutConstraint constraintWithItem:button
                                                             attribute:NSLayoutAttributeTop
                                                             relatedBy:NSLayoutRelationEqual
                                                                toItem:view
                                                             attribute:NSLayoutAttributeTop
                                                            multiplier:1.0
                                                              constant:MAX(config.buttonDoneYPositionOffset, 0)]];
            break;
        case ALButtonYAlignmentBottom:
            // Align Bottom
            [view addConstraint:[NSLayoutConstraint constraintWithItem:button
                                                             attribute:NSLayoutAttributeBottom
                                                             relatedBy:NSLayoutRelationEqual
                                                                toItem:view
                                                             attribute:NSLayoutAttributeBottom
                                                            multiplier:1.0
                                                              constant:MIN(config.buttonDoneYPositionOffset, 0)]];
            
            break;
        case ALButtonYAlignmentCenter:
            // Center vertically
            [view addConstraint:
                 [button.centerYAnchor constraintEqualToAnchor:view.centerYAnchor constant:config.buttonDoneYPositionOffset]
            ];
            break;
            
        default:
            break;
    }
}

#pragma mark - Date Parsing Utils

// MARK: Utilities

+ (void)showErrorAlertWithTitle:(NSString *)title
                        message:(NSString *)message
       presentingViewController:(UIViewController *)presentingViewController {

    UIAlertController *alertController = [UIAlertController alertControllerWithTitle:title
                                                                             message:message
                                                                      preferredStyle:UIAlertControllerStyleAlert];
    UIAlertAction *dismissAction = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleCancel handler:nil];
    [alertController addAction:dismissAction];
    [presentingViewController presentViewController:alertController animated:YES completion:nil];
}

+ (BOOL)showErrorAlertIfNeeded:(NSError *)error pluginCallback:(ALPluginCallback)callback {
    if (!error) {
        return NO;
    }

    UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"Could not start scanning"
                                                                   message:error.localizedDescription
                                                            preferredStyle:UIAlertControllerStyleAlert];

    UIAlertAction *action = [UIAlertAction actionWithTitle:@"Ok"
                                                     style:UIAlertActionStyleDefault
                                                   handler:^(UIAlertAction * _Nonnull action) {

        [[UIApplication sharedApplication].keyWindow.rootViewController
         dismissViewControllerAnimated:YES completion:^{
            callback(nil, @"Canceled");
        }];
    }];

    [alert addAction:action];
    [[UIApplication sharedApplication].keyWindow.rootViewController presentViewController:alert
                                                                                 animated:YES
                                                                               completion:NULL];
    return YES;
}

+ (NSError *)errorWithMessage:(NSString *)message {
    return [NSError errorWithDomain:ALDefaultDomain code:1000 userInfo:@{ NSLocalizedDescriptionKey: message }];
}

// MARK: - Date Utils

+ (NSDate *)formattedStringToDate:(NSString *)formattedStr {
    // From this: "Sun Apr 12 00:00:00 UTC 1977" to this: "04/12/1977"
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    [dateFormatter setTimeZone:[NSTimeZone timeZoneWithAbbreviation:@"GMT+0:00"]];
    dateFormatter.dateFormat = @"E MMM d HH:mm:ss zzz yyyy";
    NSDate *d = [dateFormatter dateFromString:formattedStr];
    return d;
}

+ (NSString *)stringForDate:(NSDate *)date {
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    [dateFormatter setTimeZone:[NSTimeZone timeZoneWithAbbreviation:@"GMT+0:00"]];
    dateFormatter.dateStyle = NSDateFormatterMediumStyle;
    dateFormatter.timeStyle = NSDateFormatterNoStyle;
    return [dateFormatter stringFromDate:date];
}

// MARK: - Plugin Reflection

// return the ALPluginConfig property whose name ends with 'Config', is nonnull, AND which has a `scanMode` property
+ (NSString * _Nullable)confPropKeyWithScanModeForPluginConfig:(ALPluginConfig *)pluginConfig {
    unsigned int count;
    Ivar *ivars = class_copyIvarList(ALPluginConfig.class, &count);
    for (int i = 0; i < count; i++) {
        const char *ivarName = ivar_getName(((Ivar * _Nonnull)ivars)[i]);
        NSString *key = [NSString stringWithCString:(const char * _Nonnull)ivarName encoding:NSUTF8StringEncoding];
        key = [key stringByTrimmingCharactersInSet:NSCharacterSet.punctuationCharacterSet];

        // Looking for "Config" at the end of the property name.
        NSRange range = [key rangeOfString:@"Config"];
        if (range.location == NSNotFound) { continue; }
        if (range.location + @"Config".length == key.length) {
            id obj;
            if ((obj = [pluginConfig valueForKey:key])) { // config property is non-null
                // one last check: does the value associated with this key have a scanMode property (that is a string type)?
                if ([obj respondsToSelector:NSSelectorFromString(@"scanMode")]) {
                    return key; // this key is valid for self.pluginConfig, obj is the object tied to this key
                }
                // the rest wouldn't meet the requirements, so don't bother with them.
                return nil;
            }
        }
    }
    free(ivars);
    return nil;
}

// MARK: - Miscellaneous

// actual implementation are in the view controllers
- (void)segmentChange:(id)segment {}

- (void)doneButtonPressed:(id)doneButton {}


@end
