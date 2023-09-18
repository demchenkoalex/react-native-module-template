//
//  RNProgressBarModule.swift
//  RNProgressBarModule
//
//  Copyright © 2022 Ayush Khade. All rights reserved.
//

import Foundation

@objc(RNProgressBarModule)
class RNProgressBarModule: NSObject {
  @objc
  func constantsToExport() -> [AnyHashable : Any]! {
    return ["count": 1]
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
