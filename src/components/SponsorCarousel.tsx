import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  Building2, 
  ShieldCheck,
  Pause, 
  Play,
  Sparkles
} from 'lucide-react';
import type { Sponsor } from '../types';
import { sponsorService } from '../services';

interface SponsorCarouselProps {
  sponsors?: Sponsor[];
  autoPlayInterval?: number;
}

export const SponsorCarousel: React.FC<SponsorCarouselProps> = ({
  sponsors: initialPropSponsors,
  autoPlayInterval = 1500
}) => {
  const [sponsors, setSponsors] = useState<Sponsor[]>(initialPropSponsors || []);
  const [loading, setLoading] = useState<boolean>(!initialPropSponsors || initialPropSponsors.length === 0);

  useEffect(() => {
    if (!initialPropSponsors || initialPropSponsors.length === 0) {
      let isMounted = true;
      setLoading(true);
      sponsorService.getSponsors()
        .then((data) => {
          if (isMounted) {
            setSponsors(data);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error('Erreur chargement sponsors:', err);
          if (isMounted) setLoading(false);
        });
      return () => { isMounted = false; };
    }
  }, [initialPropSponsors]);
  const [activeCategory, setActiveCategory] = useState<string>('Tous');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [itemsPerPage, setItemsPerPage] = useState<number>(3);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter sponsors based on category
  const filteredSponsors = sponsors.filter((sponsor) => {
    if (activeCategory === 'Tous') return true;
    if (activeCategory === 'Or & Argent') return sponsor.category === 'Or' || sponsor.category === 'Argent';
    if (activeCategory === 'Institutionnel') return sponsor.category === 'Institutionnel';
    return sponsor.category === activeCategory;
  });

  // Calculate items per page dynamically based on screen width
  const updateItemsPerPage = useCallback(() => {
    if (window.innerWidth < 640) {
      setItemsPerPage(1);
    } else if (window.innerWidth < 1024) {
      setItemsPerPage(2);
    } else {
      setItemsPerPage(3);
    }
  }, []);

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, [updateItemsPerPage]);

  const maxIndex = Math.max(0, filteredSponsors.length - itemsPerPage);

  // Navigation handlers
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  // Autoplay handler
  useEffect(() => {
    if (isPaused || filteredSponsors.length <= itemsPerPage) return;

    const timer = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPaused, handleNext, autoPlayInterval, filteredSponsors.length, itemsPerPage]);

  // Reset index when category changes
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentIndex(0);
  };

  const getCategoryBadge = (category: Sponsor['category']) => {
    switch (category) {
      case 'Or':
        return (
          <span className="inline-flex items-center gap-1.5 bg-linear-to-r from-amber-500/15 to-yellow-500/20 text-amber-700 border border-amber-400/40 text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
            <Award className="w-3.5 h-3.5 text-amber-500" /> Sponsor Or
          </span>
        );
      case 'Argent':
        return (
          <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 border border-slate-300 text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-500" /> Sponsor Argent
          </span>
        );
      case 'Institutionnel':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 bg-[#154e19]/10 text-[#154e19] border border-[#154e19]/30 text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
            <Building2 className="w-3.5 h-3.5 text-[#154e19]" /> Institutionnel
          </span>
        );
    }
  };

  const categories = ['Tous', 'Or & Argent', 'Institutionnel'];

  if (!loading && sponsors.length === 0) {
    return null;
  }

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-white via-slate-50 to-[#f4f6f5]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#bc4209]/10 text-[#bc4209] text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-3 border border-[#bc4209]/20">
              <Sparkles className="w-3.5 h-3.5 text-[#bc4209]" /> Partenaires de Confiance
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Nos Sponsors & Partenaires Officiels
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              Ils soutiennent la FNC, la formation des jeunes athlètes et le rayonnement du cyclisme nigérien.
            </p>
          </div>

        {/* Loading Indicator */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-500">
            <div className="w-6 h-6 border-2 border-[#bc4209] border-t-transparent rounded-full animate-spin mb-2" />
            <span className="text-xs font-semibold uppercase tracking-wider">Chargement des sponsors...</span>
          </div>
        ) : null}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 text-xs font-extrabold rounded-xl transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#bc4209] text-white shadow-md shadow-[#bc4209]/20 scale-105'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Wrapper */}
        <div 
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main Cards Window */}
          <div className="overflow-hidden rounded-3xl p-1" ref={containerRef}>
            <div
              className="flex transition-transform duration-500 ease-out gap-6"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`
              }}
            >
              {filteredSponsors.map((sponsor) => (
                <div
                  key={sponsor.id}
                  className="shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                >
                  <div className="h-full bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group/card relative overflow-hidden">
                    
                    {/* Top Tier Accent Bar */}
                    <div 
                      className={`absolute top-0 left-0 right-0 h-1.5 ${
                        sponsor.category === 'Or'
                          ? 'bg-linear-to-r from-amber-400 to-amber-600'
                          : sponsor.category === 'Argent'
                          ? 'bg-linear-to-r from-slate-300 to-slate-500'
                          : 'bg-linear-to-r from-[#154e19] to-[#bc4209]'
                      }`}
                    />

                    <div>
                      {/* Logo Header & Badge */}
                      <div className="flex items-start justify-between gap-3 mb-5">
                        <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center p-2 overflow-hidden group-hover/card:scale-105 transition-transform">
                          {sponsor.logo || sponsor.image ? (
                            <img
                              src={sponsor.image || sponsor.logo}
                              alt={sponsor.name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <span className="font-black text-[#bc4209] text-xl">
                              {sponsor.name.substring(0, 2).toUpperCase()}
                            </span>
                          )}
                        </div>

                        {getCategoryBadge(sponsor.category)}
                      </div>

                      {/* Sponsor Name & Description */}
                      <h3 className="text-xl font-extrabold text-slate-900 leading-snug mb-2 group-hover/card:text-[#bc4209] transition-colors">
                        {sponsor.name}
                      </h3>
                      
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                        {sponsor.description}
                      </p>
                    </div>

                    {/* Footer Action Link */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Partenaire Officiel FNC
                      </span>
                      
                      {/* {sponsor.website && (
                        <a
                          href={sponsor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#bc4209] hover:text-[#c4470e] transition-colors group/link"
                        >
                          <span>Visiter le site</span>
                          <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                        </a>
                      )} */}
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {filteredSponsors.length > itemsPerPage && (
            <>
              <button
                onClick={handlePrev}
                aria-label="Sponsor précédent"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 w-12 h-12 rounded-full bg-white/95 backdrop-blur-md shadow-lg border border-slate-200 text-slate-800 hover:bg-[#bc4209] hover:text-white transition-all flex items-center justify-center z-10 cursor-pointer hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                aria-label="Sponsor suivant"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 w-12 h-12 rounded-full bg-white/95 backdrop-blur-md shadow-lg border border-slate-200 text-slate-800 hover:bg-[#bc4209] hover:text-white transition-all flex items-center justify-center z-10 cursor-pointer hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Carousel Navigation Footer (Pagination Dots & Pause Button) */}
        {filteredSponsors.length > itemsPerPage && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setIsPaused(!isPaused)}
              title={isPaused ? "Reprendre le défilement" : "Mettre en pause"}
              className="p-2 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-400 transition-colors cursor-pointer"
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Aller au slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx
                      ? 'w-8 bg-[#bc4209]'
                      : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
