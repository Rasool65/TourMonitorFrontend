import IRoute from './IRoute';
import RouteType from './RouteType';
import { URL_MAIN, URL_LOGIN } from '../urls';
import Login from '../../pages/authentication/Login';
import Home from '@src/pages/home/Home';

const routes: IRoute[] = [
  {
    path: URL_MAIN,
    component: Home,
    type: RouteType.private,
    props: {
      title: 'Bahman Groups',
    },
  },
  {
    path: URL_LOGIN,
    component: Login,
    type: RouteType.public,
    props: {
      title: 'Bahman Groups Login',
    },
  },
];

export default routes;
