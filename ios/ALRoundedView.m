//
//  ALRoundedView.m
//  Anyline
//
//  Created by David Dengg on 18.01.16.
//  Copyright © 2016 Anyline GmbH. All rights reserved.
//

#import "ALRoundedView.h"

@interface ALRoundedView ()
@property (nonatomic, strong) UIButton *button;
@end


@implementation ALRoundedView

- (id)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        // Initialization code
        self.backgroundColor = [UIColor clearColor];
        self.borderColor = [UIColor clearColor];
        self.fillColor = [UIColor clearColor];
        self.cornerRadius = 15;
        self.opaque = NO;
        
        
        self.textLabel = [[UILabel alloc] initWithFrame:CGRectMake(0, 0, frame.size.width, frame.size.height)];
        self.textLabel.backgroundColor = [UIColor clearColor];
        self.textLabel.textAlignment = NSTextAlignmentCenter;
        self.textLabel.textColor = [UIColor whiteColor];
        self.textLabel.baselineAdjustment = UIBaselineAdjustmentAlignCenters;
        [self addSubview:self.textLabel];
    }
    return self;
}

- (void)setFrame:(CGRect)frame {
    [super setFrame:frame];
    [self.textLabel setFrame:CGRectMake(0, 0, frame.size.width, frame.size.height)];
}

- (void)setText:(NSString*)text; {
    self.textLabel.text = text;
}

- (void)drawRect:(CGRect)rect {
    [super drawRect:rect];
    
    //CGContextRef context = UIGraphicsGetCurrentContext();
    //CGContextSaveGState(context);
    //CGContextSetBlendMode(context, kCGBlendModeDestinationOut);
    
    CGRect frame = CGRectInset(self.bounds, 0, 0);
    
    CGRect mainRect = frame;
    
    
    UIBezierPath * path = [UIBezierPath bezierPathWithRoundedRect:mainRect
                                                     cornerRadius:self.cornerRadius];
    
    [_fillColor set];
    [path fill];
    
    
    if(nil != _borderColor && _borderWidth > 0) {
        UIBezierPath* outlinePath =
        self.cornerRadius > 0 ?
        [UIBezierPath bezierPathWithRoundedRect:CGRectInset(rect, _borderWidth/2 , _borderWidth/2 ) cornerRadius:self.cornerRadius > 0 ? self.cornerRadius + _borderWidth/2 : 0] :
        [UIBezierPath bezierPathWithRect:CGRectInset(rect, _borderWidth-1, _borderWidth-1)];
        
        [outlinePath setLineWidth:_borderWidth];
        
        [_borderColor set];
        [outlinePath stroke];
        
        mainRect = CGRectInset(frame, _borderWidth, _borderWidth);
    }
    
    //CGContextRestoreGState(context);
}

- (void)setBorderColor:(UIColor *)borderColor {
    _borderColor = borderColor;
    [self setNeedsDisplay];
}


- (void)addTarget:(id)target selector:(SEL)selector {
    [self.button removeFromSuperview];
    UIButton * button = [UIButton buttonWithType:UIButtonTypeCustom];
    button.frame = self.textLabel.frame;
    [button addTarget:target action:selector forControlEvents:UIControlEventTouchUpInside];
    [self addSubview:button];
    self.button = button;
}

- (void)addImage:(UIImage*)image {
    UIImageView * iv = [[UIImageView alloc] initWithFrame:CGRectInset(self.bounds, 2, 2)];
    iv.contentMode = UIViewContentModeScaleAspectFill;
    iv.image = image;
    [self addSubview:iv];
}

@end
