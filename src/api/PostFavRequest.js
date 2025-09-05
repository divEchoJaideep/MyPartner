import {addFavUser} from './const';

async function PostFavRequest(props) {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${props.token}`);
  let formData = new FormData();
  formData.append('user_id', props.userId);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow',
  };
  return fetch(addFavUser, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return {success: false, message: 'Error connecting to server'};
    });
}

export default PostFavRequest;