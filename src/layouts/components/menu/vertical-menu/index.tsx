import { Fragment, useState, useRef } from 'react';
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import VerticalMenuHeader from './VerticalMenuHeader';

const Sidebar = (props: any) => {
  const { menuCollapsed, routerProps, menu, currentActiveItem, skin, menuData } = props;

  const [groupOpen, setGroupOpen] = useState([]);
  const [menuHover, setMenuHover] = useState(false);

  const shadowRef: any = useRef(null);
  const onMouseEnter = () => {
    setMenuHover(true);
  };
  const scrollMenu = (container: any) => {
    if (shadowRef && container.scrollTop > 0) {
      if (!shadowRef.current.classList.contains('d-block')) {
        shadowRef.current.classList.add('d-block');
      }
    } else {
      if (shadowRef.current.classList.contains('d-block')) {
        shadowRef.current.classList.remove('d-block');
      }
    }
  };

  return (
    <Fragment>
      <div
        className={classnames('main-menu menu-fixed menu-accordion menu-shadow', {
          expanded: menuHover || menuCollapsed === false,
          'menu-light': skin !== 'semi-dark' && skin !== 'dark',
          'menu-dark': skin === 'semi-dark' || skin === 'dark',
        })}
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => setMenuHover(false)}
      >
        {menu ? (
          menu
        ) : (
          <Fragment>
            <VerticalMenuHeader setGroupOpen={setGroupOpen} menuHover={menuHover} {...props} />
            <div className="shadow-bottom" ref={shadowRef}></div>
            <PerfectScrollbar
              className="main-menu-content"
              options={{ wheelPropagation: false }}
              onScrollY={(container) => scrollMenu(container)}
            >
              car list
            </PerfectScrollbar>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Sidebar;
