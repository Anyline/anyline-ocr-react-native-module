//
//  ALMotionDetector.h
//  Anyline
//
//  Created by David Dengg on 25.08.16.
//  Copyright © 2016 9Yards GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreMotion/CoreMotion.h>

@protocol ALMotionDetectorDelegate <NSObject>
- (void)motionDetectorAboveThreshold;
@end

@interface ALMotionDetector : NSObject
@property (nonatomic, assign) id <ALMotionDetectorDelegate> delegate;
- (void)startListeningForMotion;
- (void)stopListeningForMotion;

- (instancetype)initWithThreshold:(CGFloat)threshold delegate:(id)delegate;
@end
