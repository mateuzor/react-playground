import create from "zustand";

export type Usertype = {
  name: string;
  email: string;
};

type State = {
  users: Usertype[];
  addUser: (user: Usertype) => void;
};

const useUserStore = create<State>((set) => ({
  users: [],
  addUser: (user: Usertype) => {
    set((state) => ({ users: [...state.users, user] }));
  },
}));

export default useUserStore;
