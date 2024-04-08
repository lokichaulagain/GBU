import { ITypeOut } from "./type";

export interface IPartyOut {
  id: number;
  name: string;
  phone: number;
  type: ITypeOut;

  openingBalance: number;
  openingBalanceDate: Date;
  address: string;

  email: string;
  panNumber: string;
  image: string;

  created_at: string;
}
