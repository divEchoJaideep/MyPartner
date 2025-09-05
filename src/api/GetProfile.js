import {profiledropdownUrl} from './const';

async function GetProfleData(props) {
  //   console.log('props get profile : ', props);

  var myHeaders = new Headers();
  myHeaders.append('Authorization');

  var requestOptions = {
    method: 'GET',
    // headers: myHeaders,
    redirect: 'follow',
  };

  return fetch(profiledropdownUrl, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return {success: false, message: 'Error connecting to server'};
    });
}

export default GetProfleData;
