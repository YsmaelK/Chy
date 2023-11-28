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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundImage: 'url("https://www.swindonalexandrahouse.co.uk/wp-content/uploads/2021/08/suprise-party-ideas.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
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
              width: '300px',
              backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjust the width as needed
            }}
          />
          <button type="submit" className="search-button1" style={{ background: 'transparent', border: 'none' }}>
            <SearchIcon />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;

