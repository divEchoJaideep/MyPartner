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

    const contentType = response.headers.get('content-type');
    if (response){
    }
    const result = await response.json();
    return result;

  } catch (error) {
    return { success: false, message: 'Error connecting to server' };
  }
}

export default GetMyStatus;
