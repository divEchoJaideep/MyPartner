const accessToken =
  'Bearer HTbpO8qgoKCUv5H3fPqB38avoHW0CVVqsVaoVf8l0bRmIS1qOaeytudLWnf7ckl7j4fpomF9CreTo1WbL2B6EZyfCf9DUo7ToiFpJdUdHRQM36qv72j0RFwFp06MDOLB';
//const apiBaseUrl = 'http://192.168.1.6:8000/api';
const apiBaseUrl = 'https://clients.divecho.com/matrimony/api';
const loginUrl = `${apiBaseUrl}/signin`;
const signupUrl = `${apiBaseUrl}/signup`;
const passwordChange = `${apiBaseUrl}/member/change/password`;
const passwordForgot = `${apiBaseUrl}/forgot/password`;
const passwordReset = `${apiBaseUrl}/reset/password`;
const profiledropdownUrl = `${apiBaseUrl}/profile-dropdown`;
const getUserDetails = `${apiBaseUrl}/member/details`;
const publicProfile = `${apiBaseUrl}/member/public-profile`;
const basicinfo = `${apiBaseUrl}/member/basic-info/update`;
const saveFCMToken = `${apiBaseUrl}/fcm-token-update`;
const chatApi = `${apiBaseUrl}/member/chat/notify`;
const Share = `${apiBaseUrl}/member/share-requests`;
// country Id: 101, Name :India
const district = `${apiBaseUrl}/member/cities`;
const religionCaste = `${apiBaseUrl}/member/casts`;
const caste = `${apiBaseUrl}/member/sub-casts`;
const subCaste = `${apiBaseUrl}/member/child-casts`;
const idProff= `${apiBaseUrl}/member/documents/update`;
const updateAddress = `${apiBaseUrl}/member/address/update`;
const updateEducation = `${apiBaseUrl}/member/education/update`;
const updateCareer = `${apiBaseUrl}/member/career/update`;
const updatePhysicalAttributes = `${apiBaseUrl}/member/physical-attributes/update`;
const updateLanguage = `${apiBaseUrl}/member/language/update`;
const updateHobbies = `${apiBaseUrl}/member/hobbies/update`;
const updateSpiritual = `${apiBaseUrl}/member/spiritual-background/update`;
const updateLifestyle = `${apiBaseUrl}/member/life-style/update`;
const updateAstronomic = `${apiBaseUrl}/member/astronomic/update`;
const updateFamily = `${apiBaseUrl}/member/family-info/update`;
const updatePartner = `${apiBaseUrl}/member/partner-expectation/update`;
const updateImages = `${apiBaseUrl}/member/gallery-image`;
const userDashboard = `${apiBaseUrl}/member/dashboard`;
const userRequest = `${apiBaseUrl}/member/express-interest`;
const userRequestSent = `${apiBaseUrl}/member/my-interests`;
const userReceivedRequest = `${apiBaseUrl}/member/interest-requests`;
const userRequestAccepted = `${apiBaseUrl}/member/interest-accept`;
const userCancelRequest = `${apiBaseUrl}/member/interest-reject`;
const userBlock = `${apiBaseUrl}/member/interest-block`;
const userBlockedList = `${apiBaseUrl}/member/ignored-user-list`;
const userUnBlock = `${apiBaseUrl}/member/remove-from-ignored-list`;
const addFavUser = `${apiBaseUrl}/member/add-to-shortlist`;
const removeLike = `${apiBaseUrl}/member/remove-from-shortlist`;
const postStatusUpload = `${apiBaseUrl}/member/status`;
const requestInterestCancel = `${apiBaseUrl}/member/interest-cancel`;
const SubscriptionPackage = `${apiBaseUrl}/packages`;

//DELETE

const deleteMyStatus = `${apiBaseUrl}/member/status`;
const personalImageDelete = `${apiBaseUrl}/member/gallery-image`;

//get'
const getNotification = `${apiBaseUrl}/member/notifications `;
const getFullProfile = `${apiBaseUrl}/member/public-profile`;
const getFriendStory = `${apiBaseUrl}/member/mutual-friends-status`;
const getKnownLanguages = `${apiBaseUrl}/member/known_languages`;
const getMyStatus = `${apiBaseUrl}/member/status`;
const myLike = `${apiBaseUrl}/member/my-shortlists`;
const getBasicInfo = `${apiBaseUrl}/member/basic-info`;
const getPresentAddress = `${apiBaseUrl}/member/present/address`;
const getEducation = `${apiBaseUrl}/member/education`;
const getCareer = `${apiBaseUrl}/member/career`;
const getPhysicalAttribute = `${apiBaseUrl}/member/physical-attributes`;
const getLanguage = `${apiBaseUrl}/member/language`;
const getInterests = `${apiBaseUrl}/member/hobbies-interests`;
const getSpiritual = `${apiBaseUrl}/member/spiritual-background`;
const getLifestyle = `${apiBaseUrl}/member/life-style`;
const getAstronomic = `${apiBaseUrl}/member/astronomic`;
const getFamilyInfo = `${apiBaseUrl}/member/family-info`;
const getPermanentAddress = `${apiBaseUrl}/member/permanent/address`;
const getPartnerExpectation = `${apiBaseUrl}/member/partner-expectation`;

export {
  Share,
  chatApi,
  getNotification,
  getFullProfile,
  personalImageDelete,
  passwordChange,
  passwordForgot,
  passwordReset,
  SubscriptionPackage,
  getFriendStory,
  publicProfile,
  getUserDetails,
  removeLike,
  myLike,
  addFavUser,
  accessToken,
  loginUrl,
  signupUrl,
  profiledropdownUrl,
  basicinfo,
  district,
  religionCaste,
  caste,
  subCaste,
  updateAddress,
  updateEducation,
  updateCareer,
  updatePhysicalAttributes,
  updateLanguage,
  updateHobbies,
  updateSpiritual,
  updateLifestyle,
  updateAstronomic,
  updateFamily,
  updatePartner,
  updateImages,
  userDashboard,
  userRequest,
  userRequestSent,
  userReceivedRequest,
  userRequestAccepted,
  userCancelRequest,
  userBlock,
  userBlockedList,
  userUnBlock,
  postStatusUpload,
  idProff,
  requestInterestCancel,
  saveFCMToken,
  //delete 
deleteMyStatus,

  //get
  getKnownLanguages,
  getMyStatus,
  getBasicInfo,
  getPresentAddress,
  getEducation,
  getCareer,
  getPhysicalAttribute,
  getLanguage,
  getInterests,
  getSpiritual,
  getLifestyle,
  getAstronomic,
  getFamilyInfo,
  getPermanentAddress,
  getPartnerExpectation,
};