import { updateImages } from './const';

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

  const response = await fetch(updateImages, requestOptions);
  const resultText = await response.text(); // raw string
  let result;
  try {
    result = JSON.parse(resultText); // convert string to object
  } catch (err) {
    result = { success: false, message: 'Upload failed' };
  }
  console.log('Upload result:', result);
  return result; // {success: true, message: "...", data: "image url"}

}

export default ImagesUpload;
