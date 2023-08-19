import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    console.log('Stored');
  } catch (e) {
    // saving error
  }
};
const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    const parsed = JSON.parse(value);
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    // error reading value
  }
};

const getNextKey = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (error) {}
  nextKey = parseInt(keys[keys.length - 1]) + 1;
  return String(nextKey);
};
const clear = async () => {
  clear = await AsyncStorage.clear();
};

export {storeData, getData, getNextKey, clear};
