import { Fragment, useState } from 'react';
import * as Icon from 'react-feather';
import { NavItem, NavLink } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { handleSearchQuery } from '@src/redux/reducers/navbarReducer';
import { refreshFavouriteDrivers } from '@src/redux/reducers/commandReducer';

const NavbarBookmarks = (props: any) => {
  const { setMenuVisibility } = props;
  const [value, setValue] = useState('');
  const [openSearch, setOpenSearch] = useState(false);
  const dispatch = useDispatch();

  const renderRefresh = () => {
    return (
      <>
        <NavItem className="nav-item d-none d-lg-block">
          <NavLink>
            <Icon.RefreshCcw
              className="ficon"
              onClick={() => {
                dispatch(refreshFavouriteDrivers());
              }}
            />
            {/* <UncontrolledTooltip target={item.target}>{item.title}</UncontrolledTooltip> */}
          </NavLink>
        </NavItem>
      </>
    );
  };

  return (
    <Fragment>
      <ul className="navbar-nav d-xl-none">
        <NavItem className="mobile-menu me-auto">
          <NavLink className="nav-menu-main menu-toggle hidden-xs is-active" onClick={() => setMenuVisibility(true)}>
            <Icon.Menu className="ficon" />
          </NavLink>
        </NavItem>
      </ul>
      <ul className="nav navbar-nav bookmark-icons">{renderRefresh()}</ul>
    </Fragment>
  );
};

export default NavbarBookmarks;
