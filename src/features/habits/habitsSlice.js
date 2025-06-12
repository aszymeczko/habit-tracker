import { createSlice } from "@reduxjs/toolkit";
import initialState from "../../redux/initialState";

export const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {},
});

export const {} = habitSlice.actions;

export default habitSlice.reducer;
