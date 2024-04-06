import { IExpenseCategoryOut } from "./expenseCategory";

export interface IExpenseOut {
  _id: string;
  expenseCategory: IExpenseCategoryOut;
  amount: number;
  paymentMethod: string;
  date: string;
  note: string;
  image: string;
  expenseId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
