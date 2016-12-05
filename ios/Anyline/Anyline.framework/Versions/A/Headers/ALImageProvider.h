//
//  ALImageProvider.h
//  Anyline
//
//  Created by Daniel Albertini on 19/04/15.
//  Copyright (c) 2015 9Yards GmbH. All rights reserved.
//

#import "ALImage.h"

@protocol ALImageProvider <NSObject>

/**
 *  The block definition which will provide the callback for the next image.
 *
 *  @param image The next image to analyse.
 */
typedef void (^ALImageProviderBlock)(ALImage *image, NSError *error);

/**
 *  Method with which Anyline will request the next Image to analyse.
 *
 *  @param completionHandler The completion handler which should be called when the next frame/image
 *                           is available.
 */
- (void)provideNewImageWithCompletionBlock:(ALImageProviderBlock)completionHandler;

- (void)provideNewFullResolutionImageWithCompletionBlock:(ALImageProviderBlock)completionHandler;

@optional

- (void)provideStillImageWithCompletionBlock:(ALImageProviderBlock)completionHandler;

@end