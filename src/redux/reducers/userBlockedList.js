import * as Actions from '../../actions/types';
const UserBlockedList = (
  state = {
    user_blocked_list: undefined,
  },
  action,
) => {
  switch (action.type) {
    case Actions.USER_BLOCKED_LIST:
      return Object.assign({}, state, {
        user_blocked_list: action.payload,
      });

    default:
      return state;
  }
};

export default UserBlockedList;
