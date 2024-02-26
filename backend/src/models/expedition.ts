import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface ExpeditionInput {
  name: string;
  heading: string;
  meter: string;
  banner: string;

  maxElevation: string;
  walkingPerDay: string;
  accomodation: string;
  bestSeason: string;
  groupSize: string;

  description: string;
  duration: string;
  activity: string;
  physical: string;
  age: string;
  location: string;

  routeMap: string;
  type: string;
}

export interface ExpeditionDocument extends ExpeditionInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const expeditionSchema = new mongoose.Schema(
  {
    expeditionId: {
      type: String,
      required: true,
      unique: true,
      default: () => `expedition_${nanoid()}`,
    },
    name: { type: String, required: true },
    heading: { type: String, required: true },
    meter: { type: String, required: true },
    banner: { type: String, required: true },

    maxElevation: { type: String, required: true },
    walkingPerDay: { type: String, required: true },
    accomodation: { type: String, required: true },
    bestSeason: { type: String, required: true },
    groupSize: { type: String, required: true },

    description: { type: String, required: true },
    duration: { type: String, required: true },
    activity: { type: String, required: true },
    physical: { type: String, required: true },
    age: { type: String, required: true },
    location: { type: String, required: true },

    routeMap: { type: String, required: true },
    type: { type: String, enum: ["trekking", "expedition"], required: true },
  },
  {
    timestamps: true,
  }
);

const ExpeditionModel = mongoose.model<ExpeditionDocument>("Expedition", expeditionSchema);

export default ExpeditionModel;
