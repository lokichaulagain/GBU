import { object, number, string, TypeOf, any } from "zod";

const typeEnum = string().refine((value) => value === "trekking" || value === "expedition", {
  message: "Type must be 'trekking' or 'expedition'",
});
const payload = {
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    heading: string({
      required_error: "heading is required",
    }),
    meter: string({
      required_error: "meter is required",
    }),
    banner: any(),

    maxElevation: string({
      required_error: "maxElevation is required",
    }),
    walkingPerDay: string({
      required_error: "walkingPerDay is required",
    }),
    accomodation: string({
      required_error: "accomodation is required",
    }),
    bestSeason: string({
      required_error: "bestSeason is required",
    }),
    groupSize: string({
      required_error: "groupSize is required",
    }),

    description: string({
      required_error: "description is required",
    }),
    duration: string({
      required_error: "duration is required",
    }),
    activity: string({
      required_error: "activity is required",
    }),
    physical: string({
      required_error: "physical is required",
    }),

    age: string({
      required_error: "age is required",
    }),
    location: string({
      required_error: "location is required",
    }),

    routeMap: any(),
    type: typeEnum,
  }),
};

const params = {
  params: object({
    expeditionId: string({
      required_error: "expeditionId is required",
    }),
  }),
};

export const createExpeditionSchema = object({
  ...payload,
});

export const updateExpeditionSchema = object({
  ...payload,
  ...params,
});

export const deleteExpeditionSchema = object({
  ...params,
});

export const getExpeditionSchema = object({
  ...params,
});

export type CreateExpeditionInput = TypeOf<typeof createExpeditionSchema>;
export type UpdateExpeditionInput = TypeOf<typeof updateExpeditionSchema>;
export type ReadExpeditionInput = TypeOf<typeof getExpeditionSchema>;
export type DeleteExpeditionInput = TypeOf<typeof deleteExpeditionSchema>;
