import AsyncStorage from '@react-native-async-storage/async-storage';
const storeData = async (key, value) => {
  try {
    console.log("saving key: ",key)
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

export  {getData, storeData}