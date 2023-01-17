import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import themeConfig from '@configs/theme/themeConfig';

const VerticalMenuHeader = (props: any) => {
  const { menuCollapsed, setMenuCollapsed, setMenuVisibility, setGroupOpen, menuHover } = props;
  useEffect(() => {
    if (!menuHover && menuCollapsed) setGroupOpen([]);
  }, [menuHover, menuCollapsed]);

  return (
    <div className="navbar-header">
      <ul className="nav navbar-nav flex-row">
        <li className="nav-item me-auto">
          <NavLink to="/" className="navbar-brand">
            <span className="brand-logo">
              <img src={themeConfig.app.appLogo} alt="logo" />
            </span>
            <h2 className="brand-text mb-0">{'BAHMAN'}</h2>
          </NavLink>
        </li>
        {/* <li className="nav-item nav-toggle">
          <div className="nav-link modern-nav-toggle cursor-pointer">
            <Toggler />
            <X onClick={() => setMenuVisibility(false)} className="toggle-icon icon-x d-block d-xl-none" size={20} />
          </div>
        </li> */}
      </ul>
    </div>
  );
};

export default VerticalMenuHeader;
