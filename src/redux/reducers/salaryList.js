import * as Actions from '../../actions/types';
const SalaryList = (
  state = {
    salary_list: undefined,
  },
  action,
) => {
  switch (action.type) {
    case Actions.SALARY_LIST:
      return Object.assign({}, state, {
        salary_list: action.payload,
      });

    default:
      return state;
  }
};

export default SalaryList;
