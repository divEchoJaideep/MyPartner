import {updateAstronomic} from './const';

async function UpdateAstronomic(props) {
  // console.log('props address : ');
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${props.token}`);
  let formData = new FormData();

  formData.append('time_of_birth', props.data.time_of_birth);
  formData.append('city_of_birth', props.data.city_of_birth);
  formData.append('manglik', props.data.manglik);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow',
  };
  console.log('requestOptions', requestOptions);
  return fetch(updateAstronomic, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return {success: false, message: 'Error connecting to server'};
    });
}

export default UpdateAstronomic;
