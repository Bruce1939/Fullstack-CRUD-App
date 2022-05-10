import React from 'react';

const Search = ({ search, setSearch }) => {
  return (
    <div className="search">
      <form onSubmit={(e) => e.preventDefault()}>
        <input 
          type="text" 
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </div>
  )
}

export default Search;