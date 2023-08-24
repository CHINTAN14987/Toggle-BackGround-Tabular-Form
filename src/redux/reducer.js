import { createSlice } from "@reduxjs/toolkit";
const appReducer = createSlice({
  name: "app",
  initialState: {
    details: [],
    isValidated: false,
    bgColor: false,
  },
  reducers: {
    addDetails: (state, action) => {
      return { ...state, details: state.details.concat(action.payload.data) };
    },
    deleteFormItem: (state, action) => {
      return {
        ...state,
        details: state.details.filter((item) => item.id !== action.payload),
      };
    },
    editFormItem: (state, action) => {
      const { data } = action.payload;
      const index = state.details.findIndex((item) => item.id === data.id);
      const newState = [...state.details];
      newState.splice(index, 1);
      newState.splice(index, 0, data);
      return { ...state, details: newState };
    },
    copyFormItem: (state, action) => {
      const { data } = action.payload;
      console.log(data);
      const index = state.details.findIndex((item) => item.id === data.id);
      const newState = [...state.details];
      newState.splice(index, 0, {
        ...data,
        id: Math.floor(Math.random() * 1000),
      });
      return { ...state, details: newState };
    },
    isFormValidated: (state, action) => {
      return { ...state, isValidated: action.payload };
    },
    backGround: (state, action) => {
      return { ...state, bgColor: action.payload };
    },
    sortTable: (state, action) => {
      const newData = [...state.details];
      const sorted = newData.sort((a, b) => {
        let fa = a?.[action.payload]?.toLowerCase() || "";
        let fb = b?.[action.payload]?.toLowerCase() || "";
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
      return {
        ...state,
        details: sorted,
      };
    },
  },
});
export const {
  addDetails,
  deleteFormItem,
  sortTable,
  editFormItem,
  isFormValidated,
  copyFormItem,
  backGround,
} = appReducer.actions;
export default appReducer.reducer;
