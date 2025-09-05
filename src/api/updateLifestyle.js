import {updateLifestyle} from './const';

async function UpdateLifestyle(props) {
  console.log('props address : ');
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${props.token}`);
  let formData = new FormData();

  formData.append('diet', props.data.diet);
  formData.append('drink', props.data.drink);
  formData.append('smoke', props.data.smoke);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow',
  };
  console.log('requestOptions', requestOptions);
  return fetch(updateLifestyle, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return {success: false, message: 'Error connecting to server'};
    });
}

export default UpdateLifestyle;
