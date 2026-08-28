import React from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Newspaper,
  Handshake,
  Medal,
  ExternalLink,
  LogOut,
  X,
  User
} from 'lucide-react';
import type { UserSession } from '../services';
import { logo } from '../assets';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  user: UserSession | null;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpenMobile,
  onCloseMobile,
  user,
  onLogout,
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: LayoutDashboard, badge: undefined },
    { id: 'articles', label: 'Articles & Actualités', icon: Newspaper, badge: 'News' },
    { id: 'sponsors', label: 'Sponsors & Partenaires', icon: Handshake, badge: undefined },
    { id: 'athletes', label: 'Athlètes & Champions', icon: Medal, badge: undefined },
  ];

  const handleSelect = (id: string) => {
    setActiveTab(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 h-full z-50 w-72 bg-white text-slate-700 flex flex-col justify-between border-r border-slate-200/80 transition-transform duration-300 transform ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:h-full lg:z-auto`}
      >
        {/* Top Header & Branding */}
        <div>
          <div className="p-5 border-b border-slate-200/80 flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-3 group focus:outline-none"
              title="Aller sur le site public FNC"
            >
              <div className="w-40 h-auto p-0.5 group-hover:scale-105 transition-transform flex items-center justify-center">
                <img
                  src={logo}
                  alt="Logo FNC"
                  className="w-full h-auto object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            </Link>

            {/* Close Button for Mobile */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden text-slate-400 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-100 transition"
              aria-label="Fermer le menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items List */}
          <nav className="p-3 space-y-1.5 mt-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#bc4209] to-[#9d3606] text-white shadow-md shadow-orange-900/20 translate-x-1'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#154e19]'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-emerald-50 text-[#154e19] border border-emerald-100'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Session & Actions */}
        <div className="p-3 border-t border-slate-200/80 bg-[#f4f6f5]">
          
          {/* Quick link to public website */}
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between p-3 rounded-xl text-xs font-semibold text-slate-600 hover:text-[#154e19] hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 transition mb-3 group"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-[#154e19] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              <span>Voir le site public</span>
            </span>
          </Link>

          {/* Connected User Box */}
          <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-2 shadow-2xs">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#154e19] to-[#bc4209] flex items-center justify-center text-white font-extrabold text-xs shrink-0 shadow-xs">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-slate-900 truncate leading-tight">
                  {user?.name || 'Administrateur FNC'}
                </p>
                <p className="text-[10px] text-[#154e19] font-semibold truncate">
                  {user?.email || 'admin@fnc.ne'}
                </p>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition shrink-0"
              title="Se déconnecter"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};