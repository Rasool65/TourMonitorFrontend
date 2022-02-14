export interface ILayoutReducerState {
  skin: 'dark' | 'bordered' | 'semi-dark' | 'light';
  isRTL: boolean;
  layout: string;
  lastLayout: string;
  menuCollapsed: boolean;
  footerType: 'static' | 'sticky' | 'hidden';
  navbarType: 'static' | 'sticky' | 'hidden' | 'floating';
  menuHidden: boolean;
  contentWidth: string;
  routerTransition: string;
  navbarColor: string;
}
