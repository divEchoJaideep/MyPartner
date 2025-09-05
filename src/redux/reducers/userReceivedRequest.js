import * as Actions from '../../actions/types';
const UserReceivedRequest = (
  state = {
    user_received_request: undefined,
  },
  action,
) => {
  switch (action.type) {
    case Actions.USER_RECEVIED_REQUEST:
      return Object.assign({}, state, {
        user_received_request: action.payload,
      });

    default:
      return state;
  }
};

export default UserReceivedRequest;
