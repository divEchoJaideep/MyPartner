import * as Actions from '../../actions/types';
const OnbehalfList = (
  state = {
    onbehalf_list: undefined,
  },
  action,
) => {
  switch (action.type) {
    case Actions.ONBEHALF_LIST:
      return Object.assign({}, state, {
        onbehalf_list: action.payload,
      });

    default:
      return state;
  }
};

export default OnbehalfList;
