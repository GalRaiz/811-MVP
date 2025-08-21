import React from 'react';
import './SearchBar.scss';
import Button from './Button/Button';
import { Icons } from './icons/EmojiIcons';

interface ISearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterClick?: () => void;
  showFilterButton?: boolean;
  searchField?: string; // Field to search on (e.g., "requestDetails.requestName")
  placeholder?: string;
}

const SearchBar: React.FC<ISearchBarProps> = ({
  searchQuery,
  onSearchChange,
  onFilterClick,
  showFilterButton = false,
  searchField,
  placeholder,
}) => {
  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    if (searchField) {
      const fieldName = searchField.split('.').pop() || searchField;
      return `חפש ב${fieldName.toLowerCase()}...`;
    }
    return 'חפש בכל השדות...';
  };

  const handleClearSearch = () => {
    onSearchChange('');
  };

  return (
    <div className="search-bar">
      <div className="search-bar__input-wrapper">
        <div className="search-bar__icon">{Icons.search}</div>
        <input
          type="text"
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          placeholder={getPlaceholder()}
          className="search-bar__input"
          dir="rtl"
        />
        {searchQuery && (
          <Button
            type="icon-only"
            size="small"
            onClick={handleClearSearch}
            icon={Icons.close}
          />
        )}
      </div>
      {showFilterButton && (
        <Button
          onClick={onFilterClick}
          size="small"
          type="secondary"
          btnText="Filter"
          icon={Icons.filter}
        />
      )}
    </div>
  );
};

export default SearchBar;
