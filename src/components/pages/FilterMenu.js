import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FilterMenu = ({ onFilterChange }) => {
  const navigate = useNavigate();

  const handleChange = (event) => {
    const selectedFilter = event.target.value;
    onFilterChange(selectedFilter);
    navigate(`/filter-results/${selectedFilter.toLowerCase()}`);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="filter-label">Filter By</InputLabel>
      <Select labelId="filter-label" id="filter-select" onChange={handleChange}>
        <MenuItem value="concert">Concert</MenuItem>
        <MenuItem value="sport">Sports</MenuItem>
        <MenuItem value="event">Events</MenuItem>
      </Select>
    </FormControl>
  );
};

export default FilterMenu;