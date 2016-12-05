//
//  ALDisplayResult.h
//  Anyline
//
//  Created by Daniel Albertini on 16/10/13.
//  Copyright (c) 2013 9Yards GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "ALDigitResult.h"
#import "ALROISpec.h"
#import "ALResult.h"

/**
 *  The ALDisplayResult encapsulates all the neccessary objects and data 
 *  for the 7-Segment recognition client.
 */
@interface ALDisplayResult : ALResult<NSCopying>

/**
 *  This method returns the overall number of digits in the display.
 *
 *  @return Number of digits in display.
 */
- (int)numberOfDigits;

/**
 *  Returns the digits for a special identifier. 
 *  Note that there is no sort order garanteed in the array.
 *
 *  @param identifier The identifier for some digits.
 *
 *  @return All digits with an identifier, no sort order garanteed.
 */
- (NSArray *)digitsForIdentifier:(NSString *)identifier;

- (NSString *)stringRepresentationOfDigitsForIdentifier:(NSString *)identifier;

/**
 *  Returns the Quality or accuracy of a whole display scan. This is the average value of all
 *  the specified digits.
 *
 *  @return float value for quality. 1 ... best quality, 0 ... worst quality.
 */
- (float)quality;

/**
 *  Returns all the identifiers for the digit results stored.
 *
 *  @return Array with all the identifiers randomly sorted.
 */
- (NSArray *)digitIdentifiers;

@end
