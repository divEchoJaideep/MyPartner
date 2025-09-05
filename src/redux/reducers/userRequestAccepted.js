import * as Actions from '../../actions/types';
const UserRequestAccepted = (
  state = {
    user_request_accepted: undefined,
  },
  action,
) => {
  switch (action.type) {
    case Actions.USER_REQUEST_ACCEPTED:
      return Object.assign({}, state, {
        user_request_accepted: action.payload,
      });

    default:
      return state;
  }
};

export default UserRequestAccepted;
