import React, { useState } from 'react';
import {
  Menu,
  Bell,
  User,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import type { UserSession } from '../services';

interface HeaderAdminProps {
  activeTab: string;
  onOpenMobileSidebar: () => void;
  user: UserSession | null;
  onLogout: () => void;
  onQuickAction?: () => void;
}

export const HeaderAdmin: React.FC<HeaderAdminProps> = ({
  onOpenMobileSidebar,
  user,
  onLogout,
}) => {
  const [showNotifs, setShowNotifs] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200/80 shadow-2xs py-3.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left Section: Mobile Menu & Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition focus:outline-none"
            aria-label="Ouvrir le menu latéral"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Right Section: Actions, Notifications & Profile Dropdown */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Notifications Dropdown */}
          {/* <div className="relative">
            <button
              onClick={() => setShowNotifs(!showNotifs)}
              className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition focus:outline-none cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#bc4209] rounded-full ring-2 ring-white animate-pulse" />
            </button>

            {showNotifs && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-fadeIn text-slate-800">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#bc4209]" /> Notifications Back-Office
                  </h4>
                  <span className="text-[10px] font-bold bg-orange-100 text-[#bc4209] px-2 py-0.5 rounded-full">
                    2 nouvelles
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#154e19] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-900">Championnat National Maradi 2026</p>
                      <p className="text-slate-500 text-[11px] mt-0.5">Le programme officiel a été mis à jour par la direction technique.</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#bc4209] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-900">Session Administrateur active</p>
                      <p className="text-slate-500 text-[11px] mt-0.5">Mock API actif (mode hors-ligne & sauvegarde locale).</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowNotifs(false)}
                  className="w-full mt-3 text-center text-xs font-bold text-slate-500 hover:text-slate-800 py-1.5 rounded-lg hover:bg-slate-50 transition cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            )}
          </div> */}

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 border border-slate-200/80 transition focus:outline-none cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#bc4209] to-[#154e19] text-white font-black text-xs flex items-center justify-center shadow-2xs">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-extrabold text-slate-900 leading-tight">
                  {user?.name || 'Administrateur FNC'}
                </p>
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                  {user?.role || 'ADMIN'}
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-fadeIn text-slate-800">
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900">{user?.name || 'Administrateur FNC'}</p>
                  <p className="text-[11px] text-slate-500 truncate">{user?.email || 'admin@fnc.ne'}</p>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onLogout();
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition flex items-center gap-2 cursor-pointer"
                  >
                    <User className="w-4 h-4 text-red-500" />
                    <span>Se déconnecter</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
