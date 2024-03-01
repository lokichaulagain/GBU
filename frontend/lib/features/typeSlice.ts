import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const typeApi = createApi({
  reducerPath: "type",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5008/api/types" }),
  endpoints: (builder) => ({
    getAllType: builder.query({
      query: () => "/",
    }),

    getType: builder.query({
      query: (typeId) => `/${typeId}`,
    }),

    createType: builder.mutation({
      query: (newType) => ({
        url: ``,
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        body: newType,
      }),
    }),

    updateType: builder.mutation({
      query: ({ typeId, updatedType }) => ({
        url: `/${typeId}`,
        method: "PATCH",
        // headers: { "Content-Type": "application/json" },
        body: updatedType,
      }),
    }),

    deleteType: builder.mutation({
      query: (typeId) => ({
        url: `/${typeId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useCreateTypeMutation, useDeleteTypeMutation, useGetAllTypeQuery, useGetTypeQuery, useUpdateTypeMutation } = typeApi;
