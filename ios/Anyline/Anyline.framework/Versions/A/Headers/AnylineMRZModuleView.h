//
//  AnylineMRZModuleView.h
//  
//
//  Created by Daniel Albertini on 29/06/15.
//
//

#import "AnylineAbstractModuleView.h"

@interface ALIdentification : NSObject

@property (nonatomic, strong) NSString *documentType;
@property (nonatomic, strong) NSString *documentNumber;
@property (nonatomic, strong) NSString *surNames;
@property (nonatomic, strong) NSString *givenNames;
@property (nonatomic, strong) NSString *countryCode __deprecated_msg("Deprecated since 3.2.1. Use issuingCountryCode and nationalityCountryCode instead.");
@property (nonatomic, strong) NSString *issuingCountryCode;
@property (nonatomic, strong) NSString *nationalityCountryCode;
@property (nonatomic, strong) NSString *dayOfBirth;
@property (nonatomic, strong) NSString *expirationDate;
@property (nonatomic, strong) NSString *sex;
@property (nonatomic, strong) NSString *checkdigitNumber;
@property (nonatomic, strong) NSString *checkdigitExpirationDate;
@property (nonatomic, strong) NSString *checkdigitDayOfBirth;
@property (nonatomic, strong) NSString *checkdigitFinal;
@property (nonatomic, strong) NSString *personalNumber;
@property (nonatomic, strong) NSString *checkDigitPersonalNumber;
@property (nonatomic, strong) NSString *personalNumber2;




/**
 *  Initializes a ALIdentification object. This object is used to carry the scanned values.
 *
 *  @param documentType             The type of the document that was read. (ID/P)
 *  @param countryCode              The country code of the document. @deprecated in 3.2.1
 *  @param issuingCountryCode       The issuing country code of the document.
 *  @param nationalityCountryCode   The nationality country code of the document.
 *  @param surNames                 All the surNames of the person separated by whitespace.
 *  @param givenNames               All the given names of the person separated by whitespace.
 *  @param documentNumber           Passport number or document number.
 *  @param checkDigitNumber         Check digit for the document number.
 *  @param dayOfBirth               The day of birth.
 *  @param checkDigitDayOfBirth     Check digit for the day of birth.
 *  @param sex                      The gender of the person
 *  @param expirationDate           The expiration date of the passport / document.
 *  @param checkDigitExpirationDate Check digit for the expiration date.
 *  @param personalNumber           Personal Number on the document. Is nil on many passports / documents.
 *  @param checkDigitPersonalNumber CheckDigit for the personal number. Is nil or 0 when no personal number is used. 
 *                                  Is also nil on none passport documents.
 *  @param checkDigitFinal          On passports checkdigit over passport number, passport number checkdigit, date of birth,
 *                                  date of birth checkdigit, expiration date, expiration date checkdigit, personal number and
 *                                  personal number checkdigit.
 *                                  On other travel documents over document number, document number checkdigit, personal number,
 *                                  date of birth, date of birth checkdigit, expiration date and expiration date checkdigit.
 *
 *  @param personalNumber2          Optional data at the discretion of the issuing state. Only available in TD1 sized MROTDs. 
 *                                  Might contain additional information.
 *
 *  @return A new ALIdentification object
 */
- (instancetype)initWithDocumentType:(NSString*)documentType
                         countryCode:(NSString*)countryCode
                  issuingCountryCode:(NSString*)issuingCountryCode
              nationalityCountryCode:(NSString*)nationalityCountryCode
                            surNames:(NSString*)surNames
                          givenNames:(NSString*)givenNames
                      documentNumber:(NSString*)documentNumber
                    checkDigitNumber:(NSString*)checkDigitNumber
                          dayOfBirth:(NSString*)dayOfBirth
                checkDigitDayOfBirth:(NSString*)checkDigitDayOfBirth
                                 sex:(NSString*)sex
                      expirationDate:(NSString*)expirationDate
            checkDigitExpirationDate:(NSString*)checkdigitExpirationDate
                      personalNumber:(NSString*)personalNumber
            checkDigitPersonalNumber:(NSString*)checkDigitPersonalNumber
                     checkDigitFinal:(NSString*)checkDigitFinal
                     personalNumber2:(NSString*)personalNumber2;

@end

@protocol AnylineMRZModuleDelegate;

/**
 * The AnylineMRZModuleView class declares the programmatic interface for an object that manages easy access to Anylines MRZ scanning mode. 
 * All its capabilities are bundled into this AnylineAbstractModuleView subclass. Management of the scanning process happens within the view object.
 * It is configurable via interface builder.
 *
 * Communication with the host application is managed with a delegate that conforms to AnylineMRZModuleDelegate. The information that gets read is passed to the delegate with the help of of an ALIdentification object.
 *
 */
@interface AnylineMRZModuleView : AnylineAbstractModuleView


/**
 *  Sets the license key and delegate.
 *
 *  @param licenseKey The Anyline license key for this application bundle
 *  @param delegate The delegate that will receive the Anyline results (hast to conform to <AnylineMRZModuleDelegate>)
 *  @param error The error that occured
 *
 *  @return Boolean indicating the success / failure of the call.
 */
- (BOOL)setupWithLicenseKey:(NSString *)licenseKey
                   delegate:(id<AnylineMRZModuleDelegate>)delegate
                      error:(NSError **)error;

@end

@protocol AnylineMRZModuleDelegate <NSObject>

@optional
/**
 *  Returns the scanned value
 *
 *  @param anylineMRZModuleView The view that scanned the result
 *  @param scanResult The scanned value
 *  @param image The image that was used to scan the code
 *
 *  @deprecated since 3.2.1
 */
- (void)anylineMRZModuleView:(AnylineMRZModuleView *)anylineMRZModuleView
           didFindScanResult:(ALIdentification *)scanResult
                     atImage:(UIImage *)image __deprecated_msg("Deprecated since 3.2.1. Use method anylineMRZModuleView:didFindScanResult:allCheckDigitsValid:atImage: instead.");

@required

/**
 *  Returns the scanned value
 *
 *  @param anylineMRZModuleView The view that scanned the result
 *  @param scanResult The scanned value
 *  @param allCheckDigitsValid Boolean indicating if all check digits in the MRZ Zone are valid.
 *  @param image The image that was used to scan the code
 *
 */
- (void)anylineMRZModuleView:(AnylineMRZModuleView *)anylineMRZModuleView
           didFindScanResult:(ALIdentification *)scanResult
          allCheckDigitsValid:(BOOL)allCheckDigitsValid
                     atImage:(UIImage *)image;

@end
