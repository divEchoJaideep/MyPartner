import * as Actions from '../../actions/types';
const UpdateEducation = (
  state = {
    degree: undefined,
    institution: undefined,
  },
  action,
) => {
  switch (action.type) {
    case Actions.DEGREE:
      return Object.assign({}, state, {
        degree: action.payload,
      });
    case Actions.INSTITUTION:
      return Object.assign({}, state, {
        institution: action.payload,
      });

    default:
      return state;
  }
};

export default UpdateEducation;
