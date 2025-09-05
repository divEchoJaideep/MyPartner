import AsyncStorage from '@react-native-async-storage/async-storage';
async function AsyncStorageRemoveItem(key) {
  await AsyncStorage.removeItem(key);
}

export default AsyncStorageRemoveItem;
