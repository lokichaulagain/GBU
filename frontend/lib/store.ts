import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { unitApi } from "./unitSlice";

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      //   [productsApi.reducerPath]: productsApi.reducer,
      [unitApi.reducerPath]: unitApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        // productsApi.middleware,
        unitApi.middleware
      ),
  });

  setupListeners(store.dispatch);
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
