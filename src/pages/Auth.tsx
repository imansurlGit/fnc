import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { authService } from '../services';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Rediriger automatiquement si déjà connecté
  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await authService.login(username, password);
      navigate('/admin');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Échec de la connexion. Veuillez vérifier vos identifiants.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 text-slate-100 flex items-center justify-center p-4 sm:p-6 font-sans relative overflow-hidden">
      
      {/* Background Image avec dégradé progressif (Site Hero overlay) */}
      <div className="absolute inset-0 z-0">
        {/* Dégradé aux couleurs de la FNC */}
        {/* <div className="absolute inset-0 bg-gradient-to-tr from-slate-300 via-slate-600/85 to-[#154e19]/50" /> */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-transparent to-slate-500/80" /> */}
      </div>

      <div className="relative z-10 w-full max-w-md">
        
        {/* Header Logo & Titre */}
        <div className="flex justify-center mb-6 sm:mb-8">
            <img
              src="/logo.png"
              alt="FNC Logo"
              className="h-22 w-auto object-contain rounded-full"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
        </div>

        {/* Login Card aux couleurs du site */}
        <div className="bg-[#f4f6f5] text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden border border-white/20">
          
          {/* Bande d'accentuation en haut (Terracotta & Vert Niger) */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#bc4209] via-[#154e19] to-[#bc4209]" />

          {/* Error Message Alert */}
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-3 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Erreur de connexion</p>
                <p className="mt-0.5 font-medium text-red-700">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
              >
                Nom d'utilisateur
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#154e19] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Entrez votre nom d'utilisateur"
                  className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#bc4209] focus:ring-1 focus:ring-[#bc4209] transition-all font-medium shadow-2xs"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  Mot de passe
                </label>
              </div>

              <div className="relative">
                <Lock className="w-4 h-4 text-[#154e19] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-10 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#bc4209] focus:ring-1 focus:ring-[#bc4209] transition-all font-medium shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition cursor-pointer"
                  title={showPassword ? 'Masquer' : 'Afficher'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-300 bg-white text-[#bc4209] focus:ring-[#bc4209]"
                />
                <span className="font-semibold">Se souvenir de moi</span>
              </label>
            </div>

            {/* Submit Button aux couleurs Terracotta du site */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#bc4209] hover:bg-[#9d3606] text-white font-extrabold py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-orange-950/30 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Connexion en cours...</span>
                </>
              ) : (
                <>
                  <span>Se connecter</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Back Link */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-xs font-bold text-slate-700 hover:text-slate-400 transition inline-flex items-center gap-1.5"
          >
            <span>← Retour à l'accueil du site public</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
