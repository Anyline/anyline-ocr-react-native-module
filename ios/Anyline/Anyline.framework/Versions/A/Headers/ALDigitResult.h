//
//  ALDigitResult.h
//  Anyline
//
//  Created by Daniel Albertini on 15/10/13.
//  Copyright (c) 2013 9Yards GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "ALSegmentResult.h"

#import "ALIndexPath.h"

/**
 *  The ALDigitResult provides all the neccessary information of one computed digit.
 */
@interface ALDigitResult : NSObject

/**
*  The computed value of the digit.
*/
@property (nonatomic, strong, readonly) id value;

/**
 *  The segments for this 7-Segment digit.
 */
@property (nonatomic, strong, readonly) NSArray *segments;

/**
 *  Array with all the segments which are used for the quality or accurracy of the digit.
 */
@property (nonatomic, strong, readonly) NSArray *qualitySegments;

/**
 *  The IndexPath of this digit. It is a representation for the digits how
 *  they are located on the display and related to each other.
 */
@property (nonatomic, strong, readonly) ALIndexPath *indexPath;

/**
 *  The identifier for this digit. With the identifier digits can be logically
 *  bind together and will be validated together.
 */
@property (nonatomic, strong, readonly) NSString *identifier;

/**
 *  The patternResultDictionary is used to interpret the segment results of a digit
 *  to an outcome value.
 */
@property (nonatomic, strong, readonly) NSDictionary *patternResultDictionary;

/**
 *  Returns the Quality or accuracy of a digit. This is the average value of all 
 *  the specified qualitySegments.
 *
 *  @return float value for quality. 1 ... best quality, 0 ... worst quality.
 */
- (float)quality;

@end
