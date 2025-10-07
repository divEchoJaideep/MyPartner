import commonrequest from "./commonrequest";
import { basicinfo, chatApi, getBasicInfo, getFriendStory, getFullProfile, getKnownLanguages, getNotification, getUserDetails, idProff, passwordChange, passwordForgot, passwordReset, personalImageDelete, profiledropdownUrl,requestInterestCancel,saveFCMToken,Share,subCaste, SubscriptionPackage, updateAddress, updateCareer, updateEducation, updateImages, updateLanguage, updatePhysicalAttributes, updateSpiritual, userBlock, userBlockedList, userCancelRequest, userRequest, userRequestAccepted, userUnBlock } from "./const";


export const getUserBasicInformation = async (token) => {
  return await commonrequest('GET', getBasicInfo, '', token);
};

export const GetProfileDropdown = async (token) => {
  return await commonrequest('GET', profiledropdownUrl, '', token);
};

export const persnolImage = async (data, token) => {
  return await commonrequest("POST", updateImages, data, token);
};

export const updateUserAddress = async (data, token) => {
      return await commonrequest("POST", updateAddress, data, token);
};

export const updateBasicInfo = async (data, token) => {
      return await commonrequest("POST", basicinfo, data, token);
};

export const updateUserEducation = async (data, token) => {
      return await commonrequest("POST", updateEducation, data, token);
};

export const updateUserCureer = async (data, token) => {
      return await commonrequest("POST", updateCareer, data, token);
};

export const updateUserPhysical = async (data, token) => {
      return await commonrequest("POST", updatePhysicalAttributes, data, token);
};

export const updateUserSocial = async (data, token) => {
      return await commonrequest("POST", updateSpiritual, data, token);
};

export const getUserSubCast = async (token) => {
      return await commonrequest("GET", subCaste, '', token);
};

export const updateUserProff = async (data, token) => {
      return await commonrequest("POST", idProff, data, token);
};

export const getUserAllDetails = async (token) => {
      return await commonrequest("GET", getUserDetails, '', token);
};

export const getUserKnownLanguage = async (token) => {
      return await commonrequest("GET", getKnownLanguages, '', token);
};

// export const getUserBasicInfo = async (token) => {
//       return await commonrequest("GET", getBasicInfo, '', token);
// };

export const expressinterest = async (data, token) => {
      return await commonrequest("POST", userRequest, data, token);
};

export const  cancelRequest= async (data, token) => {
      return await commonrequest("POST", userCancelRequest, data, token);
};

export const  userBlockRequest= async (data, token) => {
      return await commonrequest("POST", userBlock, data, token);
};

export const getUsFriendStory = async (token) => {
      return await commonrequest("GET", getFriendStory, '', token);
};

export const  upadateUserLanguage= async (data, token) => {
      return await commonrequest("POST", updateLanguage, data, token);
};

export const blockedUsers = async (token) => {
      return await commonrequest("GET", userBlockedList, '', token);
};

export const  blockedUsersUnblock = async (data, token) => {
      return await commonrequest("POST", userUnBlock, data, token);
};

export const  interestReject = async (data, token) => {
      return await commonrequest("POST", userCancelRequest, data, token);
};

export const  interestCancel = async (data, token) => {
      return await commonrequest("POST", requestInterestCancel, data, token);
};

export const Subscription = async (token) => {
  return await commonrequest('GET', SubscriptionPackage, '', token);
};

export const  resetPassword = async (data) => {
      return await commonrequest("POST", passwordReset, data, '');
};

export const  forgotPassword = async (data) => {
      return await commonrequest("POST", passwordForgot, data ,'');
};

export const  changePassword = async (data, token) => {
      return await commonrequest("POST", passwordChange, data, token);
};

export const imageDelete = async (id, token) => {
  return await commonrequest("DELETE", `${personalImageDelete}/${id}`, '', token);
};

export const GetPersonalImages = async (token) => {
  return await commonrequest('GET', updateImages, '', token);
};

export const fullDetailProfile = async (id, token) => {
  return await commonrequest("GET", `${getFullProfile}/${id}`, '', token);
};

export const fCMTokenSave = async (data, header) => {
    return await commonrequest('POST', `${saveFCMToken}`, data, header);
};

export const GetMemberNotification = async (token) => {
  return await commonrequest('GET', getNotification, '', token);
};

export const chatNotification = async (data, header) => {
    return await commonrequest('POST', `${chatApi}`, data, header);
};

export const getShare = async ( header) => {
    return await commonrequest('GET', `${Share}`, '', header);
};

export const postShar = async (header) => {
    return await commonrequest('POST', `${Share}`, '', header);
};