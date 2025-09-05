import * as Actions from '../../actions/types';
const ColourList = (
  state = {
    colour_list: undefined,
  },
  action,
) => {
  switch (action.type) {
    case Actions.COLOUR_LIST:
      return Object.assign({}, state, {
        colour_list: action.payload,
      });

    default:
      return state;
  }
};

export default ColourList;
