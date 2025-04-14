'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  // Dynamic classes based on scroll
  const navClasses = scrolled
    ? 'bg-white shadow-md py-2'
    : 'bg-green-700 py-4';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navClasses}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className={`ml-3 text-xl font-bold ${scrolled ? 'text-green-700' : 'text-white'}`}>
              Calgary Zoo
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                scrolled ? 'text-gray-700 hover:bg-green-600' : 'text-white hover:bg-green-600'
              }`}
            >
              Home
            </Link>
            <a
              href="https://www.calgaryzoo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                scrolled ? 'text-gray-700 hover:bg-green-600' : 'text-white hover:bg-green-600'
              }`}
            >
              Visit Info
            </a>
            <Link
              href="/admin"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                scrolled ? 'text-gray-700 hover:bg-green-600' : 'text-white hover:bg-green-600'
              }`}
            >
              Admin
            </Link>
            <a
              href="https://www.calgaryzoo.com/education/conservation-champions/"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                scrolled
                  ? 'text-gray-700 hover:bg-yellow-300'
                  : 'bg-yellow-400 text-green-700 hover:bg-yellow-300'
              }`}
            >
              Donate
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                scrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-200'
              }`}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          <Link
            href="/"
            onClick={closeMenu}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-600"
          >
            Home
          </Link>
          <a
            href="https://www.calgaryzoo.com/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-600"
          >
            Visit Info
          </a>
          <Link
            href="/admin"
            onClick={closeMenu}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-600"
          >
            Admin
          </Link>
          <a
            href="https://www.calgaryzoo.com/education/conservation-champions/"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 rounded-md text-base font-medium bg-yellow-400 text-green-700 hover:bg-yellow-300"
          >
            Donate
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
