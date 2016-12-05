//
//  ALValuesStack.h
//  Anyline
//
//  Created by Daniel Albertini on 14.10.13.
//  Copyright (c) 2013 9Yards GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 *  The ValuesStack allows you to save any result of the Anyline computation. 
 *  The actual result will then be compared to previous results and if there are enough
 *  equal values a new result will be available.
 *
 *  The new value is inticated with the hasNewResult property and can be once get with the newResult
 *  method.
 *
 *  All objects added to the stack must implement the isEqual and hash method.
 *
 *  The ValuesStack should always be used in compination with an @see
 *  ALObjectResultStackOperation.
 */
@interface ALValuesStack : NSObject

/**
 *  The size of the value stack. Determines how many results should be saved and then compared.
 */
@property (nonatomic) NSInteger size;

/**
 *  The minimum number of equal results needed in the stack to get a new result.
 *  Must be smaller or equal the size property.
 */
@property (nonatomic) NSInteger minEqualResults;

/**
 *  The last computed result of the values stack.
 */
@property (nonatomic, strong) id lastCommitedResult;

/**
 *  The boolean which inticate that a new result was generated.
 */
@property (nonatomic) BOOL hasNewResult;

/**
 *  Property if values stack allows the same result consecutively. 
 */
@property (nonatomic) BOOL consecutivelyValue;

@property (nonatomic) NSInteger currentEqualCount;

@property (nonatomic) NSInteger currentEqualCountWithoutEmpty;


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

/**
 *  Adds a new result to the value stack. If the size of the value stack is reached
 *  a new result will be searched and if found with the hasNewResult communicated.
 *
 *  If no new result is found the stack will be cleared.
 *
 *  If the stack has not reached the his size the value is added and nothing happens.
 *
 *  @param result The result to add to the stack.
 */
- (void)addResult:(id)result;

/**
 *  Returns a new result if the hasNewResult is true and nil otherwise.
 *
 *  @warning Result is only returned once.
 *
 *  @return new found result.
 */
- (id)newResult;

@end
