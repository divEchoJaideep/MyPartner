import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateHobbies} from './const';

async function UpdateHobbies(props) {
  try {
    const token = await AsyncStorage.getItem('UserToken');
    console.log('props data : ', props);

    let formData = new FormData();
    formData.append('hobbies', props.data);

    let requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      redirect: 'follow',
    };

    console.log('UpdateHobbies requestOptions:', requestOptions);

    const response = await fetch(updateHobbies, requestOptions);
    const result = await response.json();

    return result;
  } catch (error) {
    console.log('UpdateHobbies API Error:', error);
    return {success: false, message: 'Error connecting to server'};
  }
}

export default UpdateHobbies;
