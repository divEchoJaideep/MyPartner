import * as Actions from '../../actions/types';
const LanguageList = (
  state = {
    language_list: undefined,
  },
  action,
) => {
  switch (action.type) {
    case Actions.LANGUAGE_LIST:
      return Object.assign({}, state, {
        language_list: action.payload,
      });

    default:
      return state;
  }
};

export default LanguageList;
