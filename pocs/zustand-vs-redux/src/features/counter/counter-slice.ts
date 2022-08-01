import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    amountAdded(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});

export const { increment, amountAdded } = counterReducer.actions;
export default counterReducer.reducer;
