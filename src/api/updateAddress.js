import {updateAddress} from './const';

async function UpdateAddress(props) {
  // console.log('props address : ', props);
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${props.token}`);
  let formData = new FormData();

  formData.append('country_id', props.data.country_id);
  formData.append('state_id', props.data.state_id);
  formData.append('city_id', props.data.city_id);
  formData.append('postal_code', props.data.postal_code);
  formData.append('city_name', props.data.city_name);
  formData.append('address', props.data.address);
  formData.append('address_type', props.data.address_type);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow',
  };
  console.log('requestOptions', requestOptions);
  return fetch(updateAddress, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return {success: false, message: 'Error connecting to server'};
    });
}

export default UpdateAddress;
