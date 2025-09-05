import * as Actions from '../../actions/types';
const UpdateLifestyle = (
  state = {
    diet: undefined,
    drink: undefined,
    smoke: undefined,
  },
  action,
) => {
  switch (action.type) {
    case Actions.SELECTED_DIET:
      return Object.assign({}, state, {
        diet: action.payload,
      });
    case Actions.SELECTED_DRINK:
      return Object.assign({}, state, {
        drink: action.payload,
      });
    case Actions.SELECTED_SMOKE:
      return Object.assign({}, state, {
        smoke: action.payload,
      });
    default:
      return state;
  }
};

export default UpdateLifestyle;
