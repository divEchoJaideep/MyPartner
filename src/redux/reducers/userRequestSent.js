import * as Actions from '../../actions/types';
const UserRequestSent = (
  state = {
    user_request_sent: undefined,
  },
  action,
) => {
  switch (action.type) {
    case Actions.USER_REQUEST_SENT:
      return Object.assign({}, state, {
        user_request_sent: action.payload,
      });

    default:
      return state;
  }
};

export default UserRequestSent;
