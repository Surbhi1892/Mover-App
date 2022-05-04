////
////  Engati.swift
////  Mover
////
////  Created by Rizvan Rzayev on 06.01.21.
////
//
//import Foundation
//import EngatiChat
//import React
//
//let userAttributes = [
//    [
//      "name": "mover_user_id",
//      "value": "100002",
//    ],
//    [
//      "name": "",
//      "value": "",
//    ]
//]
//
//@objc(Engati)
//class Engati: NSObject {
//  let jsCodeLocation: URL = RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index", fallbackResource:nil)
//  
//  @objc
//  func show() {
//    let chatConfig = ENSDKChatConfig.init(botKey: "", botName: "", brandingKey: "", welcomeMsg: false, enableLog: false, userId: "", chatHistorySize: 100, showDone: true, closeButtonImage: nil, language: .default, headerTitleFont: nil, headerDescriptionFont: nil, sendMessageButtonIcon: nil, userAttributes: userAttributes)
//     let chatController = ENSDKChatViewController.init(chatConfig: chatConfig, callBackDelegate: nil)
//    let rootVC = getVCFromModuleName("Mover", nil, nil)
//    rootVC.present(chatController, animated: true, completion: nil)
//  }
//  @objc
//  func hide() {
//    
//  }
//  
//  func getVCFromModuleName(_ moduleName: String,_ initialProperties: NSDictionary?, _ launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> UIViewController {
//      var props: [NSObject : AnyObject]? = nil
//      if (initialProperties != nil) {
//        props = initialProperties! as [NSObject : AnyObject]
//      }
//      let rootView = RCTRootView(bundleURL: jsCodeLocation, moduleName: moduleName, initialProperties: props , launchOptions: launchOptions)
//      let rootViewController = UIViewController()
//      rootViewController.view = rootView
//      return rootViewController
//  }
//}
