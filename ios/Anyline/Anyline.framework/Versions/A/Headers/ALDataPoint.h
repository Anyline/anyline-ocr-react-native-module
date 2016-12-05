//
//  ALDataPoint.h
//  Anyline
//
//  Created by Daniel Albertini on 18.07.14.
//  Copyright (c) 2014 9Yards GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#import "ALIndexPath.h"
/**
 *  Specifies a DataPoint where in the ROI the interesting part is.
 */
@interface ALDataPoint : NSObject

/**
 *  The area where in the ROI the text is found.
 */
@property (nonatomic, assign) CGRect area;

/**
 *  The IndexPath for this text. Will be used as a refernece for the physical 
 *  location of the DataPoint in the ROI.
 */
@property (nonatomic, strong, readonly) ALIndexPath *indexPath;

/**
 *  The identifier for this DataPoint. Should be the same for connected texts which
 *  will be interpretet together.
 */
@property (nonatomic, strong, readonly) NSString *identifier;

/**
 *  Initialise a new DataPoint.
 *
 *  @param area       The area where the DataPoint in the ROI is found.
 *  @param indexPath  The indexPath for this DataPoint.
 *  @param identifier An identifier for this DataPoint.
 *
 *  @return New DataPoint object.
 */
- (instancetype)initWithArea:(CGRect)area
                   indexPath:(ALIndexPath *)indexPath
                  identifier:(NSString *)identifier;

/**
 *  Initialise a new DataPoint with a representing dictionary.
 *
 *  @param dictionary A dictionary representing a DataPoint object.
 *
 *  @return New DataPoint object.
 */
- (instancetype)initWithDictionary:(NSDictionary *)dictionary;

/**
 *  Initialise ether a new DigitDataPoint or TextDataPoint depending on the dictionary
 *
 *  @param dictionary The dictionary with the representing DataPoint.
 *
 *  @return New Text -or DigitDataPoint object.
 */
+ (ALDataPoint *)dataPointForDictionary:(NSDictionary *)dictionary;

@end
