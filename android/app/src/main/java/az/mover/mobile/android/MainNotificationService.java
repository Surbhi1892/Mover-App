package az.mover.mobile.android;

import android.util.Log;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.intercom.reactnative.IntercomModule;

import static android.content.ContentValues.TAG;

public class MainNotificationService extends FirebaseMessagingService {

  public void onMessageReceived(RemoteMessage remoteMessage) {
    Log.d(TAG, "onMessageReceived: " + remoteMessage.getNotification().getBody());
    if (IntercomModule.isIntercomPush(remoteMessage)) {
      IntercomModule.handleRemotePushMessage(getApplication(), remoteMessage);
    } else {
      // HANDLE NON-INTERCOM MESSAGE
      super.onMessageReceived(remoteMessage);
    }
  }
}