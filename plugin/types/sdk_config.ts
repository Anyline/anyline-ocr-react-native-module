/**
 * Schema for SDK JSON configurations
 */
export interface ScanViewConfiguration {
    cameraConfig?: CameraConfig;
    flashConfig?:  FlashConfig;
    options?:      { [key: string]: any };
    /**
     * An optional description for the entire ScanView configuration.
     */
    scanViewConfigDescription?: string;
    viewPluginCompositeConfig?: ViewPluginCompositeConfig;
    viewPluginConfig?:          ViewPluginConfig;
}

/**
 * Schema for SDK Camera Configuration
 */
export interface CameraConfig {
    /**
     * The preferred resolution for video capture (720p, 1080p, 4K). This resolution is used to
     * process images for scanning. 4K resolution is only supported for barcode scanning.
     */
    captureResolution?: string;
    /**
     * Preferred camera to open: FRONT (front-facing), BACK (rear-facing), EXTERNAL (external
     * rear), EXTERNAL_FRONT (external front), TELE (iOS-only; requests the telephoto lens and
     * is honored only on devices that have one; on Android or on iOS devices without a tele
     * lens BACK will be used), ULTRAWIDE (requests the ultra-wide lens and is honored only on
     * devices that have one; on devices without an ultra-wide lens BACK will be used).
     */
    defaultCamera?: string;
    /**
     * (EXPERIMENTAL) Mirrors the frame sideways (left-right) before it is processed, equivalent
     * to a horizontal flip along the vertical axis. The camera preview on the screen is not
     * affected. Disabled by default. NOTE: This has no effect when
     * pluginConfig.barcodeConfig.fastProcessMode is true.
     */
    enableFlipFramesLeftRight?: boolean;
    /**
     * (EXPERIMENTAL) Turns the frame upside down (top-bottom) before it is processed,
     * equivalent to a vertical flip along the horizontal axis. The camera preview on the screen
     * is not affected. Disabled by default. NOTE: This has no effect when
     * pluginConfig.barcodeConfig.fastProcessMode is true.
     */
    enableFlipFramesTopBottom?: boolean;
    /**
     * Allow user to tap on the preview to focus the camera on a specific area of the screen
     * (also known as tap-to-focus). Enabled by default.
     */
    enableTapToFocus?: boolean;
    /**
     * Optional cameras to fall back if the defaultCamera is not found.
     */
    fallbackCameras?: string[];
    /**
     * The focal length.
     */
    focalLength?: number;
    /**
     * The maximum focal length.
     */
    maxFocalLength?: number;
    /**
     * The maximum zoom ratio.
     */
    maxZoomRatio?: number;
    /**
     * Deprecated - do not use! The preferred resolution for taking images (720, 720p, 1080,
     * 1080p).
     */
    pictureResolution?: string;
    /**
     * (Note: this functionality is experimental - use at your own risk.) Duration in
     * milliseconds after which tap-to-focus automatically returns to continuous autofocus mode.
     * Range: 1000-60000ms.
     */
    tapToFocusTimeoutMs?: number;
    /**
     * This flag enables or disables the zoom gesture if supported.
     */
    zoomGesture?: boolean;
    /**
     * The zoom ratio to apply to the camera. When set to a value greater than 0, this property
     * takes precedence over defaultCamera for determining which physical lens to use. For
     * example, setting zoomRatio to 0.5 on a device with an ultra-wide lens will select that
     * lens, regardless of the defaultCamera setting. A value of 0 means no zoom ratio is
     * applied and the camera selection falls back to defaultCamera.
     */
    zoomRatio?: number;
}

/**
 * Schema for SDK Flash Configuration
 */
export interface FlashConfig {
    /**
     * The alignment of the flash button.
     */
    alignment?: FlashConfigAlignment;
    /**
     * The asset name of the icon to be displayed when the flash is set to auto.
     */
    imageAuto?: string;
    /**
     * The asset name of the icon to be displayed when the flash is off.
     */
    imageOff?: string;
    /**
     * The asset name of the icon to be displayed when the flash is on.
     */
    imageOn?: string;
    /**
     * The flash mode.
     */
    mode?: Mode;
    /**
     * An optional position offset for the flash button in density-independent pixels (dp).
     */
    offset?: Offset;
}

/**
 * The alignment of the flash button.
 */
export enum FlashConfigAlignment {
    Bottom = "bottom",
    BottomLeft = "bottom_left",
    BottomRight = "bottom_right",
    Top = "top",
    TopLeft = "top_left",
    TopRight = "top_right",
}

/**
 * The flash mode.
 */
export enum Mode {
    Auto = "auto",
    Manual = "manual",
    ManualOff = "manual_off",
    ManualOn = "manual_on",
    None = "none",
}

/**
 * An optional position offset for the flash button in density-independent pixels (dp).
 *
 * An x/y integer value pair. The unit (dp or camera pixels) depends on the property that
 * references this definition.
 *
 * Adjusts the captured region position in camera pixels (px) after cropPadding is applied.
 * Positive x shifts right, positive y shifts down.
 *
 * Position offset of the cutout in camera pixels (px), used in conjunction with alignment.
 */
export interface Offset {
    x?: number;
    y?: number;
}

/**
 * Schema for SDK ViewPlugin Configuration
 */
export interface ViewPluginCompositeConfig {
    /**
     * The ID (name) of the workflow.
     */
    id?: string;
    /**
     * The processing mode of the workflow (parallel, sequential, parallelFirstScan).
     */
    processingMode?: ProcessingMode;
    /**
     * The ordered list of viewPlugins, each as JSON object with a given viewPluginConfig.
     */
    viewPlugins?: ViewPlugin[];
}

/**
 * The processing mode of the workflow (parallel, sequential, parallelFirstScan).
 */
export enum ProcessingMode {
    Parallel = "parallel",
    ParallelFirstScan = "parallelFirstScan",
    Sequential = "sequential",
}

export interface ViewPlugin {
    viewPluginConfig?: ViewPluginConfig;
}

/**
 * Schema for SDK ViewPlugin Configuration
 */
export interface ViewPluginConfig {
    cutoutConfig?:       CutoutConfig;
    pluginConfig?:       PluginConfig;
    scanFeedbackConfig?: ScanFeedbackConfig;
    uiFeedbackConfig?:   UiFeedbackConfig;
}

/**
 * Schema for SDK Cutout Configuration
 */
export interface CutoutConfig {
    /**
     * The alignment of the cutout area.
     */
    alignment?: CutoutConfigAlignment;
    /**
     * Animation type for the cutout when initially displayed. Values: none, fade, zoom
     */
    animation?: CutoutConfigAnimation;
    /**
     * The corner radius of the cutout in density-independent pixels (dp).
     */
    cornerRadius?: number;
    /**
     * Adjusts the captured region position in camera pixels (px) after cropPadding is applied.
     * Positive x shifts right, positive y shifts down.
     */
    cropOffset?: Offset;
    /**
     * Expands the captured image region beyond the cutout in camera pixels (px). Non-negative
     * values only — negative values will cause a runtime exception. Example: cutout width=700px
     * with padding={x:10} → 720px captured.
     */
    cropPadding?: NonNegativeOffset;
    /**
     * The hex string (RRGGBB) of the stroke color for visual feedback. (e.g. 00CCFF).
     */
    feedbackStrokeColor?: string;
    /**
     * The maximum height in percent (0-100), relating to the size of the view.
     */
    maxHeightPercent?: string;
    /**
     * The maximum width in percent (0-100), relating to the size of the view.
     */
    maxWidthPercent?: string;
    /**
     * Position offset of the cutout in camera pixels (px), used in conjunction with alignment.
     */
    offset?: Offset;
    /**
     * Optional transparency factor for the outer color (0.0 - 1.0).
     */
    outerAlpha?: number;
    /**
     * Background color as a 6-digit (RRGGBB) or 8-digit (AARRGGBB) hex string.
     */
    outerColor?: string;
    /**
     * A size constraining the ratio of width / height. If set to 0, the ratio will be equal to
     * the full frame. For the optimal ratio for each technical capability have a look at the
     * Technical Capabilities section at documentation.anyline.com.
     */
    ratioFromSize?: RatioFromSize;
    /**
     * The hex string (RRGGBB) of the stroke color. (e.g. 00CCFF).
     */
    strokeColor?: string;
    /**
     * The stroke width of the cutout border in density-independent pixels (dp). If set to 0,
     * the line will be invisible.
     */
    strokeWidth?: number;
    /**
     * The preferred width in pixels, relating to the camera resolution. If not specified or 0,
     * the maximum possible width will be chosen.
     */
    width?: number;
}

/**
 * The alignment of the cutout area.
 */
export enum CutoutConfigAlignment {
    Bottom = "bottom",
    BottomHalf = "bottom_half",
    Center = "center",
    Top = "top",
    TopHalf = "top_half",
}

/**
 * Animation type for the cutout when initially displayed. Values: none, fade, zoom
 */
export enum CutoutConfigAnimation {
    Fade = "fade",
    None = "none",
    Zoom = "zoom",
}

/**
 * Expands the captured image region beyond the cutout in camera pixels (px). Non-negative
 * values only — negative values will cause a runtime exception. Example: cutout width=700px
 * with padding={x:10} → 720px captured.
 *
 * An x/y integer value pair where both values must be >= 0. The unit depends on the
 * property that references this definition.
 */
export interface NonNegativeOffset {
    x?: number;
    y?: number;
}

/**
 * A size constraining the ratio of width / height. If set to 0, the ratio will be equal to
 * the full frame. For the optimal ratio for each technical capability have a look at the
 * Technical Capabilities section at documentation.anyline.com.
 */
export interface RatioFromSize {
    height?: number;
    width?:  number;
}

/**
 * General configuration for scan plugins
 */
export interface PluginConfig {
    barcodeConfig?: BarcodeConfig;
    /**
     * Sets whether or not to continue scanning once a result is found.
     */
    cancelOnResult?:         boolean;
    commercialTireIdConfig?: CommercialTireIdConfig;
    /**
     * This option allows to finetune the handling results of the same content when scanning
     * continuously. If the option is set to -1, equal results will not be reported again until
     * the scanning process is stopped. Setting this option to 0 will report equal results every
     * time it is found. Setting this option to greater than 0 indicates how much time
     * (milliseconds) must pass by not detecting the result before it will be detected again.
     * (This feature is currently only supported in Barcode scanning)
     */
    consecutiveEqualResultFilter?: number;
    containerConfig?:              ContainerConfig;
    /**
     * Sets a name for the scan plugin.
     */
    id?:                              string;
    japaneseLandingPermissionConfig?: JapaneseLandingPermissionConfig;
    licensePlateConfig?:              LicensePlateConfig;
    meterConfig?:                     MeterConfig;
    mrzConfig?:                       MrzConfig;
    ocrConfig?:                       OcrConfig;
    odometerConfig?:                  OdometerConfig;
    /**
     * Sets an initial time period (in milliseconds) where scanned frames are not processed as
     * results.
     */
    startScanDelay?: number;
    /**
     * Allows to fine-tune a list of options for plugins.
     */
    startVariables?:                       StartVariable[];
    tinConfig?:                            TinConfig;
    tireMakeConfig?:                       TireMakeConfig;
    tireSizeConfig?:                       TireSizeConfig;
    universalIdConfig?:                    UniversalIdConfig;
    vehicleRegistrationCertificateConfig?: VehicleRegistrationCertificateConfig;
    vinConfig?:                            VinConfig;
}

/**
 * Configuration for scanning barcodes
 */
export interface BarcodeConfig {
    /**
     * Set this to filter which barcode formats should be scanned. Setting 'ALL' will enable
     * scanning all supported formats.
     */
    barcodeFormats?: BarcodeFormat[];
    /**
     * [DEPRECATED] If this option is set, allows consecutive barcode results of the same
     * barcode when scanning continuously.
     */
    consecutiveEqualResults?: boolean;
    /**
     * Sets whether or not to disable advanced barcode scanning even if the license supports it.
     */
    disableAdvancedBarcode?: boolean;
    /**
     * If this option is set, uses faster image processing for barcode scanning. Note:
     * fastProcessMode is not available during composite scanning.
     */
    fastProcessMode?: boolean;
    /**
     * Setting this to 'true' will enable reading multiple barcodes per frame.
     */
    multiBarcode?: boolean;
    /**
     * If this option is set, barcodes parsed according to the AAMVA standard. This only works
     * for PDF417 codes on driving licenses.
     */
    parseAAMVA?: boolean;
}

export enum BarcodeFormat {
    All = "ALL",
    Aztec = "AZTEC",
    AztecInverse = "AZTEC_INVERSE",
    Bookland = "BOOKLAND",
    Codabar = "CODABAR",
    Code11 = "CODE_11",
    Code128 = "CODE_128",
    Code32 = "CODE_32",
    Code39 = "CODE_39",
    Code93 = "CODE_93",
    Coupon = "COUPON",
    DataMatrix = "DATA_MATRIX",
    Databar = "DATABAR",
    Discrete2_5 = "DISCRETE_2_5",
    DotCode = "DOT_CODE",
    Ean13 = "EAN_13",
    Ean8 = "EAN_8",
    Gs1128 = "GS1_128",
    Gs1QrCode = "GS1_QR_CODE",
    Isbt128 = "ISBT_128",
    IssnEan = "ISSN_EAN",
    Itf = "ITF",
    Kix = "KIX",
    Matrix2_5 = "MATRIX_2_5",
    Maxicode = "MAXICODE",
    MicroPdf = "MICRO_PDF",
    MicroQr = "MICRO_QR",
    Msi = "MSI",
    OneDInverse = "ONE_D_INVERSE",
    Pdf417 = "PDF_417",
    PostUk = "POST_UK",
    QrCode = "QR_CODE",
    QrInverse = "QR_INVERSE",
    Rss14 = "RSS_14",
    RssExpanded = "RSS_EXPANDED",
    Trioptic = "TRIOPTIC",
    UpcA = "UPC_A",
    UpcE = "UPC_E",
    UpcEanExtension = "UPC_EAN_EXTENSION",
    UpuFics = "UPU_FICS",
    UsPlanet = "US_PLANET",
    UsPostnet = "US_POSTNET",
    Usps4Cb = "USPS_4CB",
}

/**
 * Configuration for scanning commercial Tire IDs
 */
export interface CommercialTireIdConfig {
    /**
     * Sets a minimum confidence which has to be reached in order to trigger a scan result.
     */
    minConfidence?: number;
    /**
     * Sets whether the text shall also be scanned upside-down.
     */
    upsideDownMode?: UpsideDownMode;
    /**
     * Sets a regular expression which the commercial tire id text needs to match in order to
     * trigger a scan result.
     */
    validationRegex?: string;
}

/**
 * Sets whether the text shall also be scanned upside-down.
 */
export enum UpsideDownMode {
    Auto = "AUTO",
    Disabled = "DISABLED",
    Enabled = "ENABLED",
}

/**
 * Configuration for scanning shipping container numbers
 */
export interface ContainerConfig {
    /**
     * Sets a minimum confidence which has to be reached in order to trigger a scan result.
     */
    minConfidence?: number;
    /**
     * Determines if container numbers shall be scanned horizontally or vertically.
     */
    scanMode?: ContainerConfigScanMode;
    /**
     * Sets a regular expression which the scanned text needs to match in order to trigger a
     * scan result.
     */
    validationRegex?: string;
}

/**
 * Determines if container numbers shall be scanned horizontally or vertically.
 */
export enum ContainerConfigScanMode {
    Horizontal = "HORIZONTAL",
    Vertical = "VERTICAL",
}

/**
 * Configuration for scanning japanese landing permission tickets
 */
export interface JapaneseLandingPermissionConfig {
    airport?:      JapaneseLandingPermissionConfigFieldOption;
    dateOfExpiry?: JapaneseLandingPermissionConfigFieldOption;
    dateOfIssue?:  JapaneseLandingPermissionConfigFieldOption;
    duration?:     JapaneseLandingPermissionConfigFieldOption;
    status?:       JapaneseLandingPermissionConfigFieldOption;
    [property: string]: any;
}

/**
 * Field option for JLP fields
 */
export interface JapaneseLandingPermissionConfigFieldOption {
    /**
     * Set the minConfidence between 0 and 100. Otherwise, it's defaulted.
     */
    minConfidence?: number;
    /**
     * The scanOption determines whether a field is considered optional, mandatory, disabled or
     * follows a default behavior. Default behavior is one of the other three that yields the
     * best recall results with all layouts enabled.
     */
    scanOption?: MrzScanOption;
    [property: string]: any;
}

/**
 * The scanOption determines whether a field is considered optional, mandatory, disabled or
 * follows a default behavior. Default behavior is one of the other three that yields the
 * best recall results with all layouts enabled.
 *
 * The mrzScanOption determines whether a field is considered optional, mandatory, disabled
 * or follows a default behavior.
 */
export enum MrzScanOption {
    Default = "default",
    Disabled = "disabled",
    Mandatory = "mandatory",
    Optional = "optional",
}

/**
 * Configuration for scanning license plates
 */
export interface LicensePlateConfig {
    /**
     * Sets a minimum confidence which has to be reached in order to trigger a scan result.
     */
    minConfidence?: number;
    /**
     * Specifies a country or location of which license plates shall be scanned.
     */
    scanMode?: LicensePlateConfigScanMode;
    /**
     * Sets a regular expression per country. Expected format: "'country_code':^regex$,
     * 'other_country_code':^other_regex$". The country code needs to be provided in the
     * international vehicle registration code format that is visible on the license plate (for
     * example 'A' for Austria). Note: not available for the scanModes unitedstates and africa.
     */
    validationRegex?: string;
    /**
     * Select if the visual inspection sticker should be scanned. If OPTIONAL, the visual
     * inspection sticker will only be returned if found successfully. If MANDATORY the scan
     * will only return if found successfully. Not available on africa and unitedstates.
     */
    vehicleInspectionSticker?: VehicleInspectionSticker;
}

/**
 * Specifies a country or location of which license plates shall be scanned.
 */
export enum LicensePlateConfigScanMode {
    Africa = "africa",
    Albania = "albania",
    Andorra = "andorra",
    Armenia = "armenia",
    Austria = "austria",
    Auto = "auto",
    Azerbaijan = "azerbaijan",
    Belarus = "belarus",
    Belgium = "belgium",
    Bosniaandherzegovina = "bosniaandherzegovina",
    Bulgaria = "bulgaria",
    Canada = "canada",
    Croatia = "croatia",
    Cyprus = "cyprus",
    Czech = "czech",
    Denmark = "denmark",
    Estonia = "estonia",
    Finland = "finland",
    France = "france",
    Georgia = "georgia",
    Germany = "germany",
    Greece = "greece",
    Hungary = "hungary",
    Iceland = "iceland",
    Ireland = "ireland",
    Italy = "italy",
    Latvia = "latvia",
    Liechtenstein = "liechtenstein",
    Lithuania = "lithuania",
    Luxembourg = "luxembourg",
    Malta = "malta",
    Moldova = "moldova",
    Monaco = "monaco",
    Montenegro = "montenegro",
    Netherlands = "netherlands",
    Northmacedonia = "northmacedonia",
    Norway = "norway",
    Norwayspecial = "norwayspecial",
    Poland = "poland",
    Portugal = "portugal",
    Romania = "romania",
    Russia = "russia",
    Serbia = "serbia",
    Slovakia = "slovakia",
    Slovenia = "slovenia",
    Spain = "spain",
    Sweden = "sweden",
    Switzerland = "switzerland",
    Turkey = "turkey",
    Ukraine = "ukraine",
    Unitedkingdom = "unitedkingdom",
    Unitedstates = "unitedstates",
}

/**
 * Select if the visual inspection sticker should be scanned. If OPTIONAL, the visual
 * inspection sticker will only be returned if found successfully. If MANDATORY the scan
 * will only return if found successfully. Not available on africa and unitedstates.
 */
export enum VehicleInspectionSticker {
    Disabled = "DISABLED",
    Mandatory = "MANDATORY",
    Optional = "OPTIONAL",
}

/**
 * Configuration for scanning meters
 */
export interface MeterConfig {
    /**
     * Defines the maximum number of read decimal digits for values >=0. Negative values mean
     * all decimal digits are read. Currently implemented only for the
     * "auto_analog_digital_meter" scan mode.
     */
    maxNumDecimalDigits?: number;
    /**
     * Sets a minimum confidence which has to be reached in order to trigger a scan result.
     */
    minConfidence?: number;
    /**
     * Determines which types of meters to scan.
     */
    scanMode?: MeterConfigScanMode;
    /**
     * Sets a regular expression which the scanned text needs to match in order to trigger a
     * scan result.
     */
    validationRegex?: string;
}

/**
 * Determines which types of meters to scan.
 */
export enum MeterConfigScanMode {
    AutoAnalogDigitalMeter = "auto_analog_digital_meter",
    DialMeter = "dial_meter",
    DigitalMeter2_Experimental = "digital_meter_2_experimental",
    MultiFieldDigitalMeter = "multi_field_digital_meter",
}

/**
 * Configuration for scanning machine-readable zones (MRZ) of passports and other IDs
 */
export interface MrzConfig {
    /**
     * The cropAndTransformID determines whether or not the image shall be cropped and
     * transformed.
     */
    cropAndTransformID?: boolean;
    /**
     * Sets whether the face detection approach is enabled.
     */
    faceDetectionEnabled?: boolean;
    /**
     * Sets a minimum confidence which has to be reached in order to trigger a scan result.
     */
    minConfidence?: number;
    /**
     * The fieldmrzScanOptions configure which text fields shall be captured mandatory, optional
     * or not at all.
     */
    mrzFieldScanOptions?: MrzFieldScanOptions;
    /**
     * The minFieldConfidences configure which fields must reach which confidence thresholds in
     * order to be part of the scan result.
     */
    mrzMinFieldConfidences?: MrzMinFieldConfidences;
    /**
     * When enabling the strictMode, a result is only returned if all the check digits on the
     * scanned document are valid.
     */
    strictMode?: boolean;
}

/**
 * The fieldmrzScanOptions configure which text fields shall be captured mandatory, optional
 * or not at all.
 */
export interface MrzFieldScanOptions {
    checkDigitDateOfBirth?:    MrzScanOption;
    checkDigitDateOfExpiry?:   MrzScanOption;
    checkDigitDocumentNumber?: MrzScanOption;
    checkDigitFinal?:          MrzScanOption;
    checkDigitPersonalNumber?: MrzScanOption;
    dateOfBirth?:              MrzScanOption;
    dateOfExpiry?:             MrzScanOption;
    documentNumber?:           MrzScanOption;
    documentType?:             MrzScanOption;
    givenNames?:               MrzScanOption;
    issuingCountryCode?:       MrzScanOption;
    mrzString?:                MrzScanOption;
    nationalityCountryCode?:   MrzScanOption;
    optionalData?:             MrzScanOption;
    personalNumber?:           MrzScanOption;
    sex?:                      MrzScanOption;
    surname?:                  MrzScanOption;
    vizAddress?:               MrzScanOption;
    vizDateOfBirth?:           MrzScanOption;
    vizDateOfExpiry?:          MrzScanOption;
    vizDateOfIssue?:           MrzScanOption;
    vizGivenNames?:            MrzScanOption;
    vizSurname?:               MrzScanOption;
}

/**
 * The minFieldConfidences configure which fields must reach which confidence thresholds in
 * order to be part of the scan result.
 */
export interface MrzMinFieldConfidences {
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
 * Configuration for general OCR scanning use-cases
 */
export interface OcrConfig {
    /**
     * Sets the number of characters in each text line for 'grid' mode.
     */
    charCountX?: number;
    /**
     * Sets the number of text lines for 'grid' mode.
     */
    charCountY?: number;
    /**
     * Defines the average horizontal distance between two characters in 'grid' mode, measured
     * in percentage of the characters width.
     */
    charPaddingXFactor?: number;
    /**
     * Defines the average vertical distance between two characters in 'grid' mode, measured in
     * percentage of the characters height.
     */
    charPaddingYFactor?: number;
    /**
     * Restricts the scanner to a set of characters to be detected.
     */
    charWhitelist?: string;
    /**
     * Sets a custom Anyline script. The file has to be located in the project and point to a
     * path relative from the project root. Please check the official documentation for more
     * details.
     */
    customCmdFile?: string;
    /**
     * Sets a maximum character height (in pixels) to be considered in the scanning process.
     */
    maxCharHeight?: number;
    /**
     * Sets a minimum character height (in pixels) to be considered in the scanning process.
     */
    minCharHeight?: number;
    /**
     * Sets a minimum confidence which has to be reached in order to trigger a scan result.
     */
    minConfidence?: number;
    /**
     * Sets a sharpnes factor (0-100) to rule out blurry images.
     */
    minSharpness?: number;
    /**
     * Sets one or more custom Anyline models. The files have to be located in the project and
     * point to a path relative from the project root. If no customCmdFile is set, only a
     * maximum of one model is valid. If a customCmdFile is set, it depends whether or not the
     * customCmdFile requires multiple models or not. Please check the official documentation
     * for more details.
     */
    models?: string[];
    /**
     * Sets whether to scan single-line texts, multi-line texts in a grid-formation or finds
     * text automatically.
     */
    scanMode?: OcrConfigScanMode;
    /**
     * Sets a regular expression which the scanned text needs to match in order to trigger a
     * scan result.
     */
    validationRegex?: string;
}

/**
 * Sets whether to scan single-line texts, multi-line texts in a grid-formation or finds
 * text automatically.
 */
export enum OcrConfigScanMode {
    Auto = "auto",
    Grid = "grid",
    Line = "line",
}

/**
 * Configuration for scanning odometers
 */
export interface OdometerConfig {
    /**
     * Sets a minimum confidence which has to be reached in order to trigger a scan result.The
     * value has to be between 0 and 100. Defaults to 60.
     */
    minConfidence?: number;
    /**
     * Sets a regular expression which the scanned text needs to match in order to trigger a
     * scan result.
     */
    validationRegex?: string;
}

/**
 * Describes a start variable for fine-tuning plugins.
 */
export interface StartVariable {
    /**
     * The key of the variable.
     */
    key?: string;
    /**
     * The value of the variable.
     */
    value?: boolean | number | number | string;
}

/**
 * Configuration for scanning TIN numbers
 */
export interface TinConfig {
    /**
     * Defines the minimum height ratio relative to image height for the detected text region.
     * Ensures the device is close enough to the tire by requiring detected text to meet a
     * minimum height requirement. Higher values are more restrictive (text must be taller,
     * meaning device must be closer). This parameter helps prevent premature scans when the
     * user is too far away and ensures better image quality.
     */
    detectionMinHeightRatio?: number;
    /**
     * Defines the horizontal ratio for text alignment checks relative to image width. Ensures
     * the detected TIN text starts near the left edge of the cutout (or right edge when
     * upside-down) to prevent partial captures. Lower values are more restrictive (text must be
     * closer to the edge). This parameter helps reduce premature results and ensures proper
     * text alignment.
     */
    horizontalAlignmentRatio?: number;
    /**
     * Sets a minimum confidence which has to be reached in order to trigger a scan result.
     */
    minConfidence?: number;
    /**
     * Sets the mode to scan universal TIN numbers ('UNIVERSAL') or TIN numbers of any length
     * starting with DOT ('DOT').
     */
    scanMode?: TinConfigScanMode;
    /**
     * Sets whether the text shall also be scanned upside-down.
     */
    upsideDownMode?: UpsideDownMode;
    /**
     * Sets whether the production date validation is enabled. If it is set to false the scan
     * result is also returned for invalid and missing dates.
     */
    validateProductionDate?: boolean;
    /**
     * Sets a regular expression which the TIN text needs to match in order to trigger a scan
     * result.
     */
    validationRegex?: string;
}

/**
 * Sets the mode to scan universal TIN numbers ('UNIVERSAL') or TIN numbers of any length
 * starting with DOT ('DOT').
 */
export enum TinConfigScanMode {
    Dot = "DOT",
    Universal = "UNIVERSAL",
}

/**
 * Configuration for scanning Tire Makes
 */
export interface TireMakeConfig {
    /**
     * Sets a minimum confidence which has to be reached in order to trigger a scan result.
     */
    minConfidence?: number;
    /**
     * Sets whether the text shall also be scanned upside-down.
     */
    upsideDownMode?: UpsideDownMode;
    /**
     * Sets a regular expression which the tire make text needs to match in order to trigger a
     * scan result. E.g. "(Continental|Dunlop)" will only trigger on Continental or Dunlop tires.
     */
    validationRegex?: string;
}

/**
 * Configuration for scanning Tire Size Specifications
 */
export interface TireSizeConfig {
    /**
     * Sets a minimum confidence which has to be reached in order to trigger a scan result.
     */
    minConfidence?: number;
    /**
     * Sets whether the text shall also be scanned upside-down.
     */
    upsideDownMode?: UpsideDownMode;
    /**
     * Sets a regular expression which the tire size text needs to match in order to trigger a
     * scan result.
     */
    validationRegex?: string;
}

/**
 * Configuration for scanning all kinds of identification documents
 */
export interface UniversalIdConfig {
    /**
     * Specifies the document types to be scanned and optionally further specifies which types
     * of layout are scanned per type.
     */
    allowedLayouts?: AllowedLayouts;
    /**
     * Sets a specific character set.
     */
    alphabet?:       Alphabet;
    drivingLicense?: LayoutDrivingLicense;
    /**
     * Sets whether the face detection approach is enabled.
     */
    faceDetectionEnabled?: boolean;
    idFront?:              LayoutIdFront;
    insuranceCard?:        LayoutInsuranceCard;
    mrz?:                  LayoutMrz;
}

/**
 * Specifies the document types to be scanned and optionally further specifies which types
 * of layout are scanned per type.
 */
export interface AllowedLayouts {
    drivingLicense?: string[];
    idFront?:        string[];
    insuranceCard?:  string[];
    mrz?:            string[];
}

/**
 * Sets a specific character set.
 */
export enum Alphabet {
    Arabic = "arabic",
    Cyrillic = "cyrillic",
    Latin = "latin",
}

/**
 * Contains all the supported field scan options for driving licenses.
 */
export interface LayoutDrivingLicense {
    additionalInformation?:  UniversalIdField;
    additionalInformation1?: UniversalIdField;
    address?:                UniversalIdField;
    audit?:                  UniversalIdField;
    authority?:              UniversalIdField;
    cardNumber?:             UniversalIdField;
    categories?:             UniversalIdField;
    conditions?:             UniversalIdField;
    dateOfBirth?:            UniversalIdField;
    dateOfExpiry?:           UniversalIdField;
    dateOfIssue?:            UniversalIdField;
    documentDiscriminator?:  UniversalIdField;
    documentNumber?:         UniversalIdField;
    duplicate?:              UniversalIdField;
    duration?:               UniversalIdField;
    endorsements?:           UniversalIdField;
    eyes?:                   UniversalIdField;
    firstIssued?:            UniversalIdField;
    firstName?:              UniversalIdField;
    fullName?:               UniversalIdField;
    givenNames?:             UniversalIdField;
    hair?:                   UniversalIdField;
    height?:                 UniversalIdField;
    lastName?:               UniversalIdField;
    licenceNumber?:          UniversalIdField;
    licenseClass?:           UniversalIdField;
    licenseNumber?:          UniversalIdField;
    name?:                   UniversalIdField;
    office?:                 UniversalIdField;
    parish?:                 UniversalIdField;
    personalNumber?:         UniversalIdField;
    placeOfBirth?:           UniversalIdField;
    previousType?:           UniversalIdField;
    restrictions?:           UniversalIdField;
    revoked?:                UniversalIdField;
    sex?:                    UniversalIdField;
    surname?:                UniversalIdField;
    type?:                   UniversalIdField;
    version?:                UniversalIdField;
    verticalNumber?:         UniversalIdField;
    weight?:                 UniversalIdField;
}

/**
 * Configures scanning options for ID fields in order to fine-tune the ID scanner.
 */
export interface UniversalIdField {
    /**
     * Set the minConfidence which has to be reached in order to trigger a scan result. The
     * value has to be between 0 and 100. Defaults to 60.
     */
    minConfidence?: number;
    /**
     * The scanOption determines whether a field is considered optional, mandatory, disabled or
     * follows a default behavior. Default behavior is one of the other three that yields the
     * best recall results with all layouts enabled.
     */
    scanOption?: MrzScanOption;
}

/**
 * Contains all the supported field scan options for ID front cards.
 */
export interface LayoutIdFront {
    additionalInformation?:  UniversalIdField;
    additionalInformation1?: UniversalIdField;
    address?:                UniversalIdField;
    age?:                    UniversalIdField;
    authority?:              UniversalIdField;
    cardAccessNumber?:       UniversalIdField;
    citizenship?:            UniversalIdField;
    cityNumber?:             UniversalIdField;
    dateOfBirth?:            UniversalIdField;
    dateOfExpiry?:           UniversalIdField;
    dateOfIssue?:            UniversalIdField;
    dateOfRegistration?:     UniversalIdField;
    divisionNumber?:         UniversalIdField;
    documentNumber?:         UniversalIdField;
    familyName?:             UniversalIdField;
    fathersName?:            UniversalIdField;
    firstName?:              UniversalIdField;
    folio?:                  UniversalIdField;
    fullName?:               UniversalIdField;
    givenNames?:             UniversalIdField;
    height?:                 UniversalIdField;
    lastName?:               UniversalIdField;
    licenseClass?:           UniversalIdField;
    licenseType?:            UniversalIdField;
    municipalityNumber?:     UniversalIdField;
    nationalId?:             UniversalIdField;
    nationality?:            UniversalIdField;
    parentsGivenName?:       UniversalIdField;
    personalNumber?:         UniversalIdField;
    placeAndDateOfBirth?:    UniversalIdField;
    placeOfBirth?:           UniversalIdField;
    sex?:                    UniversalIdField;
    stateNumber?:            UniversalIdField;
    supportNumber?:          UniversalIdField;
    surname?:                UniversalIdField;
    voterId?:                UniversalIdField;
}

/**
 * Contains all the supported field scan options for insurance cards.
 */
export interface LayoutInsuranceCard {
    authority?:      UniversalIdField;
    dateOfBirth?:    UniversalIdField;
    dateOfExpiry?:   UniversalIdField;
    documentNumber?: UniversalIdField;
    firstName?:      UniversalIdField;
    lastName?:       UniversalIdField;
    nationality?:    UniversalIdField;
    personalNumber?: UniversalIdField;
}

/**
 * Contains all the supported field scan options for MRZ.
 */
export interface LayoutMrz {
    dateOfBirth?:     UniversalIdField;
    dateOfExpiry?:    UniversalIdField;
    vizAddress?:      UniversalIdField;
    vizDateOfBirth?:  UniversalIdField;
    vizDateOfExpiry?: UniversalIdField;
    vizDateOfIssue?:  UniversalIdField;
    vizGivenNames?:   UniversalIdField;
    vizSurname?:      UniversalIdField;
}

/**
 * Configuration for scanning Vehicle Registration Certificates
 */
export interface VehicleRegistrationCertificateConfig {
    vehicleRegistrationCertificate?: LayoutVehicleRegistrationCertificate;
}

/**
 * Contains all the supported field scan options for vehicle registration certificates.
 */
export interface LayoutVehicleRegistrationCertificate {
    /**
     * The Address Field
     */
    address?: VehicleRegistrationCertificateField;
    /**
     * The Brand Field
     */
    brand?: VehicleRegistrationCertificateField;
    /**
     * The Displacement Field
     */
    displacement?: VehicleRegistrationCertificateField;
    /**
     * The DocumentNumber Field
     */
    documentNumber?: VehicleRegistrationCertificateField;
    /**
     * The FirstIssued Field
     */
    firstIssued?: VehicleRegistrationCertificateField;
    /**
     * The FirstName Field
     */
    firstName?: VehicleRegistrationCertificateField;
    /**
     * The LastName Field
     */
    lastName?: VehicleRegistrationCertificateField;
    /**
     * The LicensePlate Field
     */
    licensePlate?: VehicleRegistrationCertificateField;
    /**
     * The ManufacturerCode Field
     */
    manufacturerCode?: VehicleRegistrationCertificateField;
    /**
     * The Tire Field
     */
    tire?: VehicleRegistrationCertificateField;
    /**
     * The VehicleIdentificationNumber Field
     */
    vehicleIdentificationNumber?: VehicleRegistrationCertificateField;
    /**
     * The VehicleType Field
     */
    vehicleType?: VehicleRegistrationCertificateField;
    /**
     * The VehicleTypeCode Field
     */
    vehicleTypeCode?: VehicleRegistrationCertificateField;
}

/**
 * The Address Field
 *
 * Configures scanning options per field
 *
 * The Brand Field
 *
 * The Displacement Field
 *
 * The DocumentNumber Field
 *
 * The FirstIssued Field
 *
 * The FirstName Field
 *
 * The LastName Field
 *
 * The LicensePlate Field
 *
 * The ManufacturerCode Field
 *
 * The Tire Field
 *
 * The VehicleIdentificationNumber Field
 *
 * The VehicleType Field
 *
 * The VehicleTypeCode Field
 */
export interface VehicleRegistrationCertificateField {
    /**
     * Set the minConfidence between 0 and 100. Otherwise, it's defaulted.
     */
    minConfidence?: number;
    /**
     * The scanOption determines whether a field is considered optional, mandatory, disabled or
     * follows a default behavior. Default behavior is one of the other three that yields the
     * best recall results with all layouts enabled.
     */
    scanOption?: MrzScanOption;
}

/**
 * Configuration for scanning vehicle identification numbers (VIN)
 */
export interface VinConfig {
    /**
     * Restricts the scanner to a set of characters to be detected.
     */
    charWhitelist?: string;
    /**
     * Setting this to 'true' will enforce checking the check digit and only return results if
     * it is correct.
     */
    validateCheckDigit?: boolean;
    /**
     * Sets a regular expression which the scanned text needs to match in order to trigger a
     * scan result.
     */
    validationRegex?: string;
}

/**
 * Schema for SDK ScanFeedback Configuration
 */
export interface ScanFeedbackConfig {
    /**
     * The animation style of the feedback.
     */
    animation?: ScanFeedbackConfigAnimation;
    /**
     * The duration of the animation in milliseconds.
     */
    animationDuration?: number;
    /**
     * If true, make a beep sound when a result is found.
     */
    beepOnResult?: boolean;
    /**
     * If true, flash the view when a result is found.
     */
    blinkAnimationOnResult?: boolean;
    /**
     * The corner radius in density-independent pixels (dp).
     */
    cornerRadius?: number;
    /**
     * The fill color.
     */
    fillColor?: string;
    /**
     * The timeout to redraw the visual feedback in milliseconds.
     */
    redrawTimeout?: number;
    /**
     * The stroke color.
     */
    strokeColor?: string;
    /**
     * The stroke width in density-independent pixels (dp).
     */
    strokeWidth?: number;
    /**
     * The style of the feedback.
     */
    style?: Style;
    /**
     * If true, vibrate the device when a result is found.
     */
    vibrateOnResult?: boolean;
}

/**
 * The animation style of the feedback.
 */
export enum ScanFeedbackConfigAnimation {
    Blink = "blink",
    Kitt = "kitt",
    None = "none",
    Pulse = "pulse",
    PulseRandom = "pulse_random",
    Resize = "resize",
    TraverseMulti = "traverse_multi",
    TraverseSingle = "traverse_single",
}

/**
 * The style of the feedback.
 */
export enum Style {
    AnimatedRect = "animated_rect",
    ContourPoint = "contour_point",
    ContourRect = "contour_rect",
    ContourUnderline = "contour_underline",
    None = "none",
    Rect = "rect",
}

/**
 * General configuration for UI Feedback elements
 */
export interface UiFeedbackConfig {
    /**
     * Elements inside UIFeedbackConfig.
     */
    elements?: UiFeedbackElementConfig[];
    /**
     * Preset definitions inside UIFeedbackConfig.
     */
    presetDefinitions?: UiFeedbackPresetDefinitionConfig[];
    /**
     * Allows to use presets.
     */
    presets?: UiFeedbackPresetConfig[];
    [property: string]: any;
}

/**
 * Configuration for uiFeedback element
 */
export interface UiFeedbackElementConfig {
    /**
     * Sets whether the view is clickable.
     */
    clickable?:         boolean;
    contentType?:       ContentTypeEnum;
    defaultAttributes?: UiFeedbackElementAttributesConfig;
    defaultContent?:    UiFeedbackElementContentConfig;
    /**
     * Sets the id of the element.
     */
    id?:      string;
    overlay?: OverlayConfig;
    /**
     * Allows to use element presets.
     */
    presets?: UiFeedbackPresetConfig[];
    /**
     * Sets a tag for the element.
     */
    tag?:     string;
    trigger?: UiFeedbackElementTriggerConfig;
    [property: string]: any;
}

/**
 * Sets the view type of the element.
 */
export enum ContentTypeEnum {
    Image = "image",
    Sound = "sound",
    Text = "text",
}

/**
 * Configuration attributes for UI Feedback view elements
 */
export interface UiFeedbackElementAttributesConfig {
    /**
     * Sets the background color.
     */
    backgroundColor?: string;
    /**
     * Sets the image scale type.
     */
    imageScaleType?: ImageScaleType;
    /**
     * Sets the text alignment.
     */
    textAlignment?: TextAlignment;
    /**
     * Sets the text color.
     */
    textColor?: string;
    [property: string]: any;
}

/**
 * Sets the image scale type.
 */
export enum ImageScaleType {
    Center = "center",
    CenterCrop = "center_crop",
    FitCenter = "fit_center",
    FitXy = "fit_xy",
}

/**
 * Sets the text alignment.
 */
export enum TextAlignment {
    Center = "center",
    Left = "left",
    Right = "right",
}

/**
 * Configuration for UI Feedback content
 */
export interface UiFeedbackElementContentConfig {
    /**
     * Sets the content of the element.
     */
    contentValue?: string;
    /**
     * Sets the duration of the element.
     */
    durationMills?: number;
    /**
     * Sets the priority of the element.
     */
    priorityLevel?: number;
    [property: string]: any;
}

/**
 * Configuration for UI Feedback overlays
 */
export interface OverlayConfig {
    /**
     * Sets the anchor of the overlay.
     */
    anchor?: OverlayAnchorConfig;
    /**
     * Sets the offset dimension of the overlay.
     */
    offsetDimension?: OverlayDimensionConfig;
    /**
     * Allows to use overlay presets.
     */
    presets?: UiFeedbackPresetConfig[];
    /**
     * Sets the size dimension of the overlay.
     */
    sizeDimension?: OverlayDimensionConfig;
    /**
     * Sets the source of the overlay.
     */
    source?: OverlaySource;
    [property: string]: any;
}

/**
 * Sets the anchor of the overlay.
 *
 * Sets the anchor of the overlay relative to the source defined in the overlaySource.
 */
export enum OverlayAnchorConfig {
    BottomCenter = "bottom_center",
    BottomLeft = "bottom_left",
    BottomRight = "bottom_right",
    Center = "center",
    CenterLeft = "center_left",
    CenterRight = "center_right",
    TopCenter = "top_center",
    TopLeft = "top_left",
    TopRight = "top_right",
}

/**
 * Sets the offset dimension of the overlay.
 *
 * Sets the dimension of the overlay.
 *
 * Sets the size dimension of the overlay.
 */
export interface OverlayDimensionConfig {
    /**
     * Sets the scale for x axis of the overlay.
     */
    scaleX?: OverlayScaleConfig;
    /**
     * Sets the scale for y axis of the overlay.
     */
    scaleY?: OverlayScaleConfig;
    [property: string]: any;
}

/**
 * Sets the scale for x axis of the overlay.
 *
 * Configuration for UI Feedback overlays
 *
 * Sets the scale for y axis of the overlay.
 */
export interface OverlayScaleConfig {
    /**
     * Sets the scale type of the overlay.
     */
    scaleType?: OverlayScaleTypeConfig;
    /**
     * Sets the scale value of the overlay.
     */
    scaleValue?: number;
    [property: string]: any;
}

/**
 * Sets the scale type of the overlay.
 */
export enum OverlayScaleTypeConfig {
    FixedPx = "fixed_px",
    KeepRatio = "keep_ratio",
    None = "none",
    Overlay = "overlay",
}

/**
 * Configuration for uiFeedback preset.
 */
export interface UiFeedbackPresetConfig {
    /**
     * Attributes inside preset.
     */
    presetAttributes?: UiFeedbackPresetAttributeConfig[];
    /**
     * Name of the preset.
     */
    presetName?: string;
    [property: string]: any;
}

/**
 * Configuration for uiFeedback preset attribute.
 */
export interface UiFeedbackPresetAttributeConfig {
    /**
     * Name of the attribute declared in the preset definition.
     */
    attributeName?: string;
    /**
     * Sets the value of the attribute.
     */
    attributeValue?: string;
    [property: string]: any;
}

/**
 * Sets the source of the overlay.
 *
 * Sets the source of the overlay. Currently cutout is the only available overlay source.
 */
export enum OverlaySource {
    Cutout = "cutout",
}

/**
 * Trigger configuration for UI Feedback
 */
export interface UiFeedbackElementTriggerConfig {
    presets?: UiFeedbackPresetConfig[];
    /**
     * Allows to watch runSkipped events.
     */
    runSkipped?: UiFeedbackElementTriggerWhenRunSkippedConfig[];
    /**
     * Allows to watch scanInfo events.
     */
    scanInfo?: UiFeedbackElementTriggerWhenScanInfoConfig[];
    [property: string]: any;
}

/**
 * Configuration for triggering UI Feedback on RunSkipped events
 */
export interface UiFeedbackElementTriggerWhenRunSkippedConfig {
    when?: RunSkippedWhen;
    [property: string]: any;
}

/**
 * Configuration for triggering UI Feedback on RunSkipped events
 */
export interface RunSkippedWhen {
    applyAttributesInstead?: UiFeedbackElementAttributesConfig;
    applyContentInstead?:    UiFeedbackElementContentConfig;
    /**
     * Sets whether the trigger must apply defaultAttributes.
     */
    applyDefaultAttributes?: boolean;
    /**
     * Sets whether the trigger must apply defaultContent.
     */
    applyDefaultContent?: boolean;
    /**
     * Sets the runSkipped code to be watched.
     */
    codeEquals?: number;
    [property: string]: any;
}

/**
 * Configuration for triggering UI Feedback on ScanInfo events
 */
export interface UiFeedbackElementTriggerWhenScanInfoConfig {
    when?: ScanInfoWhen;
    [property: string]: any;
}

/**
 * Configuration for triggering UI Feedback on ScanInfo events
 */
export interface ScanInfoWhen {
    applyAttributesInstead?: UiFeedbackElementAttributesConfig;
    applyContentInstead?:    UiFeedbackElementContentConfig;
    /**
     * Sets whether the trigger must apply defaultAttributes.
     */
    applyDefaultAttributes?: boolean;
    /**
     * Sets whether the trigger must apply defaultContent.
     */
    applyDefaultContent?: boolean;
    /**
     * Sets the ScanInfo variable name to be watched.
     */
    varNameEquals?: string;
    /**
     * Sets the ScanInfo variable value to be watched.
     */
    varValueEquals?: string;
    [property: string]: any;
}

/**
 * Configuration for uiFeedback preset definition.
 */
export interface UiFeedbackPresetDefinitionConfig {
    /**
     * Attributes inside preset definition.
     */
    attributes?: UiFeedbackPresetDefinitionAttributeConfig[];
    /**
     * Sets the name of the preset definition.
     */
    name?: string;
    /**
     * Configuration for uiFeedback preset content definition.
     */
    presetContent?: UiFeedbackPresetContentConfig;
    /**
     * Sets the preset definition type.
     */
    type?: Type;
    [property: string]: any;
}

/**
 * Configuration for uiFeedback preset definition attribute.
 */
export interface UiFeedbackPresetDefinitionAttributeConfig {
    /**
     * Sets the name of the element of the attribute.
     */
    elementName?: string;
    /**
     * Sets the preset definition attribute element type.
     */
    elementType?: ElementTypeEnum;
    /**
     * Sets the name of the attribute.
     */
    name?: string;
    [property: string]: any;
}

/**
 * Sets the preset definition attribute element type.
 */
export enum ElementTypeEnum {
    Any = "any",
    Boolean = "boolean",
    Double = "double",
    Int = "int",
    Long = "long",
    String = "string",
}

/**
 * Configuration for uiFeedback preset content definition.
 */
export interface UiFeedbackPresetContentConfig {
    element?:  UiFeedbackElementConfig;
    elements?: UiFeedbackElementConfig[];
    overlay?:  OverlayConfig;
    presets?:  UiFeedbackPresetConfig[];
    trigger?:  UiFeedbackElementTriggerConfig;
    [property: string]: any;
}

/**
 * Sets the preset definition type.
 */
export enum Type {
    Preset = "preset",
    PresetElement = "presetElement",
    PresetElementOverlay = "presetElementOverlay",
    PresetElementTrigger = "presetElementTrigger",
}
