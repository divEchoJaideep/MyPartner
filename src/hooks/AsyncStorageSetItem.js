import AsyncStorage from '@react-native-async-storage/async-storage';
async function AsyncStorageSetItem(key, object) {
  let updateCounter = 0;
  await AsyncStorage.setItem(key, JSON.stringify(object), error => {
    if (error) {
      updateCounter++;
      if (updateCounter === 2) {
        callback();
      }
    } else {
      // handle success
    }
  });
}

export default AsyncStorageSetItem;
