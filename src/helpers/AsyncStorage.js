import AsyncStorage from '@react-native-community/async-storage';

const TOKEN_KEY = '@token';
const USER_KEY = '@user';
const REVIEW_KEY = '@isReviewed';
const BILDIR_REVIEW_KEY = '@isReviewed';
const CUSTOMS_TOKEN_KEY = '@customs_token';
const CUSTOMS_REFRESH_TOKEN_KEY = '@customs_refresh_token';
const FIRST_OPEN_WEIGHT_KEY = '@first_open_weight';

const saveToAsyncStorage = async (key, value) => {
  const currentValue = await AsyncStorage.getItem(key);
  let result;
  if (currentValue !== null) {
    try {
      result = await AsyncStorage.setItem(
        key,
        typeof value === 'object' ? JSON.stringify(value) : value
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      result = await AsyncStorage.mergeItem(
        key,
        typeof value === 'object' ? JSON.stringify(value) : value
      );
    } catch (error) {
      console.log(error);
    }
  }
  return result;
};

export const getToken = async () => {
  const result = await AsyncStorage.getItem(TOKEN_KEY);
  return result;
};

export const removeToken = async () => {
  const result = await AsyncStorage.removeItem(TOKEN_KEY);
  return result;
};

export const saveToken = async token => {
  const result = await saveToAsyncStorage(TOKEN_KEY, token);
  return result;
};

export const getUserInstance = async () => {
  const result = await AsyncStorage.getItem(USER_KEY);
  return result;
};

export const removeUserInstance = async () => {
  const result = await AsyncStorage.removeItem(USER_KEY);
  return result;
};

export const saveUserInstance = async user => {
  const result = await saveToAsyncStorage(USER_KEY, user);
  return result;
};

export const getReviewed = async () => {
  const result = await AsyncStorage.getItem(REVIEW_KEY);
  return result;
};

export const removeReviewed = async () => {
  const result = await AsyncStorage.removeItem(REVIEW_KEY);
  return result;
};

export const saveReviewed = async isReviewed => {
  const result = await saveToAsyncStorage(REVIEW_KEY, isReviewed);
  return result;
};

export const getBildirReviewed = async () => {
  const result = await AsyncStorage.getItem(BILDIR_REVIEW_KEY);
  return result;
};

export const removeBildirReviewed = async () => {
  const result = await AsyncStorage.removeItem(BILDIR_REVIEW_KEY);
  return result;
};

export const saveBildirReviewed = async isReviewed => {
  const result = await saveToAsyncStorage(BILDIR_REVIEW_KEY, isReviewed);
  return result;
};

export const getCustomsToken = async () => {
  const result = await AsyncStorage.getItem(CUSTOMS_TOKEN_KEY);
  return result;
};

export const removeCustomsToken = async () => {
  const result = await AsyncStorage.removeItem(CUSTOMS_TOKEN_KEY);
  return result;
};

export const saveCustomsToken = async token => {
  const result = await saveToAsyncStorage(CUSTOMS_TOKEN_KEY, token);
  return result;
};

export const getCustomsRefreshToken = async () => {
  const result = await AsyncStorage.getItem(CUSTOMS_REFRESH_TOKEN_KEY);
  return result;
};

export const removeCustomsRefreshToken = async () => {
  const result = await AsyncStorage.removeItem(CUSTOMS_REFRESH_TOKEN_KEY);
  return result;
};

export const saveCustomsRefreshToken = async token => {
  const result = await saveToAsyncStorage(CUSTOMS_REFRESH_TOKEN_KEY, token);
  return result;
};

export const getFirstOpenWeightBalance = async () => {
  const result = await AsyncStorage.getItem(FIRST_OPEN_WEIGHT_KEY);
  return result;
};

export const removeFirstOpenWeightBalance = async () => {
  const result = await AsyncStorage.removeItem(FIRST_OPEN_WEIGHT_KEY);
  return result;
};

export const saveFirstOpenWeightBalance = async token => {
  const result = await saveToAsyncStorage(FIRST_OPEN_WEIGHT_KEY, token);
  return result;
};
