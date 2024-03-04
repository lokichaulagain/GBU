import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const incomeCategoryApi = createApi({
  reducerPath: "incomeCategory",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5008/api/income-categories" }),
  endpoints: (builder) => ({
    getAllIncomeCategory: builder.query({
      query: () => "/",
    }),

    getIncomeCategory: builder.query({
      query: (incomeCategoryId) => `/${incomeCategoryId}`,
    }),

    createIncomeCategory: builder.mutation({
      query: (newIncomeCategory) => ({
        url: ``,
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        body: newIncomeCategory,
      }),
    }),

    updateIncomeCategory: builder.mutation({
      query: ({ incomeCategoryId, updatedIncomeCategory }) => ({
        url: `/${incomeCategoryId}`,
        method: "PATCH",
        // headers: { "Content-Type": "application/json" },
        body: updatedIncomeCategory,
      }),
    }),

    deleteIncomeCategory: builder.mutation({
      query: (incomeCategoryId) => ({
        url: `/${incomeCategoryId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useCreateIncomeCategoryMutation, useDeleteIncomeCategoryMutation, useGetAllIncomeCategoryQuery, useGetIncomeCategoryQuery, useUpdateIncomeCategoryMutation } = incomeCategoryApi;
