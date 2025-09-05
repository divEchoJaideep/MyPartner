import AsyncStorage from '@react-native-async-storage/async-storage';
async function AsyncStorageGetItem(key) {
  const data = await AsyncStorage.getItem(key);
  return data;
}

export default AsyncStorageGetItem;
