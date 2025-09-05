import { getFriendStory } from './const';

async function GetFriendStory(props) {
  console.log('get friend story props:', props);

  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${props.token}`);
  myHeaders.append('Accept', 'application/json');

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  return fetch(getFriendStory, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      console.error('GetFriendStory error:', error);
      return { success: false, message: 'Error connecting to server' };
    });
}

export default GetFriendStory;
