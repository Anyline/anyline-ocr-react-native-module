//
//  ALTorchManager.h
//  Anyline
//
//  Created by David Dengg on 27.01.16.
//  Copyright © 2016 9Yards GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <AVFoundation/AVFoundation.h>
#import "ALFlashButton.h"

@interface ALTorchManager : NSObject <ALFlashButtonStatusDelegate>

@property (nonatomic, weak) AVCaptureDevice * captureDevice;
@property (nonatomic, assign) ALFlashStatus flashStatus;

- (void)setLevelForAutoFlash:(int)brightness;
- (void)setCountForAutoFlash:(int)brightnessCount;
- (void)resetLightLevelCounter;
- (void)calculateBrightnessCount:(float)brightness;
- (void)setTorch:(BOOL)onOff;
- (BOOL)torchAvailable;

@end
