'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { adminLogin, adminLogout } from '@/app/actions';
import AnimalForm from '@/app/components/AnimalForm';
import AnimalList from '@/app/components/AnimalList';
import ExhibitForm from '@/app/components/ExhibitForm';
import ExhibitList from '@/app/components/ExhibitList';

export default function AdminPage() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Check if the user is an admin on component mount
  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
    const res = await fetch('/api/admin-check');
    const data = await res.json();
    setLoggedIn(!!data?.isAdmin);
  }

  // Handle admin login
  async function handleLogin(e) {
    e.preventDefault();
    const result = await adminLogin({ username, password });
    if (result?.success) {
      setLoggedIn(true);
    } else {
      alert(result?.error || 'Invalid credentials');
    }
  }

  // Handle admin logout
  async function handleLogout() {
    await adminLogout();
    setLoggedIn(false);
  }

  // Render login form if the user is not logged in
  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                className="border border-gray-300 rounded px-3 py-2 w-full"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                className="border border-gray-300 rounded px-3 py-2 w-full"
                type="password"
                placeholder="secret123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 w-full text-white py-2 rounded hover:bg-green-700 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render admin dashboard if the user is logged in
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mt-[80px]">
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors mt-[80px]"
          >
            Logout
          </button>
        </div>

        {/* Animals Section */}
        <section className="mt-10">
          <div className="flex items-center mb-6">
            <div className="h-10 w-2 bg-green-500 rounded-full mr-3"></div>
            <h2 className="text-2xl font-bold text-gray-800">Animals</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimalForm />
            <AnimalList initialAnimals={[]} />
          </div>
        </section>

        {/* Exhibits Section */}
        <section className="mt-16">
          <div className="flex items-center mb-6">
            <div className="h-10 w-2 bg-green-500 rounded-full mr-3"></div>
            <h2 className="text-2xl font-bold text-gray-800">Exhibits</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ExhibitForm />
            <ExhibitList initialExhibits={[]} />
          </div>
        </section>
      </div>
    </main>
  );
}
