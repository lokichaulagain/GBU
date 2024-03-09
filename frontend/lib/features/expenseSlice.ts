import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const expenseApi = createApi({
  reducerPath: "expense",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5008/api/expenses" }),
  endpoints: (builder) => ({
    getAllExpense: builder.query({
      query: () => "/",
    }),

    getExpense: builder.query({
      query: (incomeId) => `/${incomeId}`,
    }),

    createExpense: builder.mutation({
      query: (newExpense) => ({
        url: ``,
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        body: newExpense,
      }),
    }),

    updateExpense: builder.mutation({
      query: ({ incomeId, updatedExpense }) => ({
        url: `/${incomeId}`,
        method: "PATCH",
        // headers: { "Content-Type": "application/json" },
        body: updatedExpense,
      }),
    }),

    deleteExpense: builder.mutation({
      query: (incomeId) => ({
        url: `/${incomeId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useCreateExpenseMutation, useDeleteExpenseMutation, useGetAllExpenseQuery, useGetExpenseQuery, useUpdateExpenseMutation } = expenseApi;
