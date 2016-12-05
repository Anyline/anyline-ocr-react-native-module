//
//  AnylineVideoView.h
//  OCR7
//
//  Created by Daniel Albertini on 20.06.13.
//  Copyright (c) 2013 9Yards GmbH. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <AVFoundation/AVFoundation.h>

#import "ALImageProvider.h"
#import "ALTorchManager.h"

@class ALSquare;
@class ALImage;
@class ALUIConfiguration;
@class ALCutoutView;
@class ALFlashButton;

@protocol AnylineVideoDataSampleBufferDelegate;
@protocol AnylineNativeBarcodeDelegate;

/**
 *  The AnylineVideoView renders the CapturePreview from the Camera on the screen. It also handles an efficient way to extract frames
 *  from the Video and provide them to Anyline with the ALImageProvider protocol. It should be initialised via ALUIConfiguration.
 *
 *  This View also provides appropriate cutoutView and flashButton subViews as configured in the ALUIConfiguration.
 */
@interface AnylineVideoView : UIView<ALImageProvider>
/**
 *  The FlashButton subview. Can be configured in the ALUIConfiguration.
 */
@property (nonatomic, strong, readonly) ALFlashButton *flashButton;
/**
 *  The CutoutView subview. Configurable with an ALUIConfiguration.
 */
@property (nonatomic, strong, readonly) ALCutoutView *cutoutView;
/**
 * Returns the bounding Rect of the visible WatermarkView with the correct location on the Module View.
 *
 * @warning May be nil before the layout process is completed or the license is not community.
 */
@property (nonatomic, readonly) CGRect watermarkRect;

/*
 The torch Manager is the interface to the flash/torch
 */
@property (nonatomic, strong) ALTorchManager *torchManager;

/**
 The native Barcode Recognition Delegate. Implement this delegate to receive barcodes results during scanning. 
 
 @warning Do not implement this delegate when you use the Barcode module.
 */
@property (nonatomic, weak) id<AnylineNativeBarcodeDelegate> barcodeDelegate;
/**
 The Sample Buffer Delegate gives you access to the video frames. You will get frames around 25 times per second. Do only access as much frames as you need, otherwise the performance will suffer.
 */
@property (nonatomic, weak) id<AnylineVideoDataSampleBufferDelegate> sampleBufferDelegate;

/**
 *  Initialises a new AnylineVideoView with a frame and a configuration.
 *
 *  @param frame            The frame where the view should be positioned.
 *  @param configuration    The configuration used to load the video view and the subviews.
 *
 *  @return A new instance of AnylineVideoView.
 */
- (instancetype)initWithFrame:(CGRect)frame configuration:(ALUIConfiguration *)configuration;
/**
 *  Initialises a new AnylineVideoView with a frame. The CaptureView will be initialised with the default 720p
 *  video. No FlashButton or CutoutView will be initialised.
 *
 *  @param frame            The frame where the view should be positioned.
 *
 *  @return A new instance of AnylineVideoView.
 */
- (instancetype)initWithFrame:(CGRect)frame;
/**
 *  Initialises a new AnylineVideoView with a coder and a configuration.
 *
 *  @param frame            The coder to initialise the view.
 *  @param configuration    The configuration used to load the video view and the subviews.
 *
 *  @return A new instance of AnylineVideoView
 */
- (instancetype)initWithCoder:(NSCoder *)aDecoder configuration:(ALUIConfiguration *)configuration;
/**
 *  Initialises a new AnylineVideoView with a coder. The CaptureView will be initialised with the default 720p
 *  video. No FlashButton or CutoutView will be initialised.
 *
 *  @param frame            The coder to initialise the view.
 *
 *  @return A new instance of AnylineVideoView.
 */
- (instancetype)initWithCoder:(NSCoder *)aDecoder;

/**
 Starts the video preview and frame extraction.

 @param error The error if starting fails.
 @return YES/NO if starting succeed/failed.
 */
- (BOOL)startVideoAndReturnError:(NSError **)error;

/**
 Stops the video preview and frame extraction.
 */
- (void)stopVideo;

/**
 You can set a custom focus & exposure point here. CGPoint value has to be between 0 and 1 like in the Apple interface.

 @param point Point with values between 0 and 1.
 */
- (void)setFocusAndExposurePoint:(CGPoint)point;

- (void)captureStillImageAndStopWithCompletionBlock:(ALImageProviderBlock)completionHandler;

- (ALSquare*)resizeSquareToFullImageSquare:(ALSquare*)square withImageSize:(CGSize)imageSize resizeWidth:(CGFloat)resizeWidth;


@end

@protocol AnylineVideoDataSampleBufferDelegate <NSObject>

@required
/**
 Called whenever an AVCaptureVideoDataOutput instance outputs a new video frame. For more information look at the Apple AVCaptureSession documentation.

 @param videoView The AnylineVideoView object
 @param sampleBuffer A CMSampleBuffer object containing the video frame data and additional information about the frame, such as its format and presentation time.
 */
- (void)anylineVideoView:(AnylineVideoView *)videoView
   didOutputSampleBuffer:(CMSampleBufferRef)sampleBuffer;

@end

@protocol AnylineNativeBarcodeDelegate <NSObject>

@required
/**
 Called whenever Apple finds a new Barcode in the frame. The same barcode can also be found in multiple frames, then the delegate will be called multiple times.

 @param videoView The AnylineVideoView object
 @param scanResult The scanned barcode value as NSString
 @param barcodeType The iOS Barcode type. see AVMetaDataObject documentation for all the types.
 */
- (void)anylineVideoView:(AnylineVideoView *)videoView
    didFindBarcodeResult:(NSString *)scanResult
                    type:(NSString *)barcodeType;

@end
