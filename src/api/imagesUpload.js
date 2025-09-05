import {updateImages} from './const';

async function ImagesUpload(props) {
  console.log('props : ', props);
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${props.token}`);
  myHeaders.append('content-type', 'multipart/form-data');
  let formData = new FormData();
  formData.append('gallery_image', props.uploadImage);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow',
  };

  return fetch(updateImages, requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log('response 111 ', result);
      return result;
    })
    .catch(error => {
      return {success: false, message: 'Error connecting to server'};
    });
}

export default ImagesUpload;
