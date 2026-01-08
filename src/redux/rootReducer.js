import { appointmentApi } from "@/features/api/appointmentApi.js";
import authReducer from "../features/authSlice.js";
import { authApi } from "@/features/api/authApi.js";
import { centerApi } from "@/features/api/centerApi.js";
import { userApi } from "@/features/api/userApi.js";
import { combineReducers } from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    // API reducers
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [centerApi.reducerPath]: centerApi.reducer,
    [appointmentApi.reducerPath]: appointmentApi.reducer,

    // Regular Slice Reducer
    auth: authReducer,
});

export default rootReducer;