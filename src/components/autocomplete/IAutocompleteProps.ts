export interface IAutocompleteProps {
  grouped?: boolean;
  autoFocus: boolean;
  onKeyDown: any;
  onChange: any;
  clearInput: any;
  placeholder: string;
  externalClick: any;
  defaultValue?: string;
  wrapperClass?: string;
  filterHeaderKey?: any;
  suggestionLimit?: number;
  onSuggestionsShown?: any;
  onSuggestionClick?: any;
  onSuggestionItemClick?: any;
  filterKey?: any;
  suggestions: any;
  className: string;
  value?: any;
  customRender?: any;
  defaultSuggestions?: any;
  onBlur?: any;
}
export default IAutocompleteProps;
