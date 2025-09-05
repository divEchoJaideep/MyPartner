import {basicinfo} from './const';

async function UpdateUserInfo(props) {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${props?.token}`);
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: props?.data,
    redirect: 'follow',
  };
  return fetch(props?.api, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return {success: false, message: 'Error connecting to server'};
    });
}

export default UpdateUserInfo;