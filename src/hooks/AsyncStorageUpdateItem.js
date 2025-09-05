import AsyncStorageGetItem from './AsyncStorageGetItem';
import AsyncStorageSetItem from './AsyncStorageSetItem';

async function AsyncStorageUpdateItem(keyToUpdate, newValue, storageKey) {
  try {
    const storedObject = await AsyncStorageGetItem(storageKey);

    if (storedObject) {
      const parsedObject = JSON.parse(storedObject);
      parsedObject[keyToUpdate] = newValue;
      //const updatedObject = JSON.stringify(parsedObject);
      await AsyncStorageSetItem(storageKey, parsedObject);
    }
  } catch (error) {
    console.log('Error updating object value:', error);
  }
}

export default AsyncStorageUpdateItem;
