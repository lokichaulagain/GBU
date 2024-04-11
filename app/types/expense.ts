export interface IExpenseOut {
  id: number;
  category: number;
  amount: number;
  paymentMethod: string;
  date: Date;
  note?: string;
  image?: string;
  created_at: Date;
}

export interface IExpenseIn {
  category: number;
  amount: number;
  paymentMethod: string;
  date: Date;
  note?: string;
  image?: string;
}
