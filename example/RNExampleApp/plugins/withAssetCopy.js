const { withDangerousMod, withXcodeProject } = require('expo/config-plugins');
const fs = require('fs');
const path = require('path');

/**
 * Expo config plugin to copy assets folder to both iOS and Android builds
 */
module.exports = function withAssetCopy(config) {
  // Add a build phase to copy assets to iOS bundle
  config = withXcodeProject(config, (config) => {
    const xcodeProject = config.modResults;

    // Add the script phase to the first target
    const firstTarget = xcodeProject.getFirstTarget();
    if (firstTarget) {
      xcodeProject.addBuildPhase(
        [],
        'PBXShellScriptBuildPhase',
        'Copy Assets Folder',
        firstTarget.uuid,
        { shellPath: '/bin/sh', shellScript: 'cp -R "$SRCROOT/../assets/"* "$TARGET_BUILD_DIR/$PRODUCT_NAME.app/"' }
      );
    }

    return config;
  });

  // Copy assets to iOS source directory
  config = withDangerousMod(config, [
    'ios',
    async (config) => {
      const projectRoot = config.modRequest.projectRoot;
      const sourceAssetsPath = path.join(projectRoot, 'assets');
      const targetAssetsPath = path.join(projectRoot, 'ios', 'assets');

      // Copy assets folder to iOS folder (will be copied to bundle during build)
      if (fs.existsSync(sourceAssetsPath)) {
        copyDirectoryRecursive(sourceAssetsPath, targetAssetsPath);
        console.log(`✓ Copied assets to iOS: ${targetAssetsPath}`);
      }

      return config;
    },
  ]);

  // Copy assets to Android
  config = withDangerousMod(config, [
    'android',
    async (config) => {
      const projectRoot = config.modRequest.projectRoot;
      const sourceAssetsPath = path.join(projectRoot, 'assets');
      const targetAssetsPath = path.join(projectRoot, 'android', 'app', 'src', 'main', 'assets');

      // Copy assets folder to Android project
      if (fs.existsSync(sourceAssetsPath)) {
        copyDirectoryRecursive(sourceAssetsPath, targetAssetsPath);
        console.log(`✓ Copied assets to Android: ${targetAssetsPath}`);
      }

      return config;
    },
  ]);

  return config;
};

function copyDirectoryRecursive(source, target) {
  // Create target directory if it doesn't exist
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  // Get all files and directories
  const files = fs.readdirSync(source);

  files.forEach((file) => {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);

    if (fs.statSync(sourcePath).isDirectory()) {
      // Recursively copy subdirectories
      copyDirectoryRecursive(sourcePath, targetPath);
    } else {
      // Copy file
      fs.copyFileSync(sourcePath, targetPath);
    }
  });
}