import * as Actions from '../../actions/types';
const UserDashboard = (
  state = {
    user_dashboard: undefined,
  },
  action,
) => {
  switch (action.type) {
    case Actions.USER_DASHBOARD:
      return Object.assign({}, state, {
        user_dashboard: action.payload,
      });

    default:
      return state;
  }
};

export default UserDashboard;
