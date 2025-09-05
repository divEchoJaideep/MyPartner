import {postStatusUpload} from './const'; 

async function PostStatusUpload(props) {
  const { token, mediaList } = props;

  let myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);

  let formData = new FormData();

  mediaList.forEach((item, index) => {
    formData.append('gallery_images[]', {
      uri: item.uri,
      name: item.name || `media_${index}`,
      type: item.type,
    });
  });

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow',
  };

  return fetch(postStatusUpload, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => { 
      return { success: false, message: 'Error connecting to server' };
    });
}

export default PostStatusUpload;
