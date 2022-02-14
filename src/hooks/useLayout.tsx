import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '@src/redux/Store';
import { handleLastLayout, handleLayout } from '@src/redux/reducers/layoutReducer';

export const useLayout = () => {
  const dispatch = useDispatch();
  const store = useSelector((state: RootStateType) => state.layout);

  const setLayout = (value: string) => {
    dispatch(handleLayout(value));
  };

  const setLastLayout = (value: string) => {
    dispatch(handleLastLayout(value));
  };

  if (window) {
    const breakpoint = 1200;

    if (window.innerWidth < breakpoint) {
      setLayout('vertical');
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth <= breakpoint && store.lastLayout !== 'vertical' && store.layout !== 'vertical') {
        setLayout('vertical');
      }
      if (window.innerWidth >= breakpoint && store.lastLayout !== store.layout) {
        setLayout(store.lastLayout);
      }
    });
  }

  return { layout: store.layout, setLayout, lastLayout: store.lastLayout, setLastLayout };
};
