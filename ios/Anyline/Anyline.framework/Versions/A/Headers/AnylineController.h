//
//  AnylineController.h
//  Anyline
//
//  Created by Daniel Albertini on 25.03.13.
//  Copyright (c) 2013 9Yards GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#import "ALImageProvider.h"

@class ALImage;

@protocol AnylineControllerDelegate;

/**
 *  The Anyline Controller is the small but powerful interface to our image 
 *  processing / text recognition. Loaded with different Configurations files it
 *  can execute totally different tasks.
 */
@interface AnylineController : NSObject

/**
 *  With this boolean you can control if the SDK runs on an async queue
 *  or if you want to run it on your current thread.
 */
@property (nonatomic, assign) BOOL asyncSDK;

@property (nonatomic, assign, getter=isRunning) BOOL running;

/**
 *  The delegate property.
 *  You must set the delegate if you want to get any results out 
 *  of the Anyline SDK.
 */
@property (nonatomic, weak) id<AnylineControllerDelegate> delegate;

/**
 *  Initializes a new AnylineController with a license key. In order to 
 *  correctly run Anyline you will have to set the AnylineController delegate 
 *  and load an appropriate configuration.
 *
 *  @param licenseKey       The license key you purchased for Anyline.
 *
 *  @return A new instance of AnylineController.
 */
- (instancetype)initWithLicenseKey:(NSString *)licenseKey;

/**
 *  Initializes a new AnylineController with a license key and delegate. In order 
 *  to correctly run Anyline you will have to load an appropriate configuration.
 *
 *  @param licenseKey       The license key you purchased for Anyline.
 *  @param delegate         The delegate where for the Anyline callbacks.
 *
 *  @return A new instance of AnylineController.
 */
- (instancetype)initWithLicenseKey:(NSString *)licenseKey
                          delegate:(id<AnylineControllerDelegate>)delegate;

/**
 *  This method loads the Anyline SDK with an configuration string.
 *
 *  @param script     The string which represents the configuration.
 *  @param bundlePath The bundlePath where the additional ressources are located.
 *  @param error      The error if the script loading fails.
 *
 *  @return Boolean indicating the success / failure of the loading.
 */
- (BOOL)loadScript:(NSString *)script
        bundlePath:(NSString *)bundlePath
             error:(NSError **)error;

/**
 *  This method loads the Anyline SDK with an configuration file which is located 
 *  at the bundlePath. The configuration must ether be an .alc unencrypted file 
 *  or an .ale encrypted file.
 *
 *  @param cmdFileName Configuration filename. Ether .alc or .ale. Located at 
 *                     the bundlePath
 *  @param bundlePath  The bundlePath where the configuration and the additional 
 *                     ressources are located.
 *  @param error       The error if the script loading fails.
 *
 *  @return Boolean indicating the success / failure of the loading.
 */
- (BOOL)loadCmdFile:(NSString *)cmdFileName
         bundlePath:(NSString *)bundlePath
              error:(NSError **)error;

/**
 *  Starts a continious image processing workflow where the images are provided from the 
 *  image provider interface. Should for example be called in the viewDidAppear:
 *
 *  @param imageProvider The image provider which is responsible for providing the frames for the
 *                       computation.
 *  @param error         The error if the processing can not be started.
 *
 *  @return Boolean indicating the success / failure of the start process.
 */
- (BOOL)startWithImageProvider:(id<ALImageProvider>)imageProvider error:(NSError **)error;

/**
 *  Starts a continious image processing workflow where the images are provided from the
 *  image provider interface. Should for example be called in the viewDidAppear:
 *
 *  @param imageProvider    The image provider which is responsible for providing the frames for the
 *                          computation.
 *  @param startVariables   Variables which will be added to the process and can be referenced in the
 *                          Anyline Command File.
 *  @param error            The error if the processing can not be started.
 *
 *  @return Boolean indicating the success / failure of the start process.
 */
- (BOOL)startWithImageProvider:(id<ALImageProvider>)imageProvider
                startVariables:(NSDictionary *)variables
                         error:(NSError **)error;

/**
 *  Stops a previously started image processing workflow. Should be called ex. in viewDidDisappear:
 *  or viewWillDisappear:
 *
 *  @param error The error if processing workflow could not be stopped
 *
 *  @return Boolean indicating the success / failure of the stop.
 */
- (BOOL)stopAndReturnError:(NSError **)error;


/**
 *  Starts a single image run with an UIImage.
 *
 *  @param image The image or video frame which should be processed. This image is referenced as $image
 *               in the .alc configuation file.
 *  @param error If an error occured while trying to start processing, it is passed here.
 *
 *  @return BOOL indicating if the processing could be started.
 */
- (BOOL)processImage:(UIImage *)image error:(NSError **)error;

/**
 *  Starts a single image run with an UIImage and a start variable dictionary.
 *
 *  @param image     The image or video frame which should be processed. This image is referenced as $image
 *                   in the .alc configuation file.
 *  @param variables Variables which will be added for this single process. They can be used and 
 *                   controlled in the .alc files. @see ALConfig for global config variables.
 *  @param error     If an error occured while trying to start processing, it is passed here.
 *
 *  @return BOOL indicating if the processing could be started.
 */
- (BOOL)processImage:(UIImage *)image
      startVariables:(NSDictionary *)variables
               error:(NSError **)error;

/**
 *  Starts a single image run with an ALImage.
 *
 *  @param alImage The image or video frame which should be processed. This image is referenced as $image
 *                 in the .alc configuation file.
 *  @param error   If an error occured while trying to start processing, it is passed here.
 *
 *  @return BOOL indicating if the processing could be started.
 */
- (BOOL)processALImage:(ALImage*)alImage error:(NSError **)error;

/**
 *  Starts a single image run with an ALImage and a start variable dictionary.
 *
 *  @param alImage   The image or video frame which should be processed. This image is referenced as $image
 *                   in the .alc configuation file.
 *  @param variables Variables which will be added for this single process. They can be used and
 *                   controlled in the .alc files. @see ALConfig for global config variables.
 *  @param error     If an error occured while trying to start processing, it is passed here.
 *
 *  @return BOOL indicating if the processing could be started.
 */
- (BOOL)processALImage:(ALImage*)alImage
        startVariables:(NSDictionary *)variables
                 error:(NSError **)error;

/**
 *  Sets a parameter with a key in the Interpreter.
 *
 *  @param parameter Parameter to set.
 *  @param key       The key for the parameter.
 */
- (void)setParameter:(id)parameter forKey:(NSString *)key;

/**
 *  The Version number of the current Anyline framework.
 *
 *  @warning The Anyline SDK must be added to the Copy Bundle Ressources
 *           to make this method work correctly.
 *
 *  @return The Version number as String
 */
+ (NSString *)versionNumber;

/**
 *  The Build number of the current Anyline framework.
 *
 *  @warning The Anyline SDK must be added to the Copy Bundle Ressources
 *           to make this method work correctly.
 *
 *  @return The Build number as String
 */
+ (NSString *)buildNumber;

+ (NSBundle *)frameworkBundle;

/**
 * Reporting ON Switch, off by default
 *
 * @param enable if YES, anyline will report for QA failed scan tries. Use reportImageForLog in ALC file, 
 *               and use the reportScanResultState: for reporting
 */
-(void) enableReporting:(BOOL) enable;

/**
 * Reports a cancel of a scan
 */
- (void)notifyScanningHasBeenCanceled;

- (NSArray*)runStatistics;

@end

/**
 *  The AnylineController Delegate methods must be implemented to get results of the Anyline processing.
 *  All delegate callbacks are garanteed to be executed in the Main Thread.
 */
@protocol AnylineControllerDelegate <NSObject>

@required

/**
 *  Tells the delegate that the processing has successfully finished and gives the delegate the final
 *  output object.
 *
 *  This delegate method must be inplemented to receive any results from the AnylineSDK
 *
 *  @param object The result object of the processing.
 *                The result is specified with the RETURN statement in the .alc file.
 */
- (void)anylineController:(AnylineController *)anylineController didFinishWithOutput:(id)object;

@optional

/**
 *  Tells the delegate that the processing has not completed successfully. Possible reason would be 
 *  for example that the display or paper frame could not be found.
 *
 *  @param error A NSError object with ALErrorDomain and an appropriate status.
 */
- (void)anylineController:(AnylineController *)anylineController didAbortRun:(NSError *)reason;

/**
 *  Tells the delegate a specified intermediate result. Which intermediate results are reported
 *  can be specified in the .alc command file with the REPORT function.
 *
 *  This method is optional. It provides intermediate results, therefore Anyline did not completed the
 *  task yet.
 *
 *  @param variableName The variable name in the .alc file which should be reported.
 *  @param value        The value of the reported variable.
 */
- (void)anylineController:(AnylineController *)anylineController
          reportsVariable:(NSString *)variableName
                    value:(id)value;

/**
 *  Tells the delegate that there was a parsing error.
 *
 *  If this method is not implemented the SDK raises an exception with the parsing error.
 *
 *  @param error The parsing error which occured.
 */
- (void)anylineController:(AnylineController *)anylineController parserError:(NSError *)error;

@end