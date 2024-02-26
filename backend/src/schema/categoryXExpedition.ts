import { object, number, string, TypeOf, any } from "zod";

const payload = {
  body: object({
    category: string({
      required_error: "category is required",
    }),

    expedition: string({
      required_error: "expedition is required",
    }),
  }),
};

const params = {
  params: object({
    categoryXExpeditionId: string({
      required_error: "categoryXExpeditionId is required",
    }),
  }),
};

export const createCategoryXExpeditionSchema = object({
  ...payload,
});

export const updateCategoryXExpeditionSchema = object({
  ...payload,
  ...params,
});

export const deleteCategoryXExpeditionSchema = object({
  ...params,
});

export const getCategoryXExpeditionSchema = object({
  ...params,
});

export type CreateCategoryXExpeditionInput = TypeOf<typeof createCategoryXExpeditionSchema>;
export type UpdateCategoryXExpeditionInput = TypeOf<typeof updateCategoryXExpeditionSchema>;
export type ReadCategoryXExpeditionInput = TypeOf<typeof getCategoryXExpeditionSchema>;
export type DeleteCategoryXExpeditionInput = TypeOf<typeof deleteCategoryXExpeditionSchema>;
