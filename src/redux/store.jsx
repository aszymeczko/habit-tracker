import { thunk } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import habitReducer from "../features/habitsSlice.jsx";

export default configureStore({
  reducer: {
    habit: habitReducer,
  },
});
