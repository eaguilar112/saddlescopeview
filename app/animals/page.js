'use client';

import { useState, useEffect } from 'react';
import { getAnimals, getAnimalsByName } from '@/app/actions';
import Image from 'next/image';

export default function AnimalsPage() {
  const [animals, setAnimals] = useState([]);
  const [animalSearch, setAnimalSearch] = useState('');

  // On initial mount, fetch all animals
  useEffect(() => {
    fetchAllAnimals();
  }, []);

  async function fetchAllAnimals() {
    const all = await getAnimals();
    setAnimals(all || []);
  }

  // Whenever the user edits the search input
  async function handleAnimalInputChange(e) {
    const value = e.target.value;
    setAnimalSearch(value);

    // If input is now empty, reset the list automatically
    if (!value.trim()) {
      const all = await getAnimals();
      setAnimals(all || []);
    }
  }

  // When user clicks the Search button or presses Enter
  async function handleAnimalSearch(e) {
    e.preventDefault();
    if (!animalSearch.trim()) {
      // If user cleared search, fetch all
      fetchAllAnimals();
      return;
    }
    // Otherwise search by name
    const results = await getAnimalsByName(animalSearch);
    setAnimals(results || []);
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      {/* Adjust margin-top if your navbar is fixed */}
      <div className="container mx-auto px-4 max-w-5xl mt-[80px]">
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-2 bg-green-500 rounded-full mr-3"></div>
            <h1 className="text-3xl font-bold text-gray-800">
              Animals
            </h1>
          </div>
          <p className="text-gray-700 text-lg">
            Explore our fascinating animals below!
          </p>
        </section>

        {/* Fancy Search Bar */}
        <div className="flex justify-center mb-8">
          <form
            onSubmit={handleAnimalSearch}
            className="flex items-center rounded-full shadow-sm border px-4 py-2 max-w-xl w-full"
          >
            {/* Search icon */}
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
              className="flex-grow focus:outline-none placeholder-gray-500 text-black font-semibold"
            />
            <button
              type="submit"
              className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-full hover:bg-yellow-500 transition-colors ml-3"
            >
              Search
            </button>
          </form>
        </div>

        {animals && animals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {animals.map((animal) => (
              <div key={animal.id} className="bg-white rounded-lg shadow p-4">
                {animal.imageUrl ? (
                  <Image
                    src={animal.imageUrl}
                    alt={animal.name}
                    width={500}
                    height={192}
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
      </div>
    </main>
  );
}
