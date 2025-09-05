import {loginUrl, accessToken} from './const';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function Login(props) {
  let formData = new FormData();
  formData.append('phone', props.phone);
  formData.append('password', props.password);

  try {
    let response = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        Authorization: accessToken,
      },
      body: formData,
    });

    let json = await response.json();
    console.log('json: ', json);
    if (json.success && json.token) {
      await AsyncStorage.setItem('userToken', json.token);
      console.log('Token saved to AsyncStorage');
    }

    return json;
  } catch (e) {
    console.log('error', e);
    return [{success: false, message: 'Something went wrong!'}];
  }
}

export default Login;
