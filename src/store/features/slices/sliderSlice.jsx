import { createSlice } from "@reduxjs/toolkit";
import { sliderData } from "../../../assets/data/dummyData";

const val = Math.floor(Math.random() * sliderData.length);

const sliderSlice = createSlice({
  name: "slider",
  initialState: {
    value: val,
    length: sliderData.length - 1,
  },
  reducers: {
    nextSlide(state, action) {
      state.value = action.payload > state.length ? 0 : action.payload;
    },
    prevSlide(state, action) {
      state.value = action.payload < 0 ? state.length : action.payload;
    },
    dotSlide(state, action) {
      const slide = action.payload;
      state.value = slide;
    },
  },
});

export const { nextSlide, prevSlide, dotSlide } = sliderSlice.actions;
export default sliderSlice.reducer;
