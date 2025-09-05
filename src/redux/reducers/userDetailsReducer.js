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
    userLanguage: {},              // Default empty string (can be array too)
    userVerification: [            // Verification docs
      {
        document_type: null,
        front_photo: null,
        back_photo: null,
      },
    ],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    // Start state (loading on)
    start: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },

    // Failure (error capture)
    failure: (state, action) => {
      state.loading = false;
      state.success = null;
      state.error = action.payload;
    },

    // Save Basic Info
    basicInfo: (state, action) => {
      state.loading = false;
      state.userBasicInfo = action.payload;
    },

    // Save Religion & Cultural info
    religionAndCultural: (state, action) => {
      state.loading = false;
      state.userReligion = action.payload;
    },

    // Save Physical Attributes
    physicalAttribute: (state, action) => {
      state.loading = false;
      state.userPhysicalAttributes = action.payload;
    },

    // Save Address Info
    address: (state, action) => {
      state.loading = false;
      state.userAddress = action.payload;
    },

    // Save Education Info
    education: (state, action) => {
      state.loading = false;
      state.userEducation = action.payload;
    },

    // Save Career Info
    careerInfo: (state, action) => {
      state.loading = false;
      state.userCareerInfo = action.payload;
    },

    // Save User Language
   setUserLanguage: (state, action) => {
    state.loading = false;
    state.userLanguage = action.payload;
  },

    // Add Verification IDs
    verificationIds: (state, action) => {
      state.loading = false;
      state.userVerification = [...state.userVerification, action.payload];
    },

    // Save Front Photo
    frontPhoto: (state, action) => {
      state.loading = false;
      state.front_photo = action.payload;
    },

    // Save Back Photo
    backPhoto: (state, action) => {
      state.loading = false;
      state.back_photo = action.payload;
    },

    // Reset success & error
    resetState: (state) => {
      state.success = null;
      state.error = null;
    },
  },
});

// Export actions (with aliasing if needed)
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
  verificationIds,
  frontPhoto,
  backPhoto,
  resetState,
} = userDetailsReducer.actions;

// Export reducer
export default userDetailsReducer.reducer;
