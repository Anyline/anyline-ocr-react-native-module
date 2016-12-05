//
// Created by Daniel Albertini on 26/12/13.
// Copyright (c) 2013 9Yards GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreGraphics/CoreGraphics.h>
#import <CoreVideo/CoreVideo.h>

@class UIImage;
@class ALROISpec;
@class ALDataPoint;
@class ALSquare;
@class ALDisplayResult;
@class ALContours;

/**
 *  The ALImage encapsulate the opencv image classes and methods.
 */
@interface ALImage : NSObject

/**
 *  The ALImage UIImage object.
 */
@property (nonatomic, strong) UIImage *uiImage;

/**
 *  The ALImage CVImageBufferRef object.
 */
@property (nonatomic, assign) CVImageBufferRef imageBuffer;

/**
 *  Method draws the DisplaySpecs onto the ALImage and returns an UIImage. 
 *  For debbugging purpose so you can see where we located the digits.
 *
 *  @param displaySpec The Display specifications where to find, and how to interpret the digits.
 *
 *  @warning Possible long task. Be aware when executed in Main Thread.
 *
 *  @return An UIImage with an overlay of all the digits and segments.
 */
- (UIImage *)uiImageWithSpecOverlay:(ALROISpec *)displaySpec;

/**
 *  Method draws the DisplaySpecs and DisplayResult onto the ALImage and returns an UIImage. 
 *  For debbugging purpose so you can see where we located the digits and what results we computed.
 *
 *  @param displayResult The Display result contains the computed result for every segment.
 *
 *  @warning Possible long task. Be aware when executed in Main Thread.
 *
 *  @return An UIImage with an overlay of all the digits and segments.
 */
- (UIImage *)uiImageWithDisplayResults:(ALDisplayResult *)displayResult;

/**
 *  Method draws one DigitSpec onto the ALImage and returns an UIImage. 
 *  For debbugging purpose so you can see where we located the digit.
 *
 *  @param digitSpec A DigitSpec specification where the digit in the Image is found.
 *
 *  @warning Possible long task. Be aware when executed in Main Thread.
 *
 *  @return An UIImage with an overlay of this DigitSpec.
 */
- (UIImage *)uiImageWithDigitOverlay:(ALDataPoint *)digitSpec;

/**
 *  Method draws one CGRect onto the ALImage and returns an UIImage.
 *  For debbugging purpose so you can see where we located the digit.
 *
 *  @param rectToDraw A CGRect which will be drawn.
 *
 *  @warning Possible long task. Be aware when executed in Main Thread.
 *
 *  @return An UIImage with an overlay of this CGRect.
 */
- (UIImage *)uiImageWithRectOverlay:(CGRect)rectToDraw;

/**
 *  Method draws one ALSquare onto the ALImage and returns an UIImage.
 *  For debbugging purpose so you can see where we located the digit.
 *
 *  @param square An ALSquare which will be drawn onto the Image.
 *
 *  @warning Possible long task. Be aware when executed in Main Thread.
 *
 *  @return An UIImage with an overlay of the ALSquare.
 */
- (UIImage *)uiImageWithSquareOverlay:(ALSquare *)square;

/**
 *  Method draws horizontal lines onto the ALImage and returns an UIImage.
 *  For debbugging purpose so you can see where we located the digit.
 *
 *  @param lines An array with positions where to draw lines onto the Image.
 *
 *  @warning Possible long task. Be aware when executed in Main Thread.
 *
 *  @return An UIImage with an overlay of the horizontal lines.
 */
- (UIImage *)uiImageWithHorizontalLines:(NSArray*)lines;

/**
 *  Method draws vertical lines onto the ALImage and returns an UIImage.
 *  For debbugging purpose so you can see where we located the digit.
 *
 *  @param lines An array with positions where to draw lines onto the Image.
 *
 *  @warning Possible long task. Be aware when executed in Main Thread.
 *
 *  @return An UIImage with an overlay of the vertical lines.
 */
- (UIImage *)uiImageWithVerticalLines:(NSArray*)lines;

/**
 *  Method draws contours onto the ALImage and returns an UIImage.
 *  For debbugging purpose so you can see where we located the digit.
 *
 *  @param lines An ALContours which will be drawn onto the Image.
 *
 *  @warning Possible long task. Be aware when executed in Main Thread.
 *
 *  @return An UIImage with an overlay of the contours.
 */
- (UIImage *)uiImageWithContours:(ALContours*)contours;

/**
 *  Initialise an ALImage with an UIImage.
 *
 *  @param uiImage The UIImage to encapsulate.
 *
 *  @return A new instance of ALImage.
 */
- (instancetype)initWithUIImage:(UIImage *)uiImage;

/**
 *  Initialise an ALImage with an CVimageBufferRef.
 *
 *  @param imageBuffer The CVImageBufferRef to encapsulate.
 *
 *  @return A new instance of ALImage.
 */
- (instancetype)initWithImageBuffer:(CVImageBufferRef)imageBuffer;

/**
 *  Checks wether the ALImage is empty.
 *
 *  @return YES/NO wether the ALImage is empty.
 */
- (BOOL)isEmpy;

@end