import { object, string, TypeOf, any } from "zod";

const payload = {
  body: object({
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
    costIncludeId: string({
      required_error: "costIncludeId is required",
    }),
  }),
};

export const createCostIncludeSchema = object({
  ...payload,
});

export const updateCostIncludeSchema = object({
  ...payload,
  ...params,
});

export const deleteCostIncludeSchema = object({
  ...params,
});

export const getCostIncludeSchema = object({
  ...params,
});

export type CreateCostIncludeInput = TypeOf<typeof createCostIncludeSchema>;
export type UpdateCostIncludeInput = TypeOf<typeof updateCostIncludeSchema>;
export type ReadCostIncludeInput = TypeOf<typeof getCostIncludeSchema>;
export type DeleteCostIncludeInput = TypeOf<typeof deleteCostIncludeSchema>;
