//
//  ALSegmentResult.h
//  Anyline
//
//  Created by Daniel Albertini on 15/10/13.
//  Copyright (c) 2013 9Yards GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

/**
 *  The ALSegmentResult provides information of one single segment of a 7-Segment Digit.
 */
@interface ALSegmentResult : NSObject

/**
 *  The ratio of black pixels found in the segment area. 
 *  The segment area is searched within a surrounding so there 
 *  is enough redundance for some deviations.
 *
 *  Therefore already a small blackRatio of about 15% can 
 *  indicate an active segment.
*/
@property (nonatomic,readonly) float ratioBlackPixel;

/**
 *  The frame where the segment is located in the image.
 */
@property (nonatomic, assign) CGRect frame;

/**
 *  The computed status of this segment.
 */
@property (nonatomic, assign) BOOL active;

/**
 *  Initialise a SegmentResult with a black pixel ration and the frame.
 *
 *  @param ratioBlackPixel The ratio of black pixel in this segment.
 *  @param frame           The frame where the segment is located in the image.
 *
 *  @return A new SegmentResult with black pixel ratio and frame.
 */
- (instancetype)initWithRatioBlackPixel:(float)ratioBlackPixel frame:(CGRect)frame;

@end
