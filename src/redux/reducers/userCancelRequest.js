import * as Actions from '../../actions/types';
const UserCancelRequest = (
  state = {
    user_cancel_request: undefined,
  },
  action,
) => {
  switch (action.type) {
    case Actions.USER_CANCEL_REQUEST:
      return Object.assign({}, state, {
        user_cancel_request: action.payload,
      });

    default:
      return state;
  }
};

export default UserCancelRequest;
