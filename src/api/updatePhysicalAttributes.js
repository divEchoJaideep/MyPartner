import {updatePhysicalAttributes} from './const';

async function UpdatePhysicalAttributes(props) {
  // console.log('props address : ');
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${props.token}`);
  let formData = new FormData();

  formData.append('height', props.data.height);
  formData.append('weight', props.data.weight);
  formData.append('complexion', props.data.complexion);
  formData.append('blood_group', props.data.blood_group);
  formData.append('body_type', props.data.body_type);
  formData.append('disability', props.data.disability);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow',
  };
  console.log('requestOptions', requestOptions);
  return fetch(updatePhysicalAttributes, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return {success: false, message: 'Error connecting to server'};
    });
}

export default UpdatePhysicalAttributes;
