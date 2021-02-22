//
//  ALDocumentUIKitViewController.swift
//  AnylineReact
//
//  Created by Philipp Müller on 22.02.21.
//

import UIKit
import AnylineUIKit

@objc class ALDocumentUIKitViewController : UIViewController {
    
    var licenseKey: String
    var anylineConfig: NSDictionary
    var anylineDocumentUIKitConfig: NSDictionary
    var uiConfiguration: ALJsonUIConfiguration
    
    weak var delegate: ALPluginScanViewControllerDelegate? = nil
    
    @objc public init(licenseKey: String, anylineConfig: NSDictionary, anylineDocumentUIKitConfig: NSDictionary, uiConfiguration: ALJsonUIConfiguration, pluginDelegate: ALPluginScanViewControllerDelegate) throws {
        do {
            let _ = try AnylineUIKit.setup(with: licenseKey)
        } catch let error {
            throw error
        }
        
        self.licenseKey = licenseKey
        self.anylineConfig = anylineConfig
        self.anylineDocumentUIKitConfig = anylineDocumentUIKitConfig
        self.uiConfiguration = uiConfiguration
        self.delegate = pluginDelegate
        
        super.init(nibName: nil, bundle: nil)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    // MARK: - Life cycle
    public override func viewDidLoad() {
        super.viewDidLoad()
        // We create path to config file fo document scanner
        guard let configPath = Bundle.main.path(forResource: "document_scan_view_config", ofType: "json") else { return }
        
        let documentConfig = DocumentScanViewConfig(jsonFilePath: configPath)
        // We create scan view controller (start point of scanner)
        let scanViewController = ScanView(documentConfig: documentConfig)
        navigationController?.pushViewController(scanViewController, animated: true)
    }
    
}
