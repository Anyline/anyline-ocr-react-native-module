require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

# Anyline iOS SDK — single source of truth, bumped by .devops/prepare_release.sh.
# The checksum is the SHA-256 of the xcframework archive and matches the one
# published in the SDK's Package.swift. Both lines are bumped together — keep
# adjacent. Keep the double quotes: prepare_release.sh's sed is quote-specific.
anyline_sdk_version = "56.3.0"
anyline_sdk_checksum = "fd2ad2847801619799c99267f02f4657beab64dc217e56258a0e5038f1ddbd84"

Pod::Spec.new do |s|
  s.name         = "AnylineReact"
  s.version      = package["version"]
  s.summary      = "anyline-ocr-react-native-module"
  s.authors      = {
    'Anyline GmbH' => 'capture-team@anyline.com'
  }

  s.homepage     = "https://github.com/Anyline/anyline-ocr-react-native-module"

  s.license      = "MIT"
  s.platform     = :ios, "12"

  s.source       = { :git => "https://github.com/Anyline/anyline-ocr-react-native-module.git", :tag => "#{s.version}" }

  s.source_files = 'ios/**/*.{h,m,swift}'
  s.vendored_frameworks = 'Anyline.xcframework'
  s.dependency "React"

  # The SPM Anyline.xcframework ships only ios-arm64 (device) and ios-x86_64-simulator slices —
  # no arm64 simulator slice. Exclude arm64 on the simulator so simulator builds fall back to
  # x86_64 (Rosetta) instead of failing to find a matching slice.
  s.pod_target_xcconfig  = { 'EXCLUDED_ARCHS[sdk=iphonesimulator*]' => 'arm64' }
  s.user_target_xcconfig = { 'EXCLUDED_ARCHS[sdk=iphonesimulator*]' => 'arm64' }

  # Fetch the Anyline xcframework from the CDN before CocoaPods collects vendored_frameworks.
  # Replaces the former `s.dependency "Anyline"` CocoaPods Trunk lookup. See
  # fetch_anyline_sdk.sh for the download, checksum check and caching. Invoked via
  # `sh` so a dropped exec bit during npm packaging is harmless.
  s.preserve_paths  = 'fetch_anyline_sdk.sh'
  s.prepare_command = "sh fetch_anyline_sdk.sh #{anyline_sdk_version} #{anyline_sdk_checksum}"

end
