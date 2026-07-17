const { withDangerousMod } = require('expo/config-plugins');
const fs = require('node:fs');
const path = require('node:path');

/**
 * Expo config plugin: write android res/raw/keep.xml in the APP module.
 *
 * Why: res/raw/keep.xml is a single `raw/keep` resource. When more
 * than one module ships one (the Anyline SDK AAR keeps `@drawable/*, @raw/*`,
 * but expo-dev-client also ships its own keep.xml), resource merging keeps only
 * ONE — and on SDK 54 / RN 0.81 (AGP 8.x) expo-dev-client's wins, discarding the
 * Anyline rule. R8 then shrinks the Anyline scan-view feedback drawables
 * (uifeedback_*, ic_flash_*, ic_move_*, ic_too_*, ...) from release APKs.
 *
 * The app module has the highest resource-merge priority, so an app-level
 * keep.xml overrides every dependency's and restores the SDK's intended rule.
 */
const KEEP_XML = `<?xml version="1.0" encoding="utf-8"?>
<resources xmlns:tools="http://schemas.android.com/tools"
    tools:keep="@drawable/*, @raw/*" />
`;

module.exports = function withAndroidKeepResources(config) {
  return withDangerousMod(config, [
    'android',
    async (config) => {
      const rawDir = path.join(
        config.modRequest.projectRoot,
        'android', 'app', 'src', 'main', 'res', 'raw'
      );
      fs.mkdirSync(rawDir, { recursive: true });
      fs.writeFileSync(path.join(rawDir, 'keep.xml'), KEEP_XML);
      console.log('✓ Wrote android res/raw/keep.xml (keep @drawable/*, @raw/*)');
      return config;
    },
  ]);
};
