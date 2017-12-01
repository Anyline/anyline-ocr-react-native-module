//
//  AnylineDocumentScanViewController.h
//  Anyline Cordova Example
//
//  Created by Daniel Albertini on 23/06/16.
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


@end
