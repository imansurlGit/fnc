import React, { useState, useEffect } from 'react';
import { articleService } from '../services';
import { ArrowRight, Calendar, Newspaper, Loader2 } from 'lucide-react';
import type { Article } from '../types';
import { EmptyState } from '../components/EmptyState';

interface BlogPageProps {
  onSelectArticle: (article: Article) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onSelectArticle }) => {
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
        console.error('Erreur lors du chargement des articles:', err);
        setError('Impossible de charger les articles. Vérifiez votre connexion.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="bg-[#e9eee9] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 min-h-screen text-slate-800 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 bg-[#154e19]/10 text-[#154e19] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 border border-[#154e19]/20 shadow-2xs">
            <Newspaper className="w-3.5 h-3.5" /> Actualités & Résultats Officiels
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-3 tracking-tight">
            Blog & Actualités FNC
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-xs sm:text-sm sm:text-base leading-relaxed font-medium">
            Suivez les actualités du Championnat National (Maradi 2026), des sélections du Mena cycliste, du Tour de la République et des compétitions UCI & AES de la Fédération Nigérienne de Cyclisme.
          </p>
        </div>

        {/* Loading Indicator, Error State, Empty State, or Article Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-600">
            <Loader2 className="w-8 h-8 animate-spin text-[#154e19] mb-3" />
            <p className="text-xs font-semibold uppercase tracking-wider">Chargement des actualités...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-600 gap-4">
            <Newspaper className="w-10 h-10 text-slate-300" />
            <p className="text-sm font-medium text-slate-500">{error}</p>
            <button
              onClick={fetchArticles}
              className="text-xs font-bold uppercase tracking-widest px-5 py-2.5 bg-[#154e19] text-white rounded-xl hover:bg-[#0f3812] transition"
            >
              Réessayer
            </button>
          </div>
        ) : articles.length === 0 ? (
          <EmptyState
            icon={Newspaper}
            badgeText="Actualités & Résultats"
            title="Aucun article publié pour le moment"
            description="Les publications, comptes rendus des courses et communiqués officiels de la Fédération Nigérienne de Cyclisme seront partagés ici prochainement."
            actionText="Découvrir les activités"
            actionLink="/activites"
            variant="card"
          />
        ) : (
          /* Article Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {articles.map((article) => (
            <div 
              key={article.id} 
              className="bg-[#f0f4f2] rounded-2xl border border-slate-300/80 overflow-hidden flex flex-col group cursor-pointer hover:border-[#154e19]/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => onSelectArticle(article)}
            >
              {/* Image Container with Dark Overlay Background */}
              <div className="h-48 sm:h-52 overflow-hidden relative bg-slate-900">
                {article.image && (
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                
                <div className="absolute top-3.5 left-3.5 bg-[#154e19] text-emerald-100 text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-md shadow-md border border-emerald-500/30">
                  {article.category}
                </div>
              </div>
              
              {/* Content Box */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5 group-hover:text-[#154e19] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mb-6 line-clamp-3 font-normal leading-relaxed">
                    {article.summary}
                  </p>
                </div>
                
                {/* Footer Link & Date */}
                <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-300/60 pt-4 mt-auto">
                  <span className="flex items-center font-semibold text-slate-600 bg-slate-200/60 px-2.5 py-1 rounded-md">
                    <Calendar className="w-3.5 h-3.5 mr-1.5 text-[#154e19]" /> {article.date}
                  </span>
                  
                  <button 
                    className="bg-white hover:bg-[#c25227] text-[#c25227] hover:text-white font-bold flex items-center transition-all duration-200 text-xs px-3 py-1.5 rounded-lg border border-[#c25227]/30 shadow-2xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectArticle(article);
                    }}
                  >
                    Lire <ArrowRight className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}

      </div>
    </div>
  );
};