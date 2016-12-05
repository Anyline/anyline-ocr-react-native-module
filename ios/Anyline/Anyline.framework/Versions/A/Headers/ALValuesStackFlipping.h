//
//  ALValuesStackFlipping.h
//  Anyline
//
//  Created by Daniel Albertini on 31.03.14.
//  Copyright (c) 2014 9Yards GmbH. All rights reserved.
//

#import "ALValuesStack.h"

/**
 *  An implementation of the ValuesStack which support ROI which switch information.
 */
@interface ALValuesStackFlipping : ALValuesStack

/**
 *  Initialises a new values stack with a certain size, minEqualResult and if the same value consecutively is allowed.
 *
 *  @param size               The size of the ValuesStack.
 *  @param minEqualResults    The minimum equal results needed for a new result.
 *  @param consecutivelyValue indicator if consective same results are allowed.
 *  @param partialResultSize  size for partialresult array to be accepted if other partial result = 0.
 *
 *  @return new ValuesStack object.
 */
- (instancetype)initWithSize:(NSInteger)size
         minimalEqualResults:(NSInteger)minEqualResults
 allowSameValueConsecutively:(BOOL)consecutivelyValue
     acceptPartialResultSize:(NSInteger)partialResultSize;

/**
 *  Initialises a new values stack with a certain size, minEqualResult and if the same value consecutively is allowed.
 *
 *  @param size               The size of the ValuesStack.
 *  @param minEqualResults    The minimum equal results needed for a new result.
 *  @param consecutivelyValue indicator if consective same results are allowed.
 *
 *  @return new ValuesStack object.
 */
- (instancetype)initWithSize:(NSInteger)size
         minimalEqualResults:(NSInteger)minEqualResults
 allowSameValueConsecutively:(BOOL)consecutivelyValue;

@end
