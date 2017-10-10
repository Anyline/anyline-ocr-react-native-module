//
//  AnylineLicensePlateViewController.m
//
//  Created by Jonas Laux on 10/10/17.
//  Copyright © 2017 Anyline GmbH. All rights reserved.
//

#import "AnylineLicensePlateViewController.h"
#import <Anyline/Anyline.h>
#import "Anyline/AnylineLicensePlateModuleView.h"


// The controller has to conform to <AnylineOCRModuleDelegate> to be able to receive results
@interface AnylineLicensePlateViewController ()<AnylineLicensePlateModuleDelegate, AnylineDebugDelegate>

// The Anyline module used for OCR
@property (nonatomic, strong) AnylineLicensePlateModuleView *licensePlateModuleView;

@end

@implementation AnylineLicensePlateViewController
/*
 We will do our main setup in viewDidLoad. Its called once the view controller is getting ready to be displayed.
 */
- (void)viewDidLoad {
    [super viewDidLoad];
    dispatch_async(dispatch_get_main_queue(), ^{
        self.licensePlateModuleView = [[AnylineLicensePlateModuleView alloc] initWithFrame:self.view.bounds];

        NSError *error = nil;
        [self.licensePlateModuleView setupWithLicenseKey:self.key delegate:self error:&error];

        self.licensePlateModuleView.currentConfiguration = self.conf;

        self.moduleView = self.licensePlateModuleView;

        [self.view addSubview:self.moduleView];

        [self.view sendSubviewToBack:self.moduleView];
    });
}

/*
 This method will be called once the view controller and its subviews have appeared on screen
 */
-(void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];

    // We use this subroutine to start Anyline. The reason it has its own subroutine is
    // so that we can later use it to restart the scanning process.
    [self startAnyline];
}

/*
 Cancel scanning to allow the module to clean up
 */
- (void)viewWillDisappear:(BOOL)animated {
    [self.licensePlateModuleView cancelScanningAndReturnError:nil];
}

/*
 This method is used to tell Anyline to start scanning. It gets called in
 viewDidAppear to start scanning the moment the view appears. Once a result
 is found scanning will stop automatically (you can change this behaviour
 with cancelOnResult:). When the user dismisses self.identificationView this
 method will get called again.
 */
- (void)startAnyline {
    NSError *error;
    BOOL success = [self.licensePlateModuleView startScanningAndReturnError:&error];
    if( !success ) {
        // Something went wrong. The error object contains the error description
        NSAssert(success, @"Start Scanning Error: %@", error.debugDescription);
    }
}

#pragma mark -- AnylineOCRModuleDelegate

/*
 This is the main delegate method Anyline uses to report its results
 */

- (void)anylineLicensePlateModuleView:(AnylineLicensePlateModuleView *)anylineLicensePlateModuleView
                        didFindResult:(ALLicensePlateResult *)scanResult {
        // Get the imagepath from result
        NSString *imagePath = [self saveImageToFileSystem:scanResult.image];

        //Create the result Object
        NSMutableDictionary *dictResult = [NSMutableDictionary dictionaryWithCapacity:5];
        [dictResult setValue:scanResult.country forKey:@"country"];
        [dictResult setValue:scanResult.result forKey:@"licensePlate"];
        [dictResult setValue:[self stringForOutline:scanResult.outline] forKey:@"outline"];
        [dictResult setValue:@(scanResult.confidence) forKey:@"confidence"];
        [dictResult setValue:imagePath forKey:@"imagePath"];

        [self.delegate anylineBaseScanViewController:self didScan:dictResult continueScanning:!self.moduleView.cancelOnResult];

        if (self.moduleView.cancelOnResult) {
            [self dismissViewControllerAnimated:YES completion:NULL];
        }
}

- (void)anylineModuleView:(AnylineAbstractModuleView *)anylineModuleView
               runSkipped:(ALRunFailure)runFailure {
    switch (runFailure) {
        case ALRunFailureResultNotValid:
            break;
        case ALRunFailureConfidenceNotReached:
            break;
        case ALRunFailureNoLinesFound:
            break;
        case ALRunFailureNoTextFound:
            break;
        case ALRunFailureUnkown:
            break;
        default:
            break;
    }
}

- (void)alertView:(UIAlertView *)alertView didDismissWithButtonIndex:(NSInteger)buttonIndex {
    NSError *error = nil;
    BOOL success = [self.licensePlateModuleView startScanningAndReturnError:&error];

    NSAssert(success, @"We failed starting: %@",error.debugDescription);
}

@end