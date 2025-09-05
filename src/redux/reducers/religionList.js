import * as Actions from '../../actions/types';
const ReligionList = (
  state = {
    religion_list: undefined,
  },
  action,
) => {
  switch (action.type) {
    case Actions.RELIGION_LIST:
      return Object.assign({}, state, {
        religion_list: action.payload,
      });

    default:
      return state;
  }
};

export default ReligionList;
