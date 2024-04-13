export interface IItemOut {
  id: number;
  name: string;
  category: number;
  unit: number;
  sp: number;
  cp: number;
  openingStock: number;
  asOfDate: Date;
  itemCode?: string;
  itemLocation?: string;
  note?: string;
  created_at: string;
}
