import {userRequestAccepted} from './const';

async function PostUserRequestAccepted(props) {
  console.log('props  : ', props);
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${props.token}`);
  let formData = new FormData();
  formData.append('interest_id', props.userId);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow',
  };
  console.log('requestOptions', requestOptions);
  return fetch(userRequestAccepted, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return {success: false, message: 'Error connecting to server'};
    });
}

export default PostUserRequestAccepted;
