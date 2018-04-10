//
//  ALJsonUIConfiguration.h
//  FoodNotifyBussines
//
//  Created by Matthias Gasser on 12/11/15.
//
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

typedef NS_ENUM(NSUInteger, ALButtonXAlignment) {
    ALButtonXAlignmentLeft=0,
    ALButtonXAlignmentCenter=1,
    ALButtonXAlignmentRight=2
};

typedef NS_ENUM(NSUInteger, ALButtonYAlignment) {
    ALButtonYAlignmentTop=0,
    ALButtonYAlignmentCenter=1,
    ALButtonYAlignmentBottom=2
};


typedef NS_ENUM(NSUInteger, ALButtonType) {
    ALButtonTypeFullWidth=0,
    ALButtonTypeRect=1,
};


@interface ALJsonUIConfiguration : NSObject

// Done Button
@property (nonatomic,strong) NSString   *buttonDoneTitle;
@property (nonatomic,assign) CGFloat    buttonDoneFontSize;
@property (nonatomic,strong) NSString   *buttonDoneFontName;
@property (nonatomic,strong) UIColor    *buttonDoneTextColor;
@property (nonatomic,strong) UIColor    *buttonDoneTextColorHighlighted;
@property (nonatomic,strong) UIColor    *buttonDoneBackgroundColor;
@property (nonatomic,assign) ALButtonType buttonType;
@property (nonatomic,assign) CGFloat    buttonDoneCornerRadius;
@property (nonatomic,assign) ALButtonXAlignment buttonDoneXAlignment;
@property (nonatomic,assign) ALButtonYAlignment buttonDoneYAlignment;
@property (nonatomic,assign) CGFloat buttonDoneXPositionOffset;
@property (nonatomic,assign) CGFloat buttonDoneYPositionOffset;
    
@property (nonatomic,strong) NSArray<NSString *> *segmentTitles;
@property (nonatomic,strong) NSArray<NSString *> *segmentModes;
@property (nonatomic,strong) UIColor *segmentTintColor;
@property (nonatomic,assign) CGFloat segmentXPositionOffset;
@property (nonatomic,assign) CGFloat segmentYPositionOffset;
    
@property (nonatomic,strong) NSString *labelText;
@property (nonatomic,assign) CGFloat labelSize;
@property (nonatomic,strong) UIColor *labelColor;
@property (nonatomic,assign) CGFloat labelXPositionOffset;
@property (nonatomic,assign) CGFloat labelYPositionOffset;
    
-(instancetype) initWithDictionary:(NSDictionary*)dictionary;

@end
