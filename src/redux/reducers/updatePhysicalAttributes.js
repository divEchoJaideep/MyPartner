import * as Actions from '../../actions/types';
const UpdatePhysicalAttributes = (
  state = {
    height: undefined,
    weight: undefined,
    complexion: undefined,
    blood_group: undefined,
    body_type: undefined,
    disability: undefined,
  },
  action,
) => {
  switch (action.type) {
    case Actions.HEIGHT:
      return Object.assign({}, state, {
        height: action.payload,
      });
    case Actions.WEIGHT:
      return Object.assign({}, state, {
        weight: action.payload,
      });
    case Actions.COMPLEXION:
      return Object.assign({}, state, {
        complexion: action.payload,
      });
    case Actions.BLOOD_GROUP:
      return Object.assign({}, state, {
        blood_group: action.payload,
      });
    case Actions.BODY_TYPE:
      return Object.assign({}, state, {
        body_type: action.payload,
      });
    case Actions.DISABILITY:
      return Object.assign({}, state, {
        disability: action.payload,
      });

    default:
      return state;
  }
};

export default UpdatePhysicalAttributes;
