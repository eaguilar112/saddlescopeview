'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createAnimal } from "@/app/actions";

const AnimalForm = () => {
  const [name, setName] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [exhibit, setExhibit] = useState('');
  const [location, setLocation] = useState('');
  const [funFact, setFunFact] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Handle creating a new animal
  const handleCreateAnimal = async () => {
    if (!name) {
      console.error("Name is required");
      return;
    }
    setLoading(true);

    try {
      await createAnimal({
        name,
        scientificName,
        exhibit,
        location,
        funFact,
        imageUrl,
      });

      // Reset form fields after successful creation
      setName('');
      setScientificName('');
      setExhibit('');
      setLocation('');
      setFunFact('');
      setImageUrl('');

      router.refresh(); // Refresh the page to show the updated list
    } catch (error) {
      console.error('Error creating animal:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-6 w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Create Animal</h2>

      {/* Form for creating a new animal */}
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateAnimal();
        }}
      >
        {/* Animal Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            className="w-full border border-gray-300 rounded text-black px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            className="w-full border border-gray-300 rounded text-black px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">
            Paste a direct image link here (e.g. https://... .jpg/.png)
          </p>
        </div>

        {/* Fun Fact */}
        <div>
          <label htmlFor="funFact" className="block text-sm font-medium text-gray-700 mb-1">
            Fun Fact
          </label>
          <textarea
            id="funFact"
            className="w-full border border-gray-300 rounded text-black px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            value={funFact}
            onChange={(e) => setFunFact(e.target.value)}
            rows={4}
          />
        </div>

        {/* Scientific Name */}
        <div>
          <label htmlFor="scientificName" className="block text-sm font-medium text-gray-700 mb-1">
            Scientific Name
          </label>
          <input
            type="text"
            id="scientificName"
            className="w-full border border-gray-300 text-black rounded px-3 py-2"
            value={scientificName}
            onChange={(e) => setScientificName(e.target.value)}
          />
        </div>

        {/* Exhibit */}
        <div>
          <label htmlFor="exhibit" className="block text-sm font-medium text-gray-700 mb-1">
            Exhibit
          </label>
          <input
            type="text"
            id="exhibit"
            className="w-full border border-gray-300 text-black rounded px-3 py-2"
            value={exhibit}
            onChange={(e) => setExhibit(e.target.value)}
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            className="w-full border border-gray-300 text-black rounded px-3 py-2"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white font-medium py-2 px-4 rounded hover:bg-green-700 disabled:opacity-60"
        >
          {loading ? 'Creating...' : 'Create Animal'}
        </button>
      </form>
    </div>
  );
};

export default AnimalForm;
