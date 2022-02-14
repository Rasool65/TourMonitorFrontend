import { handleNavbarType } from '@src/redux/reducers/layoutReducer';
import { RootStateType } from '@src/redux/Store';
import { useDispatch, useSelector } from 'react-redux';

export const useNavbarType = () => {
  const dispatch = useDispatch();
  const store = useSelector((state: RootStateType) => state.layout);
  const setNavbarType = (type: string) => {
    dispatch(handleNavbarType(type));
  };

  return { navbarType: store.navbarType, setNavbarType };
};
