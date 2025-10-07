import { createSlice } from "@reduxjs/toolkit";

const userDetailsReducer = createSlice({
  name: "userDetails",
  initialState: {
    userBasicInfo: {},             // Basic info
    userReligion: {},              // Religion & cultural info
    userPhysicalAttributes: {},    // Physical attributes
    userAddress: {},               // Address info
    userEducation: {},             // Education info
    userCareerInfo: {},            // Career info
    userLanguage: {},              // Language info
    userVerification: {            // Verification docs
      document_type: null,
      front_photo: null,
      back_photo: null,
    },
    galleryImages: [],            
    loading: false,
    error: null,
    success: null,
    setGalleryImages,    // <-- add this
  setVerification, 
  },
  reducers: {
    start: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    failure: (state, action) => {
      state.loading = false;
      state.success = null;
      state.error = action.payload;
    },

    basicInfo: (state, action) => {
      state.loading = false;
      state.userBasicInfo = action.payload;
    },

    religionAndCultural: (state, action) => {
      state.loading = false;
      state.userReligion = action.payload;
    },

    physicalAttribute: (state, action) => {
      state.loading = false;
      state.userPhysicalAttributes = action.payload;
    },

    address: (state, action) => {
      state.loading = false;
      state.userAddress = action.payload;
    },

    education: (state, action) => {
      state.loading = false;
      state.userEducation = action.payload;
    },

    careerInfo: (state, action) => {
      state.loading = false;
      state.userCareerInfo = action.payload;
    },

    setUserLanguage: (state, action) => {
      state.loading = false;
      state.userLanguage = action.payload;
    },

   setVerification: (state, action) => {
  state.loading = false;
  state.userVerification = action.payload; // replace object completely
},

updateVerification: (state, action) => {
  state.loading = false;
  state.userVerification = {
    ...state.userVerification,
    ...action.payload, // merge fields
  };
},

    frontPhoto: (state, action) => {
      state.loading = false;
      state.userVerification.front_photo = action.payload;
    },

    backPhoto: (state, action) => {
      state.loading = false;
      state.userVerification.back_photo = action.payload;
    },

    setGalleryImages: (state, action) => {
      state.loading = false;
      state.galleryImages = action.payload;
    },

    addGalleryImage: (state, action) => {
      state.loading = false;
      state.galleryImages = [...state.galleryImages, action.payload];
    },

    removeGalleryImage: (state, action) => {
      state.loading = false;
      state.galleryImages = state.galleryImages.filter(
        (img) => img.id !== action.payload
      );
    },

    resetState: (state) => {
      state.success = null;
      state.error = null;
    },
  },
});

export const {
  start,
  failure,
  basicInfo,
  religionAndCultural,
  physicalAttribute,
  address,
  education,
  careerInfo,
  setUserLanguage,
  setVerification,       
  updateVerification,    
  frontPhoto,
  backPhoto,
  setGalleryImages,
  addGalleryImage,
  removeGalleryImage,
  resetState,
} = userDetailsReducer.actions;

export default userDetailsReducer.reducer;
