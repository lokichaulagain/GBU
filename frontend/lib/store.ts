import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { unitApi } from "./unitSlice";
import { categoryApi } from "./features/categorySlice";
import { typeApi } from "./features/typeSlice";
import { incomeCategoryApi } from "./features/incomeCategorySlice";
import { expenseCategoryApi } from "./features/expenseCategorySlice";
import { incomeApi } from "./features/incomeSlice";
import { expenseApi } from "./features/expenseSlice";

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      [unitApi.reducerPath]: unitApi.reducer,
      [categoryApi.reducerPath]: categoryApi.reducer,
      [typeApi.reducerPath]: typeApi.reducer,
      [incomeCategoryApi.reducerPath]: incomeCategoryApi.reducer,
      [expenseCategoryApi.reducerPath]: expenseCategoryApi.reducer,
      [incomeApi.reducerPath]: incomeApi.reducer,
      [expenseApi.reducerPath]: expenseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        unitApi.middleware,
        categoryApi.middleware,
        typeApi.middleware,
        incomeCategoryApi.middleware,
        expenseCategoryApi.middleware,
        incomeApi.middleware,
        expenseApi.middleware,
      ),
  });

  setupListeners(store.dispatch);
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
