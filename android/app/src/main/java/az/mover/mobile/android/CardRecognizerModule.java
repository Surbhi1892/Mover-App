// package az.mover.mobile.android;

// import android.app.Activity;
// import android.content.Context;
// import android.content.Intent;
// import android.os.Bundle;
// import android.util.Log;

// import androidx.annotation.NonNull;

// import com.facebook.react.bridge.ActivityEventListener;
// import com.facebook.react.bridge.BaseActivityEventListener;
// import com.facebook.react.bridge.ReactApplicationContext;
// import com.facebook.react.bridge.ReactContextBaseJavaModule;
// import com.facebook.react.bridge.ReactMethod;

// import cards.pay.paycardsrecognizer.sdk.Card;
// import cards.pay.paycardsrecognizer.sdk.ScanCardIntent;

// import static com.facebook.react.common.ReactConstants.TAG;

// public class CardRecognizerModule extends ReactContextBaseJavaModule {
//     static final int REQUEST_CODE_SCAN_CARD = 1;
//     ReactApplicationContext context;

//     CardRecognizerModule(ReactApplicationContext context) {
//         super(context);
//         this.context = context;
//         this.context.addActivityEventListener(mActivityEventListener);
//     }

//     private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
//         @Override
//         public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
//             super.onActivityResult(activity, requestCode, resultCode, data);
//             if (requestCode == REQUEST_CODE_SCAN_CARD) {
//                 if (resultCode == Activity.RESULT_OK) {
//                     Card card = data.getParcelableExtra(ScanCardIntent.RESULT_PAYCARDS_CARD);
//                     String cardData = "Card number: " + card.getCardNumberRedacted() + "\n"
//                             + "Card holder: " + card.getCardHolderName() + "\n"
//                             + "Card expiration date: " + card.getExpirationDate();
//                     Log.i(TAG, "Card info: " + cardData);
//                 } else if (resultCode == Activity.RESULT_CANCELED) {
//                     Log.i(TAG, "Scan canceled");
//                 } else {
//                     Log.i(TAG, "Scan failed");
//                 }
//             }
//         }
//     };

//     @NonNull
//     @Override
//     public String getName() {
//         return "CardRecognizer";
//     }

//     @ReactMethod
//     public void show() {
//         Bundle bundle = new Bundle();
//         Intent intent = new ScanCardIntent.Builder(this.context).build();
//         this.context.startActivityForResult(intent, REQUEST_CODE_SCAN_CARD, bundle);
//     }
// }
