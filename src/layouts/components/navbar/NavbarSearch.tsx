import { useEffect, useState } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import * as Icon from 'react-feather';
import { NavItem, NavLink } from 'reactstrap';
import { useDispatch } from 'react-redux';

import Autocomplete from '@components/autocomplete';
import { INavbarItem } from './INavbarItem';
import { handleSearchQuery } from '@src/redux/reducers/navbarReducer';

const NavbarSearch = () => {
  const dispatch = useDispatch();

  const [suggestions, setSuggestions] = useState([]);
  const [navbarSearch, setNavbarSearch] = useState(false);

  useEffect(() => {
    axios.get('/api/main-search/data').then(({ data }) => {
      setSuggestions(data.searchArr);
    });
  }, []);

  const handleClearQueryInStore = () => dispatch(handleSearchQuery(''));

  const handleExternalClick = () => {
    if (navbarSearch === true) {
      setNavbarSearch(false);
      handleClearQueryInStore();
    }
  };

  const handleClearInput = (setUserInput: any) => {
    if (!navbarSearch) {
      setUserInput('');
      handleClearQueryInStore();
    }
  };

  const onKeyDown = (e: any) => {
    if (e.keyCode === 27 || e.keyCode === 13) {
      setTimeout(() => {
        setNavbarSearch(false);
        handleClearQueryInStore();
      }, 1);
    }
  };

  const handleSuggestionItemClick = () => {
    setNavbarSearch(false);
    handleClearQueryInStore();
  };

  const handleListItemClick = (func: any, link: any, e: any) => {
    func(link, e);
    setTimeout(() => {
      setNavbarSearch(false);
    }, 1);
    handleClearQueryInStore();
  };

  return (
    <NavItem className="nav-search" onClick={() => setNavbarSearch(true)}>
      <NavLink className="nav-link-search">
        <Icon.Search className="ficon" />
      </NavLink>
      <div
        className={classnames('search-input', {
          open: navbarSearch === true,
        })}
      >
        <div className="search-input-icon">
          <Icon.Search />
        </div>
        {navbarSearch ? (
          <Autocomplete
            className="form-control"
            suggestions={suggestions}
            filterKey="title"
            filterHeaderKey="groupTitle"
            grouped={true}
            placeholder="Search ..."
            autoFocus={true}
            onSuggestionItemClick={handleSuggestionItemClick}
            externalClick={handleExternalClick}
            clearInput={(userInput: any, setUserInput: any) => handleClearInput(setUserInput)}
            onKeyDown={onKeyDown}
            onChange={(e: any) => dispatch(handleSearchQuery(e.target.value))}
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
                  className={classnames('suggestion-item', {
                    active: filteredData.indexOf(item) === activeSuggestion,
                  })}
                  key={i}
                  onClick={(e) => handleListItemClick(onSuggestionItemClick, item.link, e)}
                  onMouseEnter={() => onSuggestionItemHover(filteredData.indexOf(item))}
                >
                  <div
                    className={classnames({
                      'd-flex justify-content-between align-items-center': item.file || item.img,
                    })}
                  >
                    <div className="item-container d-flex">
                      {item.icon ? (
                        <IconTag size={17} />
                      ) : item.file ? (
                        <img src={item.file} height="36" width="28" alt={item.title} />
                      ) : item.img ? (
                        <img className="rounded-circle mt-25" src={item.img} height="28" width="28" alt={item.title} />
                      ) : null}
                      <div className="item-info ms-1">
                        <p className="align-middle mb-0">{item.title}</p>
                        {item.by || item.email ? (
                          <small className="text-muted">{item.by ? item.by : item.email ? item.email : null}</small>
                        ) : null}
                      </div>
                    </div>
                    {item.size || item.date ? (
                      <div className="meta-container">
                        <small className="text-muted">{item.size ? item.size : item.date ? item.date : null}</small>
                      </div>
                    ) : null}
                  </div>
                </li>
              );
            }}
          />
        ) : null}
        <div className="search-input-close">
          <Icon.X
            className="ficon"
            onClick={(e) => {
              e.stopPropagation();
              setNavbarSearch(false);
              handleClearQueryInStore();
            }}
          />
        </div>
      </div>
    </NavItem>
  );
};

export default NavbarSearch;
