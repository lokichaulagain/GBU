import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const expenseCategoryApi = createApi({
  reducerPath: "expenseCategory",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5008/api/expense-categories" }),
  endpoints: (builder) => ({
    getAllExpenseCategory: builder.query<any, { name: string }>({
      query: (options) => {
        const { name } = options;
        const params = name ? { name } : {};
        return {
          url: "/",
          params: params,
        };
      },
    }),

    getExpenseCategory: builder.query({
      query: (expenseCategoryId) => `/${expenseCategoryId}`,
    }),

    createExpenseCategory: builder.mutation({
      query: (newExpenseCategory) => ({
        url: ``,
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        body: newExpenseCategory,
      }),
    }),

    updateExpenseCategory: builder.mutation({
      query: ({ expenseCategoryId, updatedExpenseCategory }) => ({
        url: `/${expenseCategoryId}`,
        method: "PATCH",
        // headers: { "Content-Type": "application/json" },
        body: updatedExpenseCategory,
      }),
    }),

    deleteExpenseCategory: builder.mutation({
      query: (expenseCategoryId) => ({
        url: `/${expenseCategoryId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useCreateExpenseCategoryMutation, useDeleteExpenseCategoryMutation, useGetAllExpenseCategoryQuery, useGetExpenseCategoryQuery, useUpdateExpenseCategoryMutation } = expenseCategoryApi;
