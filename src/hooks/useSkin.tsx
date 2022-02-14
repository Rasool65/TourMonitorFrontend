import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '@src/redux/Store';
import { handleSkin } from '@src/redux/reducers/layoutReducer';

export const useSkin = () => {
  const dispatch = useDispatch();
  const store = useSelector((state: RootStateType) => state.layout);

  const setSkin = (type: string) => {
    dispatch(handleSkin(type));
  };

  useEffect(() => {
    const element = window.document.body;

    const classNames = {
      dark: 'dark-layout',
      bordered: 'bordered-layout',
      'semi-dark': 'semi-dark-layout',
    };

    element.classList.remove(...element.classList);

    if (store.skin !== 'light') {
      element.classList.add(classNames[store.skin]);
    }
  }, [store.skin]);

  return { skin: store.skin, setSkin };
};
