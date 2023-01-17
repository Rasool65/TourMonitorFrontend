import { useEffect, useState } from 'react';
import { FunctionComponent } from 'react';

export interface IClassName {
  className: any;
  showOffset: any;
  scrollBehaviour?: any;
  children: any;
}

const ScrollTop: FunctionComponent<IClassName> = (props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window) {
      window.addEventListener('scroll', () => {
        if (window.pageYOffset >= props.showOffset) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      });
    }
  }, []);

  const handleScrollToTop = () => {
    window.scroll({ top: 0, behavior: props.scrollBehaviour });
  };

  return visible ? (
    <div className={props.className}>
      <div className="scroll-to-top" onClick={handleScrollToTop}>
        {props.children}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ScrollTop;

ScrollTop.defaultProps = {
  scrollBehaviour: 'smooth',
};
