import { handleNavbarColor } from '@src/redux/reducers/layoutReducer';
import { RootStateType } from '@src/redux/Store';
import { useDispatch, useSelector } from 'react-redux';

export const useNavbarColor = () => {
  const dispatch = useDispatch();
  const store = useSelector((state: RootStateType) => state.layout);
  const setNavbarColor = (value: string) => {
    dispatch(handleNavbarColor(value));
  };

  return { navbarColor: store.navbarColor, setNavbarColor };
};
