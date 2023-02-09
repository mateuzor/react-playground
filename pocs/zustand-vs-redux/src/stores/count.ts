import create from "zustand";

type State = {
  value: number;
  incrementZustand: () => void;
};

const useCountStore = create<State>((set) => ({
  value: 0,
  incrementZustand: () => set((state) => ({ value: state.value + 1 })),
}));

export default useCountStore;
