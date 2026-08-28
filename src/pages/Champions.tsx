import { useState, useEffect } from 'react';
import { athleteService } from '../services';
import { Medal, MapPin, Sparkles, Trophy, User, Loader2, Users } from 'lucide-react';
import type { Athlete } from '../types';
import { EmptyState } from '../components/EmptyState';

export const ChampionsPage = () => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAthletes = () => {
    setLoading(true);
    setError(null);
    athleteService.getAthletes()
      .then((data) => {
        setAthletes(data);
      })
      .catch((err) => {
        console.error('Erreur lors du chargement des champions:', err);
        setError('Impossible de charger les champions. Vérifiez votre connexion.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAthletes();
  }, []);

  return (
    <div className="bg-[#f8faf9] min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 bg-emerald-50 text-[#154e19] text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-3 border border-emerald-100">
            <Sparkles className="w-3.5 h-3.5 text-[#154e19]" /> Élite & Pionniers du Cyclisme
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-3 tracking-tight">
            Les Champions du Peloton Nigérien
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            Des pionniers des années 1990 aux capitaines actuels de la sélection "Mena cycliste", découvrez les figures emblématiques qui font briller le maillot national au Niger et sur les circuits africains.
          </p>
        </div>

        {/* Loading Indicator, Error State, Empty State or Champions Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-600">
            <Loader2 className="w-8 h-8 animate-spin text-[#154e19] mb-3" />
            <p className="text-xs font-semibold uppercase tracking-wider">Chargement des champions...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-600 gap-4">
            <Trophy className="w-10 h-10 text-slate-300" />
            <p className="text-sm font-medium text-slate-500">{error}</p>
            <button
              onClick={fetchAthletes}
              className="text-xs font-bold uppercase tracking-widest px-5 py-2.5 bg-[#154e19] text-white rounded-xl hover:bg-[#0f3812] transition"
            >
              Réessayer
            </button>
          </div>
        ) : athletes.length === 0 ? (
          <EmptyState
            icon={Users}
            badgeText="Peloton & Élite Nationale"
            title="Aucun champion répertorié pour le moment"
            description="Les fiches des coureurs, palmarès et sélections officielles de l'équipe nationale 'Mena Cycliste' sont actuellement en cours de mise à jour par la Direction Technique Nationale."
            actionText="Découvrir nos activités"
            actionLink="/activites"
          />
        ) : (
          /* Champions Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {athletes.map((athlete) => (
            <div 
              key={athlete.id} 
              className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="h-48 overflow-hidden relative bg-slate-900 flex items-center justify-center border-b border-slate-100">
                  {athlete.image ? (
                    <img
                      src={athlete.image}
                      alt={athlete.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 group-hover:scale-105 group-hover:bg-slate-200/60 transition-all duration-300">
                      <User className="w-10 h-10 text-slate-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute top-3.5 right-3.5 bg-slate-900/90 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full border border-slate-700/50 shadow-xs">
                    {athlete.wins} Distinctions
                  </div>

                  <div className="absolute bottom-3 left-3.5 right-3.5">
                    <div className="text-[10px] font-bold text-[#154e19] uppercase tracking-wider bg-emerald-50/90 backdrop-blur-xs px-2.5 py-1 rounded-md inline-block shadow-2xs border border-emerald-100">
                      {athlete.jersey}
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-0.5 group-hover:text-[#154e19] transition-colors">
                    {athlete.name}
                  </h3>
                  {athlete.nickname && <p className="text-xs font-semibold text-[#c25227] italic mb-4">
                    "{athlete.nickname}"
                  </p>}
                  
                  <div className="space-y-2 text-xs text-slate-600 pt-3 border-t border-slate-100">
                    { athlete.region && <div className="flex items-center font-medium">
                      <MapPin className="w-3.5 h-3.5 mr-2 text-slate-400 shrink-0" />
                      <span>Région / Origine : <strong className="text-slate-800 font-semibold">{athlete.region}</strong></span>
                    </div>}

                    { athlete.specialty && <div className="flex items-center font-medium">
                      <Medal className="w-3.5 h-3.5 mr-2 text-[#154e19] shrink-0" />
                      <span>Spécialité : <strong className="text-slate-800 font-semibold">{athlete.specialty}</strong></span>
                    </div>}
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 pt-1">
                <div className="bg-[#f8faf9] p-3 rounded-lg border border-slate-100 text-[10px] sm:text-[11px] text-slate-500 font-medium text-center">
                  Sélection Officielle Mena Cyclistes • FNC Niger
                </div>
              </div>
            </div>
          ))}
        </div>
        )}

        {/* Historic Mention Box (Même dégradé que la bannière d'action) */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-slate-900 via-[#154e19] to-slate-950 rounded-2xl p-6 sm:p-8 text-white shadow-lg border border-slate-800/80">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <Trophy className="w-4 h-4" /> Rayonnement International
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                De la Relance 2016 au Haut Niveau Africain & UCI
              </h3>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-normal">
                Après la levée de la suspension UCI en 2016 grâce au règlement des cotisations par la FNC, les athlètes nigériens se mesurent régulièrement aux cadors du continent (Tours du Mali, Burkina Faso, Bénin) ainsi qu'aux épreuves sur piste à Abuja et mondiales à Kigali.
              </p>
            </div>
            <div className="shrink-0">
              <span className="bg-[#c25227] hover:bg-[#a8431e] text-white font-bold px-5 py-2.5 rounded-full text-xs uppercase tracking-wider shadow-md transition inline-block">
                Alliance AES & FNC
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};