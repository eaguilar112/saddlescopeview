'use client';

import { useState, useEffect } from 'react';
import { getAnimals, getAnimalsByName, getExhibits } from '@/app/actions';

export default function Home() {
  const [animals, setAnimals] = useState([]); 
  const [exhibits, setExhibits] = useState([]); 
  const [animalSearch, setAnimalSearch] = useState(''); 

  // Fetch animals and exhibits on component mount
  useEffect(() => {
    fetchAllAnimals();
    fetchAllExhibits();
  }, []);

  // Fetch all animals
  async function fetchAllAnimals() {
    const all = await getAnimals();
    setAnimals(all || []);
  }

  // Fetch all exhibits
  async function fetchAllExhibits() {
    const all = await getExhibits();
    setExhibits(all || []);
  }

  // Handle animal search input changes
  async function handleAnimalInputChange(e) {
    const value = e.target.value;
    setAnimalSearch(value);

    // Reset animals if input is cleared
    if (!value.trim()) {
      const all = await getAnimals();
      setAnimals(all || []);
    }
  }

  // Handle animal search on form submission
  async function handleAnimalSearch(e) {
    e.preventDefault();

    // Fetch all animals if search input is empty
    if (!animalSearch.trim()) {
      fetchAllAnimals();
      return;
    }

    // Fetch animals matching the search term
    const results = await getAnimalsByName(animalSearch);
    setAnimals(results || []);
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl mt-[80px]">
        {/* Page Header */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-2 bg-green-500 rounded-full mr-3"></div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome to Calgary Zoo
            </h1>
          </div>
          <p className="text-gray-700 text-lg">
            Explore our fascinating animals and exhibits below!
          </p>
        </section>

        {/* Animals Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Animals</h2>

          {/* Search Bar */}
          <div className="flex justify-center mb-8">
            <form
              onSubmit={handleAnimalSearch}
              className="flex items-center rounded-full shadow-sm border px-4 py-2 max-w-xl w-full"
            >
              <svg
                className="h-5 w-5 text-gray-400 mr-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.873-4.873m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.627-3.873z"
                />
              </svg>

              <input
                type="text"
                value={animalSearch}
                onChange={handleAnimalInputChange}
                placeholder="Search animals..."
                className="flex-grow focus:outline-none placeholder-gray-500 text-black"
              />

              <button
                type="submit"
                className="bg-yellow-400 text-black font-sans px-4 py-2 rounded-full hover:bg-yellow-500 transition-colors ml-3"
              >
                Search
              </button>
            </form>
          </div>

          {/* Animal Cards */}
          {animals && animals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {animals.map((animal) => (
                <div key={animal.id} className="bg-white rounded-lg shadow p-4">
                  {animal.imageUrl ? (
                    <img
                      src={animal.imageUrl}
                      alt={animal.name}
                      className="w-full h-48 object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                      No image
                    </div>
                  )}
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      {animal.name}
                    </h3>
                    {animal.scientificName && (
                      <p className="text-sm text-gray-500 italic mb-1">
                        {animal.scientificName}
                      </p>
                    )}
                    {animal.exhibit && (
                      <p className="text-sm text-gray-700">
                        Exhibit: {animal.exhibit}
                      </p>
                    )}
                    {animal.location && (
                      <p className="text-sm text-gray-700">
                        Location: {animal.location}
                      </p>
                    )}
                    {animal.funFact && (
                      <p className="text-sm text-gray-600 mt-1">
                        {animal.funFact}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No animals found.</p>
          )}
        </section>

        {/* Exhibits Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Exhibits</h2>
          {exhibits && exhibits.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {exhibits.map((exhibit) => (
                <div
                  key={exhibit.id}
                  className="bg-white rounded-lg shadow p-4"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {exhibit.exhibitName}
                  </h3>
                  {exhibit.description && (
                    <p className="text-sm text-gray-600">
                      {exhibit.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No exhibits found.</p>
          )}
        </section>
      </div>
    </main>
  );
}
