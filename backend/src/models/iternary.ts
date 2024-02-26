import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { ExpeditionDocument } from "./expedition";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface IternaryInput {
  day: string;
  title: string;
  description: string;
  expedition: ExpeditionDocument["_id"];
}

export interface IternaryDocument extends IternaryInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const iternarySchema = new mongoose.Schema(
  {
    iternaryId: {
      type: String,
      required: true,
      unique: true,
      default: () => `iternary_${nanoid()}`,
    },
    day: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    expedition: { type: mongoose.Schema.Types.ObjectId, ref: "Expedition" },
  },
  {
    timestamps: true,
  }
);

const IternaryModel = mongoose.model<IternaryDocument>("Iternary", iternarySchema);

export default IternaryModel;
