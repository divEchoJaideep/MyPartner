import * as Actions from '../../actions/types';
const FamilyValueList = (
  state = {
    family_value_list: undefined,
  },
  action,
) => {
  switch (action.type) {
    case Actions.FAMILY_VALUE:
      return Object.assign({}, state, {
        family_value_list: action.payload,
      });

    default:
      return state;
  }
};

export default FamilyValueList;
