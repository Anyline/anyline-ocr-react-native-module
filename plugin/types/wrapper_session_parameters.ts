/**
 * Top-level schema encompassing all request and response types exchanged between the
 * wrapper plugin and the Anyline SDK during a scanning session.
 */
export interface WrapperSessionParameters {
    exportCachedEventsResponse?: WrapperSessionExportCachedEventsResponse;
    scanResponse?:               WrapperSessionScanResponse;
    scanResultsResponse?:        WrapperSessionScanResultsResponse;
    scanStartRequest?:           WrapperSessionScanStartRequest;
    scanStopRequest?:            WrapperSessionScanStopRequest;
    scanViewConfigOptions?:      WrapperSessionScanViewConfigOptions;
    sdkInitializationRequest?:   WrapperSessionSdkInitializationRequest;
    sdkInitializationResponse?:  WrapperSessionSdkInitializationResponse;
    ucrReportRequest?:           WrapperSessionUcrReportRequest;
    ucrReportResponse?:          WrapperSessionUcrReportResponse;
    [property: string]: any;
}

/**
 * Response from cached events export operation. Includes either failInfo (if export failed)
 * or succeedInfo (if successful), corresponding to the status field.
 */
export interface WrapperSessionExportCachedEventsResponse {
    /**
     * Populated when status is exportFailed. Contains the error that caused the failure.
     */
    failInfo?: WrapperSessionExportCachedEventsResponseFail;
    /**
     * The final status of the export operation.
     */
    status?: WrapperSessionExportCachedEventsResponseStatus;
    /**
     * Populated when status is exportSucceeded. Contains the path to the exported file.
     */
    succeedInfo?: WrapperSessionExportCachedEventsResponseSucceed;
    [property: string]: any;
}

/**
 * Populated when status is exportFailed. Contains the error that caused the failure.
 *
 * Details about a failed cached events export.
 */
export interface WrapperSessionExportCachedEventsResponseFail {
    /**
     * The last error received while exporting cached events.
     */
    lastError?: string;
    [property: string]: any;
}

/**
 * The final status of the export operation.
 *
 * Final status of a cached events export operation.
 */
export enum WrapperSessionExportCachedEventsResponseStatus {
    ExportFailed = "exportFailed",
    ExportSucceeded = "exportSucceeded",
}

/**
 * Populated when status is exportSucceeded. Contains the path to the exported file.
 *
 * Details about a successful cached events export.
 */
export interface WrapperSessionExportCachedEventsResponseSucceed {
    /**
     * Path to the generated file containing the exported cached events.
     */
    exportedFile?: string;
    [property: string]: any;
}

/**
 * Response indicating scan session completion status. Includes exactly one info object
 * (failInfo, abortInfo, or succeedInfo) corresponding to the status field value.
 */
export interface WrapperSessionScanResponse {
    /**
     * Populated when status is scanAborted. Contains the reason for the abort.
     */
    abortInfo?: WrapperSessionScanResponseAbort;
    /**
     * Populated when status is scanFailed. Contains the error that caused the failure.
     */
    failInfo?: WrapperSessionScanResponseFail;
    /**
     * The result configuration that was active during the completed scan session.
     */
    scanResultConfig?: WrapperSessionScanResultConfig;
    /**
     * The final status of the scan session.
     */
    status?: WrapperSessionScanResponseStatus;
    /**
     * Populated when status is scanSucceeded. Contains an optional completion message.
     */
    succeedInfo?: WrapperSessionScanResponseSucceed;
    [property: string]: any;
}

/**
 * Populated when status is scanAborted. Contains the reason for the abort.
 *
 * Details about an aborted scan session.
 */
export interface WrapperSessionScanResponseAbort {
    /**
     * Optional message provided when the scan session was aborted.
     */
    message?: string;
    [property: string]: any;
}

/**
 * Populated when status is scanFailed. Contains the error that caused the failure.
 *
 * Details about a failed scan session.
 */
export interface WrapperSessionScanResponseFail {
    /**
     * The last error received while trying to scan.
     */
    lastError?: string;
    [property: string]: any;
}

/**
 * The result configuration that was active during the completed scan session.
 *
 * Configuration for how scan results are returned and stored during a scanning session.
 *
 * The result configuration that was active when these results were produced.
 *
 * Configuration for how scan results are returned and stored during the session.
 */
export interface WrapperSessionScanResultConfig {
    /**
     * Deprecated. Used only by the legacy plugin. Custom callback method names for scan result
     * and UI element click events.
     */
    callbackConfig?: WrapperSessionScanResultCallbackConfig;
    /**
     * Controls when previously generated result files are removed from storage.
     */
    cleanStrategy?: WrapperSessionScanResultCleanStrategyConfig;
    /**
     * Specifies how scan result images are delivered — either saved to a file path or encoded
     * as base64 strings.
     */
    imageContainer?: ExportedScanResultImageContainer;
    /**
     * Output format and quality settings for scan result images.
     */
    imageParameters?: ExportedScanResultImageParameters;
    [property: string]: any;
}

/**
 * Deprecated. Used only by the legacy plugin. Custom callback method names for scan result
 * and UI element click events.
 *
 * Deprecated. Used only by the legacy plugin. Configuration for callback method names
 * invoked during scanning events.
 */
export interface WrapperSessionScanResultCallbackConfig {
    /**
     * Name of the callback method to invoke when scan results are available. Method will
     * receive a list of ExportedScanResult as parameter.
     */
    onResultEventName?: string;
    /**
     * Name of the callback method to invoke when user taps a UI feedback element during
     * scanning. Method receives a UIFeedbackElementConfig as parameter.
     */
    onUIElementClickedEventName?: string;
    [property: string]: any;
}

/**
 * Controls when previously generated result files are removed from storage.
 */
export enum WrapperSessionScanResultCleanStrategyConfig {
    CleanFolderOnStartScanning = "cleanFolderOnStartScanning",
    DeleteResultFilesOnFinishScanning = "deleteResultFilesOnFinishScanning",
    KeepResultFiles = "keepResultFiles",
}

/**
 * Specifies how scan result images are delivered — either saved to a file path or encoded
 * as base64 strings.
 *
 * Specifies how and where the scan result images are delivered.
 *
 * Specifies how and where scan result images are delivered. Use saved to store images to
 * disk, or encoded to receive them as base64 strings in the result.
 */
export interface ExportedScanResultImageContainer {
    /**
     * Deliver images as base64-encoded strings embedded in the result JSON.
     */
    encoded?: ExportedScanResultImageContainerEncoded;
    /**
     * Deliver images as files saved to the specified directory path.
     */
    saved?: ExportedScanResultImageContainerSaved;
    [property: string]: any;
}

/**
 * Deliver images as base64-encoded strings embedded in the result JSON.
 *
 * Image container that encodes scan result images as base64 strings in the result JSON.
 */
export interface ExportedScanResultImageContainerEncoded {
    /**
     * The base64-encoded image data for each image type.
     */
    images?: ExportedScanResultImages;
    [property: string]: any;
}

/**
 * The base64-encoded image data for each image type.
 *
 * References to the images captured during scanning. Each field is a file path (saved
 * container) or base64 string (encoded container). Fields are only populated for image
 * types the active plugin produces.
 *
 * The image filenames saved in the specified path.
 */
export interface ExportedScanResultImages {
    /**
     * The cropped cutout image corresponding to the scanned region.
     */
    cutoutImage?: string;
    /**
     * The face image extracted from the scanned document, if available.
     */
    faceImage?: string;
    /**
     * The full frame image captured at the moment of the scan result.
     */
    image?: string;
    [property: string]: any;
}

/**
 * Deliver images as files saved to the specified directory path.
 *
 * Image container that saves scan result images to a local file path.
 */
export interface ExportedScanResultImageContainerSaved {
    /**
     * The image filenames saved in the specified path.
     */
    images?: ExportedScanResultImages;
    /**
     * Directory path where scan result images are saved.
     */
    path?: string;
    [property: string]: any;
}

/**
 * Output format and quality settings for scan result images.
 *
 * Output format and quality settings applied to all images exported with this scan result.
 */
export interface ExportedScanResultImageParameters {
    /**
     * Image format used when exporting scan result images.
     */
    format?: ExportedScanResultImageFormat;
    /**
     * Compression quality for exported images, from 1 (lowest) to 100 (highest).
     */
    quality?: number;
    [property: string]: any;
}

/**
 * Image format used when exporting scan result images.
 */
export enum ExportedScanResultImageFormat {
    Jpg = "jpg",
    Png = "png",
}

/**
 * The final status of the scan session.
 *
 * Final status of a scan session.
 */
export enum WrapperSessionScanResponseStatus {
    ScanAborted = "scanAborted",
    ScanFailed = "scanFailed",
    ScanSucceeded = "scanSucceeded",
}

/**
 * Populated when status is scanSucceeded. Contains an optional completion message.
 *
 * Details about a successfully completed scan session.
 */
export interface WrapperSessionScanResponseSucceed {
    /**
     * Optional informational message from the completed scan session.
     */
    message?: string;
    [property: string]: any;
}

/**
 * Information about the results collected during the scanning process.
 */
export interface WrapperSessionScanResultsResponse {
    /**
     * List of scan results produced in this scanning event, one per detected item.
     */
    exportedScanResults?: ExportedScanResult[];
    /**
     * The result configuration that was active when these results were produced.
     */
    scanResultConfig?: WrapperSessionScanResultConfig;
    /**
     * Additional metadata about the source plugin that produced these results.
     */
    scanResultExtraInfo?: WrapperSessionScanResultExtraInfo;
    [property: string]: any;
}

/**
 * A single scan result exported from the Anyline SDK, containing the plugin-specific result
 * data together with the associated scan images.
 */
export interface ExportedScanResult {
    /**
     * Specifies how and where the scan result images are delivered.
     */
    imageContainer?: ExportedScanResultImageContainer;
    /**
     * Output format and quality settings applied to all images exported with this scan result.
     */
    imageParameters?: ExportedScanResultImageParameters;
    /**
     * The plugin-specific scan result produced by the Anyline SDK.
     */
    pluginResult?: PluginResult;
    [property: string]: any;
}

/**
 * The plugin-specific scan result produced by the Anyline SDK.
 *
 * Describes all kinds of scan results
 */
export interface PluginResult {
    barcodeResult?: BarcodeResult;
    /**
     * The blobKey (provided optionally, depending on the Anyline license settings)
     */
    blobKey?:                string;
    commercialTireIdResult?: CommercialTireIdResult;
    /**
     * Provides a general confidence value between 0 and 100 if applicable. -1 if no confidence
     * was calculated
     */
    confidence?:      number;
    containerResult?: ContainerResult;
    /**
     * The rect information of the region that was processed within the image
     */
    cropRect?:                        CropRect;
    japaneseLandingPermissionResult?: JapaneseLandingPermissionResult;
    licensePlateResult?:              LicensePlateResult;
    meterResult?:                     MeterResult;
    mrzResult?:                       MrzResult;
    ocrResult?:                       OcrResult;
    odometerResult?:                  OdometerResult;
    /**
     * representing time measurements for different parts of the process.
     */
    performanceMetrics?: PerformanceMetrics;
    /**
     * The ID of the ScanPlugin that processed the result
     */
    pluginID?:       string;
    tinResult?:      TinResult;
    tireMakeResult?: TireMakeResult;
    tireSizeResult?: TireSizeResult;
    /**
     * A unique UUIDv4 generated for each scan controller process run.
     */
    transactionId?:                        string;
    universalIdResult?:                    UniversalIdResult;
    vehicleRegistrationCertificateResult?: VehicleRegistrationCertificateResult;
    vinResult?:                            VinResult;
}

/**
 * Describes result information of scanning barcodes
 */
export interface BarcodeResult {
    /**
     * Contains a list of one or more barcodes found on the processed image
     */
    barcodes?: Barcode[];
}

/**
 * Describes barcode information
 */
export interface Barcode {
    aamva?: Aamva;
    /**
     * Contains the base64-encoded value
     */
    base64value?: string;
    /**
     * Corner points of a polygon surrounding the discovered barcode, starting from the
     * bottom-left coordinate going counter-clockwise. The coordinates are in reference to the
     * image of the plugin result.
     */
    coordinates?: number[];
    /**
     * The barcode format
     */
    format?: string;
    /**
     * The value of the barcode
     */
    value?: string;
}

/**
 * Holds all encoded barcode information according to the AAMVA standard
 */
export interface Aamva {
    AAMVA_version?: number;
    "body-part"?:   BodyPart;
    [property: string]: any;
}

export interface BodyPart {
    auditInformation?:       string;
    cardRevisionDate?:       string;
    city?:                   string;
    complianceType?:         string;
    countryID?:              string;
    customerIDNumber?:       string;
    dateOfBirth?:            string;
    dateOfExpiry?:           string;
    dateOfIssue?:            string;
    documentDiscriminator?:  string;
    drivingPrivilege?:       string;
    endorsementCode?:        string;
    eyes?:                   string;
    firstName?:              string;
    firstNameTruncated?:     string;
    hair?:                   string;
    height?:                 string;
    inventoryControlNumber?: string;
    jurisdictionCode?:       string;
    lastName?:               string;
    lastNameTruncated?:      string;
    licenseClass?:           string;
    middleName?:             string;
    middleNameTruncated?:    string;
    postalCode?:             string;
    sex?:                    string;
    street?:                 string;
    [property: string]: any;
}

/**
 * Describes result information of scanning commercial tire IDs
 */
export interface CommercialTireIdResult {
    /**
     * The text value of the commercial tire ID
     */
    text?: string;
}

/**
 * Describes result information of scanning shipping containers
 */
export interface ContainerResult {
    /**
     * The text value of the shipping container
     */
    text?: string;
}

/**
 * The rect information of the region that was processed within the image
 */
export interface CropRect {
    /**
     * The height
     */
    height?: number;
    /**
     * The width
     */
    width?: number;
    /**
     * The X value
     */
    x?: number;
    /**
     * The Y value
     */
    y?: number;
}

/**
 * Describes result information of scanning japanese landing permission tickets
 */
export interface JapaneseLandingPermissionResult {
    /**
     * Yields field information of a japanese landing permission ticket
     */
    result?: JlpResult;
}

/**
 * Yields field information of a japanese landing permission ticket
 */
export interface JlpResult {
    airport?:      JapaneseLandingPermissionResultField;
    dateOfExpiry?: JapaneseLandingPermissionResultField;
    dateOfIssue?:  JapaneseLandingPermissionResultField;
    duration?:     JapaneseLandingPermissionResultField;
    status?:       JapaneseLandingPermissionResultField;
}

/**
 * Provides result information for japanese landing permission fields
 */
export interface JapaneseLandingPermissionResultField {
    /**
     * The confidence information of the field
     */
    confidence?: number;
    /**
     * The text information of the field
     */
    text?: string;
}

/**
 * Describes result information of scanning license plates
 */
export interface LicensePlateResult {
    /**
     * The area information
     */
    area?: Area;
    /**
     * The country information
     */
    country?: string;
    /**
     * The plate text
     */
    plateText?: string;
    /**
     * (Optional) If vehicleInspectionSticker config is OPTIONAL, this is true if a Visual
     * Inspection Sticker was found, false otherwise. If the config is MANDATORY, this field is
     * always true.
     */
    vehicleInspectionFound?: boolean;
    /**
     * (Optional) The month depicted on the Visual Inspection Sticker.
     */
    vehicleInspectionMonth?: string;
    /**
     * (Optional) This is true, if the Visual Inspection Sticker depicts a date in the future.
     */
    vehicleInspectionValid?: boolean;
    /**
     * (Optional) The year depicted on the Visual Inspection Sticker.
     */
    vehicleInspectionYear?: string;
}

/**
 * The area information
 */
export enum Area {
    Alabama = "Alabama",
    Alaska = "Alaska",
    Alberta = "Alberta",
    AmericanSamoa = "American Samoa",
    Arizona = "Arizona",
    Arkansas = "Arkansas",
    BritishColumbia = "British Columbia",
    California = "California",
    Colorado = "Colorado",
    Connecticut = "Connecticut",
    Delaware = "Delaware",
    DistrictOfColumbia = "District of Columbia",
    Florida = "Florida",
    Georgia = "Georgia",
    Guam = "Guam",
    Hawaii = "Hawaii",
    Idaho = "Idaho",
    Illinois = "Illinois",
    Indiana = "Indiana",
    Iowa = "Iowa",
    Kansas = "Kansas",
    Kentucky = "Kentucky",
    Louisiana = "Louisiana",
    Maine = "Maine",
    Manitoba = "Manitoba",
    Maryland = "Maryland",
    Massachusetts = "Massachusetts",
    Michigan = "Michigan",
    Minnesota = "Minnesota",
    Mississippi = "Mississippi",
    Missouri = "Missouri",
    Montana = "Montana",
    Nebraska = "Nebraska",
    Nevada = "Nevada",
    NewBrunswick = "New Brunswick",
    NewHampshire = "New Hampshire",
    NewJersey = "New Jersey",
    NewMexico = "New Mexico",
    NewYork = "New York",
    NorthCarolina = "North Carolina",
    NorthDakota = "North Dakota",
    NovaScotia = "Nova Scotia",
    Ohio = "Ohio",
    Oklahoma = "Oklahoma",
    Ontario = "Ontario",
    Oregon = "Oregon",
    Pennsylvania = "Pennsylvania",
    PuertoRico = "Puerto Rico",
    Quebec = "Quebec",
    RhodeIsland = "Rhode Island",
    Saskatchewan = "Saskatchewan",
    SouthCarolina = "South Carolina",
    SouthDakota = "South Dakota",
    Tennessee = "Tennessee",
    Texas = "Texas",
    Utah = "Utah",
    Vermont = "Vermont",
    Virginia = "Virginia",
    Washington = "Washington",
    WestVirginia = "West Virginia",
    Wisconsin = "Wisconsin",
    Wyoming = "Wyoming",
}

/**
 * Describes result information of scanning meters
 */
export interface MeterResult {
    /**
     * The position. Only applicable for OBIS meters - see https://onemeter.com/docs/device/obis/
     */
    position?: string;
    /**
     * The unit value. Only applicable for multi-field meter scanning.
     */
    unit?: string;
    /**
     * The meter value.
     */
    value?: string;
}

/**
 * Describes result information of scanning MRZ
 */
export interface MrzResult {
    /**
     * True if all check digits are valid
     */
    allCheckDigitsValid?: boolean;
    /**
     * The CheckDigitDateOfBirth
     */
    checkDigitDateOfBirth?: string;
    /**
     * The CheckDigitDateOfExpiry
     */
    checkDigitDateOfExpiry?: string;
    /**
     * The CheckDigitDocumentNumber
     */
    checkDigitDocumentNumber?: string;
    /**
     * The CheckDigitFinal
     */
    checkDigitFinal?: string;
    /**
     * The CheckDigitPersonalNumber
     */
    checkDigitPersonalNumber?: string;
    /**
     * The DateOfBirth
     */
    dateOfBirth?: string;
    /**
     * The DateOfBirthObject
     */
    dateOfBirthObject?: string;
    /**
     * The DateOfExpiry
     */
    dateOfExpiry?: string;
    /**
     * The DateOfExpiryObject
     */
    dateOfExpiryObject?: string;
    /**
     * The DocumentNumber
     */
    documentNumber?: string;
    /**
     * The DocumentType
     */
    documentType?: string;
    /**
     * The confidence values of each field
     */
    fieldConfidences?: FieldConfidences;
    /**
     * The FirstName
     */
    firstName?: string;
    /**
     * The GivenNames
     */
    givenNames?: string;
    /**
     * The IssuingCountryCode
     */
    issuingCountryCode?: string;
    /**
     * The LastName
     */
    lastName?: string;
    /**
     * The MRZString
     */
    mrzString?: string;
    /**
     * The NationalityCountryCode
     */
    nationalityCountryCode?: string;
    /**
     * The OptionalData
     */
    optionalData?: string;
    /**
     * The PersonalNumber
     */
    personalNumber?: string;
    /**
     * The Sex
     */
    sex?: string;
    /**
     * The Surname
     */
    surname?: string;
    /**
     * The Adress of the Visual Inspection Zone
     */
    vizAddress?: string;
    /**
     * The DateOfBirth of the Visual Inspection Zone
     */
    vizDateOfBirth?: string;
    /**
     * The DateOfBirthObject of the Visual Inspection Zone
     */
    vizDateOfBirthObject?: string;
    /**
     * The DateOfExpiry of the Visual Inspection Zone
     */
    vizDateOfExpiry?: string;
    /**
     * The DateOfExpiryObject of the Visual Inspection Zone
     */
    vizDateOfExpiryObject?: string;
    /**
     * The DateOfIssue of the Visual Inspection Zone
     */
    vizDateOfIssue?: string;
    /**
     * The DateOfIssueObject of the Visual Inspection Zone
     */
    vizDateOfIssueObject?: string;
    /**
     * The GivenNames of the Visual Inspection Zone
     */
    vizGivenNames?: string;
    /**
     * The Surname of the Visual Inspection Zone
     */
    vizSurname?: string;
}

/**
 * The confidence values of each field
 */
export interface FieldConfidences {
    checkDigitDateOfBirth?:    number;
    checkDigitDateOfExpiry?:   number;
    checkDigitDocumentNumber?: number;
    checkDigitFinal?:          number;
    checkDigitPersonalNumber?: number;
    dateOfBirth?:              number;
    dateOfExpiry?:             number;
    documentNumber?:           number;
    documentType?:             number;
    givenNames?:               number;
    issuingCountryCode?:       number;
    mrzString?:                number;
    nationalityCountryCode?:   number;
    optionalData?:             number;
    personalNumber?:           number;
    sex?:                      number;
    surname?:                  number;
    vizAddress?:               number;
    vizDateOfBirth?:           number;
    vizDateOfExpiry?:          number;
    vizDateOfIssue?:           number;
    vizGivenNames?:            number;
    vizSurname?:               number;
}

/**
 * Describes result information of scanning general OCR
 */
export interface OcrResult {
    /**
     * The OCR text value.
     */
    text?: string;
}

/**
 * Describes result information of scanning odometers
 */
export interface OdometerResult {
    /**
     * The odometer value.
     */
    value?: string;
}

/**
 * representing time measurements for different parts of the process.
 */
export interface PerformanceMetrics {
    /**
     * The total duration of the scan controller process, in milliseconds
     */
    scanControllerProcessInMs?: number;
    [property: string]: any;
}

/**
 * Describes result information of scanning tire identification numbers (TIN)
 */
export interface TinResult {
    /**
     * The production date on the TIN reformatted to YYYY/MM.
     */
    productionDate?: string;
    /**
     * The TIN text split by context with spaces as delimiter.
     */
    resultPrettified?: string;
    /**
     * The TIN text value.
     */
    text?: string;
    /**
     * The computed tire age in years rounded down.
     */
    tireAgeInYearsRoundedDown?: number;
}

/**
 * Describes result information of scanning tire makes
 */
export interface TireMakeResult {
    /**
     * The text value of the tire make
     */
    text?: string;
}

/**
 * Describes result information of scanning tire size specifications
 */
export interface TireSizeResult {
    commercialTire?:           TireSizeResultField;
    construction?:             TireSizeResultField;
    diameter?:                 TireSizeResultField;
    extraLoad?:                TireSizeResultField;
    loadIndex?:                TireSizeResultField;
    prettifiedString?:         TireSizeResultField;
    prettifiedStringWithMeta?: TireSizeResultField;
    ratio?:                    TireSizeResultField;
    speedRating?:              TireSizeResultField;
    text?:                     TireSizeResultField;
    vehicleType?:              TireSizeResultField;
    width?:                    TireSizeResultField;
    winter?:                   TireSizeResultField;
}

export interface TireSizeResultField {
    /**
     * The confidence value of the tire size field.
     */
    confidence?: number;
    /**
     * The text value of the tire size field.
     */
    text?: string;
    [property: string]: any;
}

/**
 * Describes result information of scanning different kinds of IDs
 */
export interface UniversalIdResult {
    /**
     * Yields field information of the ID
     */
    result?:        IdResult;
    visualization?: Visualization;
}

/**
 * Yields field information of the ID
 */
export interface IdResult {
    additionalInformation?:      UniversalIdResultField;
    additionalInformation1?:     UniversalIdResultField;
    additionalInformation2?:     UniversalIdResultField;
    additionalInformation3?:     UniversalIdResultField;
    address?:                    UniversalIdResultField;
    age?:                        UniversalIdResultField;
    airport?:                    UniversalIdResultField;
    allCheckDigitsValid?:        UniversalIdResultField;
    audit?:                      UniversalIdResultField;
    authority?:                  UniversalIdResultField;
    barcode?:                    UniversalIdResultField;
    bloodType?:                  UniversalIdResultField;
    cardAccessNumber?:           UniversalIdResultField;
    checkDigitDateOfBirth?:      UniversalIdResultField;
    checkDigitDateOfExpiry?:     UniversalIdResultField;
    checkDigitDocumentNumber?:   UniversalIdResultField;
    checkDigitFinal?:            UniversalIdResultField;
    checkDigitPersonalNumber?:   UniversalIdResultField;
    cityNumber?:                 UniversalIdResultField;
    conditions?:                 UniversalIdResultField;
    country?:                    UniversalIdResultField;
    dateOfBirth?:                UniversalIdResultField;
    dateOfBirthObject?:          UniversalIdResultField;
    dateOfExpiry?:               UniversalIdResultField;
    dateOfExpiryObject?:         UniversalIdResultField;
    dateOfIssue?:                UniversalIdResultField;
    dateOfRegistration?:         UniversalIdResultField;
    degreeOfDisability?:         UniversalIdResultField;
    divisionNumber?:             UniversalIdResultField;
    documentCategoryDefinition?: UniversalIdResultField;
    documentDiscriminator?:      UniversalIdResultField;
    documentNumber?:             UniversalIdResultField;
    documentRegionDefinition?:   UniversalIdResultField;
    documentSideDefinition?:     UniversalIdResultField;
    documentType?:               UniversalIdResultField;
    documentTypeDefinition?:     UniversalIdResultField;
    documentVersionsDefinition?: UniversalIdResultField;
    duplicate?:                  UniversalIdResultField;
    duration?:                   UniversalIdResultField;
    educationalInstitution?:     UniversalIdResultField;
    employer?:                   UniversalIdResultField;
    endorsements?:               UniversalIdResultField;
    eyes?:                       UniversalIdResultField;
    face?:                       UniversalIdResultField;
    familyNumber?:               UniversalIdResultField;
    familyRelation?:             UniversalIdResultField;
    fathersName?:                UniversalIdResultField;
    firstIssued?:                UniversalIdResultField;
    firstName?:                  UniversalIdResultField;
    folio?:                      UniversalIdResultField;
    formattedDateOfBirth?:       UniversalIdResultField;
    formattedDateOfExpiry?:      UniversalIdResultField;
    formattedDateOfIssue?:       UniversalIdResultField;
    fullName?:                   UniversalIdResultField;
    givenNames?:                 UniversalIdResultField;
    hair?:                       UniversalIdResultField;
    headOfFamily?:               UniversalIdResultField;
    height?:                     UniversalIdResultField;
    hologram?:                   UniversalIdResultField;
    initials?:                   UniversalIdResultField;
    initialsAndDateOfBirth?:     UniversalIdResultField;
    issuingCountryCode?:         UniversalIdResultField;
    lastName?:                   UniversalIdResultField;
    licenseClass?:               UniversalIdResultField;
    licenseType?:                UniversalIdResultField;
    maidenName?:                 UniversalIdResultField;
    militaryRank?:               UniversalIdResultField;
    mirrorNumber?:               UniversalIdResultField;
    mothersName?:                UniversalIdResultField;
    mrz?:                        UniversalIdResultField;
    mrzString?:                  UniversalIdResultField;
    municipalityNumber?:         UniversalIdResultField;
    nationality?:                UniversalIdResultField;
    nationalityCountryCode?:     UniversalIdResultField;
    occupation?:                 UniversalIdResultField;
    office?:                     UniversalIdResultField;
    optionalData?:               UniversalIdResultField;
    parentsFirstName?:           UniversalIdResultField;
    parish?:                     UniversalIdResultField;
    personalNumber?:             UniversalIdResultField;
    placeAndDateOfBirth?:        UniversalIdResultField;
    placeOfBirth?:               UniversalIdResultField;
    previousType?:               UniversalIdResultField;
    pseudonym?:                  UniversalIdResultField;
    religion?:                   UniversalIdResultField;
    restrictions?:               UniversalIdResultField;
    sex?:                        UniversalIdResultField;
    signature?:                  UniversalIdResultField;
    socialSecurityNumber?:       UniversalIdResultField;
    state?:                      UniversalIdResultField;
    stateNumber?:                UniversalIdResultField;
    status?:                     UniversalIdResultField;
    surname?:                    UniversalIdResultField;
    vizAddress?:                 UniversalIdResultField;
    vizDateOfBirth?:             UniversalIdResultField;
    vizDateOfBirthObject?:       UniversalIdResultField;
    vizDateOfExpiry?:            UniversalIdResultField;
    vizDateOfExpiryObject?:      UniversalIdResultField;
    vizDateOfIssue?:             UniversalIdResultField;
    vizDateOfIssueObject?:       UniversalIdResultField;
    vizGivenNames?:              UniversalIdResultField;
    vizSurname?:                 UniversalIdResultField;
    voterId?:                    UniversalIdResultField;
    weight?:                     UniversalIdResultField;
    workPermitNumber?:           UniversalIdResultField;
}

/**
 * Describes scanned parameters of an ID field
 */
export interface UniversalIdResultField {
    /**
     * Describes the date value of an ID field
     */
    dateValue?: DateValue;
    /**
     * Describes the text values of an ID field
     */
    textValues?: TextValues;
}

/**
 * Describes the date value of an ID field
 */
export interface DateValue {
    /**
     * The confidence value
     */
    confidence?: number;
    /**
     * The day
     */
    day?: number;
    /**
     * The formatted text value
     */
    formattedText?: string;
    /**
     * The month
     */
    month?: number;
    /**
     * The text value
     */
    text?: string;
    /**
     * The year
     */
    year?: number;
}

/**
 * Describes the text values of an ID field
 */
export interface TextValues {
    /**
     * The text parameters
     */
    arabic?: Arabic;
    /**
     * The text parameters
     */
    cyrillic?: Cyrillic;
    /**
     * The text parameters
     */
    latin?: Latin;
}

/**
 * The text parameters
 */
export interface Arabic {
    /**
     * The confidence value
     */
    confidence?: number;
    /**
     * The text value
     */
    text?: string;
}

/**
 * The text parameters
 */
export interface Cyrillic {
    /**
     * The confidence value
     */
    confidence?: number;
    /**
     * The text value
     */
    text?: string;
}

/**
 * The text parameters
 */
export interface Latin {
    /**
     * The confidence value
     */
    confidence?: number;
    /**
     * The text value
     */
    text?: string;
}

/**
 * Information about the visualization data of the scanned ID
 */
export interface Visualization {
    /**
     * The found contour points of the fields on the ID
     */
    contourPoints?: Array<Array<number[]>>;
    /**
     * The found contours of the fields on the ID
     */
    contours?: Array<number[]>;
    /**
     * The found bounding rect of the text fields on the ID
     */
    textRect?: number[];
}

/**
 * Describes result information of scanning vehicle registration certificates
 */
export interface VehicleRegistrationCertificateResult {
    /**
     * Yields field information of the vehicle registration certificate
     */
    result?:        VrcResult;
    visualization?: Visualization;
}

/**
 * Yields field information of the vehicle registration certificate
 */
export interface VrcResult {
    address?:                     VehicleRegistrationCertificateResultField;
    brand?:                       VehicleRegistrationCertificateResultField;
    displacement?:                VehicleRegistrationCertificateResultField;
    documentCategoryDefinition?:  VehicleRegistrationCertificateResultField;
    documentNumber?:              VehicleRegistrationCertificateResultField;
    documentRegionDefinition?:    VehicleRegistrationCertificateResultField;
    documentSideDefinition?:      VehicleRegistrationCertificateResultField;
    documentTypeDefinition?:      VehicleRegistrationCertificateResultField;
    documentVersionsDefinition?:  VehicleRegistrationCertificateResultField;
    firstIssued?:                 VehicleRegistrationCertificateResultField;
    firstName?:                   VehicleRegistrationCertificateResultField;
    formattedFirstIssued?:        VehicleRegistrationCertificateResultField;
    lastName?:                    VehicleRegistrationCertificateResultField;
    licensePlate?:                VehicleRegistrationCertificateResultField;
    manufacturerCode?:            VehicleRegistrationCertificateResultField;
    tire?:                        VehicleRegistrationCertificateResultField;
    vehicleIdentificationNumber?: VehicleRegistrationCertificateResultField;
    vehicleType?:                 VehicleRegistrationCertificateResultField;
    vehicleTypeCode?:             VehicleRegistrationCertificateResultField;
}

/**
 * Describes scanned parameters of a vehicle registration certificate field
 */
export interface VehicleRegistrationCertificateResultField {
    /**
     * The confidence value
     */
    confidence?: number;
    /**
     * The text value
     */
    text?: string;
}

/**
 * Describes result information of scanning vehicle identification numbers (VIN)
 */
export interface VinResult {
    /**
     * The VIN text value
     */
    text?: string;
}

/**
 * Additional metadata about the source plugin that produced these results.
 *
 * Extra information returned by a scanning session.
 */
export interface WrapperSessionScanResultExtraInfo {
    /**
     * The type of the source ViewPlugin that generated result(s).
     */
    viewPluginType?: ViewPluginType;
    [property: string]: any;
}

/**
 * The type of the source ViewPlugin that generated result(s).
 */
export enum ViewPluginType {
    ViewPlugin = "viewPlugin",
    ViewPluginComposite = "viewPluginComposite",
}

/**
 * Request to start a scanning session. Requires both scanViewConfigContentString (defining
 * what to scan) and scanResultConfig (defining how to handle results). Optional
 * scanViewInitializationParameters for workflow correlation.
 */
export interface WrapperSessionScanStartRequest {
    /**
     * Platform-specific options applied when starting a scan session.
     */
    platformOptions?: WrapperSessionScanStartPlatformOptions;
    /**
     * Configuration for how scan results are returned and stored during the session.
     */
    scanResultConfig?: WrapperSessionScanResultConfig;
    /**
     * ScanViewConfig JSON string defining the scanner configuration.
     */
    scanViewConfigContentString?: string;
    /**
     * Path relative to the assets folder used to resolve ScanViewConfig JSON files when a
     * SegmentControl references them by filename.
     */
    scanViewConfigPath?: string;
    /**
     * Optional initialization parameters applied when the ScanView is created.
     */
    scanViewInitializationParameters?: ScanViewInitializationParameters;
    [property: string]: any;
}

/**
 * Platform-specific options applied when starting a scan session.
 */
export interface WrapperSessionScanStartPlatformOptions {
    /**
     * Android-specific ScanView attributes for layout and behavior customization.
     */
    androidScanViewAttributes?: AndroidScanViewAttributesConfig;
    [property: string]: any;
}

/**
 * Android-specific ScanView attributes for layout and behavior customization.
 *
 * Android ScanView attributes config
 */
export interface AndroidScanViewAttributesConfig {
    /**
     * Enable or disable camera permission handling from ScanView loading process.
     */
    enableCameraPermissionHandling?: boolean;
    /**
     * Enable or disable usage of CameraX API instead of Camera1 API. Default is true.
     */
    useCameraX?: boolean;
    [property: string]: any;
}

/**
 * Optional initialization parameters applied when the ScanView is created.
 *
 * Schema for ScanView JSON initialization parameters
 */
export interface ScanViewInitializationParameters {
    /**
     * An optional uuid (v4) to correlate scans and data points within a workflow.
     */
    correlationId?: string;
    /**
     * Data contained within the QR code that's required to unlock scanning with the Showcase
     * Apps.
     */
    demo?: Demo;
    [property: string]: any;
}

/**
 * Data contained within the QR code that's required to unlock scanning with the Showcase
 * Apps.
 */
export interface Demo {
    qrVersion?:    number;
    sfdc?:         Sfdc;
    validityDate?: string;
    [property: string]: any;
}

export interface Sfdc {
    accountId?:   string;
    accountName?: string;
    oppId?:       string;
    [property: string]: any;
}

/**
 * Request to stop the current scanning session with optional message explaining the reason
 * for termination.
 */
export interface WrapperSessionScanStopRequest {
    /**
     * Optional message describing the reason for stopping the scan session.
     */
    message?: string;
    [property: string]: any;
}

/**
 * UI configuration options for the scan view, controlling optional controls, orientation,
 * and overlays.
 */
export interface WrapperSessionScanViewConfigOptions {
    /**
     * Initial screen orientation when the scan view is presented.
     */
    defaultOrientation?: WrapperSessionScanViewConfigOptionDefaultOrientation;
    /**
     * Deprecated. iOS only. Button that dismisses the scan view. Use toolbarTitle instead.
     */
    doneButtonConfig?: WrapperSessionScanViewConfigOptionDoneButton;
    /**
     * Deprecated. iOS only. Static text label on the scan view. Use the Simple Instruction
     * Label UI Feedback preset instead.
     */
    label?: WrapperSessionScanViewConfigOptionLabel;
    /**
     * Optional button that lets users toggle between portrait and landscape orientations.
     */
    rotateButton?: WrapperSessionScanViewConfigOptionRotateButton;
    /**
     * Optional multi-mode segment control for switching between scanning configurations.
     */
    segmentConfig?: WrapperSessionScanViewConfigOptionSegmentConfig;
    /**
     * Title shown on the toolbar with a back button. Fullscreen scanning only; ignored when
     * using a ContainerView.
     */
    toolbarTitle?: string;
    [property: string]: any;
}

/**
 * Initial screen orientation when the scan view is presented.
 *
 * Initial screen orientation when scanning starts.
 */
export enum WrapperSessionScanViewConfigOptionDefaultOrientation {
    Landscape = "landscape",
    Portrait = "portrait",
}

/**
 * Deprecated. iOS only. Button that dismisses the scan view. Use toolbarTitle instead.
 *
 * Deprecated. iOS only. A button that dismisses the scan view screen when pressed. Use
 * toolbarTitle instead.
 */
export interface WrapperSessionScanViewConfigOptionDoneButton {
    /**
     * A color, denoted by a hex string of the button background. The default is empty (clear
     * color).
     */
    backgroundColor?: string;
    /**
     * A Float value indicating the corner rounding of the Done button.
     */
    cornerRadius?: number;
    /**
     * The preset used for width fill.
     */
    fillType?: FillType;
    /**
     * The name of the font (note: the font must be available for the device).
     */
    fontName?: string;
    /**
     * Button title font size in points (typically 8-72).
     */
    fontSize?:   number;
    "offset.x"?: number;
    "offset.y"?: number;
    /**
     * The preset locations for the button along the x-axis.
     */
    positionXAlignment?: PositionXAlignment;
    /**
     * The preset locations for the button along the y-axis.
     */
    positionYAlignment?: PositionYAlignment;
    /**
     * A color, denoted by a hex string of the button title.
     */
    textColor?: string;
    /**
     * A color, denoted by a hex string used by the button title when pressed.
     */
    textColorHighlighted?: string;
    /**
     * The text displayed for the button.
     */
    title?: string;
    [property: string]: any;
}

/**
 * The preset used for width fill.
 */
export enum FillType {
    Fullwidth = "fullwidth",
    Rect = "rect",
}

/**
 * The preset locations for the button along the x-axis.
 */
export enum PositionXAlignment {
    Center = "center",
    Left = "left",
    Right = "right",
}

/**
 * The preset locations for the button along the y-axis.
 */
export enum PositionYAlignment {
    Bottom = "bottom",
    Center = "center",
    Top = "top",
}

/**
 * Deprecated. iOS only. Static text label on the scan view. Use the Simple Instruction
 * Label UI Feedback preset instead.
 *
 * Deprecated. iOS only. A static text label displayed on the scan view. Use the Simple
 * Instruction Label UI Feedback preset instead.
 */
export interface WrapperSessionScanViewConfigOptionLabel {
    /**
     * Hex color string for the label text.
     */
    color?:      string;
    "offset.x"?: number;
    "offset.y"?: number;
    /**
     * The font size of the label.
     */
    size?: number;
    /**
     * The text to display.
     */
    text?: string;
    [property: string]: any;
}

/**
 * Optional button that lets users toggle between portrait and landscape orientations.
 *
 * Button that toggles between portrait and landscape orientations when tapped. Positioned
 * according to alignment and optional offset settings.
 */
export interface WrapperSessionScanViewConfigOptionRotateButton {
    /**
     * Corner of the screen where the rotate button is positioned.
     */
    alignment?: WrapperSessionScanViewConfigOptionElementAlignment;
    /**
     * Optional pixel offset from the aligned corner position.
     */
    offset?: WrapperSessionScanViewConfigOptionElementOffset;
    [property: string]: any;
}

/**
 * Corner of the screen where the rotate button is positioned.
 *
 * Screen corner where the UI element will be positioned. Element will align to the
 * specified corner before applying any offset.
 */
export enum WrapperSessionScanViewConfigOptionElementAlignment {
    BottomLeft = "bottom_left",
    BottomRight = "bottom_right",
    TopLeft = "top_left",
    TopRight = "top_right",
}

/**
 * Optional pixel offset from the aligned corner position.
 *
 * Optional pixel offset from the element's aligned position. Use positive/negative values
 * to fine-tune positioning.
 */
export interface WrapperSessionScanViewConfigOptionElementOffset {
    /**
     * Horizontal offset in pixels. Positive values move the element right, negative values move
     * it left.
     */
    x?: number;
    /**
     * Vertical offset in pixels. Positive values move the element down, negative values move it
     * up.
     */
    y?: number;
    [property: string]: any;
}

/**
 * Optional multi-mode segment control for switching between scanning configurations.
 *
 * Multi-mode segment control allowing users to switch between different scanning
 * configurations (e.g., MRZ, Barcode, License Plate modes). Requires equal numbers of
 * titles and viewConfigs.
 */
export interface WrapperSessionScanViewConfigOptionSegmentConfig {
    "offset.x"?: number;
    "offset.y"?: number;
    /**
     * Hex color code (e.g., 'FF0000' for red) applied to the selected segment and control
     * tinting.
     */
    tintColor?: string;
    /**
     * Zero-based index indicating which segment should be initially selected. Must be within
     * the bounds of the titles array.
     */
    titleIndex?: number;
    /**
     * Array of display names for each scanning mode shown to users in the segment control.
     */
    titles?: string[];
    /**
     * Array of ScanView configuration filenames located in the assets folder. Each file defines
     * a complete scanning mode configuration.
     */
    viewConfigs?: string[];
    [property: string]: any;
}

/**
 * General information to be used for SDK initialization.
 */
export interface WrapperSessionSdkInitializationRequest {
    /**
     * Root folder path the SDK uses when resolving asset files. Leave empty to use the default
     * asset location.
     */
    assetPathPrefix?: string;
    /**
     * Optional cache settings applied during initialization.
     */
    cacheConfig?: WrapperSessionSdkInitializationCacheConfig;
    /**
     * Anyline license key to be used for SDK initialization.
     */
    licenseKey?: string;
    [property: string]: any;
}

/**
 * Optional cache settings applied during initialization.
 *
 * Cache configuration to be applied on SDK initialization.
 */
export interface WrapperSessionSdkInitializationCacheConfig {
    /**
     * Whether offline license caching is enabled.
     */
    offlineLicenseCachingEnabled?: boolean;
    [property: string]: any;
}

/**
 * Response containing SDK initialization result. Must include either failInfo (if
 * initialization failed) or succeedInfo (if successful). The 'initialized' boolean
 * indicates the overall status.
 */
export interface WrapperSessionSdkInitializationResponse {
    /**
     * Populated when initialized is false. Contains the error that prevented SDK initialization.
     */
    failInfo?: WrapperSessionSdkInitializationResponseNotInitialized;
    /**
     * True if SDK initialization succeeded and scanning is available, false if initialization
     * failed.
     */
    initialized?: boolean;
    /**
     * Populated when initialized is true. Contains license details from the successful
     * initialization.
     */
    succeedInfo?: WrapperSessionSdkInitializationResponseInitialized;
    [property: string]: any;
}

/**
 * Populated when initialized is false. Contains the error that prevented SDK
 * initialization.
 *
 * Details about a failed SDK initialization attempt.
 */
export interface WrapperSessionSdkInitializationResponseNotInitialized {
    /**
     * The last error received while trying to initialize the SDK.
     */
    lastError?: string;
    [property: string]: any;
}

/**
 * Populated when initialized is true. Contains license details from the successful
 * initialization.
 *
 * Details about a successful SDK initialization.
 */
export interface WrapperSessionSdkInitializationResponseInitialized {
    /**
     * License expiry date in ISO 8601 format (YYYY-MM-DD).
     */
    expiryDate?: string;
    [property: string]: any;
}

/**
 * Request to submit a User Corrected Result (UCR) for a previously scanned item.
 */
export interface WrapperSessionUcrReportRequest {
    /**
     * Unique identifier for the scan event, taken from PluginResult.blobKey. Used to correlate
     * the correction with the original scan on the server.
     */
    blobKey?: string;
    /**
     * The corrected result value to report.
     */
    correctedResult?: string;
    [property: string]: any;
}

/**
 * Response from UCR (User Corrected Result) reporting. Must include either failInfo (if
 * reporting failed) or succeedInfo (if successful), corresponding to the status field.
 */
export interface WrapperSessionUcrReportResponse {
    /**
     * Populated when status is ucrReportFailed. Contains the error details.
     */
    failInfo?: WrapperSessionUcrReportResponseFail;
    /**
     * The final status of the UCR report submission.
     */
    status?: WrapperSessionUcrReportResponseStatus;
    /**
     * Populated when status is ucrReportSucceeded. Contains the server confirmation message.
     */
    succeedInfo?: WrapperSessionUcrReportResponseSucceed;
    [property: string]: any;
}

/**
 * Populated when status is ucrReportFailed. Contains the error details.
 *
 * Details about a failed UCR report submission.
 */
export interface WrapperSessionUcrReportResponseFail {
    /**
     * The last error received while reporting UCR.
     */
    lastError?: string;
    /**
     * The error code received while connecting to server.
     */
    responseErrorCode?: number;
    /**
     * The error message received while connecting to server.
     */
    responseErrorMessage?: string;
    [property: string]: any;
}

/**
 * The final status of the UCR report submission.
 *
 * Final status of a UCR report submission.
 */
export enum WrapperSessionUcrReportResponseStatus {
    UcrReportFailed = "ucrReportFailed",
    UcrReportSucceeded = "ucrReportSucceeded",
}

/**
 * Populated when status is ucrReportSucceeded. Contains the server confirmation message.
 *
 * Details about a successful UCR report submission.
 */
export interface WrapperSessionUcrReportResponseSucceed {
    /**
     * The confirmation message returned from the server.
     */
    message?: string;
    [property: string]: any;
}
