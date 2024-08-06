import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  title: string;
  price: number;
  image: string;
  quantity: number;
};

interface CartSliceState {
  items: CartItem[];
  totalPrice: number;
}

const initialState: CartSliceState = {
  items: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const existingItem = state.items.find(
        (item) => item.title === action.payload.title
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex(
        (item) => item.title === action.payload
      );
      if (index !== -1) {
        state.items.splice(index, 1);
      }
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(
        (item) => item.title === action.payload
      );
      if (existingItem) {
        existingItem.quantity += 1;
      }
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(
        (item) => item.title === action.payload
      );
      if (existingItem) {
        existingItem.quantity -= 1;
        if (existingItem.quantity === 0) {
          const index = state.items.findIndex(
            (item) => item.title === action.payload
          );
          if (index !== -1) {
            state.items.splice(index, 1);
          }
        }
      }
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
