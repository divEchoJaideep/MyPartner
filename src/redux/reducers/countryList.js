import * as Actions from '../../actions/types';
const CountryList = (
  state = {
    country_list: undefined,
  },
  action,
) => {
  switch (action.type) {
    case Actions.COUNTRY_LIST:
      return Object.assign({}, state, {
        country_list: action.payload,
      });

    default:
      return state;
  }
};

export default CountryList;
