export interface IIncomeOut {
  id: number;
  category: number;
  amount: number;
  paymentMethod: string;
  date: Date;
  note?: string;
  image?: string;
  created_at: Date;
}
