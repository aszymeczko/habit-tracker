import { thunk } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import habitReducer from "../features/habits/habitsSlice";

export default configureStore({
  reducer: {
    habit: habitReducer,
  },
});
