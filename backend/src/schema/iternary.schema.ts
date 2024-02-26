import { object, number, string, TypeOf, any } from "zod";

const payload = {
  body: object({
    day: string({
      required_error: "day is required",
    }),

    title: string({
      required_error: "title is required",
    }),

    description: string({
      required_error: "description is required",
    }),

    expedition: string({
      required_error: "expedition is required",
    }),
  }),
};

const params = {
  params: object({
    iternaryId: string({
      required_error: "iternaryId is required",
    }),
  }),
};

export const createIternarySchema = object({
  ...payload,
});

export const updateIternarySchema = object({
  ...payload,
  ...params,
});

export const deleteIternarySchema = object({
  ...params,
});

export const getIternarySchema = object({
  ...params,
});

export type CreateIternaryInput = TypeOf<typeof createIternarySchema>;
export type UpdateIternaryInput = TypeOf<typeof updateIternarySchema>;
export type ReadIternaryInput = TypeOf<typeof getIternarySchema>;
export type DeleteIternaryInput = TypeOf<typeof deleteIternarySchema>;
