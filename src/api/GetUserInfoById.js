import commonrequest from './commonrequest';
import {publicProfile} from './const';

async function GetUserInfoById(id, token) {
  try{
    const response = await commonrequest("GET", `${publicProfile}/${id}`, "", token);
    if (!response.success) throw new Error(response.message);
    return response;
  } catch(error){
    return { success: false, message: error.message}
  }
}

export default GetUserInfoById;