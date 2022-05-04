//
//  Engati.swift
//  Mover
//
//  Created by Rizvan Rzayev on 06.01.21.
//

import Foundation
import PayCardsRecognizer
import React

let EVENT_ON_CARD_RECOGNIZED = "onCardRecognized"

@objc(CardRecognizer)
class CardRecognizer: RCTEventEmitter, PayCardsRecognizerPlatformDelegate {
  var recognizer: PayCardsRecognizer!
  var recognizerVC: CardRecognizerVC!

  override func supportedEvents() -> [String]! {
    return [EVENT_ON_CARD_RECOGNIZED]
  }

  var hasListener: Bool = false

  override func startObserving() {
    hasListener = true
  }

  override func stopObserving() {
    hasListener = false
  }

  @objc func notifiyRN(_ eventName: String, parameters: [String: Any] = [:] ) {
    if (hasListener) {
      self.sendEvent(withName: eventName, body: parameters)
    }
  }
  
  override class func requiresMainQueueSetup() -> Bool {
    return false
  }


  @objc
  func show() {
    DispatchQueue.main.async {
      let rootVC = UIApplication.shared.delegate?.window??.rootViewController
      self.recognizerVC = CardRecognizerVC()
      self.recognizerVC.delegateRecognizer = self
      rootVC?.present(self.recognizerVC, animated: true, completion: nil)
    }

  }
  @objc
  func hide() {
    DispatchQueue.main.async {
      self.recognizerVC.dismiss(animated: true, completion: nil)
    }
  }

  func payCardsRecognizer(_ payCardsRecognizer: PayCardsRecognizer, didRecognize result: PayCardsRecognizerResult) {
    var parameters: [String: Any] = [:]
    parameters["number"] = result.recognizedNumber
    parameters["holderName"] = result.recognizedHolderName
    parameters["month"] = result.recognizedExpireDateMonth
    parameters["year"] = result.recognizedExpireDateYear
    notifiyRN(EVENT_ON_CARD_RECOGNIZED, parameters: parameters)
  }
}
