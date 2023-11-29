import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Search.css";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            navigate(`/list?title=${searchTerm}`)
        }
    };
    const handleChange = (event) => {
      setSearchTerm(event.target.value);
    };

  return (
    <input className='search' type="text" placeholder="Search" value={searchTerm} onChange={handleChange} onKeyDown={handleKeyDown} />
  );
};

export default Search;