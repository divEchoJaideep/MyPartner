import {combineReducers} from 'redux';
import authReducer from './authReducer';
import CountryList from './countryList';
import FamilyValueList from './familyValueList';
import LanguageList from './languageList';
import MaritialStatus from './maritialStatus';
import OnbehalfList from './onbehalfList';
import ReligionList from './religionList';
import ProfileDataReducer from './profileDataReducer';
import StateList from './stateList';
import ColourList from './colourList';
import JobtypeList from './jobtypeList';
import DistrictList from './districtList';
import HeightList from './heightList';
import SalaryList from './salaryList';
import HobbiesList from './hobbiesList';
import UpdateAddress from './updateAddress';
import UpdateEducation from './updateEducation';
import UpdateCareer from './updateCareer';
import UpdatePhysicalAttributes from './updatePhysicalAttributes';
import UpdateLanguage from './updateLanguage';
import UpdateHobbies from './updateHobbies';
import UpdateSpiritual from './updateSpiritual';
import UpdateLifestyle from './updateLifestyle';
import UpdateAstronomic from './updateAstronomic';
import UpdateFamily from './updateFamily';
import UpdatePartner from './updatePartner';
import UploadImages from './uploadImages';
import UserDashboard from './userDashboard';
import UserRequest from './userRequestReducer';
import UserRequestSent from './userRequestSent';
import UserReceivedRequest from './userReceivedRequest';
import UserRequestAccepted from './userRequestAccepted';
import UserCancelRequest from './userCancelRequest';
import UserBlock from './userBlock';
import UserBlockedList from './userBlockedList';
import UserUnBlock from './userUnBlock';

//new
import userDetailsReducer from './userDetailsReducer'

const allReducer = combineReducers({
  auth: authReducer,
  userDetails: userDetailsReducer,
  country: CountryList,
  family: FamilyValueList,
  language: LanguageList,
  maritial: MaritialStatus,
  onbehalf: OnbehalfList,
  religion: ReligionList,
  profileData: ProfileDataReducer,
  state: StateList,
  colour: ColourList,
  jobtype: JobtypeList,
  district: DistrictList,
  height: HeightList,
  salary: SalaryList,
  hobbies: HobbiesList,
  address: UpdateAddress,
  education: UpdateEducation,
  career: UpdateCareer,
  physical: UpdatePhysicalAttributes,
  updateLanguage: UpdateLanguage,
  updateHobbies: UpdateHobbies,
  spiritual: UpdateSpiritual,
  lifestyle: UpdateLifestyle,
  astronomic: UpdateAstronomic,
  familyInfo: UpdateFamily,
  updatePartner: UpdatePartner,
  images: UploadImages,
  userDashboard: UserDashboard,
  userRequest: UserRequest,
  userRequestSent: UserRequestSent,
  userReceivedRequest: UserReceivedRequest,
  userRequestAccepted: UserRequestAccepted,
  userCancelRequest: UserCancelRequest,
  userBlock: UserBlock,
  userBlockedList: UserBlockedList,
  userUnBlock: UserUnBlock,
  // Add more reducers if needed
});

export default allReducer;