//
//  ALDigitDataPoint.h
//  Anyline
//
//  Created by Daniel Albertini on 15.10.13.
//  Copyright (c) 2013 9Yards GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#import "ALSegmentSpec.h"
#import "ALIndexPath.h"
#import "ALDataPoint.h"

/**
 *  The ALDigitDataPoint describes the position, segments, the result combinations and 
 *  the relationship to other digits for a single digit.
 */
@interface ALDigitDataPoint : ALDataPoint

/**
 *  Array with all the segments for this digit.
 */
@property (nonatomic, strong, readonly) NSArray *segments;

/**
 *  Array with all the segments which are used for the quality or accurracy of the digit.
 */
@property (nonatomic, strong, readonly) NSArray *qualitySegments;

/**
 *  Dictionary with all the valid segment patterns and the result object for the
 *  patterns.
 */
@property (nonatomic, strong, readonly) NSDictionary *segmentResultPattern;

/**
 *  Dictionary with all the valid segment patterns and the result object for the
 *  patterns.
 */
@property (nonatomic, readonly) NSInteger italicOffset;

/**
 *  Designated initializer for an digit spec.
 *
 *  @param area                 The area where in the display the digit is found.
 *  @param indexPath            The indexPath for the specified digit.
 *  @param identifier           The identifier for the digit.
 *  @param segments             Array with all the segments for this digit.
 *  @param qualitySegments      Array with all the segments which should be used for
 *                              the calculation of the quality of the digit.
 *  @param segmentResultPattern Dictionary with all the valid segment patterns and 
 *                              the result object for the patterns.
 *
 *  @return A new instance of ALDigitDataPoint
 */
- (instancetype)initWithArea:(CGRect)area
                   indexPath:(ALIndexPath *)indexPath
                  identifier:(NSString *)identifier
                italicOffset:(NSInteger)italicOffset
                    segments:(NSArray *)segments
             qualitySegments:(NSArray *)qualitySegments
        segmentResultPattern:(NSDictionary *)segmentResultPattern;

/**
 *  Designated initializer for an digit spec.
 *
 *  @param area                 The area where in the display the digit is found.
 *  @param indexPath            The indexPath for the specified digit.
 *  @param identifier           The identifier for the digit.
 *  @param segmentResultPattern Dictionary with all the valid segment patterns and
 *                              the result object for the patterns.
 *
 *  @return A new instance of ALDigitDataPoint
 */
- (instancetype)initWithArea:(CGRect)area
                   indexPath:(ALIndexPath *)indexPath
                  identifier:(NSString *)identifier
                italicOffset:(NSInteger)italicOffset
        segmentResultPattern:(NSDictionary *)segmentResultPattern;

/**
 *  Designated initializer for an digit spec.
 *
 *  @param area                 The area where in the display the digit is found.
 *  @param indexPath            The indexPath for the specified digit.
 *  @param identifier           The identifier for the digit.
 *
 *  @return A new instance of ALDigitDataPoint
 */
- (instancetype)initWithArea:(CGRect)area
                   indexPath:(ALIndexPath *)indexPath
                  identifier:(NSString *)identifier
                italicOffset:(NSInteger)italicOffset;

/**
 *  Designated initializer for an digit spec.
 *
 *  @param area                 The area where in the display the digit is found.
 *  @param indexPath            The indexPath for the specified digit.
 *  @param identifier           The identifier for the digit.
 *
 *  @return A new instance of ALDigitDataPoint
 */
- (instancetype)initWithArea:(CGRect)area
                   indexPath:(ALIndexPath *)indexPath
                  identifier:(NSString *)identifier;

- (instancetype)initWithDictionary:(NSDictionary *)dictionary;

@end
