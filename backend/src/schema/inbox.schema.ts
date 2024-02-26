import { object, number, string, TypeOf, any, optional } from "zod";

const payload = {
  body: object({
    fullName: string({
      required_error: "fullName is required",
    }),

    email: string({
      required_error: "email is required",
    }),

    address: string({
      required_error: "address is required",
    }),

    message: string({
      required_error: "message is required",
    }),
  }),
};

const params = {
  params: object({
    inboxId: string({
      required_error: "inboxId is required",
    }),
  }),
};

export const createInboxSchema = object({
  ...payload,
});

export const updateInboxSchema = object({
  ...payload,
  ...params,
});

export const deleteInboxSchema = object({
  ...params,
});

export const getInboxSchema = object({
  ...params,
});

export type CreateInboxInput = TypeOf<typeof createInboxSchema>;
export type UpdateInboxInput = TypeOf<typeof updateInboxSchema>;
export type ReadInboxInput = TypeOf<typeof getInboxSchema>;
export type DeleteInboxInput = TypeOf<typeof deleteInboxSchema>;
