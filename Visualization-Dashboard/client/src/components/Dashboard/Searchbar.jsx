import React, { useState } from 'react';

export const SearchBar = () => {
 

  // State to manage the search query
  const [query, setQuery] = useState('');

  // Handle the search input change
  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

 

  return (
    <div style={{
        display: 'flex',            // Use flexbox layout
        flexDirection: 'column',    // Stack elements vertically
        alignItems: 'center',       // Center the items horizontally
        justifyContent: 'center',   // Center the items vertically (if needed)
        gap: '20px',                // Add space between the elements
        padding: '20px',            // Add padding around the content
      }}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleSearchChange}
        style={{
          padding: '8px',
          fontSize: '16px',
          width: '200px',
          marginBottom: '20px'
        }}
      />
       
    </div>
  );
};
