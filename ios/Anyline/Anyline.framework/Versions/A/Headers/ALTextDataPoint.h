//
//  ALTextSpec.h
//  Anyline
//
//  Created by Daniel Albertini on 18.07.14.
//  Copyright (c) 2014 9Yards GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#import "ALDataPoint.h"
#import "ALIndexPath.h"

typedef struct ALCharacterRange {
    int minCharacterCount;
    int maxCharacterCount;
} ALCharacterRange;

ALCharacterRange ALCharacterRangeMake(int minCharacterCount, int maxCharacterCount);

@interface ALTextDataPoint : ALDataPoint

/**
 *  The tesseract parameters which should be used for this TextDataPoint.
 *  ex. "tessedit_char_whitelist".
 */
@property (nonatomic, strong, readonly) NSDictionary *tesseractParameter;

/**
 *  The languages which should be used. Should contain language strings like
 *  "eng" or "ger". The representing tessdata trainingfile has to be found in 
 *  the Main Bundle in a tessdata folder and be named ex. "eng.traineddata".
 */
@property (nonatomic, strong, readonly) NSArray *languages;

@property (nonatomic) ALCharacterRange characterCount;

/**
 *  Init method for a new TextDataPoint
 *
 *  @param area               The area where in the ROI the TextDataPoint is.
 *  @param indexPath          The indexPath for the specified datapoint.
 *  @param identifier         The identifier for the datapoint
 *  @param languages          The languages array used for the datapoint
 *  @param tesseractParameter The dictionary containing the special tesseractParameter
 *
 *  @return New instance of TextDataPoint.
 */
- (instancetype)initWithArea:(CGRect)area
                   indexPath:(ALIndexPath *)indexPath
                  identifier:(NSString *)identifier
                   languages:(NSArray *)languages
          tesseractParameter:(NSDictionary *)tesseractParameter;

/**
 *  Init method for a new TextDataPoint
 *
 *  @param area               The area where in the ROI the TextDataPoint is.
 *  @param indexPath          The indexPath for the specified datapoint.
 *  @param identifier         The identifier for the datapoint
 *  @param languages          The languages array used for the datapoint
 *  @param tesseractParameter The dictionary containing the special tesseractParameter
 *  @param characterRange     The character count range we need for this datapoint
 *
 *  @return New instance of TextDataPoint.
 */
- (instancetype)initWithArea:(CGRect)area
                   indexPath:(ALIndexPath *)indexPath
                  identifier:(NSString *)identifier
                   languages:(NSArray *)languages
          tesseractParameter:(NSDictionary *)tesseractParameter
              characterRange:(ALCharacterRange)characterRange;

@end
