import * as Actions from '../../actions/types';
const HobbiesList = (
  state = {
    hobbies_list: undefined,
  },
  action,
) => {
  switch (action.type) {
    case Actions.HOBBIES_LIST:
      return Object.assign({}, state, {
        hobbies_list: action.payload,
      });

    default:
      return state;
  }
};

export default HobbiesList;
