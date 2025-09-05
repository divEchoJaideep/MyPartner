import * as Actions from '../../actions/types';
const ProfileDataReducer = (
  state = {
    first_name: undefined,
    last_name: undefined,
    date_of_birth: undefined,
    gender: undefined,
    children: undefined,
    salary: undefined,
    on_behalf: undefined,
    marital_status: undefined,
  },
  action,
) => {
  switch (action.type) {
    case Actions.FIRST_NAME:
      return Object.assign({}, state, {
        first_name: action.payload,
      });
    case Actions.LAST_NAME:
      return Object.assign({}, state, {
        last_name: action.payload,
      });
    case Actions.DATE_OF_BIRTH:
      return Object.assign({}, state, {
        date_of_birth: action.payload,
      });
    case Actions.GENDER_SELECT:
      return Object.assign({}, state, {
        gender: action.payload,
      });
    case Actions.SALARY_UPDATE:
      return Object.assign({}, state, {
        salary: action.payload,
      });
    case Actions.ONBEHALF_UPDATE:
      return Object.assign({}, state, {
        on_behalf: action.payload,
      });
    case Actions.MARITIAL_UPDATE:
      return Object.assign({}, state, {
        marital_status: action.payload,
      });
    case Actions.CHILDREN_SELECT:
      return Object.assign({}, state, {
        children: action.payload,
      });

    default:
      return state;
  }
};

export default ProfileDataReducer;
