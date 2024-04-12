


  export interface IItemOut {
    id:number
    name: string;
    category: string;
    unit: string;
    sp?: string;
    cp?: string;
    openingStock?: string;
    asOfDate: Date;
    itemCode?: string;
    itemLocation?: string;
    note?: string;
  }


  export interface IItemIn {
    id:number
    name: string;
    category: number;
    unit: number;
    sp?: number;
    cp?: number;
    openingStock?: number;
    asOfDate: Date;
    itemCode?: string;
    itemLocation?: string;
    note?: string;
  }