'use client'

import { useState, useEffect } from 'react';

export default function ExhibitList({ initialExhibits }) {
  const [exhibits, setExhibits] = useState(initialExhibits || []);

  // Optionally, use useEffect to reset exhibits when initialExhibits change
  useEffect(() => {
    setExhibits(initialExhibits || []);
  }, [initialExhibits]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      {Array.isArray(exhibits) && exhibits.length > 0 ? (
        <ul className="space-y-4">
          {exhibits.map((exhibit) => (
            <li key={exhibit.id} className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800">{exhibit.exhibitName}</h3>
              <p className="text-sm text-gray-500 italic">Scientific Name: {exhibit.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No exhibits found.</p>
      )}
    </div>
  );
}
