import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Accueil' },
    { path: '/apropos', label: 'À propos' },
    { path: '/activites', label: 'Activités' },
    { path: '/historique', label: 'Historique' },
    { path: '/leaders', label: 'Nos champions' },
    { path: '/ecole', label: 'Ecole' },
    { path: '/blog', label: 'Blog' },
  ];

  return (
    <header className="bg-[#d4d4d4] sticky top-0 z-50 text-[#e04f00] shadow-md font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">

          {/* Brand Link */}
          <Link
            to="/"
            className="cursor-pointer font-extrabold text-base sm:text-lg tracking-tight text-white flex items-center gap-2 hover:opacity-95 transition"
          >
            <img src="logo.png" alt="logo" className="h-10 w-auto object-contain rounded-full" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#154e19] text-white font-bold shadow-sm'
                      : 'text-[#8b3200] hover:text-white hover:bg-[#154e19]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              to="/sponsor"
              className="bg-[#154e19] hover:bg-[#0e3911] text-white text-xs sm:text-sm font-bold px-4 py-1.5 rounded-md shadow transition duration-200"
            >
              Sponsor
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#8b3200] hover:text-white hover:bg-[#154e19] rounded-lg transition"
              aria-label="Menu Mobile"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#154e19] border-t border-white/10 px-4 pt-3 pb-5 space-y-1.5 animate-fadeIn">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-[#bc4209] text-white font-bold'
                    : 'text-white/90 hover:bg-white/20 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="pt-3 border-t border-white/10">
            <Link
              to="/sponsor"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full bg-[#bc4209] hover:bg-[#9d3606] text-white font-bold py-2.5 rounded-md text-sm text-center transition"
            >
              Sponsor
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};