import * as Actions from '../../actions/types';
const UpdateSpiritual = (
  state = {
    member_religion_id: undefined,
    member_religion_caste_id: undefined,
    member_caste_id: undefined,
    member_sub_caste_id: undefined,
    family_value_id: undefined,
  },
  action,
) => {
  switch (action.type) {
    case Actions.SELECTED_RELIGION:
      return Object.assign({}, state, {
        member_religion_id: action.payload,
      });
    case Actions.SELECTED_RELIGION_CASTE:
      return Object.assign({}, state, {
        member_religion_caste_id: action.payload,
      });
    case Actions.SELECTED_CASTE:
      return Object.assign({}, state, {
        member_caste_id: action.payload,
      });
    case Actions.SELECTED_SUB_CASTE:
      return Object.assign({}, state, {
        member_sub_caste_id: action.payload,
      });
    case Actions.SELECTED_FAMILY_VALUE:
      return Object.assign({}, state, {
        family_value_id: action.payload,
      });

    default:
      return state;
  }
};

export default UpdateSpiritual;
