import mongoose from "mongoose";
import { nanoid } from "../utils/nanoid";

export interface ExpenseInput {
  category: ExpenseDocument["_id"];
  amount: number;
  paymentMethod: string;
  date: Date;
  note?: string;
  image?: string;
}

export interface ExpenseDocument extends ExpenseInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const expenseSchema = new mongoose.Schema(
  {
    expenseId: {
      type: String,
      required: true,
      unique: true,
      default: () => `expense_${nanoid()}`,
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["cash", "cheque", "online"], required: true },
    date: { type: Date, require: true },
    note: { type: String },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

const ExpenseModel = mongoose.model<ExpenseDocument>("Expense", expenseSchema);

export default ExpenseModel;
