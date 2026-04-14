export const GROUPS = {
  BARCODE: 'Barcode',
  IDENTITY_DOCUMENTS: 'Identity Documents',
  VEHICLE: 'Vehicle',
  METER_READING: 'Meter Reading',
  OTHERS: 'Others',
  MULTI_PLUGIN: 'Multi-Plugin',
};

export const GROUP_ORDER = [
  GROUPS.BARCODE,
  GROUPS.IDENTITY_DOCUMENTS,
  GROUPS.VEHICLE,
  GROUPS.METER_READING,
  GROUPS.OTHERS,
  GROUPS.MULTI_PLUGIN,
];

// --- Anyline: groupFromConfig ---
export function groupFromConfig(config) {
  if (config.viewPluginCompositeConfig) return GROUPS.MULTI_PLUGIN;
  const pc = config.viewPluginConfig?.pluginConfig;
  if (!pc) return GROUPS.OTHERS;
  if (pc.barcodeConfig) return GROUPS.BARCODE;
  if (pc.mrzConfig || pc.universalIdConfig || pc.japaneseLandingPermissionConfig) {
    return GROUPS.IDENTITY_DOCUMENTS;
  }
  if (
    pc.licensePlateConfig ||
    pc.vinConfig ||
    pc.vehicleRegistrationCertificateConfig ||
    pc.odometerConfig ||
    pc.tinConfig ||
    pc.tireSizeConfig ||
    pc.tireMakeConfig ||
    pc.commercialTireIdConfig
  ) {
    return GROUPS.VEHICLE;
  }
  if (pc.meterConfig) return GROUPS.METER_READING;
  return GROUPS.OTHERS;
}

export function labelFromConfig(config, fallbackFilename) {
  return (
    config.viewPluginCompositeConfig?.id ??
    config.viewPluginConfig?.pluginConfig?.id ??
    fallbackFilename
  );
}

// Returns the first non-null typed result as a plain object for JSON display.
export function pluginResultMap(pluginResult) {
  if (!pluginResult) return null;
  if (pluginResult.barcodeResult) return pluginResult.barcodeResult;
  if (pluginResult.mrzResult) return pluginResult.mrzResult;
  if (pluginResult.licensePlateResult) return pluginResult.licensePlateResult;
  if (pluginResult.vinResult) return pluginResult.vinResult;
  if (pluginResult.vehicleRegistrationCertificateResult) return pluginResult.vehicleRegistrationCertificateResult;
  if (pluginResult.meterResult) return pluginResult.meterResult;
  if (pluginResult.odometerResult) return pluginResult.odometerResult;
  if (pluginResult.tinResult) return pluginResult.tinResult;
  if (pluginResult.tireSizeResult) return pluginResult.tireSizeResult;
  if (pluginResult.tireMakeResult) return pluginResult.tireMakeResult;
  if (pluginResult.commercialTireIdResult) return pluginResult.commercialTireIdResult;
  if (pluginResult.containerResult) return pluginResult.containerResult;
  if (pluginResult.ocrResult) return pluginResult.ocrResult;
  if (pluginResult.japaneseLandingPermissionResult) return pluginResult.japaneseLandingPermissionResult;
  if (pluginResult.universalIdResult) return pluginResult.universalIdResult;
  return null;
}

export function pluginTypeLabel(pluginResult) {
  if (!pluginResult) return 'Unknown';
  if (pluginResult.barcodeResult) return 'Barcode';
  if (pluginResult.mrzResult) return 'MRZ';
  if (pluginResult.licensePlateResult) return 'License Plate';
  if (pluginResult.vinResult) return 'VIN';
  if (pluginResult.vehicleRegistrationCertificateResult) return 'VRC';
  if (pluginResult.meterResult) return 'Meter';
  if (pluginResult.odometerResult) return 'Odometer';
  if (pluginResult.tinResult) return 'TIN';
  if (pluginResult.tireSizeResult) return 'Tire Size';
  if (pluginResult.tireMakeResult) return 'Tire Make';
  if (pluginResult.commercialTireIdResult) return 'Commercial Tire ID';
  if (pluginResult.containerResult) return 'Container';
  if (pluginResult.ocrResult) return 'OCR';
  if (pluginResult.japaneseLandingPermissionResult) return 'JLP';
  if (pluginResult.universalIdResult) return 'Universal ID';
  return 'Result';
}
