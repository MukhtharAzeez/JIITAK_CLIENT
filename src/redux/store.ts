import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./userslice";

const reducers = combineReducers({
    user: userAuthSlice.reducer
})

const store = configureStore({
    reducer: reducers,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;