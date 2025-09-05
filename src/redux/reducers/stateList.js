import * as Actions from '../../actions/types';
const StateList = (
  state = {
    state_list: undefined,
  },
  action,
) => {
  switch (action.type) {
    case Actions.STATE_LIST:
      return Object.assign({}, state, {
        state_list: action.payload,
      });

    default:
      return state;
  }
};

export default StateList;
