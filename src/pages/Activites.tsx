import React from 'react';
import { 
  Trophy, 
  GraduationCap, 
  ShieldCheck, 
  Bike, 
  Award, 
  Users, 
  HeartHandshake, 
  CheckCircle2
} from 'lucide-react';

export const ActivitesPage: React.FC = () => {
  return (
    <div className="bg-[#f4f6f5] text-slate-900 min-h-screen font-sans">
      
      {/* HERO BANNER DE LA PAGE ACTIVITÉS */}
      <section className="relative py-6 sm:py-8 bg-linear-to-b from-[#bc4209] to-[#154e19] text-white overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-tight max-w-none lg:whitespace-nowrap mx-auto drop-shadow-sm">
            Activités & Compétitions de la FNC
          </h1>

          <p className="text-orange-100 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mt-4 font-normal leading-relaxed">
            6ème Édition du Championnat National (Maradi, 16-20 sept. 2026), Tour de la République, Grand Prix ORTM de l'AES, épreuves UCI et lancement de l'<strong className="text-amber-300">École Nationale de Cyclisme de Maradi</strong>.
          </p>
        </div>
      </section>

      {/* SYNTHÈSE DES 4 PROGRAMMES PERMANENTS */}
      <section className="py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="p-4 rounded-xl bg-[#f4f6f5] border border-slate-200/80 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#154e19]/10 text-[#154e19] flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 uppercase">Compétitions</h4>
                <p className="text-[11px] text-slate-500 font-medium">Courses & Tours nationaux</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#f4f6f5] border border-slate-200/80 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#bc4209]/10 text-[#bc4209] flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 uppercase">Formation</h4>
                <p className="text-[11px] text-slate-500 font-medium">Académie & Jeunes talents</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#f4f6f5] border border-slate-200/80 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#154e19]/10 text-[#154e19] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 uppercase">Sécurité</h4>
                <p className="text-[11px] text-slate-500 font-medium">Sensibilisation & Civisme</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#f4f6f5] border border-slate-200/80 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#bc4209]/10 text-[#bc4209] flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 uppercase">Ligues & Clubs</h4>
                <p className="text-[11px] text-slate-500 font-medium">Soutien dans les 8 régions</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ORGANISATION DES COMPÉTITIONS & ÉPREUVES PHARES */}
      <section className="py-4 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Texte Éditorial Compétitions */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[#bc4209] text-xs font-black uppercase tracking-wider bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-100">
                Compétitions Officielles
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Organisation des Courses & Championnats Nationaux
              </h2>
              <p className="text-[#154e19] font-bold text-sm sm:text-base leading-snug">
                Mesurer la performance, attribuer les maillots distinctifs et faire vibrer les passionnés.
              </p>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                La FNC assure la planification globale et l'organisation technique des compétitions majeures sur le territoire nigérien. Chaque épreuve est conçue selon les standards de l'Union Cycliste Internationale (UCI) afin de garantir la sécurité des coureurs et l'équité sportive.
              </p>

              <div className="space-y-2.5 pt-1">
                <div className="flex items-start gap-3 bg-[#f4f6f5] p-3 rounded-xl border border-slate-200/80 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-[#bc4209] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">6ème Édition du Championnat National « Maradi 2026 »</h4>
                    <p className="text-[11px] sm:text-xs text-slate-600">Organisé du 16 au 20 septembre 2026 à Maradi avec Para-cyclisme (5 km), Féminin (20 km), Cadets (60 km), Juniors (80 km) et Séniors (100 km). Attribue le Maillot Jaune (temps) et le Maillot Vert (sprinteur).</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#f4f6f5] p-3 rounded-xl border border-slate-200/80 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-[#154e19] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Le Tour de la République (550 à 640 km)</h4>
                    <p className="text-[11px] sm:text-xs text-slate-600">Épreuve majeure par étapes traversant plusieurs localités du pays pour révéler les plus grands grimpeurs et rouleurs nigériens.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#f4f6f5] p-3 rounded-xl border border-slate-200/80 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-[#154e19] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Circuit AES & Championnats UCI</h4>
                    <p className="text-[11px] sm:text-xs text-slate-600">Grand Prix ORTM de l'Alliance des États du Sahel, Championnats d'Afrique sur piste à Abuja et Championnats du Monde UCI sur route à Kigali.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Illustration Visuelle */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900 group">
                <img 
                  src="hero.png" 
                  alt="Peloton de compétition en pleine course" 
                  className="w-full h-64 sm:h-80 lg:h-[360px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="bg-[#bc4209] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider mb-1 inline-block">
                    Élite & Performance
                  </span>
                  <h4 className="text-base font-bold">Des pelotons aguerris sur les routes du Niger</h4>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FORMATION & ÉCOLES DE CYCLISME */}
      <section className="py-4 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Illustration Visuelle */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900 group">
                <img 
                  src="ecole_maradi.png" 
                  alt="École Nationale de Cyclisme de Maradi" 
                  className="w-full h-64 sm:h-80 lg:h-[360px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="bg-[#154e19] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider mb-1 inline-block">
                    Formation Nationale
                  </span>
                  <h4 className="text-base font-bold">L'École de Maradi : le vivier de la relève sportive</h4>
                </div>
              </div>
            </div>

            {/* Texte Éditorial Formation */}
            <div className="lg:col-span-6 space-y-4 order-1 lg:order-2">
              <span className="text-[#154e19] text-xs font-black uppercase tracking-wider bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">
                Formation & Relève
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Détection, Académies & Encadrement Technique
              </h2>
              <p className="text-[#bc4209] font-bold text-sm sm:text-base leading-snug">
                Préparer les champions de demain grâce à un apprentissage structuré dès le jeune âge.
              </p>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                Le développement du cyclisme repose sur la qualité de son encadrement. À travers l'<strong>École Nationale de Cyclisme de Maradi</strong> et les centres régionaux, la FNC met en œuvre un cursus complet alliant pilotage, préparation physique, mécanique et civisme.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-xl bg-[#f4f6f5] border border-slate-200">
                  <GraduationCap className="w-5 h-5 text-[#154e19] mb-1.5" />
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">Jeunes Talents (12-18 ans)</h4>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">Détection dans les écoles et clubs des 8 régions avec mise à disposition de matériel adapté.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#f4f6f5] border border-slate-200">
                  <Award className="w-5 h-5 text-[#bc4209] mb-1.5" />
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">Cadres & Commissaires</h4>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">Stages réguliers pour former les entraîneurs certifiés, les mécaniciens et les arbitres de course.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SENSIBILISATION & SÉCURITÉ ROUTIÈRE */}
      <section className="py-4 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-6">
            <span className="text-[#bc4209] text-xs font-black uppercase tracking-wider bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-100">
              Actions Citoyennes
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Vélo-Mobilité, Sécurité Routière & Santé
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 font-medium">
              Promouvoir le vélo comme outil de santé publique, d'inclusion et de sécurité sur les routes du Niger.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Carte 1 : Teinte Orange Légère */}
            <div className="bg-orange-50/60 p-5 rounded-xl border border-orange-100/80 shadow-xs hover:shadow-md transition">
              <div className="w-9 h-9 rounded-lg bg-[#bc4209]/10 text-[#bc4209] flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Caravanes de Sécurité</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Campagnes de sensibilisation au partage de la route, à l'obligation du port du casque et à la distribution d'équipements réfléchissants pour les cyclistes urbains et ruraux.
              </p>
            </div>

            {/* Carte 2 : Teinte Verte Légère */}
            <div className="bg-emerald-50/60 p-5 rounded-xl border border-emerald-100/80 shadow-xs hover:shadow-md transition">
              <div className="w-9 h-9 rounded-lg bg-[#154e19]/10 text-[#154e19] flex items-center justify-center mb-3">
                <Bike className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Promotion de la Santé</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Randonnées populaires et journées "Sport pour Tous" organisées pour lutter contre la sédentarité et encourager une activité physique régulière dès le plus jeune âge.
              </p>
            </div>

            {/* Carte 3 : Teinte Ambre/Warm Légère */}
            <div className="bg-amber-50/60 p-5 rounded-xl border border-amber-100/80 shadow-xs hover:shadow-md transition">
              <div className="w-9 h-9 rounded-lg bg-[#bc4209]/10 text-[#bc4209] flex items-center justify-center mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Inclusion & Éco-Mobilité</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Valorisation du vélo comme moyen de transport écologique, économique et accessible à toutes les couches de la population à travers les villes du Niger.
              </p>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};