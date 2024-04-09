// for payment-out 
export interface IOutPaymentOut {
   receiptNumber : string;
   paymentDate : Date | null;
   party : number; 
   paymentMethod : string;
   paidAmout: number;
   note : string | null;
   image : string | null;
}

// for payment-in 
export interface IInPaymentOut {
   receiptNumber : string;
   paymentDate : Date | null;
   party : number; 
   paymentMethod : string;
   receivedAmout: number;
   note : string | null;
   image : string | null;
}