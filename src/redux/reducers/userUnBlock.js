import * as Actions from '../../actions/types';
const UserUnBlock = (
  state = {
    user_unblock: undefined,
  },
  action,
) => {
  switch (action.type) {
    case Actions.USER_UNBLOCK:
      return Object.assign({}, state, {
        user_unblock: action.payload,
      });

    default:
      return state;
  }
};

export default UserUnBlock;
