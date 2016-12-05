//
//  Anyline.h
//  Anyline
//
//  Created by Daniel Albertini on 19.03.13.
//  Copyright (c) 2013 9Yards GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>

// Anyline UIViews
#import "AnylineVideoView.h"
#import "ALCutoutView.h"
#import "ALFlashButton.h"

// UIView Addons
#import "ALUIConfiguration.h"
#import "ALUIConfiguration+Paths.h"
#import "ALViewConstants.h"

// Custom Objects
#import "ALError.h"

#import "ALIndexPath.h"
#import "ALImage.h"
#import "ALContours.h"
#import "ALSquare.h"

#import "ALROISpec.h"
#import "ALDigitDataPoint.h"
#import "ALTextDataPoint.h"
#import "ALDataPoint.h"
#import "ALSegmentSpec.h"

#import "ALResult.h"
#import "ALSegmentResult.h"
#import "ALDigitResult.h"
#import "ALDisplayResult.h"

#import "ALValuesStack.h"
#import "ALValuesStackFlipping.h"

// Generic Anyline Interface for all Use-cases
#import "AnylineController.h"
// Interface which should be implemented by the Image gathering source
#import "ALImageProvider.h"

// Abstract Module View
#import "AnylineAbstractModuleView.h"

// Simple Interfaces for the preconfigured Anyline Modules
#import "AnylineEnergyModuleView.h"
#import "AnylineBarcodeModuleView.h"
#import "AnylineMRZModuleView.h"
//#import "AnylineDebitcardModuleView.h"
#import "AnylineOCRModuleView.h"
#import "AnylineDocumentModuleView.h"