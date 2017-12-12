
#import "AnylineBaseScanViewController.h"
#import <Anyline/Anyline.h>

@interface AnylineBaseScanViewController ()

@property (nonatomic,strong) UIButton *doneButton;

@end

@implementation AnylineBaseScanViewController

-(instancetype)initWithKey:(NSString*)key configuration:(ALUIConfiguration *)conf jsonConfiguration:(ALJsonUIConfiguration*)jsonConf delegate:(id<AnylineBaseScanViewControllerDelegate>)delegate {
    self = [super init];
    if(self) {
        _key = key;
        _delegate = delegate;
        _conf = conf;
        _jsonConfig = jsonConf;
    }
    return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];

    self.doneButton = [UIButton buttonWithType:UIButtonTypeCustom];
    [self.doneButton setTitle:self.jsonConfig.buttonDoneTitle
                     forState:UIControlStateNormal];

    [self.doneButton addTarget:self action:@selector(doneButtonPressed:) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:self.doneButton];

    [self updateButtonPosition:self.doneButton withConfiguration:self.jsonConfig];

    self.scannedLabel = [[UILabel alloc] initWithFrame:CGRectMake(0, 0, self.view.frame.size.width, 44)];
    self.scannedLabel.center = CGPointMake(self.view.center.x, self.view.center.y+166);

    self.scannedLabel.alpha = 0.0;
    self.scannedLabel.font = [UIFont fontWithName:@"HelveticaNeue" size:33];
    self.scannedLabel.textColor = [UIColor whiteColor];
    self.scannedLabel.textAlignment = NSTextAlignmentCenter;

    [self.view addSubview:self.scannedLabel];

}

-(void) updateButtonPosition:(UIButton*)button withConfiguration:(ALJsonUIConfiguration*)conf {

    CGPoint center = CGPointMake(0, 0);
    button.titleLabel.font = [UIFont fontWithName:conf.buttonDoneFontName size:conf.buttonDoneFontSize];
    [button setTitleColor:conf.buttonDoneTextColor forState:UIControlStateNormal];
    [button setTitleColor:conf.buttonDoneTextColorHighlighted forState:UIControlStateHighlighted];
    
    button.backgroundColor = conf.buttonDoneBackgroundColor;
    button.translatesAutoresizingMaskIntoConstraints = NO;
    button.layer.cornerRadius = conf.buttonDoneCornerRadius;
    
    switch (conf.buttonType) {
        case ALButtonTypeFullWidth:
            // Width constraint
            [self.view addConstraint:[NSLayoutConstraint constraintWithItem:button
                                                             attribute:NSLayoutAttributeWidth
                                                             relatedBy:NSLayoutRelationEqual
                                                                toItem:self.view
                                                             attribute:NSLayoutAttributeWidth
                                                            multiplier:1.0
                                                              constant:0]];
            break;
        
        case ALButtonTypeRect:
            [button sizeToFit];
            break;
        
        default:
            break;
    }
    
    switch (conf.buttonDoneXAlignment) {
        case ALButtonXAlignmentCenter:
            [self.view addConstraint:[NSLayoutConstraint constraintWithItem:button
                                                             attribute:NSLayoutAttributeCenterX
                                                             relatedBy:NSLayoutRelationEqual
                                                                toItem:self.view
                                                             attribute:NSLayoutAttributeCenterX
                                                            multiplier:1.0
                                                              constant:conf.buttonDoneXPositionOffset]];
            break;
        case ALButtonXAlignmentLeft:
            [self.view addConstraint:[NSLayoutConstraint constraintWithItem:button
                                                                  attribute:NSLayoutAttributeLeft
                                                                  relatedBy:NSLayoutRelationEqual
                                                                     toItem:self.view
                                                                  attribute:NSLayoutAttributeLeft
                                                                 multiplier:1.0
                                                                   constant:MAX(conf.buttonDoneXPositionOffset,0)]];
            break;
        case ALButtonXAlignmentRight:
            [self.view addConstraint:[NSLayoutConstraint constraintWithItem:button
                                                                  attribute:NSLayoutAttributeRight
                                                                  relatedBy:NSLayoutRelationEqual
                                                                     toItem:self.view
                                                                  attribute:NSLayoutAttributeRight
                                                                 multiplier:1.0
                                                                   constant:MIN(conf.buttonDoneXPositionOffset,0)]];
            break;
            
        default:
            break;
    }
    
    switch (conf.buttonDoneYAlignment) {
        case ALButtonYAlignmentTop:
            // Align Top
            [self.view addConstraint:[NSLayoutConstraint constraintWithItem:button
                                                                  attribute:NSLayoutAttributeTop
                                                                  relatedBy:NSLayoutRelationEqual
                                                                     toItem:self.view
                                                                  attribute:NSLayoutAttributeTop
                                                                 multiplier:1.0
                                                                   constant:MAX(conf.buttonDoneYPositionOffset,0)]];
            break;
        case ALButtonYAlignmentBottom:
            // Align Bottom
            [self.view addConstraint:[NSLayoutConstraint constraintWithItem:button
                                                             attribute:NSLayoutAttributeBottom
                                                             relatedBy:NSLayoutRelationEqual
                                                                toItem:self.view
                                                             attribute:NSLayoutAttributeBottom
                                                            multiplier:1.0
                                                              constant:MIN(conf.buttonDoneYPositionOffset,0)]];
            
            break;
        case ALButtonYAlignmentCenter:
            // Center vertically
            [self.view addConstraint:[NSLayoutConstraint constraintWithItem:button
                                                             attribute:NSLayoutAttributeCenterY
                                                             relatedBy:NSLayoutRelationEqual
                                                                toItem:self.view
                                                             attribute:NSLayoutAttributeCenterY
                                                            multiplier:1.0
                                                              constant:conf.buttonDoneYPositionOffset]];
            break;
            
        default:
            break;
    }
}

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    
    [UIApplication sharedApplication].idleTimerDisabled = YES;
    
    NSError *error;
    BOOL success = [self.moduleView startScanningAndReturnError:&error];
    if(!success) {
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Could not start scanning" message:error.localizedDescription delegate:self cancelButtonTitle:@"Ok" otherButtonTitles:nil];
        [alert show];
    }
}

- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex {
    [self dismissViewControllerAnimated:YES completion:^{
        [self.delegate anylineBaseScanViewController:self didStopScanning:self];
    }];
}

- (void)viewDidDisappear:(BOOL)animated {
    [self turnOffTorch];
    [UIApplication sharedApplication].idleTimerDisabled = NO;
}

- (BOOL)shouldAutorotate {
    return NO;
}

- (void)doneButtonPressed:(id)sender {
    [self turnOffTorch];
    [self.moduleView cancelScanningAndReturnError:nil];
    [self dismissViewControllerAnimated:YES completion:^{
        [self.delegate anylineBaseScanViewController:self didStopScanning:sender];
    }];
}

- (void)turnOffTorch{
    Class captureDeviceClass = NSClassFromString(@"AVCaptureDevice");
    if (captureDeviceClass != nil) {
        AVCaptureDevice *device = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
        if ([device hasTorch] && [device hasFlash]){
            [device lockForConfiguration:nil];
            [device setTorchMode:AVCaptureTorchModeOff];
            [device setFlashMode:AVCaptureFlashModeOff];
        }
    };
}

- (NSString *)saveImageToFileSystem:(UIImage *)image {
    return [self saveImageToFileSystem:image compressionQuality:0.9];
}

- (NSString *)saveImageToFileSystem:(UIImage *)image compressionQuality:(CGFloat)compressionQuality {
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES);
    NSString *basePath = ([paths count] > 0) ? [paths objectAtIndex:0] : nil;


    NSData *binaryImageData = UIImageJPEGRepresentation(image, compressionQuality);
    NSString *uuid = [NSUUID UUID].UUIDString;
    NSString *imagePath = [NSString stringWithFormat:@"%@.jpg",uuid];
    
    NSString *fullPath = [basePath stringByAppendingPathComponent:imagePath];
    [binaryImageData writeToFile:fullPath atomically:YES];
    
    return fullPath;
}


-(void)flashResultFor:(NSTimeInterval) duration {    
    [UIView animateWithDuration:duration/3 animations:^{
        self.scannedLabel.alpha = 1.0;
    } completion:^(BOOL finished) {
        [UIView animateWithDuration:duration/3*2 animations:^{
            self.scannedLabel.alpha = 0.0;
        } completion:^(BOOL finished) {
            // self.scannedLabel.alpha = 0.0;
        }];
    }];
}

- (NSString *)stringForOutline:(ALSquare *)square {
    return [NSString stringWithFormat:@"outline : { upLeft : { x : %f, y : %f }, upRight : { x : %f, y : %f }, downRight : { x : %f, y : %f }, downLeft : { x : %f, y : %f } }",square.upLeft.x,square.upLeft.y,square.upRight.x,square.upRight.y,square.downRight.x,square.downRight.y,square.downLeft.x,square.downLeft.y];
}


@end
