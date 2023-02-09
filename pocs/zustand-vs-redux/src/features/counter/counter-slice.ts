import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
  loading: boolean;
}

const initialState: CounterState = {
  value: 0,
  loading: false,
};

const counterReducer = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.value++;
    },
  },
});

export const { increment } = counterReducer.actions;
export default counterReducer.reducer;
