import * as Actions from '../../actions/types';
const UpdateAstronomic = (
  state = {
    time_of_birth: undefined,
    city_of_birth: undefined,
    manglik: undefined,
  },
  action,
) => {
  switch (action.type) {
    case Actions.SELECTED_TIME_OF_BIRTH:
      return Object.assign({}, state, {
        time_of_birth: action.payload,
      });
    case Actions.SELECTED_CITY_OF_BIRTH:
      return Object.assign({}, state, {
        city_of_birth: action.payload,
      });
    case Actions.SELECTED_MANGLIK:
      return Object.assign({}, state, {
        manglik: action.payload,
      });

    default:
      return state;
  }
};

export default UpdateAstronomic;
