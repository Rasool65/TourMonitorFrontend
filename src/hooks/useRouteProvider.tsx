import routes from '../configs/routerConfig/RouterList';

export const useRouteProvider = () => {
  const getRoute = (url: string) => {
    var item = routes.find((o) => o.path == url);
    if (item) return item;
    return null;
  };

  return { getRoute };
};

export default useRouteProvider;
