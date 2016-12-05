//
//  AnylineModuleView.h
//  Anyline
//
//  Created by Daniel Albertini on 25/06/15.
//  Copyright (c) 2015 9Yards GmbH. All rights reserved.
//

#import "AnylineAbstractModuleView.h"

typedef NS_ENUM(NSInteger, ALScanMode) {
    ALAnalogMeter,
    ALElectricMeter __deprecated_msg("Deprecated since 3.8. ALAnalogMeter is used instead instead."), ALElectricMeter5_1 __deprecated_msg("Deprecated since 3.8. ALAnalogMeter is used instead."), ALElectricMeter6_1 __deprecated_msg("Deprecated since 3.8. ALAnalogMeter is used instead."), ALAnalogMeterWhite __deprecated_msg("Deprecated since 3.8. ALAnalogMeter is used instead."), ALAnalogMeter4 __deprecated_msg("Deprecated since 3.8. ALAnalogMeter is used instead."), ALAnalogMeter7 __deprecated_msg("Deprecated since 3.8. ALAnalogMeter is used instead."),
    ALGasMeter __deprecated_msg("Deprecated since 3.8. ALAnalogMeter is used instead."), ALGasMeter6 __deprecated_msg("Deprecated since 3.8. ALAnalogMeter is used instead."),
    ALBarcode,
    ALSerialNumber,
    ALWaterMeterBlackBackground __deprecated_msg("Deprecated since 3.8. ALAnalogMeter is used instead."), ALWaterMeterWhiteBackground __deprecated_msg("Deprecated since 3.8. ALAnalogMeter is used instead."),
    ALDigitalMeter,
    ALHeatMeter4, ALHeatMeter5, ALHeatMeter6
};

@protocol AnylineEnergyModuleDelegate;

/**
 * The AnylineEnergyModuleView class declares the programmatic interface for an object that manages easy access to Anylines energy meter scanning mode. All its capabilities are bundled into this AnylineAbstractModuleView subclass. Management of the scanning process happens within the view object. It is configurable via interface builder.
 *
 * Communication with the host application is managed with a delegate that conforms to AnylineEnergyModuleDelegate. 
 *
 * AnylineEnergyModuleView is able to scan the most common energy meters. The scan mode is set with setScanMode.
 */
@interface AnylineEnergyModuleView : AnylineAbstractModuleView

/**
 *  Sets the scan mode. 
 *  It has to be ALElectricMeter, ALGasMeter, ALBarcode or ALSerialNumber
 *
 */
@property (nonatomic, assign, readonly) ALScanMode scanMode;

/**
 *  Sets the scan mode.
 *
 *  @param scanMode The scan mode to set.
 *
 *  @deprecated since 3.4
 */
- (void)setScanMode:(ALScanMode)scanMode __deprecated_msg("Deprecated since 3.4. Use method setScanMode:error: instead.");

/**
 *  Sets the scan mode and returns an NSError if something failed.
 *
 *  @param scanMode The scan mode to set.
 *  @param error The error if something goes wrong. Can be nil.
 *
 *  @return Boolean indicating the success / failure of the call.
 */
- (BOOL)setScanMode:(ALScanMode)scanMode error:(NSError **)error;

/**
 *  Sets the license key and delegate.
 *
 *  @param licenseKey The Anyline license key for this application bundle
 *  @param delegate The delegate that will receive the Anyline results (hast to conform to <AnylineEnergyModuleDelegate>)
 *  @param error The error that occured
 *
 *  @return Boolean indicating the success / failure of the call.
 */
- (BOOL)setupWithLicenseKey:(NSString *)licenseKey
                   delegate:(id<AnylineEnergyModuleDelegate>)delegate
                      error:(NSError **)error;

@end

@protocol AnylineEnergyModuleDelegate <NSObject>

@required

/**
 *  Returns the scanned value
 *
 *  @param AnylineEnergyModuleView The view that scanned the result
 *  @param scanResult The scanned value
 *  @param image The cropped version of the image that contains the scanned number
 *  @param fullImage The whole image used to scan the number
 *  @param scanMode The mode the scanner was in at the time of scanning. Has to be ALElectricMeter, ALGasMeter, ALBarcode or ALSerialNumber
 *
 */
- (void)anylineEnergyModuleView:(AnylineEnergyModuleView *)anylineEnergyModuleView
              didFindScanResult:(NSString *)scanResult
                      cropImage:(UIImage *)image
                      fullImage:(UIImage *)fullImage
                         inMode:(ALScanMode)scanMode;

@end
