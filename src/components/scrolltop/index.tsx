// ** React Imports
import { useEffect, useState } from 'react';

// ** Third Party Components
import Proptypes from 'prop-types';
import { FunctionComponent } from 'react';

export interface IClassName {
  className: any;
  showOffset: any;
  scrollBehaviour?: any;
  children: any;
}

const ScrollTop: FunctionComponent<IClassName> = (props) => {
  // ** Props
  // const { showOffset, scrollBehaviour, children, ...rest } = props;

  // ** State
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

// ** PropTypes
ScrollTop.propTypes = {
  showOffset: Proptypes.number,
  children: Proptypes.any.isRequired,
  scrollBehaviour: Proptypes.oneOf(['smooth', 'instant', 'auto']),
};

ScrollTop.defaultProps = {
  scrollBehaviour: 'smooth',
};
