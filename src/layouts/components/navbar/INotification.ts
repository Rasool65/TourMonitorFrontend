export interface INotification {
  img?: any;
  subtitle?: string;
  title: JSX.Element;
  avatarContent?: any;
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
  switch?: any;
  avatarIcon?: any;
}
