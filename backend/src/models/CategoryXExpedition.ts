import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { ExpeditionDocument } from "./expedition";
import { CategoryDocument } from "./category.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface CategoryXExpeditionInput {
  expedition: ExpeditionDocument["_id"];
  category: CategoryDocument["_id"];
}

export interface CategoryXExpeditionDocument extends CategoryXExpeditionInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const categoryXExpeditionSchema = new mongoose.Schema(
  {
    categoryXExpeditionId: {
      type: String,
      required: true,
      unique: true,
      default: () => `category_x_expedition_${nanoid()}`,
    },

    expedition: { type: mongoose.Schema.Types.ObjectId, ref: "Expedition" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  },
  {
    timestamps: true,
  }
);

const CategoryXExpeditionModel = mongoose.model<CategoryXExpeditionDocument>("CategoryXExpedition", categoryXExpeditionSchema);

export default CategoryXExpeditionModel;
