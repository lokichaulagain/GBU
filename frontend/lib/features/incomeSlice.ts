import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const incomeApi = createApi({
  reducerPath: "income",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5008/api/incomes" }),
  endpoints: (builder) => ({
    getAllIncome: builder.query({
      query: () => "/",
    }),

    getIncome: builder.query({
      query: (incomeId) => `/${incomeId}`,
    }),

    createIncome: builder.mutation({
      query: (newIncome) => ({
        url: ``,
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        body: newIncome,
      }),
    }),

    updateIncome: builder.mutation({
      query: ({ incomeId, updatedIncome }) => ({
        url: `/${incomeId}`,
        method: "PATCH",
        // headers: { "Content-Type": "application/json" },
        body: updatedIncome,
      }),
    }),

    deleteIncome: builder.mutation({
      query: (incomeId) => ({
        url: `/${incomeId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useCreateIncomeMutation, useDeleteIncomeMutation, useGetAllIncomeQuery, useGetIncomeQuery, useUpdateIncomeMutation } = incomeApi;
