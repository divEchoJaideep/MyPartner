import * as Actions from '../../actions/types';
const UploadImages = (
  state = {
    upload_images: undefined,
  },
  action,
) => {
  switch (action.type) {
    case Actions.UPLOAD_IMAGES:
      return Object.assign({}, state, {
        upload_images: action.payload,
      });

    default:
      return state;
  }
};

export default UploadImages;
