import { userRequest } from './const';

async function PostUserRequest(props) {
  try {
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

    const response = await fetch(userRequest, requestOptions);
    const result = await response.json();

    console.log('result:', result); // ✅ अब सही जगह log होगा
    return result;

  } catch (error) {
    console.log("Fetch Error:", error.message);
    return { success: false, message: 'Error connecting to server' };
  }
}

export default PostUserRequest;
