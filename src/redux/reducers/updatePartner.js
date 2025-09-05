import * as Actions from '../../actions/types';
const UpdatePartner = (
  state = {
    general: undefined,
    partner_height: undefined,
    partner_marital_status: undefined,
    partner_children_acceptable: undefined,
    residence_country_id: undefined,
    residence_state_id: undefined,
    partner_religion_id: undefined,
    partner_religion_caste_id: undefined,
    partner_caste_id: undefined,
    partner_sub_caste_id: undefined,
    smoking_acceptable: undefined,
    drinking_acceptable: undefined,
    partner_diet: undefined,
    partner_body_type: undefined,
    partner_manglik: undefined,
    job_type: undefined,
    language_id: undefined,
    family_value_id: undefined,
    partner_complexion: undefined,
  },
  action,
) => {
  switch (action.type) {
    case Actions.SELECTED_GENERAL:
      return Object.assign({}, state, {
        general: action.payload,
      });
    case Actions.SELECTED_PARTNER_HEIGHT:
      return Object.assign({}, state, {
        partner_height: action.payload,
      });
    case Actions.SELECTED_PARTNER_MARITAL:
      return Object.assign({}, state, {
        partner_marital_status: action.payload,
      });
    case Actions.SELECTED_PARTNER_CHILDREN:
      return Object.assign({}, state, {
        partner_children_acceptable: action.payload,
      });
    case Actions.SELECTED_RESIDENCE_COUNTRY:
      return Object.assign({}, state, {
        residence_country_id: action.payload,
      });
    case Actions.SELECTED_RESIDENCE_STATE:
      return Object.assign({}, state, {
        residence_state_id: action.payload,
      });
    case Actions.SELECTED_PARTNER_RELIGION:
      return Object.assign({}, state, {
        partner_religion_id: action.payload,
      });
    case Actions.SELECTED_PARTNER_RELIGION_CASTE:
      return Object.assign({}, state, {
        partner_religion_caste_id: action.payload,
      });
    case Actions.SELECTED_PARTNER_CASTE:
      return Object.assign({}, state, {
        partner_caste_id: action.payload,
      });
    case Actions.SELECTED_PARTNER_SUBCASTE:
      return Object.assign({}, state, {
        partner_sub_caste_id: action.payload,
      });
    case Actions.SELECTED_SMOKING:
      return Object.assign({}, state, {
        smoking_acceptable: action.payload,
      });
    case Actions.SELECTED_DRINKING:
      return Object.assign({}, state, {
        drinking_acceptable: action.payload,
      });
    case Actions.SELECTED_PARTNER_DIET:
      return Object.assign({}, state, {
        partner_diet: action.payload,
      });
    case Actions.SELECTED_PARTNER_BODYTYPE:
      return Object.assign({}, state, {
        partner_body_type: action.payload,
      });
    case Actions.SELECTED_PARTNER_MANGLIK:
      return Object.assign({}, state, {
        partner_manglik: action.payload,
      });
    case Actions.SELECTED_PARTNER_JOBTYPE:
      return Object.assign({}, state, {
        job_type: action.payload,
      });
    case Actions.SELECTED_PARTNER_LANGUAGE:
      return Object.assign({}, state, {
        language_id: action.payload,
      });
    case Actions.SELECTED_PARTNER_FAMILY_VALUE:
      return Object.assign({}, state, {
        family_value_id: action.payload,
      });
    case Actions.SELECTED_PARTNER_COMPLEXION:
      return Object.assign({}, state, {
        partner_complexion: action.payload,
      });

    default:
      return state;
  }
};

export default UpdatePartner;
