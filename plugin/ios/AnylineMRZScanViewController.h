
#import <UIKit/UIKit.h>
#import "AnylineBaseScanViewController.h"

@interface AnylineMRZScanViewController : AnylineBaseScanViewController

/**
 * Strict mode of MRZ module
 *
 * @since 3.23
 */
@property (nonatomic, assign) Boolean strictMode;

/**
 * Crop and Transform ID
 *
 * @since 3.26
 */
@property (nonatomic, assign) Boolean cropAndTransformID;
@property (nonatomic, strong) NSString *cropAndTransformErrorMessage;

@end

