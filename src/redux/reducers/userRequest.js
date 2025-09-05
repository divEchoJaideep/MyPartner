import * as Actions from '../../actions/types';
const UserRequest = (
  state = {
    user_request: undefined,
  },
  action,
) => {
  switch (action.type) {
    case Actions.USER_REQUEST:
      return Object.assign({}, state, {
        user_request: action.payload,
      });

    default:
      return state;
  }
};

export default UserRequest;
