//
//  ALIndexPath.h
//  Anyline
//
//  Created by Daniel Albertini on 16/10/13.
//  Copyright (c) 2013 9Yards GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 *  With the ALIndexPath the position of the Digit can be specified. 
 *  Digits are sectioned in line and the position in the line.
 */
@interface ALIndexPath : NSObject

/**
 *  The line of the digit.
 */
@property (nonatomic) NSInteger line;

/**
 *  The position of the digit in the line.
 */
@property (nonatomic) NSInteger positionInLine;

/**
 *  Initialise an IndexPath with a position and line.
 *
 *  @param position The position of the digit in the line.
 *  @param line     The line of the digit.
 *
 *  @return A new IndexPath for a digit.
 */
- (instancetype)initWithPosition:(NSInteger)position inLine:(NSInteger)line;

/**
 *  Compares two IndexPaths and returns the comparison result.
 *
 *  @param object An other IndexPath object to compare to.
 *
 *  @return The NSComparisonResult for the the 2 IndexPaths.
 */
- (NSComparisonResult)compare:(id)object;

@end
