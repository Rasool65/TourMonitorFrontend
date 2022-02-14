import * as Icon from 'react-feather';

export interface IBookmarks {
  id: number;
  target: string;
  isBookmarked: boolean;
  title: string;
  icon: keyof typeof Icon;
  link: string;
}
