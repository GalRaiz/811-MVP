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
    <div className="search-container">
      <div className="search-input-wrapper">
        <div className="search-icon">
          {Icons.search}
        </div>
        <input
          type='text'
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          placeholder={getPlaceholder()}
          className='search-bar'
          dir="rtl"
        />
        {searchQuery && (
          <Button
            type="icon-only"
            size="small"
            onClick={handleClearSearch}
            icon={
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            }
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
