import { Target, Users, BookOpen, GraduationCap, CheckCircle2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EcolePage = () => {
  return (
    <div className="pb-16 bg-[#f4f6f5] font-sans">
      
      {/* Hero Section */}
      <div className="relative bg-linear-to-b from-[#bc4209] to-[#154e19] py-24 px-4 text-center text-white overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#bc4209] text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 shadow">
            <Sparkles className="w-3.5 h-3.5" /> Souveraineté & Relève Sportive
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            École Nationale de Cyclisme de Maradi
          </h1>
          <p className="text-lg sm:text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed font-medium">
            Lancement officiel le <strong>17 Septembre 2026</strong> lors de la 6ème Édition du Championnat National. L'institution faîtière de formation de la jeunesse et des cadres techniques nigériens.
          </p>
        </div>
      </div>

      {/* Key Dates & Sovereign Vision Banner */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100">
            <span className="block text-2xl font-black text-[#bc4209]">17 Sept. 2026</span>
            <span className="text-xs font-extrabold text-slate-600 uppercase tracking-wider">Inauguration Officielle à Maradi</span>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
            <span className="block text-2xl font-black text-[#154e19]">12 - 18 Ans</span>
            <span className="text-xs font-extrabold text-slate-600 uppercase tracking-wider">Détection & Cursus Jeunes Talents</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200">
            <span className="block text-2xl font-black text-slate-800">8 Régions</span>
            <span className="text-xs font-extrabold text-slate-600 uppercase tracking-wider">Maillage & Recrutement National</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80 text-center hover:-translate-y-1.5 transition-all duration-300">
            <div className="w-16 h-16 bg-[#154e19]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#154e19]">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-[#bc4209] mb-3">Autonomie de la Formation</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              En créant sa propre structure d'élite locale à Maradi, le Niger affirme sa souveraineté sportive en réduisant sa dépendance historique vis-à-vis des centres de formation étrangers.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80 text-center hover:-translate-y-1.5 transition-all duration-300">
            <div className="w-16 h-16 bg-[#bc4209]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#bc4209]">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-[#bc4209] mb-3">Formation des Cadres</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              L'école ne forme pas uniquement des cyclistes : elle organise des stages techniques UCI sur sol national pour former nos propres entraîneurs, commissaires et mécaniciens de compétition.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80 text-center hover:-translate-y-1.5 transition-all duration-300">
            <div className="w-16 h-16 bg-[#154e19]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#154e19]">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-[#bc4209] mb-3">Cursus Intégré & Civisme</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Un encadrement complet conjuguant pratique sportive de haut niveau, mécanique de pointe, nutrition du sportif et éducation civique pour les jeunes espoirs du peloton.
            </p>
          </div>
        </div>
      </div>
      
      {/* Infrastructure & Impact Section */}
      <div className="max-w-5xl mx-auto px-4 mb-16">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200/80">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-[#bc4209]/10 rounded-2xl flex items-center justify-center text-[#bc4209]">
              <GraduationCap className="w-8 h-8" />
            </div>
          </div>

          <h2 className="text-3xl font-black text-[#bc4209] mb-6 text-center">Un Pôle d'Excellence et d'Expertise Locale</h2>

          <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
            <p>
              Inaugurée lors de la <strong>6ème édition du Championnat National à Maradi</strong> sous le Haut Patronage du Gouvernorat de la Région de Maradi, l'École Nationale de Cyclisme matérialise la volonté d'autonomie et de développement endogène du sport nigérien.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 my-6">
              <div className="flex items-start gap-3 bg-[#f4f6f5] p-4 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-[#154e19] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Équipements & Ateliers</h4>
                  <p className="text-xs text-slate-600">Vélos de compétition, ateliers de mécanique certifiés et bancs de réglage de précision.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#f4f6f5] p-4 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-[#bc4209] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Filière Élite & Expatriation</h4>
                  <p className="text-xs text-slate-600">Passerelle vers les sélections du Mena cycliste et partenariats avec les clubs régionaux comme l'AS Bessel.</p>
                </div>
              </div>
            </div>

            <p>
              Grâce à cette académie, la FNC dote durablement la jeunesse nigérienne des outils indispensables pour performer au niveau continental tout en incarnant la résilience et la fierté nationale.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center">
            <Link 
              to="/sponsor" 
              className="bg-[#bc4209] hover:bg-[#9d3606] text-white font-extrabold px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow-md"
            >
              Parrainer l'École de Maradi
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};
