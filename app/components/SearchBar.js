'use client';

import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(search.trim());
  };

  return (
    <form onSubmit={handleSearch} className="mb-6">
      <label
        htmlFor="search"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Search
      </label>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          id="search"
          type="text"
          placeholder="Type a name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 text-black rounded-lg p-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}
