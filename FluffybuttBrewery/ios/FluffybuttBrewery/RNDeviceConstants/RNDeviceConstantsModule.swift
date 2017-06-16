import UIKit

@objc(RNDeviceConstantsModule)
class RNDeviceConstantsModule: NSObject {
  
  fileprivate struct Properties {
    static let isTablet = "isTablet"
  }
  
  var methodQueue: DispatchQueue {
    return DispatchQueue.main
  }
  
  var constantsToExport: NSDictionary {
    return [Properties.isTablet: UIDevice.isPad]
  }
}
