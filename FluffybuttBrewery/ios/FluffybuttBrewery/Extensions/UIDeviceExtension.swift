import UIKit

extension UIDevice {
  static var isPad: Bool {
    return UIDevice.current.userInterfaceIdiom == .pad
  }
  static var isPhone: Bool {
    return UIDevice.current.userInterfaceIdiom == .phone
  }
  static var uuidString: String? {
    return UIDevice.current.identifierForVendor?.uuidString
  }
}
