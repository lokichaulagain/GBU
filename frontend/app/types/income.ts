import { IIncomeCategoryOut } from "./incomeCategory";

export interface IIncomeOut {
  _id: string;
  incomeCategory: IIncomeCategoryOut;
  amount: number;
  paymentMethod: string;
  date: string;
  note: string;
  image: string;
  incomeId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
