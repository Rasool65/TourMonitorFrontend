import { Link } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import classnames from 'classnames';
import Autocomplete from '@components/autocomplete';
import {
  NavItem,
  NavLink,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledDropdown,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '@src/redux/Store';
import { handleSearchQuery } from '@src/redux/reducers/navbarReducer';
import { INavbarItem } from './INavbarItem';

const NavbarBookmarks = (props: any) => {
  const { setMenuVisibility } = props;

  const [value, setValue] = useState('');
  const [openSearch, setOpenSearch] = useState(false);
  const dispatch = useDispatch();
  const store = useSelector((state: RootStateType) => state.navbar);
  const renderBookmarks = () => {
    if (store.bookmarks.length) {
      return store.bookmarks
        .map((item) => {
          const IconTag = Icon[item.icon];
          return (
            <NavItem key={item.target} className="d-none d-lg-block">
              <NavLink tag={Link} to={item.link} id={item.target}>
                <IconTag className="ficon" />
                <UncontrolledTooltip target={item.target}>{item.title}</UncontrolledTooltip>
              </NavLink>
            </NavItem>
          );
        })
        .slice(0, 10);
    } else {
      return null;
    }
  };

  const renderRefresh = () => {
    return (
      <>
        <NavItem className="nav-item d-none d-lg-block">
          <NavLink>
            <Icon.RefreshCcw className="ficon" />
            {/* <UncontrolledTooltip target={item.target}>{item.title}</UncontrolledTooltip> */}
          </NavLink>
        </NavItem>
      </>
    );
  };
  const renderExtraBookmarksDropdown = () => {
    if (store.bookmarks.length && store.bookmarks.length >= 11) {
      return (
        <NavItem className="d-none d-lg-block">
          <NavLink tag="span">
            <UncontrolledDropdown>
              <DropdownToggle tag="span">
                <Icon.ChevronDown className="ficon" />
              </DropdownToggle>
              <DropdownMenu end>
                {store.bookmarks
                  .map((item) => {
                    const IconTag = Icon[item.icon];
                    return (
                      <DropdownItem tag={Link} to={item.link} key={item.id}>
                        <IconTag className="me-50" size={14} />
                        <span className="align-middle">{item.title}</span>
                      </DropdownItem>
                    );
                  })
                  .slice(10)}
              </DropdownMenu>
            </UncontrolledDropdown>
          </NavLink>
        </NavItem>
      );
    } else {
      return null;
    }
  };
  const handleClearQueryInStore = () => dispatch(handleSearchQuery(''));
  const onKeyDown = (e: any) => {
    if (e.keyCode === 27 || e.keyCode === 13) {
      setTimeout(() => {
        setOpenSearch(false);
        handleClearQueryInStore();
      }, 1);
    }
  };
  const handleBookmarkUpdate = (id: number) => dispatch(updateBookmarked(id));
  const handleBookmarkVisibility = () => {
    setOpenSearch(!openSearch);
    setValue('');
    handleClearQueryInStore();
  };
  const handleInputChange = (e: any) => {
    setValue(e.target.value);
    dispatch(handleSearchQuery(e.target.value));
  };
  const handleExternalClick = () => {
    if (openSearch === true) {
      setOpenSearch(false);
      handleClearQueryInStore();
    }
  };
  const handleClearInput = (setUserInput: any) => {
    if (!openSearch) {
      setUserInput('');
      handleClearQueryInStore();
    }
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
      <ul className="nav navbar-nav bookmark-icons">
        {renderRefresh()}
        {/* {renderExtraBookmarksDropdown()} */}
        {/* <NavItem className="nav-item d-none d-lg-block">
          <NavLink className="bookmark-star" onClick={handleBookmarkVisibility}>
            <Icon.Star className="ficon text-warning" />
          </NavLink>
          <div className={classnames('bookmark-input search-input', { show: openSearch })}>
            <div className="bookmark-input-icon">
              <Icon.Search size={14} />
            </div>
            {openSearch && store.suggestions.length ? (
              <Autocomplete
                wrapperClass={classnames('search-list search-list-bookmark', {
                  show: openSearch,
                })}
                className="form-control"
                suggestions={!value.length ? store.bookmarks : store.suggestions}
                filterKey="title"
                autoFocus={true}
                defaultSuggestions
                suggestionLimit={!value.length ? store.bookmarks.length : 6}
                placeholder="Search..."
                externalClick={handleExternalClick}
                clearInput={(userInput: any, setUserInput: any) => handleClearInput(setUserInput)}
                onKeyDown={onKeyDown}
                value={value}
                onChange={handleInputChange}
                customRender={(
                  item: INavbarItem,
                  i: any,
                  filteredData: any,
                  activeSuggestion: any,
                  onSuggestionItemClick: any,
                  onSuggestionItemHover: any
                ) => {
                  const IconTag = Icon[item.icon ? item.icon : 'X'];
                  return (
                    <li
                      key={i}
                      onMouseEnter={() => onSuggestionItemHover(filteredData.indexOf(item))}
                      className={classnames('suggestion-item d-flex align-items-center justify-content-between', {
                        active: filteredData.indexOf(item) === activeSuggestion,
                      })}
                    >
                      <Link
                        to={item.link}
                        className="d-flex align-items-center justify-content-between p-0"
                        onClick={() => {
                          setOpenSearch(false);
                          handleClearQueryInStore();
                        }}
                        style={{
                          width: 'calc(90%)',
                        }}
                      >
                        <div className="d-flex justify-content-start align-items-center overflow-hidden">
                          <IconTag size={17.5} className="me-75" />
                          <span className="text-truncate">{item.title}</span>
                        </div>
                      </Link>
                      <Icon.Star
                        size={17.5}
                        className={classnames('bookmark-icon float-end', {
                          'text-warning': item.isBookmarked,
                        })}
                        onClick={() => handleBookmarkUpdate(item.id)}
                      />
                    </li>
                  );
                }}
              />
            ) : null}
          </div>
        </NavItem> */}
      </ul>
    </Fragment>
  );
};

export default NavbarBookmarks;
function updateBookmarked(id: number): any {
  throw new Error('Function not implemented.');
}
