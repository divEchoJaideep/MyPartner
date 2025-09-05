import {getAstronomic} from './const';

async function GetAstronomic(props) {
  // console.log('getbasic info props:', props);
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${props.token}`);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  return fetch(getAstronomic, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return {success: false, message: 'Error connecting to server'};
    });
}

export default GetAstronomic;
