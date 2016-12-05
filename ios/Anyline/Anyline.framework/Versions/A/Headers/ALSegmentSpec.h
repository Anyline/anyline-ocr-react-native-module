//
//  ALSegmentSpec.h
//  Anyline
//
//  Created by Daniel Albertini on 15.10.13.
//  Copyright (c) 2013 9Yards GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

/**
 *  The ALSegmentSpec defines the position for one specific segment.
 */
@interface ALSegmentSpec : NSObject

/**
 *  The bounds for the segments.
 */
@property (nonatomic, assign) CGRect bounds;

/**
 *  Initialise a new Segment Spec.
 *
 *  @param bounds The bounds for the segments.
 *
 *  @return A new Segment Spec.
 */
- (instancetype)initWithBounds:(CGRect)bounds;

/**
 *  Initialise a new Segment Spec.
 *
 *  @param dictionary The dictionary representing an ALSegmentSpec
 *
 *  @return A new Segment Spec.
 */
- (instancetype)initWithDictionary:(NSDictionary *)dictionary;

@end
