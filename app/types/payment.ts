
// Payment In Interfaces
export interface IPaymentinOut {
  id: number;
  created_at: Date;
  receiptNumber: string;
  party: number;
  paymentMethod: string;
  receivedAmount: number;
  note?: string;
  image?: string;
  paymentDate: Date;
}

export interface IPaymentinIn {
  created_at: Date;
  receiptNumber: string;
  party: number;
  paymentMethod: string;
  receivedAmount: number;
  note?: string;
  image?: string;
  paymentDate: Date;
}

// Payment Out Interfaces

export interface IPaymentoutOut {
    id: number;
    created_at: Date;
    receiptNumber: string;
    party: number;
    paymentMethod: string;
    paidAmount: number;
    note?: string;
    image?: string;
    paymentDate: Date;
  }
  
  export interface IPaymentoutIn {
    created_at: Date;
    receiptNumber: string;
    party: number;
    paymentMethod: string;
    paidAmount: number;
    note?: string;
    image?: string;
    paymentDate: Date;
  }