export namespace SidebarType {
  export interface IProps {
    className: string;
    bodyClassName: string;
    open: boolean;
    title: string;
    contentClassName: string;
    wrapperClassName: string;
    closeBtn: any;
    children: any;
    size: 'sm' | 'lg';
    toggleSidebar: () => void;
    width: number | string;
    headerClassName: string;
  }
}
