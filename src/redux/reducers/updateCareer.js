import * as Actions from '../../actions/types';
const UpdateCareer = (
  state = {
    job_type: undefined,
    occupied_company: undefined,
    work_field: undefined,
    work_area: undefined,
  },
  action,
) => {
  switch (action.type) {
    case Actions.JOB_TYPE:
      return Object.assign({}, state, {
        job_type: action.payload,
      });
    case Actions.OCCUPIED_COMPANY:
      return Object.assign({}, state, {
        occupied_company: action.payload,
      });
    case Actions.WORK_FIELD:
      return Object.assign({}, state, {
        work_field: action.payload,
      });
    case Actions.WORK_AREA:
      return Object.assign({}, state, {
        work_area: action.payload,
      });

    default:
      return state;
  }
};

export default UpdateCareer;
