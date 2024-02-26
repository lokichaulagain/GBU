import { object, string, TypeOf, unknown } from "zod";

// Define common schemas
const payload = {
  body: object({
    name: string({
      required_error: "name is required",
    }),
    image: unknown().optional(),
    description: string().optional(),
  }),
};

const params = {
  params: object({
    categoryId: string({
      required_error: "categoryId is required",
    }),
  }),
};

// Define specific schemas
export const createCategorySchema = object({
  ...payload,
});

export const updateCategorySchema = object({
  ...payload,
  ...params,
});

export const deleteCategorySchema = object({
  ...params,
});

export const getCategorySchema = object({
  ...params,
});

// Define types
export type CreateCategoryInput = TypeOf<typeof createCategorySchema>;
export type UpdateCategoryInput = TypeOf<typeof updateCategorySchema>;
export type ReadCategoryInput = TypeOf<typeof getCategorySchema>;
export type DeleteCategoryInput = TypeOf<typeof deleteCategorySchema>;
