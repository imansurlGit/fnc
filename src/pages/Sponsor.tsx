import React, { useState } from 'react';
import { Handshake, Send, Building, Mail, Phone, User, CheckCircle2, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { SponsorCarousel } from '../components/SponsorCarousel';
import { sponsorService } from '../services';
import { velo } from '../assets';

export const SponsorPage = () => {
  const [formData, setFormData] = useState({
    nom: '',
    entreprise: '',
    e_mail: '',
    numero: '',
    niveau: 'Or',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 1. Nom complet
    const nomTrimmed = formData.nom.trim();
    if (!nomTrimmed) {
      newErrors.nom = 'Le nom complet est obligatoire.';
    } else if (nomTrimmed.length < 2) {
      newErrors.nom = 'Le nom doit contenir au moins 2 caractères.';
    } else if (nomTrimmed.length > 100) {
      newErrors.nom = 'Le nom ne peut pas dépasser 100 caractères.';
    }

    // 2. Entreprise / Organisation
    const entrepriseTrimmed = formData.entreprise.trim();
    if (!entrepriseTrimmed) {
      newErrors.entreprise = "Le nom de l'entreprise ou organisation est obligatoire.";
    } else if (entrepriseTrimmed.length < 2) {
      newErrors.entreprise = "Le nom de l'entreprise doit contenir au moins 2 caractères.";
    } else if (entrepriseTrimmed.length > 100) {
      newErrors.entreprise = "Le nom de l'entreprise ne peut pas dépasser 100 caractères.";
    }

    // 3. Email
    const emailTrimmed = formData.e_mail.trim();
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailTrimmed) {
      newErrors.e_mail = "L'adresse email est obligatoire.";
    } else if (!emailRegex.test(emailTrimmed)) {
      newErrors.e_mail = 'Veuillez saisir une adresse email valide (ex: contact@entreprise.com).';
    }

    // 4. Numéro de téléphone
    const phoneTrimmed = formData.numero.trim();
    const phoneRegex = /^\+?[0-9\s\-().]{8,25}$/;
    const digitsOnly = phoneTrimmed.replace(/\D/g, '');
    if (!phoneTrimmed) {
      newErrors.numero = 'Le numéro de téléphone est obligatoire.';
    } else if (!phoneRegex.test(phoneTrimmed) || digitsOnly.length < 8) {
      newErrors.numero = "Veuillez saisir un numéro valide d'au moins 8 chiffres (ex: +227 90 00 00 00).";
    }

    // 5. Niveau de sponsoring
    const validLevels = ['Or', 'Argent', 'Institutionnel', 'Autre'];
    if (formData.niveau && !validLevels.includes(formData.niveau)) {
      newErrors.niveau = 'Veuillez sélectionner un niveau de sponsoring valide.';
    }

    // 6. Message
    const messageTrimmed = formData.message.trim();
    if (!messageTrimmed) {
      newErrors.message = 'Le message décrivant vos attentes et objectifs est obligatoire.';
    } else if (messageTrimmed.length < 10) {
      newErrors.message = 'Votre message doit comporter au moins 10 caractères.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (serverError) setServerError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      await sponsorService.sendSponsoringRequest({
        nom: formData.nom.trim(),
        entreprise: formData.entreprise.trim(),
        e_mail: formData.e_mail.trim().toLowerCase(),
        numero: formData.numero.trim(),
        niveau: formData.niveau || 'Or',
        message: formData.message.trim(),
      });
      setSubmitted(true);
      setFormData({
        nom: '',
        entreprise: '',
        e_mail: '',
        numero: '',
        niveau: 'Or',
        message: '',
      });
      setErrors({});
    } catch (err: unknown) {
      console.error('Erreur envoi demande sponsoring:', err);
      const errMsg = err instanceof Error ? err.message : "Une erreur est survenue lors de l'envoi de votre demande.";
      setServerError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f4f6f5] min-h-screen pb-20 font-sans">
      {/* Hero Section */}
      <div className="relative bg-[#bc4209] py-24 px-4 overflow-hidden shadow-md">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={velo} 
            alt="Sponsoring background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-block bg-[#bc4209] text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 shadow">
            Partenariat & Sponsoring
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Devenez Sponsor Officiel
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-medium">
            Associez l'image de votre entreprise à l'excellence sportive. 
            Soutenez la Fédération Nigérienne de Cyclisme et gagnez en visibilité nationale.
          </p>
        </div>
      </div>

      {/* Carousel des Sponsors */}
      <SponsorCarousel />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Column : Info */}
        <div className="space-y-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/80">
            <div className="w-14 h-14 bg-[#154e19]/10 rounded-2xl flex items-center justify-center text-[#154e19] mb-6">
              <Handshake className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-extrabold text-[#bc4209] mb-4">Pourquoi parrainer la 6ème Édition (Maradi 2026) ?</h2>
            <p className="text-slate-600 mb-6 leading-relaxed text-sm">
              Le parrainage du Championnat National de Cyclisme (16-20 septembre 2026 à Maradi) offre des leviers marketing uniques en phase avec les réalités du marché nigérien.
            </p>
            <ul className="space-y-4 text-xs sm:text-sm">
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-[#154e19] mr-3 shrink-0 mt-0.5" />
                <span className="text-slate-700"><strong>Visibilité Grand Public Maximale</strong> : Branding d'impact sur la caravane publicitaire, les panneaux routiers et les retransmissions TV/Réseaux sociaux.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-[#154e19] mr-3 shrink-0 mt-0.5" />
                <span className="text-slate-700"><strong>Maillots Officiels de Récompense</strong> : Visibilité de premier plan sur le <strong>Maillot Jaune</strong> (premier au temps) et le <strong>Maillot Vert</strong> (meilleur sprinteur).</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-[#154e19] mr-3 shrink-0 mt-0.5" />
                <span className="text-slate-700"><strong>Engagement RSE & Éco-Responsable</strong> : Soutien direct à la jeunesse, la santé par le sport et la promotion d'un mode de transport propre au Niger.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-[#154e19] mr-3 shrink-0 mt-0.5" />
                <span className="text-slate-700"><strong>Espace Stands & Goodies</strong> : Proximité directe avec des milliers de spectateurs le long des circuits urbains et zones d'arrivée à Maradi.</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#154e19] rounded-3xl p-8 shadow-sm text-white">
            <h3 className="text-xl font-bold mb-4">Besoin d'informations supplémentaires ?</h3>
            <p className="text-white/80 mb-6 text-sm leading-relaxed">Notre équipe dédiée aux partenariats est à votre disposition pour construire une offre sur mesure adaptée à vos objectifs.</p>
            <div className="flex flex-col space-y-3 text-sm font-semibold">
              <span className="flex items-center"><Phone className="w-5 h-5 mr-3 text-amber-400" /> +227 90 00 00 00</span>
              <span className="flex items-center"><Mail className="w-5 h-5 mr-3 text-amber-400" /> partenariats@fnc-cyclisme.ne</span>
            </div>
          </div>
        </div>

        {/* Right Column : Form */}
        <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-lg border border-slate-200/80">
          <h2 className="text-2xl font-black text-[#bc4209] mb-2 tracking-tight">Formulaire de Sponsoring</h2>
          <p className="text-slate-500 text-xs sm:text-sm mb-6">Remplissez vos coordonnées ci-dessous pour transmettre votre dossier au comité de partenariat FNC.</p>
          
          {serverError && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-3 animate-fadeIn">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Erreur de transmission</p>
                <p>{serverError}</p>
              </div>
            </div>
          )}

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center animate-fadeIn space-y-4">
              <div className="w-16 h-16 bg-[#154e19] rounded-2xl flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-[#154e19]">Demande envoyée avec succès !</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
                Merci de votre engagement auprès de la Fédération Nigérienne de Cyclisme. Notre comité d'organisation prendra contact avec votre représentant dans les meilleurs délais.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 inline-flex items-center gap-2 bg-white text-[#154e19] border border-emerald-200 hover:bg-emerald-100 font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider transition shadow-2xs cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Envoyer une autre demande
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Nom complet */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Nom complet *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      value={formData.nom}
                      onChange={(e) => handleChange('nom', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-xs font-medium focus:outline-none focus:ring-2 transition-all ${
                        errors.nom 
                          ? 'border-red-400 ring-1 ring-red-400 bg-red-50/30 text-red-900' 
                          : 'border-slate-200 focus:ring-[#bc4209] focus:border-transparent text-slate-800'
                      }`} 
                      placeholder="Ex: Nom prénom" 
                    />
                  </div>
                  {errors.nom && (
                    <p className="text-[11px] text-red-600 font-medium mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.nom}
                    </p>
                  )}
                </div>

                {/* Entreprise / Organisation */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Entreprise / Organisation *
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      value={formData.entreprise}
                      onChange={(e) => handleChange('entreprise', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-xs font-medium focus:outline-none focus:ring-2 transition-all ${
                        errors.entreprise 
                          ? 'border-red-400 ring-1 ring-red-400 bg-red-50/30 text-red-900' 
                          : 'border-slate-200 focus:ring-[#bc4209] focus:border-transparent text-slate-800'
                      }`} 
                      placeholder="Ex: Société Nigérienne de Télécoms" 
                    />
                  </div>
                  {errors.entreprise && (
                    <p className="text-[11px] text-red-600 font-medium mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.entreprise}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Adresse Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="email" 
                      value={formData.e_mail}
                      onChange={(e) => handleChange('e_mail', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-xs font-medium focus:outline-none focus:ring-2 transition-all ${
                        errors.e_mail 
                          ? 'border-red-400 ring-1 ring-red-400 bg-red-50/30 text-red-900' 
                          : 'border-slate-200 focus:ring-[#bc4209] focus:border-transparent text-slate-800'
                      }`} 
                      placeholder="contact@entreprise.ne" 
                    />
                  </div>
                  {errors.e_mail && (
                    <p className="text-[11px] text-red-600 font-medium mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.e_mail}
                    </p>
                  )}
                </div>

                {/* Téléphone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Numéro de Téléphone *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="tel" 
                      value={formData.numero}
                      onChange={(e) => handleChange('numero', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-xs font-medium focus:outline-none focus:ring-2 transition-all ${
                        errors.numero 
                          ? 'border-red-400 ring-1 ring-red-400 bg-red-50/30 text-red-900' 
                          : 'border-slate-200 focus:ring-[#bc4209] focus:border-transparent text-slate-800'
                      }`} 
                      placeholder="+227 90 00 00 00" 
                    />
                  </div>
                  {errors.numero && (
                    <p className="text-[11px] text-red-600 font-medium mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.numero}
                    </p>
                  )}
                </div>
              </div>

              {/* Niveau de sponsoring */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Niveau de sponsoring souhaité
                </label>
                <select 
                  value={formData.niveau}
                  onChange={(e) => handleChange('niveau', e.target.value)}
                  className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-xs font-medium focus:outline-none focus:ring-2 transition-all ${
                    errors.niveau
                      ? 'border-red-400 ring-1 ring-red-400 bg-red-50/30 text-red-900'
                      : 'border-slate-200 focus:ring-[#bc4209] focus:border-transparent text-slate-800'
                  }`}
                >
                  <option value="Or">Sponsor Or (Visibilité Maximale — Maillot Jaune)</option>
                  <option value="Argent">Sponsor Argent (Événementiel & Caravane)</option>
                  <option value="Institutionnel">Partenaire Institutionnel & Tutelle</option>
                  <option value="Autre">Autre partenariat sur mesure</option>
                </select>
                {errors.niveau && (
                  <p className="text-[11px] text-red-600 font-medium mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.niveau}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Votre Message / Objectifs de Partenariat *
                </label>
                <textarea 
                  rows={4} 
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-xs font-medium focus:outline-none focus:ring-2 transition-all resize-none ${
                    errors.message 
                      ? 'border-red-400 ring-1 ring-red-400 bg-red-50/30 text-red-900' 
                      : 'border-slate-200 focus:ring-[#bc4209] focus:border-transparent text-slate-800'
                  }`} 
                  placeholder="Précisez la nature de votre engagement, vos objectifs de communication ou vos questions..."
                />
                {errors.message && (
                  <p className="text-[11px] text-red-600 font-medium mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.message}
                  </p>
                )}
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#bc4209] hover:bg-[#9d3606] text-white font-extrabold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wider text-xs cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmission en cours...</span>
                  </>
                ) : (
                  <>
                    <span>Envoyer la demande</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
