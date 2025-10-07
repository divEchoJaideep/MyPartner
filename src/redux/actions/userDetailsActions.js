import Toast from 'react-native-toast-message';
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
  updateCareer,
  updateLanguage,
  idProff
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
  setUserLanguage,
  setVerification,
  updateVerification,
} from "../reducers/userDetailsReducer";

import {
  setReligionCaste,
  setCaste,
  setSubCaste,
  setCityList,
} from "../reducers/perDefineListReducer";
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const getUserInfo = (token) => async (dispatch) => {
  try {
    dispatch(start());
    const response = await commonrequest("GET", getUserDetails, "", token);
    console.log("response getUserDetails :", response);

    if (!response.success) throw new Error(response.message);

    const userData = {
      basic_details: response?.data.basic_details,
      address: response?.data.address,
      education: response?.data.education,
      career: response?.data.career,
      physical_attribute: response?.data?.physical_atribute,
      gallery: response?.data?.gallery || [], // add gallery here
      // language: response?.data.language,
      religion: response?.data.religion,
      verification: response?.data.verification,
    };
console.log('userData useDeatialsAction :',userData);

    dispatch(basicInfo(userData.basic_details));
    dispatch(address(userData.address));
    dispatch(education(userData.education));
    dispatch(careerInfo(userData.career));
    dispatch(physicalAttribute(userData.physical_attribute));
    dispatch(religionAndCultural(userData.religion));
    //  dispatch(setGalleryImages(userData.gallery));
    dispatch(setVerification(userData.verification || {
      document_type: null,
      front_photo: null,
      back_photo: null,
    }));


    await AsyncStorage.setItem("UserInfo", JSON.stringify(userData));

  } catch (error) {
    console.log("Error: ", error);
    dispatch(failure(error.message));
  }
};


export const updateUserBasicInfo = (data, token) => async (dispatch) => {
  console.log('data :',data);
  
  try {
    dispatch(start());
    const response = await commonrequest("POST", basicinfo, data, token);
console.log('response profile :',response);

    if (!response.success) throw new Error(response.message);

    dispatch(basicInfo(data));

    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: response.message || 'Profile updated successfully!',
      // position: 'bottom',
      // visibilityTime: 2000,
    });

    return response;

  } catch (error) {
    dispatch(failure(error.message));

    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error.message || 'Something went wrong!',
      // position: 'bottom',
      // visibilityTime: 2000,
    });

    throw error;
  }
};

export const updateUserGalleryImage = (data, token) => async (dispatch) => {
  try {
    dispatch(start());
    const response = await commonrequest("POST", updateImages, data, token,);
    if (!response.success) throw new Error(response.message);
    console.log("response: image ", response);
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
    if (key == "front_photo") {
      dispatch(verificationIds({ "front_photo": response }));
    }
    if (key == "back_photo") {
      dispatch(verificationIds({ "back_photo": response }));
    }
  } catch (error) {
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
    console.log('response redux: ', response);

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
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: response.message || 'Profile updated successfully!',
    });
    return response;
  } catch (error) {
    dispatch(failure(error.message));
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error.message || 'Something went wrong!',
    });

    throw error;
  }
};

export const savePhysicalAttribute = (data, token) => async (dispatch) => {
  try {
    dispatch(start());
    const response = await commonrequest("POST", updatePhysicalAttributes, data, token);
    if (!response.success) throw new Error(response.message);
    dispatch(physicalAttribute(data));
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: response.message || 'Profile updated successfully!',
    });

    return response;

  } catch (error) {
    dispatch(failure(error.message));

    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error.message || 'Something went wrong!',
    });

    throw error;
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
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: response.message || 'Address updated successfully!',
      // position: 'bottom',
      // visibilityTime: 2000,
    });

    return response;
  } catch (error) {
    dispatch(failure(error.message));
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error.message || 'Something went wrong!',
      // position: 'bottom',
      // visibilityTime: 2000,
    });

    throw error;
  }
};

export const saveUserEducation = (data, token) => async (dispatch) => {
  try {
    dispatch(start());
    const response = await commonrequest("POST", updateEducation, data, token);
    if (!response.success) throw new Error(response.message);
    dispatch(education(data));
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: response.message || 'Education updated successfully!',
    });

    return response;
  } catch (error) {
    dispatch(failure(error.message));

    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error.message || 'Something went wrong!',
    });

    throw error;
  }
}

export const saveUserCareerInfo = (data, token) => async (dispatch) => {
  try {
    dispatch(start());
    const response = await commonrequest("POST", updateCareer, data, token);
    console.log("response: ", response);
    if (!response.success) throw new Error(response.message);

    dispatch(careerInfo(data));
    Toast.show({
      type: "success",
      text1: "Success",
      text2: response.message || "Career info updated successfully!",
    });

    return response;
  } catch (error) {
    dispatch(failure(error.message));
    Toast.show({
      type: "error",
      text1: "Error",
      text2: error.message || "Something went wrong!",
    });

    throw error;
  }
};

export const saveUserVerificationInfo = (data, token) => async (dispatch) => {
  try {
    dispatch(start());
    const response = await commonrequest("POST", idProff, data, token);
    console.log("response: ", response)
    if (!response.success) throw new Error(response.message);
    dispatch(updateVerification(data));
    Toast.show({
      type: "success",
      text1: "Success",
      text2: response.message || "Career info updated successfully!",
    });
    return response;
  } catch (error) {
    dispatch(failure(error.message));
    Toast.show({
      type: "error",
      text1: "Error",
      text2: error.message || "Something went wrong!",
    });
    throw error;
  }
};

export const saveUserLanguage = (data, token) => async (dispatch) => {
  try {
    dispatch(start());
    const response = await commonrequest("POST", updateLanguage, data, token);
    if (!response.success) throw new Error(response.message);
    dispatch(setUserLanguage(data));
    Toast.show({
      type: "success",
      text1: "Success",
      text2: response.message || "Career info updated successfully!",
    });

    return response;
  } catch (error) {
    dispatch(failure(error.message));
    Toast.show({
      type: "error",
      text1: "Error",
      text2: error.message || "Something went wrong!",
    });

    throw error;
  }
};