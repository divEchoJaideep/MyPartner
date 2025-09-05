import {userReceivedRequest} from './const';

async function GetUserReceivedRequest(props) {
  console.log('props:', props);
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${props.token}`);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  return fetch(userReceivedRequest, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log('result :', result);
      return result;
    })
    .catch(error => {
      return {success: false, message: 'Error connecting to server'};
    });
}

export default GetUserReceivedRequest;
