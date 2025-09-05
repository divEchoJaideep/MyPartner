import { createSlice } from "@reduxjs/toolkit";

const perDefineListReducer = createSlice({
  name: "preList",
  initialState: {
    loading: false,
    Success: null,
    error: null,
    country_list: null,
    colour_list: null,
    family_value_list: null,
    district_list: null,
    height_list: null,
    hobbies_list: null,
    jobtype_list: null,
    language_list: null,
    maritial_status: null,
    onbehalf_list: null,
    religion_list: null,
    salary_list: null,
    state_list: null,
    city_list:[],
    religionCaste: [],
    caste: [],
    subCaste: [],
  },
  reducers: {
    listRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    listSuccess: (state, action) => {
      state.loading = false;
    },
    listFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setPreDefineState:(state, action) =>{
      Object.assign(state, action.payload);
        //state = {...state, ...action.payload}
    },
    setReligionCaste: (state, action) => {
      state.loading = false;
      state.religionCaste = action.payload
    },
    setCaste: (state, action) => {
      state.loading = false;
      state.caste = action.payload
    },
    setSubCaste: (state, action) => {
      state.loading = false;
      state.subCaste = action.payload
    },
    setCityList: (state, action) =>{
      state.loading = false;
      state.city_list = action.payload
    }
  },
});

export const { 
  listRequest, 
  listSuccess, 
  listFailure, 
  setPreDefineState,
  setReligionCaste,
  setCaste,
  setSubCaste,
  setCityList,
} = perDefineListReducer.actions;

export default perDefineListReducer.reducer;