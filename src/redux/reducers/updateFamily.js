import * as Actions from '../../actions/types';
const UpdateFamily = (
  state = {
    father: undefined,
    mother: undefined,
    selected_m_brother: undefined,
    selected_um_brother: undefined,
    selected_m_sister: undefined,
    selected_um_sister: undefined,
    sibling: undefined,
  },
  action,
) => {
  switch (action.type) {
    case Actions.FATHER_NAME:
      return Object.assign({}, state, {
        father: action.payload,
      });
    case Actions.MOTHER_NAME:
      return Object.assign({}, state, {
        mother: action.payload,
      });
    case Actions.SELECTED_M_BROTHER:
      return Object.assign({}, state, {
        selected_m_brother: action.payload,
      });
    case Actions.SELECTED_UM_BROTHER:
      return Object.assign({}, state, {
        selected_um_brother: action.payload,
      });
    case Actions.SELECTED_M_SISTER:
      return Object.assign({}, state, {
        selected_m_sister: action.payload,
      });
    case Actions.SELECTED_UM_SISTER:
      return Object.assign({}, state, {
        selected_um_sister: action.payload,
      });
    case Actions.SELECTED_SIBLING:
      return Object.assign({}, state, {
        sibling: action.payload,
      });

    default:
      return state;
  }
};

export default UpdateFamily;
