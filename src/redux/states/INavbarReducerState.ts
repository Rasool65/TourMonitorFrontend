import { IBookmarks } from './IBookmarks';

export interface INavbarReducerState {
  query: string;
  suggestions: any;
  bookmarks: IBookmarks[];
}
