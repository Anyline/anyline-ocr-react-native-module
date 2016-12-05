//
//  ALROISpec.h
//  Anyline
//
//  Created by Daniel Albertini on 18.07.14.
//  Copyright (c) 2014 9Yards GmbH. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>

/**
 *  The Spec file where the unique features of the ROI are specified.
 */
@interface ALROISpec : NSObject

/**
 *  The size to which the ROI should be normalized.
 *  The text/digit to read areas are specified relative to this size.
 */
@property (nonatomic, assign) CGSize size;

/**
 *  All the defined regions in the ROI where the information to read is.
 */
@property (nonatomic, strong) NSArray *dataPoints;

/**
 *  Init method for the ALROISpec.
 *
 *  @param dataPoints All the defined regions in the ROI where the information to read is.
 *  @param size   The size of the ROI.
 *
 *  @return A new instance of the ROI Specs.
 */
- (instancetype)initWithDataPoints:(NSArray *)dataPoints size:(CGSize)size;

/**
 *  Init method for the ALROISpec
 *
 *  @param dictionary A dictionary representing an ALROISpec object.
 *
 *  @return A new instance of the ROI Specs.
 */
- (instancetype)initWithDictionary:(NSDictionary *)dictionary;

/**
 *  Init method for the ALROISpec.
 *
 *  @param filename A json file name which has to be in the NSBundle with the .json file ending
 *
 *  @return A new instance of the ROI Specs.
 */
- (instancetype)initWithJSonFileName:(NSString *)filename;

/**
 *  Init method for the ALROISpec.
 *
 *  @param jsonString A json string representing an ALROISpec object
 *
 *  @return A new instance of the ROI Specs.
 */
- (instancetype)initWithJSonString:(NSString *)jsonString;

/**
 *  Init method for the ALROISpec.
 *
 *  @param jsonData Json data representing an ALROISpec object.
 *
 *  @return A new instance of the ROI Specs.
 */
- (instancetype)initWithJSonData:(NSData *)jsonData;

/**
 *  Returns all the datapoints for a defined line number.
 *
 *  @param line The line number for the datapoints to return.
 *
 *  @return An array of all the datapoints in the line.
 *          Note that there is no sort order garanteed.
 */
- (NSArray *)dataPointsForLine:(NSInteger)line;

- (NSArray *)lineNumbers;

@end
