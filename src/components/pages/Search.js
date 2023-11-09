import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate  } from 'react-router-dom'; // Import the useHistory hook

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
    setSearchQuery('');
    navigate('/search-results'); // Navigate to the search results page
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            <SearchIcon />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
