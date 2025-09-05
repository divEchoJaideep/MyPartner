import {updatePartner} from './const';

async function UpdatePartner(props) {
  console.log('props address : ');
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${props.token}`);
  let formData = new FormData();

  formData.append('general', props.data.general);
  formData.append('partner_height', props.data.partner_height);
  formData.append('partner_marital_status', props.data.partner_marital_status);
  formData.append(
    'partner_children_acceptable',
    props.data.partner_children_acceptable,
  );
  formData.append('residence_country_id', props.data.residence_country_id);
  formData.append('residence_state_id', props.data.residence_state_id);
  formData.append('partner_religion_id', props.data.partner_religion_id);
  formData.append(
    'partner_religion_caste_id',
    props.data.partner_religion_caste_id,
  );
  formData.append('partner_caste_id', props.data.partner_caste_id);
  formData.append('partner_sub_caste_id', props.data.partner_sub_caste_id);
  formData.append('smoking_acceptable', props.data.smoking_acceptable);
  formData.append('drinking_acceptable', props.data.drinking_acceptable);
  formData.append('partner_diet', props.data.partner_diet);
  formData.append('partner_body_type', props.data.partner_body_type);
  formData.append('partner_manglik', props.data.partner_manglik);
  formData.append('job_type', props.data.job_type);
  formData.append('language_id', props.data.language_id);
  formData.append('family_value_id', props.data.family_value_id);
  formData.append('partner_complexion', props.data.partner_complexion);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow',
  };
  console.log('requestOptions', requestOptions);
  return fetch(updatePartner, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return {success: false, message: 'Error connecting to server'};
    });
}

export default UpdatePartner;
