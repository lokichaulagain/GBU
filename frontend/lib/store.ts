import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { unitApi } from "./unitSlice";
import { categoryApi } from "./features/categorySlice";
import { typeApi } from "./features/typeSlice";
import { incomeCategoryApi } from "./features/incomeCategorySlice";
import { expenseCategoryApi } from "./features/expenseCategorySlice";

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      [unitApi.reducerPath]: unitApi.reducer,
      [categoryApi.reducerPath]: categoryApi.reducer,
      [typeApi.reducerPath]: typeApi.reducer,
      [incomeCategoryApi.reducerPath]: incomeCategoryApi.reducer,
      [expenseCategoryApi.reducerPath]: expenseCategoryApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        unitApi.middleware,
        categoryApi.middleware,
        typeApi.middleware,
        incomeCategoryApi.middleware,
        expenseCategoryApi.middleware,
      ),
  });

  setupListeners(store.dispatch);
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
