import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ChevronRight, 
  Calendar,
  Newspaper
} from 'lucide-react';
import type { Article, AccueilProps } from '../types';
import { articleService } from '../services';
import { EmptyState } from '../components/EmptyState';
import { hero } from '../assets';

export const AccueilPage: React.FC<AccueilProps> = ({ onSelectArticle }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = () => {
    setLoading(true);
    setError(null);
    articleService.getArticles()
      .then((data) => {
        setArticles(data);
      })
      .catch((err) => {
        console.error('Erreur chargement articles sur l\'accueil:', err);
        setError('Impossible de charger les actualités.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const featuredArticle = articles[0];
  const secondArticle = articles[1];
  const thirdArticle = articles[2];

  return (
    <div className="bg-[#f4f6f5] text-slate-900 min-h-screen font-sans antialiased">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen min-h-[650px] bg-slate-400 flex items-start sm:items-center overflow-hidden px-4 sm:px-6 lg:px-8 border-b border-slate-800 pt-16 sm:pt-0">
        
        {/* Image de fond avec overlay progressif */}
        <div className="absolute inset-0 z-0">
          <img
            src={hero}
            alt="Peloton de la Fédération Nigérienne de Cyclisme"
            className="w-full h-full object-cover object-center lg:object-[70%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/80 to-transparent lg:to-slate-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full -mt-4 sm:-mt-12 lg:-mt26">
          <div className="max-w-2xl space-y-5 sm:space-y-7">

            {/* Titre & Sous-titre */}
            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-wider uppercase leading-none font-serif text-white whitespace-nowrap flex items-center gap-2 sm:gap-3">
                <span>CYCLISME</span>
                <span className="text-[#bc4209] font-light">|</span>
                <span>NIGER</span>
              </h1>
              <h2 className="text-base sm:text-xl lg:text-2xl font-semibold text-[#30A836] tracking-wide">
                L'Excellence Cycliste au Cœur du Sahel & de l'AES
              </h2>
            </div>

            {/* Citation élégante */}
            <p className="border-l-2 border-[#bc4209] pl-4 py-1 text-slate-300 text-xs sm:text-base font-normal leading-relaxed italic max-w-xl">
              « Porté par l'Alliance des États du Sahel et la relance institutionnelle de la FNC, le cyclisme au Niger s'impose comme un puissant vecteur d'unité nationale, de résurrection sportive et d'autonomie. »
            </p>

            {/* Bloc Événement & Date */}
            <div className="pt-1 gap-12 flex flex-col items-start">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2.5">
                <Calendar className="w-4 h-4 text-[#bc4209]" />
                <span>6ème Édition Championnat National — Maradi 2026</span>
              </div>
              
              <div className="inline-flex gap-2.5 sm:gap-3 bg-slate-900/60 backdrop-blur-md p-2 rounded-2xl border border-white/10 shadow-xl">
                <div className="bg-white/5 border border-white/5 rounded-xl px-3.5 sm:px-4 py-1.5 sm:py-2 text-center min-w-[65px] sm:min-w-[70px]">
                  <span className="block text-xl sm:text-2xl font-black text-amber-400 leading-none">16</span>
                  <span className="text-[8px] sm:text-[9px] uppercase font-semibold text-slate-400 tracking-widest">Jour</span>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-xl px-3.5 sm:px-4 py-1.5 sm:py-2 text-center min-w-[65px] sm:min-w-[70px]">
                  <span className="block text-base sm:text-lg font-black text-white leading-none uppercase mt-0.5">Sept.</span>
                  <span className="text-[8px] sm:text-[9px] uppercase font-semibold text-slate-400 tracking-widest">Mois</span>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-xl px-3.5 sm:px-4 py-1.5 sm:py-2 text-center min-w-[65px] sm:min-w-[70px]">
                  <span className="block text-base sm:text-lg font-black text-[#30A836] leading-none mt-0.5">2026</span>
                  <span className="text-[8px] sm:text-[9px] uppercase font-semibold text-slate-400 tracking-widest">Année</span>
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-1">
              <Link
                to="/activites"
                className="bg-[#bc4209] hover:bg-[#9d3606] text-white font-bold px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm uppercase tracking-widest transition-all shadow-lg hover:shadow-orange-950/50 flex items-center justify-center gap-2 group"
              >
                <span>Découvrir nos activités</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/apropos"
                className="bg-white/10 hover:bg-white/15 backdrop-blur-md text-white border border-white/20 font-bold px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm uppercase tracking-widest transition-all text-center shadow-md"
              >
                En savoir plus sur la FNC
              </Link>
            </div>

          </div>
        </div>

      </section>

      {/* 2. SECTION ACTUALITÉS & RÉCITS */}
      <section id="actualites" className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-2xl sm:text-4xl font-serif font-extrabold text-slate-900 tracking-tight">
                Actualités & Récits
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-1 font-medium">
                Les dernières nouvelles du cyclisme nigérien et international.
              </p>
            </div>

            <Link
              to="/blog"
              className="text-[#bc4209] hover:text-[#9d3606] font-bold text-xs sm:text-sm flex items-center gap-1.5 group transition"
            >
              <span>Voir toutes les actualités</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-500">
              <div className="w-6 h-6 border-2 border-[#bc4209] border-t-transparent rounded-full animate-spin mb-2" />
              <span className="text-xs font-semibold uppercase tracking-widest">Chargement des actualités...</span>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-500 gap-3">
              <Newspaper className="w-9 h-9 text-slate-300" />
              <p className="text-sm text-slate-400">{error}</p>
              <button
                onClick={fetchArticles}
                className="text-xs font-bold uppercase tracking-widest px-4 py-2 bg-[#bc4209] text-white rounded-xl hover:bg-[#9d3606] transition"
              >
                Réessayer
              </button>
            </div>
          ) : articles.length === 0 ? (
            <EmptyState
              icon={Newspaper}
              badgeText="Actualités & Récits"
              title="Aucune actualité disponible"
              description="Les derniers articles, communiqués officiels et récits de courses de la Fédération Nigérienne de Cyclisme seront publiés très prochainement."
              actionText="Explorer nos activités"
              actionLink="/activites"
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
              {/* Carte à la une */}
              {featuredArticle && (
                <div
                  onClick={() => onSelectArticle(featuredArticle)}
                  className={`${
                    articles.length === 1 ? 'lg:col-span-12' : 'lg:col-span-7'
                  } relative h-[400px] sm:h-[460px] rounded-3xl overflow-hidden shadow-lg group cursor-pointer border border-slate-100 bg-slate-900`}
                >
                  {featuredArticle.image && (
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <span className="bg-[#154e19] text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-widest inline-block mb-2 shadow">
                      {featuredArticle.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-snug mb-4 group-hover:text-slate-200 transition">
                      {featuredArticle.title}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectArticle(featuredArticle);
                      }}
                      className="bg-[#bc4209] hover:bg-[#9d3606] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow transition tracking-wider uppercase"
                    >
                      Lire l'article
                    </button>
                  </div>
                </div>
              )}

              {/* Cartes secondaires si au moins 2 articles */}
              {articles.length > 1 && (
                <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
                  {secondArticle && (
                    <div
                      onClick={() => onSelectArticle(secondArticle)}
                      className={`relative ${
                        thirdArticle ? 'h-[190px] sm:h-[215px]' : 'h-full min-h-55'
                      } rounded-3xl overflow-hidden shadow-md group cursor-pointer border border-slate-100 bg-slate-900`}
                    >
                      {secondArticle.image && (
                        <img
                          src={secondArticle.image}
                          alt={secondArticle.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <span className="bg-[#154e19] text-white text-[9px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-widest inline-block mb-1.5 shadow">
                          {secondArticle.category}
                        </span>
                        <h3 className="text-base sm:text-lg font-serif font-bold text-white leading-snug group-hover:text-slate-200 transition">
                          {secondArticle.title}
                        </h3>
                      </div>
                    </div>
                  )}

                  {thirdArticle && (
                    <div
                      onClick={() => onSelectArticle(thirdArticle)}
                      className="relative h-[190px] sm:h-[215px] rounded-3xl overflow-hidden shadow-md group cursor-pointer border border-slate-100 bg-slate-900"
                    >
                      {thirdArticle.image && (
                        <img
                          src={thirdArticle.image}
                          alt={thirdArticle.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <span className="bg-[#154e19] text-white text-[9px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-widest inline-block mb-1.5 shadow">
                          {thirdArticle.category}
                        </span>
                        <h3 className="text-base sm:text-lg font-serif font-bold text-white leading-snug group-hover:text-slate-200 transition">
                          {thirdArticle.title}
                        </h3>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

        </div>
      </section>

    </div>
  );
};