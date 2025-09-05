import {updateEducation} from './const';

async function UpdateEducation(props) {
  console.log('props address : ');
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${props.token}`);
  let formData = new FormData();

  formData.append('degree', props.data.degree);
  formData.append('institution', props.data.institution);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow',
  };
  console.log('requestOptions', requestOptions);
  return fetch(updateEducation, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return {success: false, message: 'Error connecting to server'};
    });
}

export default UpdateEducation;
