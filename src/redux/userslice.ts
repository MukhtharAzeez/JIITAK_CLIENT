import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface UserDetails {
  id: number | null;
  email: string | null;
  username: string | null;
}

const initialState: UserDetails = {
  id: null,
  email: null,
  username: null,
};

const userAuthSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserDetails(state, actions) {
      const newItem = actions.payload;
      state.email = newItem.email;
      state.username = newItem.username;
      state.id = newItem.id
    },
    logoutUser(state) {
      state.email = null;
      state.username = null;
      state.id = null;

    },
  },
});

export const { addUserDetails, logoutUser } = userAuthSlice.actions;
export const currentUser = (state: RootState) => state.user;
export default userAuthSlice;
