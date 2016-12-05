//
// Created by Daniel Albertini on 26/12/13.
// Copyright (c) 2013 9Yards GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

/**
 *  An ALSquare is an object with 4 points. They are an 2D representation of a rectangle in the image.
 */
@interface ALSquare : NSObject

/**
 *  The up left point of the square.
 */
@property (nonatomic, assign) CGPoint upLeft;

/**
 *  The up right point of the square.
 */
@property (nonatomic, assign) CGPoint upRight;

/**
 *  The down left point of the square.
 */
@property (nonatomic, assign) CGPoint downLeft;

/**
 *  The down right point of the square.
 */
@property (nonatomic, assign) CGPoint downRight;

/**
 *  Initialises an ALSquare with 4 points
 *
 *  @param upLeft    The up left point of the square.
 *  @param upRight   The up right point of the square.
 *  @param downLeft  The down left point of the square.
 *  @param downRight The down right point of the square.
 *
 *  @return A new instance of ALSquare.
 */
- (instancetype)initWithUpLeft:(CGPoint)upLeft upRight:(CGPoint)upRight downLeft:(CGPoint)downLeft downRight:(CGPoint)downRight;

/**
 *  Initialises an ALSquare with an CGRect
 *
 *  @param rect The rectangle to create an ALSquare
 *
 *  @return A new instance of ALSquare.
 */
- (instancetype)initWithCGRect:(CGRect)rect;

- (CGFloat)boundingX;

- (CGFloat)boundingY;

- (CGFloat)boundingWidth;

- (CGFloat)boundingHeight;

- (ALSquare *)squareWithPointOffset:(CGPoint)offset;

- (ALSquare *)squareWithScale:(CGFloat)scale;

- (CGFloat)area;

- (CGFloat)area2;

- (float)ratio;

- (CGRect)boxRect;

@end