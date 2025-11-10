import {deleteMyStatus } from './const';

const DeleteMyStatus = async (id, token) => {
  const url = `${deleteMyStatus}/${id}`;

  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
  };

  return fetch(url, requestOptions)
    .then(async response => {
      const result = await response.json();
      return result;
    })
    .catch(error => {
      return { success: false, message: 'Error connecting to server' };
    });
};

export default DeleteMyStatus;
