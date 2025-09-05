import {signupUrl, accessToken} from './const';

async function SignUp(props) {
  let formData = new FormData();
  formData.append('phone', props.phone);
  formData.append('password', props.password);
  return await fetch(signupUrl, {
    method: 'POST',
    body: formData,
    redirect: 'follow',
  })
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return [{success: false, message: error.message}];
    });
}

export default SignUp;
