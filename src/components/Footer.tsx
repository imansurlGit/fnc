import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-[#eef2f0] border-t border-slate-200 text-slate-700 pt-16 pb-8 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
          
          {/* Col 1: Brand */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-extrabold text-base text-[#bc4209]">
              Fédération Nigérienne de Cyclisme
            </h3>
            <p className="text-slate-600 leading-relaxed max-w-sm">
              Promouvoir et développer le cyclisme sur tout le territoire national, soutenir nos jeunes athlètes et organiser des compétitions d'excellence.
            </p>
          </div>

          {/* Col 2: MENU PRINCIPAL */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
              Navigation
            </h4>
            <ul className="space-y-2.5 font-medium text-slate-700">
              <li><Link to="/" className="hover:text-[#bc4209] transition">Accueil</Link></li>
              <li><Link to="/apropos" className="hover:text-[#bc4209] transition">À propos</Link></li>
              <li><Link to="/activites" className="hover:text-[#bc4209] transition">Activités</Link></li>
              <li><Link to="/historique" className="hover:text-[#bc4209] transition">Historique</Link></li>
              <li><Link to="/leaders" className="hover:text-[#bc4209] transition">Nos Champions</Link></li>
              <li><Link to="/ecole" className="hover:text-[#bc4209] transition">École de Cyclisme</Link></li>
              <li><Link to="/blog" className="hover:text-[#bc4209] transition">Blog & Actualités</Link></li>
            </ul>
          </div>

          {/* Col 3: INFORMATIONS & RESSOURCES */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
              Informations
            </h4>
            <ul className="space-y-2.5 font-medium text-slate-700">
              <li><Link to="/sponsor" className="hover:text-[#bc4209] transition font-bold text-[#154e19]">Devenir Sponsor</Link></li>
              <li className="hover:text-[#bc4209] cursor-pointer transition">Mentions Légales</li>
              <li className="hover:text-[#bc4209] cursor-pointer transition">Politique de Confidentialité</li>
              <li className="hover:text-[#bc4209] cursor-pointer transition">Espace Presse</li>
            </ul>
          </div>

          {/* Col 4: CONTACT */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-2">
               <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
                Contact
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Siège social:<br/>
                Niamey, Niger<br/><br/>
                Email:<br/>
                contact@fnc-cyclisme.ne
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW : COPYRIGHT & LOGOS */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Propulsé par e-IMAN. Tous droits réservés.
          </p>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="h-14 sm:h-16 flex items-center justify-center p-1 text-center">
              <img src="niger.png" alt="logo" className="h-12 sm:h-14 w-auto object-contain" />
            </div>
            <div className="h-14 sm:h-16 flex items-center justify-center p-1 text-center">
              <img src="iman.png" alt="logo" className="h-12 sm:h-14 w-auto object-contain" />
            </div>
            <div className="h-14 sm:h-16 flex items-center justify-center p-1 text-center">
              <img src="logo.png" alt="logo" className="h-14 sm:h-16 w-auto object-contain" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
