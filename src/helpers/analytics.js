import firebase from 'react-native-firebase';
import appCenter from 'appcenter-analytics';
import Intercom from '@intercom/intercom-react-native';
import { removeToken } from './AsyncStorage';

const INTERCOM = 'intercom';
const FIREBASE = 'firebase';
const APP_CENTER = 'appCenter';

const ANALYTICS = [INTERCOM, APP_CENTER, FIREBASE];

export const track = (eventName, properties) => {
  try {
    if (ANALYTICS.includes(INTERCOM)) {
      Intercom.logEvent(eventName, properties);
    }
    if (ANALYTICS.includes(APP_CENTER)) {
      appCenter.trackEvent(eventName, properties);
    }
    if (ANALYTICS.includes(FIREBASE)) {
      firebase.analytics().logEvent(eventName.split(' ').join('_'), properties);
    }
  } catch (error) {}
};

export const identify = (userId, traits, options) => {
  try {
    if (ANALYTICS.includes(FIREBASE)) {
      firebase.analytics().setUserId(userId + 100000);
      firebase.analytics().setUserProperties(traits);
    }
  } catch (error) {}
};

export const screen = (name, properties, options) => {
  if (ANALYTICS.includes(FIREBASE)) {
    firebase.analytics().setCurrentScreen(name);
  }
};

class Analytics {
  static init() {}

  static onSignIn = async userObject => {
    const { id, email } = userObject;
    await Promise.all([
      firebase.analytics().setUserId(id),
      firebase.analytics().setUserProperty('email', email), // <--- DON'T DO THIS !!!
      this.logEvent('sign_in'),
    ]);
  };

  static onSignUp = async userObject => {
    const { id, email } = userObject;
    await Promise.all([
      firebase.analytics().setUserId(id),
      firebase.analytics().setUserProperty('email', email), // <--- DON'T DO THIS !!!
      firebase.analytics().setUserProperty('created_at', new Date()),
      this.logEvent('sign_up'),
    ]);
  };

  static setCurrentScreen = async screenName => {
    await firebase.analytics().setCurrentScreen(screenName, screenName);
  };

  static logEvent = async (eventName, propertyObject = {}) => {
    await firebase
      .analytics()
      .logEvent(eventName.split(' ').join('_'), propertyObject);
  };

  static onSignOut = async () => {
    await firebase.analytics().resetAnalyticsData();
  };
}

export default Analytics;
