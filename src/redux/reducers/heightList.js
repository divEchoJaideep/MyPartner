import * as Actions from '../../actions/types';
const HeightList = (
  state = {
    height_list: undefined,
  },
  action,
) => {
  switch (action.type) {
    case Actions.HEIGHT_LIST:
      return Object.assign({}, state, {
        height_list: action.payload,
      });

    default:
      return state;
  }
};

export default HeightList;
