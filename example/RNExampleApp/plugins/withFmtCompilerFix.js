const { withDangerousMod } = require('expo/config-plugins');
const fs = require('node:fs');
const path = require('node:path');

/**
 * Expo config plugin to work around fmt 11.0.2 consteval compilation failure
 * with Xcode 26+ (Apple Clang 17+).
 *
 * Patches fmt/base.h in the Pods directory after pod install to add an
 * Apple Clang 17+ check that disables consteval usage.
 *
 * Remove once React Native ships a Folly version with fmt >= 11.1.
 */
module.exports = function withFmtCompilerFix(config) {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const podfilePath = path.join(config.modRequest.projectRoot, 'ios', 'Podfile');
      let podfile = fs.readFileSync(podfilePath, 'utf8');

      const fmtFix = String.raw`
    # Workaround: fmt 11.0.2 consteval failure with Xcode 26+ / Apple Clang 17+
    # Patches fmt/base.h to disable consteval for Apple Clang >= 16000000
    fmt_base = File.join(installer.sandbox.root, 'fmt', 'include', 'fmt', 'base.h')
    if File.exist?(fmt_base)
      content = File.read(fmt_base)
      unless content.include?('apple_build_version__ >= 16000000')
        patched = content.sub(
          '#elif defined(__cpp_consteval)',
          '#elif defined(__apple_build_version__) && __apple_build_version__ >= 16000000L' + "\n" +
          '#  define FMT_USE_CONSTEVAL 0  // consteval is broken in Apple clang >= 17 (Xcode 26+).' + "\n" +
          '#elif defined(__cpp_consteval)'
        )
        File.write(fmt_base, patched)
        Pod::UI.puts "\u2713 Patched fmt/base.h: disabled consteval for Apple Clang 17+"
      end
    end`;

      // Insert before the closing 'end' of the post_install block
      const postInstallEndMarker = '  end\nend';
      podfile = podfile.replace(postInstallEndMarker, `${fmtFix}\n  end\nend`);

      fs.writeFileSync(podfilePath, podfile);
      console.log('✓ Added fmt consteval workaround to Podfile');

      return config;
    },
  ]);
};