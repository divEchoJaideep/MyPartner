import {updateSpiritual} from './const';

async function UpdateSpiritual(props) {
  console.log('props address : ');
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${props.token}`);
  let formData = new FormData();

  formData.append('member_religion_id', props.data.member_religion_id);
  formData.append(
    'member_religion_caste_id',
    props.data.member_religion_caste_id,
  );
  formData.append('member_caste_id', props.data.member_caste_id);
  formData.append('member_sub_caste_id', props.data.member_sub_caste_id);
  formData.append('family_value_id', props.data.family_value_id);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow',
  };
  console.log('requestOptions', requestOptions);
  return fetch(updateSpiritual, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return {success: false, message: 'Error connecting to server'};
    });
}

export default UpdateSpiritual;
