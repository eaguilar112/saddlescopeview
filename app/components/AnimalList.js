'use client';

import { useState, useEffect } from 'react';
import { getAnimalsByName, deleteAnimal, updateAnimal } from '@/app/actions';

export default function AnimalList({ initialAnimals }) {
  const [animals, setAnimals] = useState(initialAnimals || []);
  const [editId, setEditId] = useState(null);
  const [editFields, setEditFields] = useState({
    name: '',
    scientificName: '',
    exhibit: '',
    location: '',
    funFact: '',
    imageUrl: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Refresh the animal list every 5 seconds if no search term is active
  useEffect(() => {
    if (!searchTerm) {
      const interval = setInterval(async () => {
        const refreshed = await getAnimalsByName('');
        setAnimals(refreshed || []);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [searchTerm]);

  // Update the animal list when the initialAnimals prop changes
  useEffect(() => {
    setAnimals(initialAnimals || []);
  }, [initialAnimals]);

  // Fetch animals based on the search term
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      const allAnimals = await getAnimalsByName('');
      setAnimals(allAnimals || []);
      return;
    }

    try {
      const results = await getAnimalsByName(searchTerm);
      setAnimals(results || []);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  // Clear the search input and reset the animal list
  const handleClearSearch = () => {
    setSearchTerm('');
    setAnimals(initialAnimals || []);
  };

  // Delete an animal from the list
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this animal?')) return;
    try {
      await deleteAnimal(id);
      setAnimals((prev) => prev.filter((animal) => animal.id !== id));
    } catch (error) {
      console.error('Error deleting animal:', error);
    }
  };

  // Enter edit mode for a specific animal
  const handleEditClick = (animal) => {
    setEditId(animal.id);
    setEditFields({
      name: animal.name || '',
      scientificName: animal.scientificName || '',
      exhibit: animal.exhibit || '',
      location: animal.location || '',
      funFact: animal.funFact || '',
      imageUrl: animal.imageUrl || '',
    });
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setEditId(null);
    setEditFields({
      name: '',
      scientificName: '',
      exhibit: '',
      location: '',
      funFact: '',
      imageUrl: '',
    });
  };

  // Save changes to an animal
  const handleSaveEdit = async () => {
    try {
      const updated = await updateAnimal({
        id: editId,
        ...editFields,
      });
      setAnimals((prev) =>
        prev.map((animal) => (animal.id === editId ? updated : animal))
      );
      setEditId(null);
    } catch (error) {
      console.error('Error updating animal:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full">
      {/* Search bar for filtering animals */}
      <div className="mb-6">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
          Search for Animals
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            id="search"
            type="text"
            placeholder="Search by name..."
            className="border border-gray-300 rounded p-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
          <button
            onClick={handleClearSearch}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Display the list of animals */}
      {Array.isArray(animals) && animals.length > 0 ? (
        <div className="overflow-y-auto max-h-[800px]">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {animals.map((animal) => (
              <li
                key={animal.id}
                className="border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col"
              >
                {editId === animal.id ? (
                  <div className="p-4 flex-1 flex flex-col space-y-3">
                    {editFields.imageUrl ? (
                      <img
                        src={editFields.imageUrl}
                        alt={editFields.name}
                        className="w-full h-48 object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                        No image
                      </div>
                    )}

                    <input
                      className="w-full border border-gray-300 rounded px-2 py-1"
                      placeholder="Name"
                      value={editFields.name}
                      onChange={(e) =>
                        setEditFields({ ...editFields, name: e.target.value })
                      }
                    />
                    <input
                      className="w-full border border-gray-300 rounded px-2 py-1"
                      placeholder="Scientific Name"
                      value={editFields.scientificName}
                      onChange={(e) =>
                        setEditFields({
                          ...editFields,
                          scientificName: e.target.value,
                        })
                      }
                    />
                    <input
                      className="w-full border border-gray-300 rounded px-2 py-1"
                      placeholder="Exhibit"
                      value={editFields.exhibit}
                      onChange={(e) =>
                        setEditFields({ ...editFields, exhibit: e.target.value })
                      }
                    />
                    <input
                      className="w-full border border-gray-300 rounded px-2 py-1"
                      placeholder="Location"
                      value={editFields.location}
                      onChange={(e) =>
                        setEditFields({ ...editFields, location: e.target.value })
                      }
                    />
                    <textarea
                      className="w-full border border-gray-300 rounded px-2 py-1"
                      rows={3}
                      placeholder="Fun Fact"
                      value={editFields.funFact}
                      onChange={(e) =>
                        setEditFields({ ...editFields, funFact: e.target.value })
                      }
                    />
                    <input
                      className="w-full border border-gray-300 rounded px-2 py-1"
                      placeholder="Image URL"
                      value={editFields.imageUrl}
                      onChange={(e) =>
                        setEditFields({ ...editFields, imageUrl: e.target.value })
                      }
                    />

                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={handleSaveEdit}
                        className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex-1 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {animal.imageUrl ? (
                      <img
                        src={animal.imageUrl}
                        alt={animal.name}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                        No image
                      </div>
                    )}

                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {animal.name}
                      </h3>
                      {animal.scientificName && (
                        <p className="text-sm text-gray-500 italic mb-1">
                          {animal.scientificName}
                        </p>
                      )}
                      {animal.exhibit && (
                        <p className="text-sm text-gray-700 mb-1">
                          Exhibit: {animal.exhibit}
                        </p>
                      )}
                      {animal.location && (
                        <p className="text-sm text-gray-700 mb-1">
                          Location: {animal.location}
                        </p>
                      )}
                      {animal.funFact && (
                        <p className="text-sm text-gray-600">{animal.funFact}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-auto">
                      <button
                        onClick={() => handleEditClick(animal)}
                        className="bg-blue-600 text-white py-2 hover:bg-blue-700 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(animal.id)}
                        className="bg-red-600 text-white py-2 hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500 italic">No animals found.</p>
      )}
    </div>
  );
}
