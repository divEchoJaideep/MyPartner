import * as Actions from '../../actions/types';
const JobtypeList = (
  state = {
    jobtype_list: undefined,
  },
  action,
) => {
  switch (action.type) {
    case Actions.JOBTYPE_LIST:
      return Object.assign({}, state, {
        jobtype_list: action.payload,
      });

    default:
      return state;
  }
};

export default JobtypeList;
