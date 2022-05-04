//
//  CardRecognizerVC.swift
//  Mover
//
//  Created by Rizvan Rzayev on 08.05.21.
//

import UIKit
import PayCardsRecognizer

class CardRecognizerVC: UINavigationController {

  var recognizer: PayCardsRecognizer!
  var delegateRecognizer: PayCardsRecognizerPlatformDelegate!
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
      
        let backItem = UINavigationItem(title: "Back")
        let topItem = UINavigationItem(title: "My Title")
        self.navigationController?.navigationBar.setItems([backItem, topItem], animated: true)
//        self.navigationController?.setNavigationBarHidden(false, animated: true)
      
        recognizer = PayCardsRecognizer(delegate: delegateRecognizer, resultMode: .async, container: self.view, frameColor: .red)
        
        recognizer.startCamera()
    }
        
    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
        recognizer.stopCamera()
    }
}
