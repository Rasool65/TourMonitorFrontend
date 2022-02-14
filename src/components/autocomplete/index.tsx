import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Fragment, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { AlertCircle } from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';

import '@styles/base/bootstrap-extended/_include.scss';
import './autocomplete.scss';
import { FunctionComponent } from 'react';
import { IAutocompleteProps } from './IAutocompleteProps';
import { useOnClickOutside } from '@src/hooks/useOnClickOutside';

const Autocomplete: FunctionComponent<IAutocompleteProps> = (props) => {
  const container = useRef(null);
  const inputElRef = useRef<any>(null);
  const suggestionsListRef = useRef(null);

  const [focused, setFocused] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState(props.value ? props.value : '');

  const navigate = useNavigate();
  let filteredData: any[][];

  const onSuggestionItemClick = (url: any, e: any) => {
    setActiveSuggestion(0);
    setShowSuggestions(false);
    setUserInput(filteredData[activeSuggestion][props.filterKey]);
    if (url !== undefined && url !== null) {
      navigate(url);
    }

    if (props.onSuggestionClick) {
      props.onSuggestionClick(url, e);
    }
  };

  const onSuggestionItemHover = (index: number) => {
    setActiveSuggestion(index);
  };

  const onChange = (e: any) => {
    const userInput = e.currentTarget.value;
    setActiveSuggestion(0);
    setShowSuggestions(true);
    setUserInput(userInput);
    if (e.target.value < 1) {
      setShowSuggestions(false);
    }
  };
  const onInputClick = (e: any) => {
    e.stopPropagation();
  };

  const onKeyDown = (e: any) => {
    const filterKey = props.filterKey;
    const suggestionList = ReactDOM.findDOMNode(suggestionsListRef.current) as HTMLInputElement;

    if (e.keyCode === 38 && activeSuggestion !== 0) {
      setActiveSuggestion(activeSuggestion - 1);

      if (e.target.value.length > -1 && suggestionList !== null && activeSuggestion <= filteredData.length / 2) {
        suggestionList.scrollTop = 0;
      }
    } else if (e.keyCode === 40 && activeSuggestion < filteredData.length - 1) {
      setActiveSuggestion(activeSuggestion + 1);

      if (e.target.value.length > -1 && suggestionList !== null && activeSuggestion >= filteredData.length / 2) {
        suggestionList.scrollTop = suggestionList.scrollHeight;
      }
    } else if (e.keyCode === 27) {
      // ** User Pressed ESC
      setShowSuggestions(false);
      setUserInput('');
    } else if (e.keyCode === 13 && showSuggestions) {
      // ** User Pressed ENTER
      onSuggestionItemClick(filteredData[activeSuggestion][filterKey].link, e);
      setUserInput(filteredData[activeSuggestion][filterKey]);
      setShowSuggestions(false);
    } else {
      return;
    }

    // ** Custom Keydown Event
    if (props.onKeyDown !== undefined && props.onKeyDown !== null) {
      props.onKeyDown(e, userInput);
    }
  };

  const renderGroupedSuggestion = (arr: any) => {
    const { filterKey, customRender } = props;

    const renderSuggestion = (item: any, i: number) => {
      if (!customRender) {
        const suggestionURL = item.link !== undefined && item.link !== null ? item.link : null;
        return (
          <li
            className={classnames('suggestion-item', {
              active: filteredData.indexOf(item) === activeSuggestion,
            })}
            key={item[filterKey]}
            onClick={(e) => onSuggestionItemClick(suggestionURL, e)}
            onMouseEnter={() => {
              onSuggestionItemHover(filteredData.indexOf(item));
            }}
          >
            {item[filterKey]}
          </li>
        );
      } else if (customRender) {
        return customRender(item, i, filteredData, activeSuggestion, onSuggestionItemClick, onSuggestionItemHover, userInput);
      } else {
        return null;
      }
    };

    return arr.map((item: any, i: number) => {
      return renderSuggestion(item, i);
    });
  };

  const renderUngroupedSuggestions = () => {
    const { filterKey, suggestions, customRender, suggestionLimit } = props;

    filteredData = [];
    const sortSingleData = suggestions
      .filter((i: any) => {
        const startCondition = i[filterKey].toLowerCase().startsWith(userInput.toLowerCase()),
          includeCondition = i[filterKey].toLowerCase().includes(userInput.toLowerCase());
        if (startCondition) {
          return startCondition;
        } else if (!startCondition && includeCondition) {
          return includeCondition;
        } else {
          return null;
        }
      })
      .slice(0, suggestionLimit);
    filteredData.push(...sortSingleData);
    if (sortSingleData.length) {
      return sortSingleData.map((suggestion: any, index: number) => {
        const suggestionURL = suggestion.link !== undefined && suggestion.link !== null ? suggestion.link : null;
        if (!customRender) {
          return (
            <li
              className={classnames('suggestion-item', {
                active: filteredData.indexOf(suggestion) === activeSuggestion,
              })}
              key={suggestion[filterKey]}
              onClick={(e) => onSuggestionItemClick(suggestionURL, e)}
              onMouseEnter={() => onSuggestionItemHover(filteredData.indexOf(suggestion))}
            >
              {suggestion[filterKey]}
            </li>
          );
        } else if (customRender) {
          return customRender(
            suggestion,
            index,
            filteredData,
            activeSuggestion,
            onSuggestionItemClick,
            onSuggestionItemHover,
            userInput
          );
        } else {
          return null;
        }
      });
    } else {
      return (
        <li className="suggestion-item no-result">
          <AlertCircle size={15} /> <span className="align-middle ms-50">No Result</span>
        </li>
      );
    }
  };

  const renderSuggestions = () => {
    const { filterKey, grouped, filterHeaderKey, suggestions } = props;

    if (grouped === undefined || grouped === null || !grouped) {
      return renderUngroupedSuggestions();
    } else {
      filteredData = [];
      return suggestions.map((suggestion: any) => {
        const sortData = suggestion.data
          .filter((i: any) => {
            const startCondition = i[filterKey].toLowerCase().startsWith(userInput.toLowerCase()),
              includeCondition = i[filterKey].toLowerCase().includes(userInput.toLowerCase());
            if (startCondition) {
              return startCondition;
            } else if (!startCondition && includeCondition) {
              return includeCondition;
            } else {
              return null;
            }
          })
          .slice(0, suggestion.searchLimit);

        filteredData.push(...sortData);
        return (
          <Fragment key={suggestion[filterHeaderKey]}>
            <li className="suggestion-item suggestion-title-wrapper">
              <h6 className="suggestion-title">{suggestion[filterHeaderKey]}</h6>
            </li>
            {sortData.length ? (
              renderGroupedSuggestion(sortData)
            ) : (
              <li className="suggestion-item no-result">
                <AlertCircle size={15} /> <span className="align-middle ms-50">No Result</span>
              </li>
            )}
          </Fragment>
        );
      });
    }
  };

  useEffect(() => {
    if (props.defaultSuggestions && focused) {
      setShowSuggestions(true);
    }
  }, [focused, props.defaultSuggestions]);

  useEffect(() => {
    const textInput = ReactDOM.findDOMNode(inputElRef.current) as HTMLInputElement;

    // ** For searchbar focus
    if (textInput !== null && props.autoFocus) {
      inputElRef.current.focus();
    }

    if (props.defaultSuggestions && focused) {
      setShowSuggestions(true);
    }

    if (props.clearInput) {
      props.clearInput(userInput, setUserInput);
    }

    if (props.onSuggestionsShown && showSuggestions) {
      props.onSuggestionsShown(userInput);
    }
  }, [setShowSuggestions, focused, userInput, showSuggestions, props]);

  useOnClickOutside(container, () => {
    setShowSuggestions(false);
    if (props.externalClick) {
      props.externalClick();
    }
  });

  let suggestionsListComponent;

  if (showSuggestions) {
    suggestionsListComponent = (
      <PerfectScrollbar
        className={classnames(
          'suggestions-list',
          props.wrapperClass && {
            [props.wrapperClass]: props.wrapperClass,
          }
        )}
        ref={suggestionsListRef}
        component="ul"
        options={{ wheelPropagation: false }}
      >
        {renderSuggestions()}
      </PerfectScrollbar>
    );
  }

  return (
    <div className="autocomplete-container" ref={container}>
      <input
        type="text"
        onChange={(e) => {
          onChange(e);
          if (props.onChange) {
            props.onChange(e);
          }
        }}
        onKeyDown={(e) => onKeyDown(e)}
        value={userInput}
        className={`autocomplete-search ${props.className ? props.className : ''}`}
        placeholder={props.placeholder}
        onClick={onInputClick}
        ref={inputElRef}
        onFocus={() => setFocused(true)}
        autoFocus={props.autoFocus}
        onBlur={(e) => {
          if (props.onBlur) props.onBlur(e);
          setFocused(false);
        }}
      />
      {suggestionsListComponent}
    </div>
  );
};

export default Autocomplete;
