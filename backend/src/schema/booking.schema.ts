import { object, number, string, TypeOf, any, optional } from "zod";

const payload = {
  body: object({
    fullName: string({
      required_error: "fullName is required",
    }),

    email: string({
      required_error: "email is required",
    }),

    phone: string({
      required_error: "phone is required",
    }),

    country: string({
      required_error: "country is required",
    }),

    expedition: string().default(""),

    treeking: string().default(""),

    arrivalDate: string({
      required_error: "arrivalDate is required",
    }),

    departureDate: string({
      required_error: "departureDate is required",
    }),
  }),
};

const params = {
  params: object({
    bookingId: string({
      required_error: "bookingId is required",
    }),
  }),
};

export const createBookingSchema = object({
  ...payload,
});

export const updateBookingSchema = object({
  ...payload,
  ...params,
});

export const deleteBookingSchema = object({
  ...params,
});

export const getBookingSchema = object({
  ...params,
});

export type CreateBookingInput = TypeOf<typeof createBookingSchema>;
export type UpdateBookingInput = TypeOf<typeof updateBookingSchema>;
export type ReadBookingInput = TypeOf<typeof getBookingSchema>;
export type DeleteBookingInput = TypeOf<typeof deleteBookingSchema>;
