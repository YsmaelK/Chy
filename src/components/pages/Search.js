import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
    setSearchQuery('');
    navigate('/search-results');
  };

  return (
    <div className="search-container1">
      <form onSubmit={handleSearch}>
        <div className="search-bar1">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '0.5rem',
              fontSize: '1rem',
              border: '1px solid #ccc',
              borderRadius: '5px',
              width: '300px', // Adjust the width as needed
            }}
          />
          <button type="submit" className="search-button1">
            <SearchIcon />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;

