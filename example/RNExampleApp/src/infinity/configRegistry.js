import { groupFromConfig, labelFromConfig } from './pluginTypeHelper';

import AnalogDigitalMeterConfig from '../../assets/anyline_assets/config/infinity/analog_digital_meter_config.json';
import ArabicIdConfig from '../../assets/anyline_assets/config/infinity/arabic_id_config.json';
import BarcodeConfig from '../../assets/anyline_assets/config/infinity/barcode_config.json';
import BarcodeContinuousConfig from '../../assets/anyline_assets/config/infinity/barcode_continuous_config.json';
import BarcodePdf417Config from '../../assets/anyline_assets/config/infinity/barcode_pdf417_config.json';
import CommercialTireIdConfig from '../../assets/anyline_assets/config/infinity/commercial_tire_id_config.json';
import ContainerShipConfig from '../../assets/anyline_assets/config/infinity/container_ship_config.json';
import CowTagConfig from '../../assets/anyline_assets/config/infinity/cow_tag_config.json';
import CyrillicIdConfig from '../../assets/anyline_assets/config/infinity/cyrillic_id_config.json';
import DialMeterConfig from '../../assets/anyline_assets/config/infinity/dial_meter_config.json';
import JapaneseLandingPermissionConfig from '../../assets/anyline_assets/config/infinity/japanese_landing_permission_config.json';
import LicensePlateAfricaConfig from '../../assets/anyline_assets/config/infinity/license_plate_africa_config.json';
import LicensePlateCanadaConfig from '../../assets/anyline_assets/config/infinity/license_plate_canada_config.json';
import LicensePlateConfig from '../../assets/anyline_assets/config/infinity/license_plate_config.json';
import LicensePlateUsConfig from '../../assets/anyline_assets/config/infinity/license_plate_us_config.json';
import MrzConfig from '../../assets/anyline_assets/config/infinity/mrz_config.json';
import OdometerConfig from '../../assets/anyline_assets/config/infinity/odometer_config.json';
import ParallelFirstScanningConfig from '../../assets/anyline_assets/config/infinity/parallel_first_scanning_config.json';
import ParallelScanningConfig from '../../assets/anyline_assets/config/infinity/parallel_scanning_config.json';
import SerialNumberConfig from '../../assets/anyline_assets/config/infinity/serial_number_config.json';
import SerialScanningConfig from '../../assets/anyline_assets/config/infinity/serial_scanning_config.json';
import TinConfig from '../../assets/anyline_assets/config/infinity/tin_config.json';
import TinDotConfig from '../../assets/anyline_assets/config/infinity/tin_dot_config.json';
import TinDotWithUiFeedbackConfig from '../../assets/anyline_assets/config/infinity/tin_dot_with_ui_feedback_config.json';
import TireSizeConfig from '../../assets/anyline_assets/config/infinity/tire_size_config.json';
import UniversalIdConfig from '../../assets/anyline_assets/config/infinity/universal_id_config.json';
import VerticalContainerConfig from '../../assets/anyline_assets/config/infinity/vertical_container_config.json';
import VinConfig from '../../assets/anyline_assets/config/infinity/vin_config.json';
import VrcConfig from '../../assets/anyline_assets/config/infinity/vrc_config.json';

const RAW_CONFIGS = [
  { filename: 'analog_digital_meter_config.json', content: AnalogDigitalMeterConfig },
  { filename: 'arabic_id_config.json', content: ArabicIdConfig },
  { filename: 'barcode_config.json', content: BarcodeConfig },
  { filename: 'barcode_continuous_config.json', content: BarcodeContinuousConfig },
  { filename: 'barcode_pdf417_config.json', content: BarcodePdf417Config },
  { filename: 'commercial_tire_id_config.json', content: CommercialTireIdConfig },
  { filename: 'container_ship_config.json', content: ContainerShipConfig },
  { filename: 'cow_tag_config.json', content: CowTagConfig },
  { filename: 'cyrillic_id_config.json', content: CyrillicIdConfig },
  { filename: 'dial_meter_config.json', content: DialMeterConfig },
  { filename: 'japanese_landing_permission_config.json', content: JapaneseLandingPermissionConfig },
  { filename: 'license_plate_africa_config.json', content: LicensePlateAfricaConfig },
  { filename: 'license_plate_canada_config.json', content: LicensePlateCanadaConfig },
  { filename: 'license_plate_config.json', content: LicensePlateConfig },
  { filename: 'license_plate_us_config.json', content: LicensePlateUsConfig },
  { filename: 'mrz_config.json', content: MrzConfig },
  { filename: 'odometer_config.json', content: OdometerConfig },
  { filename: 'parallel_first_scanning_config.json', content: ParallelFirstScanningConfig },
  { filename: 'parallel_scanning_config.json', content: ParallelScanningConfig },
  { filename: 'serial_number_config.json', content: SerialNumberConfig },
  { filename: 'serial_scanning_config.json', content: SerialScanningConfig },
  { filename: 'tin_config.json', content: TinConfig },
  { filename: 'tin_dot_config.json', content: TinDotConfig },
  { filename: 'tin_dot_with_ui_feedback_config.json', content: TinDotWithUiFeedbackConfig },
  { filename: 'tire_size_config.json', content: TireSizeConfig },
  { filename: 'universal_id_config.json', content: UniversalIdConfig },
  { filename: 'vertical_container_config.json', content: VerticalContainerConfig },
  { filename: 'vin_config.json', content: VinConfig },
  { filename: 'vrc_config.json', content: VrcConfig },
];

// Returns an array of { label, group, configJson, filename } objects.
const ALL_CONFIGS = RAW_CONFIGS.map(({ filename, content }) => ({
  filename,
  label: labelFromConfig(content, filename),
  group: groupFromConfig(content),
  configJson: JSON.stringify(content),
}));

export default ALL_CONFIGS;
