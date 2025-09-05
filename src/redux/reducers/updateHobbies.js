import * as Actions from '../../actions/types';
const UpdateHobbies = (
  state = {
    selected_hobbies: undefined,
  },
  action,
) => {
  switch (action.type) {
    case Actions.SELECTED_HOBBIES:
      return Object.assign({}, state, {
        selected_hobbies: action.payload,
      });

    default:
      return state;
  }
};

export default UpdateHobbies;
