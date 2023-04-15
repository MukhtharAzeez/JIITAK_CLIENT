import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface UserDetails {
  token: string | null;
}

const initialState: UserDetails = {
  token: null,
};

const userAuthSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserDetails(state, actions) {
        console.log(actions.payload)
      const newItem = actions.payload;
      state.token = newItem;
    },
    logoutUser(state) {
      state.token = null;
      
    },
  },
});

export const { addUserDetails, logoutUser } = userAuthSlice.actions;
export const currentUser = (state: RootState) => state.user;
export default userAuthSlice;
