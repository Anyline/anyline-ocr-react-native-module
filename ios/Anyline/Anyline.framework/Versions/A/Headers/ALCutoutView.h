//
//  ALCutoutView.h
//  AnylineExamples
//
//  Created by Matthias Gasser on 01/04/15.
//  Copyright (c) 2015 9yards GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#import "ALViewConstants.h"

@class ALUIConfiguration;

/**
 *  The ALCutoutView is used to draw the cutout on the phone screen specified in the ALUIConfiguration
 */
@interface ALCutoutView : UIView

/**
 *  Initialises a new CutoutView with an appropriate frame and configuration
 *
 *  @param frame    The frame for the View.
 *  @param config   The configuation to initialise the cutout.
 *
 *  @return  New ALCoutout instance.
 */
- (instancetype)initWithFrame:(CGRect)frame configuration:(ALUIConfiguration *)config;

/**
 *  Returns the cutout location inside the view.
 *
 *  @return  CGRect representing the cutout inside the CutoutView.
 */
- (CGRect)cutoutRectScreen;

- (void)drawCutout:(BOOL)feedbackMode;

@end
