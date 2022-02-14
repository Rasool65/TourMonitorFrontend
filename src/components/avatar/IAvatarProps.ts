export interface IAvatarProps {
  img?: any;
  icon?: any;
  src?: string;
  badgeUp?: boolean;
  content?: string;
  badgeText?: string;
  className?: any;
  imgClassName?: any;
  contentStyles?: object;
  size?: 'sm' | 'lg' | 'xl';
  tag?: any;
  status?: 'online' | 'offline' | 'away' | 'busy';
  imgHeight?: any;
  imgWidth?: any;
  badgeColor?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'info'
    | 'warning'
    | 'dark'
    | 'light-primary'
    | 'light-secondary'
    | 'light-success'
    | 'light-danger'
    | 'light-info'
    | 'light-warning'
    | 'light-dark';
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'info'
    | 'warning'
    | 'dark'
    | 'light-primary'
    | 'light-secondary'
    | 'light-success'
    | 'light-danger'
    | 'light-info'
    | 'light-warning'
    | 'light-dark';
}
