import * as Actions from '../../actions/types';
const UpdateAddress = (
  state = {
    country_id: undefined,
    state_id: undefined,
    city_id: undefined,
    city_name: undefined,
    address: undefined,
    address_type: undefined,
    postal_code: undefined,
  },
  action,
) => {
  switch (action.type) {
    case Actions.COUNTRY_ID:
      return Object.assign({}, state, {
        country_id: action.payload,
      });
    case Actions.STATE_ID:
      return Object.assign({}, state, {
        state_id: action.payload,
      });
    case Actions.CITY_ID:
      return Object.assign({}, state, {
        city_id: action.payload,
      });
    case Actions.CITY_NAME:
      return Object.assign({}, state, {
        city_name: action.payload,
      });
    case Actions.ADDRESS:
      return Object.assign({}, state, {
        address: action.payload,
      });
    case Actions.ADDRESS_TYPE:
      return Object.assign({}, state, {
        address_type: action.payload,
      });
    case Actions.POSTAL_CODE:
      return Object.assign({}, state, {
        postal_code: action.payload,
      });

    default:
      return state;
  }
};

export default UpdateAddress;
