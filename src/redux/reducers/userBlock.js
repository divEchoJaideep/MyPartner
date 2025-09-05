import * as Actions from '../../actions/types';
const UserBlock = (
  state = {
    user_block: undefined,
  },
  action,
) => {
  switch (action.type) {
    case Actions.USER_BLOCK:
      return Object.assign({}, state, {
        user_block: action.payload,
      });

    default:
      return state;
  }
};

export default UserBlock;
