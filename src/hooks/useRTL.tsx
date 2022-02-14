import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '@src/redux/Store';
import { handleRTL } from '@src/redux/reducers/layoutReducer';

export const useRTL = () => {
  const dispatch = useDispatch();
  const isRtl = useSelector((state: RootStateType) => state.layout.isRTL);

  const setValue = (value: boolean) => {
    dispatch(handleRTL(value));
  };

  useEffect(() => {
    const element = document.getElementsByTagName('html')[0];
    if (isRtl) {
      element.setAttribute('dir', 'rtl');
    } else {
      element.setAttribute('dir', 'ltr');
    }
  }, [isRtl]);

  return [isRtl, setValue];
};
