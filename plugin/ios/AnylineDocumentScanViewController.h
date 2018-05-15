//
//  AnylineDocumentScanViewController.h
//  Anyline React-Native Example
//
//  Created by Jonas Laux
//
//

#import "AnylineBaseScanViewController.h"

@interface AnylineDocumentScanViewController : AnylineBaseScanViewController

/**
 * Quality of the saved Document Image
 * @warning Parameter can only be changed when the scanning is not running.
 *
 * @since 3.18
 */

@property (nonatomic, assign) NSUInteger quality;

/**
  * Maximum resolution of the output image
  * @warning Parameter can only be changed when the scanning is not running.
  *
  * @since 3.19
  */
@property (nonatomic, assign) CGSize maxOutputResolution;


/**
 * Document Ratios and deviation
 * @warning Parameter can only be changed when the scanning is not running.
 *
 * @since 3.19
 */
@property (nonatomic, strong) NSArray *ratios;
@property (nonatomic, assign) CGFloat ratioDeviation;

/**
 * Document PostProcessing
 * @warning Parameter can only be changed when the scanning is not running.
 *
 * @since 3.24
 */
@property (nonatomic) Boolean postProcessing;

@end
