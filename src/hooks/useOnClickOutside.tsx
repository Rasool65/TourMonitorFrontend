import { useEffect } from 'react';

export const useOnClickOutside = (ref: any, handler: any) => {
  useEffect(() => {
    const listener = (ev: any): any => {
      if (!ref.current || ref.current.contains(ev.target)) {
        return;
      }

      handler(ev);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
