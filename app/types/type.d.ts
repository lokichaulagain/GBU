export interface INavItem {
  name: string;
  href?: any;
  icon?: any;
  subLinks?: ISubLink[];
}

export interface ISubLink {
  title?: string;
  href?: any;
}
