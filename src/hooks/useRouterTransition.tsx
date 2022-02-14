import { handleRouterTransition } from '@src/redux/reducers/layoutReducer';
import { RootStateType } from '@src/redux/Store';
import { useDispatch, useSelector } from 'react-redux';

export const useRouterTransition = () => {
  const dispatch = useDispatch();
  const store = useSelector((state: RootStateType) => state.layout);

  const setTransition = (type: string) => {
    dispatch(handleRouterTransition(type));
  };

  return { transition: store.routerTransition, setTransition };
};
