import commonrequest from "../../api/commonrequest";
import {
  basicinfo,
  getUserDetails,
  updateImages,
  religionCaste,
  caste,
  subCaste,
  updateSpiritual,
  updatePhysicalAttributes,
  district,
  updateAddress,
  updateEducation,
  updateCareer
} from "../../api/const";
import {
  start,
  failure,
  basicInfo,
  religionAndCultural,
  physicalAttribute,
  address,
  education,
  careerInfo,
  frontPhoto,
  backPhoto,
  verificationIds,
} from "../reducers/userDetailsReducer";

import {
  setReligionCaste,
  setCaste,
  setSubCaste,
  setCityList,
} from "../reducers/perDefineListReducer";

export const updateUserBasicInfo = (data, token) => async (dispatch) => {
  try {
    dispatch(start());
    const response = await commonrequest("POST", basicinfo, data, token);
    console.log("response: ", response);
    if (!response.success) throw new Error(response.message);
    dispatch(basicInfo(data));
  } catch (error) {
    dispatch(failure(error.message));
  }
};

export const updateUserGalleryImage = (data, token) => async (dispatch) => {
  try {
    dispatch(start());
    const response = await commonrequest("POST", updateImages, data, token,);
    if (!response.success) throw new Error(response.message);
    console.log("response: ", response);
    //dispatch(basicInfo(userDetails));
  } catch (error) {
    dispatch(failure(error.message));
  }
};

export const updateUserIdentityImage = (key, data, token) => async (dispatch) => {
  try {
    dispatch(start());
    const response = await commonrequest("POST", updateImages, data, token,);
    console.log("response: ", response);
    if (!response.success) throw new Error(response.message);
    if(key == "front_photo"){
      dispatch(verificationIds({"front_photo": response}));
    }
    if(key == "back_photo"){
      dispatch(verificationIds({"back_photo": response}));
    }
  } catch (error) {
    dispatch(failure(error.message));
  }
};

export const getUserInfo = (token) => async (dispatch) => {
  try {
    const response = await commonrequest("GET", getUserDetails, "", token,);
    if (!response.success) throw new Error(response.message);
    dispatch(basicInfo(response?.data.basic_details));
  } catch (error) {
    console.log("Error: ", error);
    dispatch(failure(error.message));
  }
};

export const getReligionCasteByRelisionId = (id, token) => async (dispatch) => {
  try {
    const response = await commonrequest("GET", `${religionCaste}/${id}`, "", token,);
    if (!response.success) throw new Error(response.message);
    dispatch(setReligionCaste(response?.data));
  } catch (error) {
    console.log("Error: ", error);
    dispatch(failure(error.message));
  }
};

export const getCasteByRelisionCaste = (id, token) => async (dispatch) => {
  try {
    const response = await commonrequest("GET", `${caste}/${id}`, "", token,);
    if (!response.success) throw new Error(response.message);
    dispatch(setCaste(response?.data));
  } catch (error) {
    console.log("Error: ", error);
    dispatch(failure(error.message));
  }
};
export const getSubCasteByCaste = (id, token) => async (dispatch) => {
  try {
    const response = await commonrequest("GET", `${subCaste}/${id}`, "", token);
    if (!response.success) throw new Error(response.message);
    dispatch(setSubCaste(response?.data));
  } catch (error) {
    console.log("Error: ", error);
    dispatch(failure(error.message));
  }
};

export const updateReligionAndCulture = (data, token) => async (dispatch) => {
  try {
    const response = await commonrequest("POST", updateSpiritual, data, token);
    if (!response.success) throw new Error(response.message);
    dispatch(religionAndCultural(data));
  } catch (error) {
    console.log("Error: ", error);
    dispatch(failure(error.message));
  }
};

export const savePhysicalAttribute = (data, token) => async (dispatch) => {
  try {
    dispatch(start());
    const response = await commonrequest("POST", updatePhysicalAttributes, data, token);
    if (!response.success) throw new Error(response.message);
    dispatch(physicalAttribute(data));
  } catch (error) {
    console.log("Error: ", error);
    dispatch(failure(error.message));
  }
};

export const getCityListByStateId = (id, token) => async (dispatch) => {
  try {
    const response = await commonrequest("GET", `${district}/${id}`, "", token,);
    console.log("getCityListByStateId: ", response)
    // if (!response.success) throw new Error(response.message);
    dispatch(setCityList(response?.data));
  } catch (error) {
    console.log("Error: ", error);
    dispatch(failure(error.message));
  }
};

export const saveUserAddress = (data, token) => async (dispatch) => {
  try {
    dispatch(start());
    const response = await commonrequest("POST", updateAddress, data, token);
    if (!response.success) throw new Error(response.message);
    dispatch(address(data));
  } catch (error) {
    dispatch(failure(error.message));
  }
};

export const saveUserEducation = (data, token) => async (dispatch) => {
  try {
    dispatch(start());
    const response = await commonrequest("POST", updateEducation, data, token);
    if (!response.success) throw new Error(response.message);
    dispatch(education(data));
  } catch (error) {
    dispatch(failure(error.message));
  }
};

export const saveUserCareerInfo = (data, token) => async (dispatch) => {
  try {
    dispatch(start());
    const response = await commonrequest("POST", updateCareer, data, token);
    console.log("response: ", response)
    if (!response.success) throw new Error(response.message);
    dispatch(careerInfo(data));
  } catch (error) {
    dispatch(failure(error.message));
  }
};

export const saveUserVerificationInfo = (data, token) => async (dispatch) => {
  try {
    dispatch(start());
    const response = await commonrequest("POST", updateCareer, data, token);
    console.log("response: ", response)
    if (!response.success) throw new Error(response.message);
    dispatch(careerInfo(data));
  } catch (error) {
    dispatch(failure(error.message));
  }
};