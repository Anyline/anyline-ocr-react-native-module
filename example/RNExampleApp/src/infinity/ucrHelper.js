// --- Anyline: getPluginResultValueForUCR ---
// Mirrors the Android Kotlin implementation in ExportedScanResultExtension.kt.
export function getPluginResultValueForUCR(pluginResult) {
  if (!pluginResult) return '';
  return (
    pluginResult.barcodeResult?.barcodes?.[0]?.value ??
    pluginResult.mrzResult?.mrzString ??
    pluginResult.licensePlateResult?.plateText ??
    pluginResult.japaneseLandingPermissionResult?.result?.status?.text ??
    pluginResult.meterResult?.value ??
    pluginResult.odometerResult?.value ??
    pluginResult.ocrResult?.text ??
    pluginResult.tinResult?.text ??
    pluginResult.tireSizeResult?.text?.text ??
    pluginResult.tireMakeResult?.text ??
    pluginResult.commercialTireIdResult?.text ??
    pluginResult.containerResult?.text ??
    pluginResult.vinResult?.text ??
    ''
  );
}
