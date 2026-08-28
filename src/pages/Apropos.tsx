import React from 'react';
import { Link } from 'react-router-dom';
import {
  Bike,
  Trophy,
  ShieldCheck,
  Globe,
  ArrowRight,
  Compass,
  Users
} from 'lucide-react';

export const AproposPage: React.FC = () => {
  return (
    <div className="bg-[#f4f6f5] text-slate-900 min-h-screen font-sans tracking-tight antialiased">
      
      {/* HERO BANNER DE LA PAGE À PROPOS */}
      <section className="relative py-20 sm:py-24 px-4 bg-gradient-to-b from-[#bc4209] to-[#154e19] text-white overflow-hidden shadow-md">
        {/* Overlay Image en arrière-plan */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src="images/hero1.png" 
            alt="Cyclisme fond" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Motif Radial décoratif */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-block bg-[#bc4209]/80 backdrop-blur-sm border border-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            Institution & Histoire
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-none mx-auto drop-shadow-sm">
            Fédération Nigérienne de Cyclisme
          </h1>
          <p className="text-orange-100 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mt-4 font-normal leading-relaxed tracking-normal">
            Découvrez l’instance faîtière du vélo au Niger, nos engagements institutionnels pour la jeunesse et l’essor passionnant du cyclisme à travers le Sahel.
          </p>
        </div>
      </section>

      {/* SECTION PRÉSENTATION FÉDÉRATION & CYCLISME */}
      <section id="federation" className="py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Colonne Gauche : Texte de présentation */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[#bc4209] text-xs font-bold uppercase tracking-wider bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                  Institution & Passion
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
                  La Fédération Nigérienne de Cyclisme
                </h2>
                <p className="text-[#154e19] font-bold text-base sm:text-lg mt-1 tracking-tight">
                  Moteur de la structuration sportive et du rayonnement national.
                </p>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed tracking-normal">
                Organisme officiel régissant la pratique vélocipédique sur l'ensemble du territoire, la <strong>FNC</strong> œuvre au quotidien pour structurer les clubs, former les encadrants et organiser les compétitions nationales et internationales.
              </p>

              <div className="border-l-4 border-[#154e19] pl-4 py-2 bg-slate-50 rounded-r-lg">
                <p className="text-slate-700 italic text-sm sm:text-base leading-relaxed tracking-normal">
                  « Porté par l'Alliance des États du Sahel, réhabilité par l'UCI en 2016, le cyclisme nigérien s'impose comme un vecteur d'unité nationale, de résurrection sportive et de souveraineté. »
                </p>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed tracking-normal">
                Sur les routes du Niger, nos coureurs — du pionnier <strong>Abdou Adamou Djibo</strong> au capitaine actuel <strong>Ibrahim Seydou</strong> — incarnent l'endurance et la ténacité. Des circuits du Sahel aux Championnats du Monde UCI à Kigali, le peloton nigérien fait rayonner notre nation à l'échelle continentale.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  to="/blog"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-md transition shadow-md tracking-normal"
                >
                  Découvrir les actualités
                </Link>
              </div>
            </div>

            {/* Colonne Droite : Cartes d'impact avec couleurs en diagonale et plus d'écartement */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-6 pt-4">
              
              {/* Carte 1 : National (ORANGE - Élevée haut) */}
              <div className="bg-[#bc4209] text-white p-5 rounded-2xl border border-orange-700/30 shadow-md flex flex-col justify-between h-48 lg:-translate-y-6 transition-transform">
                <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-black tracking-tight">National</h4>
                  <p className="text-xs font-medium text-orange-100 mt-1 tracking-normal">Courses & Championnats organisés</p>
                </div>
              </div>

              {/* Carte 2 : 8 Régions (GRIS - Position normale) */}
              <div className="bg-slate-100 text-slate-900 p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between h-48">
                <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-black tracking-tight">8 Régions</h4>
                  <p className="text-xs font-semibold text-slate-500 mt-1 tracking-normal">Ligues régionales affiliées</p>
                </div>
              </div>

              {/* Carte 3 : Relève (BLANC - Élevée haut) */}
              <div className="bg-[#d4d4d4] text-slate-900 p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-48 lg:-translate-y-6 transition-transform">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <Bike className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-black tracking-tight">Relève</h4>
                  <p className="text-xs font-semibold text-slate-500 mt-1 tracking-normal">Développement des jeunes talents</p>
                </div>
              </div>

              {/* Carte 4 : Sahel (VERT - Position normale) */}
              <div className="bg-[#154e19] text-white p-5 rounded-2xl border border-emerald-900/30 shadow-md flex flex-col justify-between h-48">
                <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-black tracking-tight">Sahel</h4>
                  <p className="text-xs font-medium text-emerald-100 mt-1 tracking-normal">Rayonnement sub-saharien</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* LA FÉDÉRATION NIGÉRIENNE DE CYCLISME */}
      <section className="py-4 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-left mx-auto mb-12">
            <span className="text-[#bc4209] text-xs font-bold uppercase tracking-wider bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-100">
              Organisme Officiel
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              La Fédération Nigérienne de Cyclisme (FNC)
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 font-medium tracking-normal">
              Une institution engagée pour la structuration, le développement et le rayonnement du sport nigérien.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
            
            <div className="lg:col-span-6 space-y-5">
              <h3 className="text-2xl font-bold text-[#bc4209] leading-snug tracking-tight">
                L’instance faîtière du vélo sur l'ensemble du territoire nigérien
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed tracking-normal">
                Historiquement connue sous le nom de FENICYCLISME et formalisée en <strong>1991</strong>, la <strong>Fédération Nigérienne de Cyclisme (FNC)</strong> est l’unique organisme habilité à organiser, réglementer et promouvoir le cyclisme au Niger. Placée sous la tutelle du <strong>Ministère de la Jeunesse et des Sports</strong>, son Bureau Exécutif est actuellement présidé par <strong>M. Zakari Djibo</strong>.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed tracking-normal">
                Elle regroupe les <strong>8 ligues régionales</strong> du pays (Niamey, Maradi, Zinder, Tahoua, Tillabéri, Dosso, Agadez et Diffa) ainsi que les clubs institutionnels phares (AS FAN, AS Police, Eaux & Forêts) et régionaux (Arlit, Zinder, Maradi, Dosso, AS Bessel).
              </p>
              
              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600 tracking-normal">
                <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200">
                  <ShieldCheck className="w-4 h-4 text-[#154e19]" /> Présidence : M. Zakari Djibo
                </span>
                <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200">
                  <Globe className="w-4 h-4 text-[#154e19]" /> Affiliation UCI & CAC
                </span>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-900 group">
                <img
                  src="/images/ecole_maradi.png"
                  alt="Délégation et comité de la Fédération Nigérienne de Cyclisme"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="bg-[#154e19] text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider mb-2 inline-block">
                    Déploiement National
                  </span>
                  <h4 className="text-lg font-bold tracking-tight">Un maillage territorial actif dans les 8 régions du Niger</h4>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* LE CYCLISME AU NIGER */}
      <section className="py-12 bg-[#f4f6f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Focus Spécial : L'École Nationale de Cyclisme à Maradi */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-3">
                <span className="bg-[#bc4209]/10 text-[#bc4209] text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider inline-block">
                  Souveraineté & Relève — Projet Phare FNC
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight tracking-tight">
                  L'École Nationale de Cyclisme de Maradi
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed tracking-normal">
                  Lancée officiellement le <strong>17 Septembre 2026</strong> lors de la 6ème Édition du Championnat National, l'École de Maradi accueille les jeunes talents de <strong>12 à 18 ans</strong> issus des 8 régions. Elle forme aussi les encadrants nigériens (entraîneurs, commissaires, mécaniciens) pour réduire la dépendance aux stages à l'étranger.
                </p>
              </div>

              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <Link
                  to="/historique"
                  className="bg-[#bc4209] hover:bg-[#9d3606] text-white font-bold px-6 py-3.5 rounded-lg text-xs sm:text-sm shadow-md transition flex items-center gap-2 tracking-normal"
                >
                  <span>Découvrir notre Histoire</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
};