import { getMyStatus } from './const';

async function GetMyStatus(token) {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    const response = await fetch(getMyStatus, requestOptions);
console.log('response :',response);

    const contentType = response.headers.get('content-type');
    if (response){

    console.log(response)
    }
    const result = await response.json();
    // console.log('✅ GetMyStatus response:', result);
    return result;

  } catch (error) {
    // console.log('❌ GetMyStatus error:', error.message);
    return { success: false, message: 'Error connecting to server' };
  }
}

export default GetMyStatus;
