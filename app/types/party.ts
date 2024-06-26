export interface IPartyOut {
  id: number;
  name: string;
  phone: number;
  type: any;

  openingBalance: number;
  openingBalanceDate: Date;
  address: string;

  email: string;
  panNumber: string;
  image: string;

  created_at: string;
}

export interface IPartyIn {
  id: number;
  name: string;
  phone: number;
  type: number;

  openingBalance: number;
  openingBalanceDate: Date;
  address: string;

  email: string;
  panNumber: string;
  image: string;

  created_at: string;
}
