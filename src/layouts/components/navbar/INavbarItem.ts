import * as Icon from 'react-feather';

export interface INavbarItem {
  link: string;
  img: any;
  title: string;
  file: any;
  icon: keyof typeof Icon;
  size: any;
  date: any;
  by: any;
  email: string;
  isBookmarked: any;
  id: number;
}
