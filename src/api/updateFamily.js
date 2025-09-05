import {updateFamily} from './const';

async function UpdateFamily(props) {
  console.log('props address : ');
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${props.token}`);
  let formData = new FormData();

  formData.append('father', props.data.father);
  formData.append('mother', props.data.mother);
  formData.append('m_bro', props.data.selectedMBrother);
  formData.append('um_bro', props.data.selectedUmBrother);
  formData.append('m_sis', props.data.selectedMSister);
  formData.append('um_sis', props.data.selectedUmSister);
  formData.append('sibling', props.data.sibling);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow',
  };
  console.log('requestOptions', requestOptions);
  return fetch(updateFamily, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return {success: false, message: 'Error connecting to server'};
    });
}

export default UpdateFamily;
