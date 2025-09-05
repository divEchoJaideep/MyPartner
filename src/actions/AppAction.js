import * as types from './types';

export const countryList = data => ({
  type: types.COUNTRY_LIST,
  payload: data,
});

export const familyValue = data => ({
  type: types.FAMILY_VALUE,
  payload: data,
});

export const languageList = data => ({
  type: types.LANGUAGE_LIST,
  payload: data,
});

export const maritialStatus = data => ({
  type: types.MARITIAL_STATUS,
  payload: data,
});

export const onbehalfList = data => ({
  type: types.ONBEHALF_LIST,
  payload: data,
});

export const religionList = data => ({
  type: types.RELIGION_LIST,
  payload: data,
});
export const stateList = data => ({
  type: types.STATE_LIST,
  payload: data,
});
export const colourList = data => ({
  type: types.COLOUR_LIST,
  payload: data,
});
export const jobtypeList = data => ({
  type: types.JOBTYPE_LIST,
  payload: data,
});
export const districtList = data => ({
  type: types.DISTRICT_LIST,
  payload: data,
});
export const heightList = data => ({
  type: types.HEIGHT_LIST,
  payload: data,
});
export const salaryList = data => ({
  type: types.SALARY_LIST,
  payload: data,
});
export const hobbiesList = data => ({
  type: types.HOBBIES_LIST,
  payload: data,
});
export const userDashboard = data => ({
  type: types.USER_DASHBOARD,
  payload: data,
});
export const userRequest = data => ({
  type: types.USER_REQUEST,
  payload: data,
});
export const userRequestSent = data => ({
  type: types.USER_REQUEST_SENT,
  payload: data,
});
export const userReceivedRequest = data => ({
  type: types.USER_RECEVIED_REQUEST,
  payload: data,
});
export const userRequestAccepted = data => ({
  type: types.USER_REQUEST_ACCEPTED,
  payload: data,
});
export const userCancelRequest = data => ({
  type: types.USER_CANCEL_REQUEST,
  payload: data,
});
export const userBlock = data => ({
  type: types.USER_BLOCK,
  payload: data,
});
export const userBlockedList = data => ({
  type: types.USER_BLOCKED_LIST,
  payload: data,
});
export const userUnBlock = data => ({
  type: types.USER_UNBLOCK,
  payload: data,
});

//basicinfo update
export const firstName = data => ({
  type: types.FIRST_NAME,
  payload: data,
});
export const lastName = data => ({
  type: types.LAST_NAME,
  payload: data,
});
export const dateOfBirth = data => ({
  type: types.DATE_OF_BIRTH,
  payload: data,
});
export const genderSelect = data => ({
  type: types.GENDER_SELECT,
  payload: data,
});
export const onbehalfUpdate = data => ({
  type: types.ONBEHALF_UPDATE,
  payload: data,
});
export const salaryUpdate = data => ({
  type: types.SALARY_UPDATE,
  payload: data,
});
export const maritialUpdate = data => ({
  type: types.MARITIAL_UPDATE,
  payload: data,
});
export const childrenSelect = data => ({
  type: types.CHILDREN_SELECT,
  payload: data,
});

//update address
export const selectedCountry = data => ({
  type: types.COUNTRY_ID,
  payload: data,
});
export const selectedCity = data => ({
  type: types.CITY_ID,
  payload: data,
});
export const selectedState = data => ({
  type: types.STATE_ID,
  payload: data,
});
export const cityName = data => ({
  type: types.CITY_NAME,
  payload: data,
});
export const addressName = data => ({
  type: types.ADDRESS,
  payload: data,
});
export const postalCode = data => ({
  type: types.POSTAL_CODE,
  payload: data,
});
export const addressType = data => ({
  type: types.ADDRESS_TYPE,
  payload: data,
});

//UPDATEEDUCATION

export const degreeName = data => ({
  type: types.DEGREE,
  payload: data,
});
export const institutionName = data => ({
  type: types.INSTITUTION,
  payload: data,
});

//UPDATE CAREER

export const selectedJobtype = data => ({
  type: types.JOB_TYPE,
  payload: data,
});
export const occupiedCompany = data => ({
  type: types.OCCUPIED_COMPANY,
  payload: data,
});
export const workField = data => ({
  type: types.WORK_FIELD,
  payload: data,
});
export const workArea = data => ({
  type: types.WORK_AREA,
  payload: data,
});

//update physica; attributes

export const selectedHeight = data => ({
  type: types.HEIGHT,
  payload: data,
});
export const weight = data => ({
  type: types.WEIGHT,
  payload: data,
});
export const complexionColour = data => ({
  type: types.COMPLEXION,
  payload: data,
});
export const bloodGroup = data => ({
  type: types.BLOOD_GROUP,
  payload: data,
});
export const bodyType = data => ({
  type: types.BODY_TYPE,
  payload: data,
});
export const disability = data => ({
  type: types.DISABILITY,
  payload: data,
});
// update language

export const selectedKnownLanguage = data => ({
  type: types.KNOWN_LANGUAGES,
  payload: data,
});
export const selectedMotherTongue = data => ({
  type: types.MOTHER_TONGUE,
  payload: data,
});
//update hobbies
export const selectedHobbies = data => ({
  type: types.SELECTED_HOBBIES,
  payload: data,
});

//update spiritual

export const selectedReligion = data => ({
  type: types.SELECTED_RELIGION,
  payload: data,
});
export const selectedReligionCaste = data => ({
  type: types.SELECTED_RELIGION_CASTE,
  payload: data,
});
export const selectedCaste = data => ({
  type: types.SELECTED_CASTE,
  payload: data,
});
export const selectedSubCaste = data => ({
  type: types.SELECTED_SUB_CASTE,
  payload: data,
});
export const selectedFamilyValue = data => ({
  type: types.SELECTED_FAMILY_VALUE,
  payload: data,
});

//UPDATE LIFESTYLE

export const selectedDiet = data => ({
  type: types.SELECTED_DIET,
  payload: data,
});
export const selectedDrink = data => ({
  type: types.SELECTED_DRINK,
  payload: data,
});
export const selectedSmoke = data => ({
  type: types.SELECTED_SMOKE,
  payload: data,
});

//update astronomic
export const selectedTimeOfBirth = data => ({
  type: types.SELECTED_TIME_OF_BIRTH,
  payload: data,
});
export const selectedCityOfBirth = data => ({
  type: types.SELECTED_CITY_OF_BIRTH,
  payload: data,
});
export const selectedManglik = data => ({
  type: types.SELECTED_MANGLIK,
  payload: data,
});

//UPDATE family info

export const fatherName = data => ({
  type: types.FATHER_NAME,
  payload: data,
});
export const motherName = data => ({
  type: types.MOTHER_NAME,
  payload: data,
});
export const selectedMBrother = data => ({
  type: types.SELECTED_M_BROTHER,
  payload: data,
});
export const selectedUmBrother = data => ({
  type: types.SELECTED_UM_BROTHER,
  payload: data,
});
export const selectedMSister = data => ({
  type: types.SELECTED_M_SISTER,
  payload: data,
});
export const selectedUmSister = data => ({
  type: types.SELECTED_UM_SISTER,
  payload: data,
});
export const selectedSibling = data => ({
  type: types.SELECTED_SIBLING,
  payload: data,
});

//update partner expectation

export const selectedGeneral = data => ({
  type: types.SELECTED_GENERAL,
  payload: data,
});
export const selectedPartnerHeight = data => ({
  type: types.SELECTED_PARTNER_HEIGHT,
  payload: data,
});
export const selectedPartnerMarital = data => ({
  type: types.SELECTED_PARTNER_MARITAL,
  payload: data,
});
export const selectedPartnerChildren = data => ({
  type: types.SELECTED_PARTNER_CHILDREN,
  payload: data,
});
export const selectedResidenceCountry = data => ({
  type: types.SELECTED_RESIDENCE_COUNTRY,
  payload: data,
});
export const selectedResidenceState = data => ({
  type: types.SELECTED_RESIDENCE_STATE,
  payload: data,
});
export const selectedPartnerReligion = data => ({
  type: types.SELECTED_PARTNER_RELIGION,
  payload: data,
});
export const selectedPartnerReligionCaste = data => ({
  type: types.SELECTED_PARTNER_RELIGION_CASTE,
  payload: data,
});
export const selectedPartnerCaste = data => ({
  type: types.SELECTED_PARTNER_CASTE,
  payload: data,
});
export const selectedPartnerSubCaste = data => ({
  type: types.SELECTED_PARTNER_SUBCASTE,
  payload: data,
});
export const selectedSmoking = data => ({
  type: types.SELECTED_SMOKING,
  payload: data,
});
export const selectedDrinking = data => ({
  type: types.SELECTED_DRINKING,
  payload: data,
});
export const selectedPartnerDiet = data => ({
  type: types.SELECTED_PARTNER_DIET,
  payload: data,
});
export const selectedPartnerBodyType = data => ({
  type: types.SELECTED_PARTNER_BODYTYPE,
  payload: data,
});
export const selectedPartnerManglik = data => ({
  type: types.SELECTED_PARTNER_MANGLIK,
  payload: data,
});
export const selectedPartnerJobtype = data => ({
  type: types.SELECTED_PARTNER_JOBTYPE,
  payload: data,
});
export const selectedPartnerLanguage = data => ({
  type: types.SELECTED_PARTNER_LANGUAGE,
  payload: data,
});
export const selectedPartnerFamilyValue = data => ({
  type: types.SELECTED_PARTNER_FAMILY_VALUE,
  payload: data,
});
export const selectedPartnerComplexion = data => ({
  type: types.SELECTED_PARTNER_COMPLEXION,
  payload: data,
});

//upload image
export const uploadImage = data => ({
  type: types.UPLOAD_IMAGES,
  payload: data,
});
