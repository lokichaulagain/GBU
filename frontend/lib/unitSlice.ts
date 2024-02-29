import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const unitApi = createApi({
  reducerPath: "unit",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5008/api/units" }),
  endpoints: (builder) => ({
    getAllUnit: builder.query({
      query: () => "/",
    }),

    getUnit: builder.query({
      query: (unitId) => `/${unitId}`,
    }),

    createUnit: builder.mutation({
      query: (newUnit) => ({
        url: ``,
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        body: newUnit,
      }),
    }),

    updateUnit: builder.mutation({
      query: ({ unitId, updatedUnit }) => ({
        url: `/${unitId}`,
        method: "PATCH",
        // headers: { "Content-Type": "application/json" },
        body: updatedUnit,
      }),
    }),

    deleteUnit: builder.mutation({
      query: (unitId) => ({
        url: `/${unitId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useCreateUnitMutation, useDeleteUnitMutation, useGetAllUnitQuery, useGetUnitQuery, useUpdateUnitMutation } = unitApi;
