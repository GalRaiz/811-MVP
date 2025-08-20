import React from 'react';
import './SearchBar.scss';

interface ISearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchBar: React.FC<ISearchBarProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <input
      type='text'
      value={searchQuery}
      onChange={e => onSearchChange(e.target.value)}
      placeholder='חיפוש במערכת...'
      className='search-bar'
    />
  );
};

export default SearchBar;
