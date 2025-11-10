import {getCareer} from './const';

async function GetCareer(props) {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${props.token}`);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  return fetch(getCareer, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return {success: false, message: 'Error connecting to server'};
    });
}

export default GetCareer;
