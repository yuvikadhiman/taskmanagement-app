import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import jobSlice from "./features/Job/jobSlice";
import AlljobSlice from "./features/Job/AllTaskSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    task: jobSlice,
    allJobs:AlljobSlice
  },
});
