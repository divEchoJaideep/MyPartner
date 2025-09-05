import * as Actions from '../../actions/types';
const UpdateLanguage = (
  state = {
    known_languages: undefined,
    mother_tongue: undefined,
  },
  action,
) => {
  switch (action.type) {
    case Actions.KNOWN_LANGUAGES:
      return Object.assign({}, state, {
        known_languages: action.payload,
      });
    case Actions.MOTHERE_TONGUE:
      return Object.assign({}, state, {
        mother_tongue: action.payload,
      });

    default:
      return state;
  }
};

export default UpdateLanguage;
