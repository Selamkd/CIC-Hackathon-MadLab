import AsyncStorage from '@react-native-async-storage/async-storage';
const storeData = async (key, value) => {
  try {
    console.log('saving: ', key, value);
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error storing data:', error);
  }
};

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error retrieving data:', error);
    return null;
  }
};

const removeKeys = async (keys) => {
  //key = [key,key1]
  try {
    const value = await AsyncStorage.multiRemove(keys, (err) => {
      // keys k1 & k2 removed, if they existed
      // do most stuff after removal (if you want)
    });
  } catch (error) {
    console.error('Error removing data:', error);
    return null;
  }
};

export { getData, storeData, removeKeys };
