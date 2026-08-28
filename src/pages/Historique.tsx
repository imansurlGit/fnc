import React from 'react';
import { hero, ecoleMaradi } from '../assets';

interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  image?: string;
  side: 'left' | 'right';
  highlightOrange?: boolean;
  cardBgClass: string;
  borderClass: string;
}

export const HistoriquePage: React.FC = () => {
  const events: TimelineEvent[] = [
    {
      id: '1',
      year: 'Années 1970',
      title: 'Pionniers & Courses de Quartier',
      description: 'Début des courses de rue organisées par les jeunes à Niamey. Abdou Adamou Djibo (né en 1957) s\'impose comme le grand pionnier du cyclisme nigérien à la force des jambes sur des vélos ordinaires sans dérailleur.',
      side: 'left',
      cardBgClass: 'bg-emerald-50/70',
      borderClass: 'border-emerald-200/90'
    },
    {
      id: '2',
      year: '1991',
      title: 'Formalisation de la FNC (FENICYCLISME)',
      description: 'Création et structuration administrative officielle de la Fédération Nigérienne de Cyclisme. Éclosion des premiers clubs à Niamey (AS FAN, AS Police, Eaux & Forêts) et en région (Arlit, Zinder, Maradi, Dosso).',
      side: 'right',
      cardBgClass: 'bg-amber-50/80',
      borderClass: 'border-amber-200/90'
    },
    {
      id: '3',
      year: '1997 - 1998',
      title: 'Tour International Cycliste du Niger',
      description: 'Premier âge d\'or avec l\'organisation des 3 éditions du Tour International par la FNC, Francis Ducreux et le Ministère. Des étapes mythiques traversant le Sahel (Arlit-Niamey, Zinder-Niamey).',
      image: hero,
      side: 'left',
      highlightOrange: true,
      cardBgClass: 'bg-sky-50/70',
      borderClass: 'border-sky-200/90'
    },
    {
      id: '4',
      year: '1998 - 2016',
      title: 'Crise & Suspension par l\'UCI',
      description: 'Arrêt du Tour International faute de financements et instabilité politique. Accumulation d\'arriérés de cotisations entraînant la suspension officielle du Niger par l\'Union Cycliste Internationale.',
      side: 'right',
      cardBgClass: 'bg-rose-50/70',
      borderClass: 'border-rose-200/90'
    },
    {
      id: '5',
      year: '2016',
      title: 'Réhabilitation Historique par l\'UCI',
      description: 'Paiement des dettes et réintégration officielle par l\'UCI. Relance nationale avec le sacre d\'Aminou Gado (18 ans) sur le Mini-Tour du Niger Moov Niger (1 106 km), marquant la résurrection du peloton.',
      side: 'left',
      cardBgClass: 'bg-[#f4f6f5]',
      borderClass: 'border-slate-300/80'
    },
    {
      id: '6',
      year: '2017 - 2025',
      title: 'Circuit Africain, AES & Piste Mondiale',
      description: 'Lancement du Tour de la République (550-640 km), participation au Grand Prix ORTM (Alliance des États du Sahel - AES), aux Championnats d\'Afrique sur piste à Abuja et aux Championnats du Monde UCI à Kigali.',
      image: ecoleMaradi,
      side: 'right',
      cardBgClass: 'bg-orange-50/80',
      borderClass: 'border-orange-200/90'
    },
    {
      id: '7',
      year: 'Septembre 2026',
      title: '6ème Édition & École Nationale de Maradi',
      description: 'Organisation de la 6ème Édition du Championnat National à Maradi (16-20 sept. 2026) et lancement officiel des activités de l\'École Nationale de Cyclisme pour consacrer la souveraineté sportive.',
      side: 'left',
      highlightOrange: true,
      cardBgClass: 'bg-teal-50/70',
      borderClass: 'border-teal-200/90'
    }
  ];

  return (
    <div className="bg-[#f8faf9] text-slate-800 min-h-screen font-sans py-10 sm:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[#154e19] text-xs font-bold uppercase tracking-widest bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100/80 mb-3 inline-block">
            Mémoire & Souveraineté
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-3">
            L'Histoire du Cyclisme Nigérien
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal max-w-2xl mx-auto">
            Des vélos utilitaires de Saga et Talladjé aux compétitions internationales et à l'Alliance des États du Sahel (AES), découvrez l'épopée du vélo au Niger.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          
          {/* Central Vertical Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-slate-200" />

          {/* Vertical Line (Mobile) */}
          <div className="md:hidden absolute left-4 top-4 bottom-4 w-0.5 bg-slate-200" />

          <div className="space-y-10 sm:space-y-12">
            {events.map((event) => {
              const isLeft = event.side === 'left';
              const isHighlight = event.highlightOrange;

              return (
                <div
                  key={event.id}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isLeft ? 'md:flex-row-reverse' : ''
                  }`}
                >

                  {/* Desktop Date Display */}
                  <div className={`hidden md:block md:w-1/2 ${
                    isLeft ? 'text-left pl-12' : 'text-right pr-12'
                  }`}>
                    <span className={`text-2xl lg:text-3xl font-black tracking-tight ${
                      isHighlight ? 'text-[#c25227]' : 'text-slate-700'
                    }`}>
                      {event.year}
                    </span>
                  </div>

                  {/* Central Node Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                    <span className={`w-3.5 h-3.5 rounded-full ring-4 ring-[#f8faf9] ${
                      isHighlight ? 'bg-[#c25227]' : 'bg-[#154e19]'
                    }`} />
                  </div>

                  {/* Timeline Card */}
                  <div className={`w-full pl-10 md:pl-0 md:w-1/2 ${
                    isLeft ? 'md:pr-12' : 'md:pl-12'
                  }`}>
                    <div className={`rounded-xl p-5 sm:p-6 transition-all duration-300 shadow-xs hover:shadow-md border ${event.cardBgClass} ${event.borderClass}`}>
                      
                      {/* Mobile Year Badge */}
                      <div className="md:hidden text-xs font-bold uppercase tracking-wider mb-1.5">
                        <span className={isHighlight ? 'text-[#c25227]' : 'text-[#154e19]'}>
                          {event.year}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2 leading-snug">
                        {event.title}
                      </h3>

                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                        {event.description}
                      </p>

                      {/* Archive Photo - Couleurs Directement Visibles */}
                      {event.image && (
                        <div className="mt-4 rounded-lg overflow-hidden border border-slate-200/80 shadow-xs">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-40 sm:h-44 object-cover hover:scale-102 transition-transform duration-300"
                          />
                        </div>
                      )}

                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
};