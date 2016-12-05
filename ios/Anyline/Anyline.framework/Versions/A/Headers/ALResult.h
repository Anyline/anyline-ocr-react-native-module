//
//  ALResult.h
//  Anyline
//
//  Created by Daniel Albertini on 18/07/14.
//  Copyright (c) 2014 9Yards GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ALROISpec.h"

/**
 *  The ALResult encapsulates all the neccessary objects and data
 *  for the text recognition client.
 */
@interface ALResult : NSObject

/**
 * The specs used to generate the result
 */
@property (nonatomic, strong) ALROISpec * specs;

/**
 *  Valid returns YES if we got a valid result for every identifier.
 */
@property (nonatomic) BOOL valid;

/**
 *  All the identifiers in which the digits are divided.
 *  Identifiers are all strings.
 *  There is no special sort order.
 *
 *  @return All the identifiers in the display.
 */
- (NSArray *)identifiers;

/**
 *  Returns the validated result object for an identifier or nil if identifier
 *  does not exist or no valid result was found for the identifier.
 *
 *  @param identifier The identifier for a result.
 *
 *  @return The result for the identifier. Return the object set by the validator
 *          @see ALValidator.
 */
- (id)resultForIdentifier:(NSString *)identifier;

@end
