import mongoose from "mongoose";
import { nanoid } from "../utils/nanoid";

export interface IncomeInput {
  category: IncomeDocument["_id"];
  amount: number;
  paymentMethod: string;
  date: Date;
  note?: string;
  image?: string;
}

export interface IncomeDocument extends IncomeInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const incomeSchema = new mongoose.Schema(
  {
    incomeId: {
      type: String,
      required: true,
      unique: true,
      default: () => `income_${nanoid()}`,
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", require: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["cash", "cheque", "online"], require: true },
    date: { type: Date, require: true },
    note: { type: String },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

const IncomeModel = mongoose.model<IncomeDocument>("Income", incomeSchema);

export default IncomeModel;
