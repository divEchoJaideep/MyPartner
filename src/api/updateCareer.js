import {updateCareer} from './const';

async function UpdateCareer(props) {
  console.log('props address : ');
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${props.token}`);
  let formData = new FormData();

  formData.append('job_type', props.data.job_type);
  formData.append('occupied_company', props.data.occupied_company);
  formData.append('work_field', props.data.work_field);
  formData.append('work_area', props.data.work_area);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow',
  };
  console.log('requestOptions', requestOptions);
  return fetch(updateCareer, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return {success: false, message: 'Error connecting to server'};
    });
}

export default UpdateCareer;
