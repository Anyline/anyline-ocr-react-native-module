require "json"

package = JSON.parse(File.read(File.join(__dir__, "../", "package.json")))

Pod::Spec.new do |s|
  s.name         = "AnylineReact"
  s.version      = package["version"]
  s.summary      = "anyline-ocr-react-native-module"
  s.authors      = {
    'Aldrich Co' => 'aldrich.co@anyline.com'
  }

  s.homepage     = "https://github.com/Anyline/anyline-ocr-react-native-module"

  s.license      = "MIT"
  s.platform     = :ios, "12"

  s.source       = { :git => "https://github.com/Anyline/anyline-ocr-react-native-module.git", :tag => "#{s.version}" }

  s.source_files  = "*.{h,m}"
  s.dependency "Anyline", "~> 51"
  s.dependency "React"

end