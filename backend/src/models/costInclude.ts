import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { ExpeditionDocument } from "./expedition";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface CostIncludeInput {
  title: string;
  description: string;
  expedition: ExpeditionDocument["_id"];
}

export interface CostIncludeDocument extends CostIncludeInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const costIncludeSchema = new mongoose.Schema(
  {
    costIncludeId: {
      type: String,
      required: true,
      unique: true,
      default: () => `cost_include_${nanoid()}`,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    expedition: { type: mongoose.Schema.Types.ObjectId, ref: "Expedition" },
  },
  {
    timestamps: true,
  }
);

const CostIncludeModel = mongoose.model<CostIncludeDocument>("CostInclude", costIncludeSchema);

export default CostIncludeModel;
