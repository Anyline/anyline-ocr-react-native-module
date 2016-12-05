//
//  ALScanResultState.h
//  Anyline
//
//  Created by Matthias Gasser on 06/08/14.
//  Copyright (c) 2014 9Yards GmbH. All rights reserved.
//

#ifndef Anyline_ALScanResultState_h
#define Anyline_ALScanResultState_h

typedef NS_ENUM(NSUInteger, ALScanResultState) {
    ALScanResultUserDidAbortState=0,                    // aborted
    
    ALScanResultScanSuccessfulState=1,                  // accepted
    
    ALScanResultScanErrorWrongResultState=2,            // invalid
    ALScanResultUserDidEnterManuallyState=4,            // User entered the code manually
    ALScanResultScanErrorResultAlreadyUsedState=5,      // has been used before
    ALScanResultScanErrorResultAlreadyExpiredState=6,   // has already expired
    
    ALScanResultStateUserAccountInactive=10,            // User account inactive, scan result unknown
    ALScanResultStateUserAccountLocked=11,              // User account locked, scan result unknown
    ALScanResultStateUserReachedScanLimit=12,           // User reached scan limit, scan result unknown
    
    ALScanResultStateNetworkTimeout=13,                 // Backend network timeout (not anyline reporting timeout)
    
    ALScanResultStateModuleSuccess=21,                  // Module Success
    ALScanResultStateModuleAbort=22,                    // Module Abort
    
    ALScanResultStateUnknownError=99,                   // Unknown Error
    
};

#endif
