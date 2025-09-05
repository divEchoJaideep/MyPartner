import * as Actions from '../../actions/types';
const MaritialStatus = (
  state = {
    maritial_status: undefined,
  },
  action,
) => {
  switch (action.type) {
    case Actions.MARITIAL_STATUS:
      return Object.assign({}, state, {
        maritial_status: action.payload,
      });

    default:
      return state;
  }
};

export default MaritialStatus;
