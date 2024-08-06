import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "./cartSlice";

export type Order = {
  date: string;
  items: CartItem[];
  totalPrice: number;
  userId: number;
};
export type User = {
  email: string;
  id: number;
  login: string;
  accessToken: string;
};

interface UserSliceState {
  isAuth: boolean;
  user: User | null;
}

const getUserFromLocalStorage = (): User | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const initialState: UserSliceState = {
  isAuth: !!getUserFromLocalStorage(),
  user: getUserFromLocalStorage(),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuth = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuth = false;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
