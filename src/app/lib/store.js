import { configureStore } from "@reduxjs/toolkit";
import metricsReducer from "./features/metricsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      metrics: metricsReducer,
    },
  });
};

// export default configureStore({
//   reducer: {
//     metrics: metricsReducer,
//   },
// });
