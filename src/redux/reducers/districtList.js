import * as Actions from '../../actions/types';
const DistrictList = (
  state = {
    district_list: undefined,
  },
  action,
) => {
  switch (action.type) {
    case Actions.DISTRICT_LIST:
      return Object.assign({}, state, {
        district_list: action.payload,
      });

    default:
      return state;
  }
};

export default DistrictList;
