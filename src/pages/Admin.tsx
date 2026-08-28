import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { HeaderAdmin } from '../components/HeaderAdmin';
import {
  authService,
  articleService,
  sponsorService,
  athleteService,
  programService,
  type UserSession
} from '../services';
import type { Article, Sponsor, Athlete, ProgramItem, SponsoringRequest } from '../types';
import { hero, ecoleMaradi } from '../assets';
import {
  Newspaper,
  Handshake,
  Medal,
  Calendar,
  Plus,
  Edit,
  Trash2,
  Search,
  X,
  TrendingUp,
  ShieldCheck,
  Loader2,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  Inbox,
  Building2,
  Mail,
  Phone,
  MessageSquare,
  Check,
  Clock,
  Eye
} from 'lucide-react';

const getFileName = (pathOrUrl: string | null | undefined): string => {
  if (!pathOrUrl) return '';
  try {
    const cleanPath = pathOrUrl.split('?')[0].split('#')[0];
    const name = cleanPath.substring(cleanPath.lastIndexOf('/') + 1).substring(cleanPath.lastIndexOf('\\') + 1);
    return decodeURIComponent(name) || pathOrUrl;
  } catch {
    const parts = pathOrUrl.split('/');
    return parts[parts.length - 1] || pathOrUrl;
  }
};

export const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  // User & Auth Session State
  const [user, setUser] = useState<UserSession | null>(null);
  const [activeTab, setActiveTabState] = useState<string>(() => {
    return sessionStorage.getItem('fnc_admin_active_tab') || 'dashboard';
  });

  const setActiveTab = (tab: string) => {
    sessionStorage.setItem('fnc_admin_active_tab', tab);
    setActiveTabState(tab);
  };

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  // Data States
  const [articles, setArticles] = useState<Article[]>([]);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [sponsoringRequests, setSponsoringRequests] = useState<SponsoringRequest[]>([]);
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [programItems, setProgramItems] = useState<ProgramItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Sponsor Sub-Tabs & Filters
  const [sponsorSubTab, setSponsorSubTab] = useState<'sponsors' | 'demandes'>('sponsors');
  const [searchArticle, setSearchArticle] = useState<string>('');
  const [searchSponsor, setSearchSponsor] = useState<string>('');
  const [searchRequest, setSearchRequest] = useState<string>('');
  const [requestStatusFilter, setRequestStatusFilter] = useState<string>('all');
  const [updatingRequestId, setUpdatingRequestId] = useState<string | null>(null);
  const [selectedRequestDetail, setSelectedRequestDetail] = useState<SponsoringRequest | null>(null);

  // Modal States
  const [isArticleModalOpen, setIsArticleModalOpen] = useState<boolean>(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState<boolean>(false);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);

  const [isAthleteModalOpen, setIsAthleteModalOpen] = useState<boolean>(false);

  // Article Form State
  const [articleForm, setArticleForm] = useState({
    title: '',
    category: 'CHAMPIONNAT NATIONAL',
    date: '16 Septembre 2026',
    author: 'Bureau Exécutif FNC',
    image: ecoleMaradi,
    summary: '',
    content: '',
  });

  // Sponsor Form State
  const [sponsorPhotoFile, setSponsorPhotoFile] = useState<File | null>(null);
  const [savingSponsor, setSavingSponsor] = useState<boolean>(false);
  const [sponsorForm, setSponsorForm] = useState({
    name: '',
    category: 'Or',
    description: '',
  });

  // Athlete Form State
  const [athleteForm, setAthleteForm] = useState({
    name: '',
    nickname: '',
    region: 'Niamey',
    specialty: 'Sprinteur / Rouleur',
    jersey: 'Champion National' as Athlete['jersey'],
    wins: 1,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  });

  // Check Auth & Fetch Data on Mount
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser && !authService.isAuthenticated()) {
      navigate('/login');
      return;
    }
    setUser(currentUser);

    loadAllData();
  }, [navigate]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const results = await Promise.allSettled([
        articleService.getArticles(),
        sponsorService.getSponsors(),
        athleteService.getAthletes(),
        programService.getProgramItems(),
        sponsorService.getSponsoringRequests(),
      ]);

      if (results[0].status === 'fulfilled') setArticles(results[0].value);
      if (results[1].status === 'fulfilled') setSponsors(results[1].value);
      if (results[2].status === 'fulfilled') setAthletes(results[2].value);
      if (results[3].status === 'fulfilled') setProgramItems(results[3].value);
      if (results[4].status === 'fulfilled') setSponsoringRequests(results[4].value);
    } catch (err) {
      console.error('Erreur chargement des données Admin:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    navigate('/login');
  };

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [savingArticle, setSavingArticle] = useState<boolean>(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const [modalSuccess, setModalSuccess] = useState<string | null>(null);

  // Article CRUD Handlers
  const handleOpenCreateArticle = () => {
    setEditingArticle(null);
    setPhotoFile(null);
    setModalError(null);
    setModalSuccess(null);
    setArticleForm({
      title: '',
      category: 'CHAMPIONNAT NATIONAL',
      date: new Date().toISOString().split('T')[0],
      author: user?.name || 'Bureau Exécutif FNC',
      image: hero,
      summary: '',
      content: '',
    });
    setIsArticleModalOpen(true);
  };

  const handleOpenEditArticle = (art: Article) => {
    setEditingArticle(art);
    setPhotoFile(null);
    setModalError(null);
    setModalSuccess(null);
    setArticleForm({
      title: art.title,
      category: art.category,
      date: art.date,
      author: art.author,
      image: art.image,
      summary: art.summary,
      content: art.content,
    });
    setIsArticleModalOpen(true);
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleForm.title || !articleForm.content) {
      setModalError('Le titre et le contenu sont obligatoires.');
      return;
    }
    setSavingArticle(true);
    setModalError(null);
    setModalSuccess(null);

    try {
      if (editingArticle) {
        const updated = await articleService.updateArticle(editingArticle.id, {
          ...articleForm,
          photoFile,
        });
        setArticles((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
        setModalSuccess('Article mis à jour avec succès !');
      } else {
        const created = await articleService.createArticle({
          ...articleForm,
          photoFile,
        });
        setArticles((prev) => [created, ...prev]);
        setModalSuccess('Article créé avec succès !');
      }
      setTimeout(() => {
        setIsArticleModalOpen(false);
      }, 700);
    } catch (err) {
      console.error('Erreur lors de la sauvegarde de l\'article:', err);
      setModalError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde de l\'article.');
    } finally {
      setSavingArticle(false);
    }
  };

  // Toast Notification & Popup Confirmation state
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [confirmModal, setConfirmModal] = useState<{
    title: string;
    message: string;
    confirmLabel?: string;
    onConfirm: () => Promise<void> | void;
  } | null>(null);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleDeleteArticle = (art: Article) => {
    setConfirmModal({
      title: 'Suppression de l\'article',
      message: `Êtes-vous sûr de vouloir supprimer l'article "${art.title}" ? Cette action est définitive.`,
      confirmLabel: 'Supprimer',
      onConfirm: async () => {
        setConfirmLoading(true);
        try {
          await articleService.deleteArticle(art.id);
          setArticles((prev) => prev.filter((a) => a.id !== art.id));
          setConfirmModal(null);
          showToast('success', 'Article supprimé avec succès !');
        } catch (err) {
          console.error('Erreur lors de la suppression:', err);
          showToast('error', err instanceof Error ? err.message : 'Échec de la suppression de l\'article.');
        } finally {
          setConfirmLoading(false);
        }
      },
    });
  };

  // Sponsor CRUD Handlers
  const handleOpenCreateSponsor = () => {
    setEditingSponsor(null);
    setSponsorPhotoFile(null);
    setSponsorForm({
      name: '',
      category: 'Or',
      description: '',
    });
    setIsSponsorModalOpen(true);
  };

  const handleOpenEditSponsor = (sp: Sponsor) => {
    setEditingSponsor(sp);
    setSponsorPhotoFile(null);
    setSponsorForm({
      name: sp.name,
      category: sp.category,
      description: sp.description,
    });
    setIsSponsorModalOpen(true);
  };

  const handleSaveSponsor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sponsorForm.name) return;

    setSavingSponsor(true);
    try {
      if (editingSponsor) {
        const updated = await sponsorService.updateSponsor(
          editingSponsor.id,
          {
            name: sponsorForm.name,
            category: sponsorForm.category,
            description: sponsorForm.description,
          },
          sponsorPhotoFile
        );
        setSponsors((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
        showToast('success', 'Sponsor mis à jour avec succès !');
      } else {
        const created = await sponsorService.createSponsor(
          {
            name: sponsorForm.name,
            category: sponsorForm.category,
            description: sponsorForm.description,
          },
          sponsorPhotoFile
        );
        setSponsors((prev) => [created, ...prev]);
        showToast('success', 'Sponsor créé avec succès !');
      }
      setIsSponsorModalOpen(false);
    } catch (err) {
      console.error('Erreur lors de l\'enregistrement du sponsor:', err);
      showToast('error', err instanceof Error ? err.message : 'Échec de l\'enregistrement du sponsor.');
    } finally {
      setSavingSponsor(false);
    }
  };

  const handleDeleteSponsor = (sp: Sponsor) => {
    setConfirmModal({
      title: 'Suppression du sponsor',
      message: `Voulez-vous vraiment supprimer le sponsor "${sp.name}" ?`,
      confirmLabel: 'Supprimer',
      onConfirm: async () => {
        setConfirmLoading(true);
        try {
          await sponsorService.deleteSponsor(sp.id);
          setSponsors((prev) => prev.filter((s) => s.id !== sp.id));
          setConfirmModal(null);
          showToast('success', 'Sponsor supprimé avec succès !');
        } catch (err) {
          showToast('error', 'Échec de la suppression du sponsor.');
        } finally {
          setConfirmLoading(false);
        }
      },
    });
  };

  // Athlete Handlers
  const [editingAthlete, setEditingAthlete] = useState<Athlete | null>(null);
  const [athletePhotoFile, setAthletePhotoFile] = useState<File | null>(null);
  const [savingAthlete, setSavingAthlete] = useState<boolean>(false);

  const handleOpenCreateAthlete = () => {
    setEditingAthlete(null);
    setAthletePhotoFile(null);
    setAthleteForm({
      name: '',
      nickname: '',
      region: 'Niamey',
      specialty: 'Sprinteur / Rouleur',
      jersey: 'Champion National',
      wins: 1,
      image: '',
    });
    setIsAthleteModalOpen(true);
  };

  const handleOpenEditAthlete = (ath: Athlete) => {
    setEditingAthlete(ath);
    setAthletePhotoFile(null);
    setAthleteForm({
      name: ath.name,
      nickname: ath.nickname,
      region: ath.region,
      specialty: ath.specialty,
      jersey: ath.jersey,
      wins: ath.wins,
      image: ath.image,
    });
    setIsAthleteModalOpen(true);
  };

  const handleSaveAthlete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!athleteForm.name) return;
    setSavingAthlete(true);

    try {
      if (editingAthlete) {
        const updated = await athleteService.updateAthlete(editingAthlete.id, {
          name: athleteForm.name,
          nickname: athleteForm.nickname,
          region: athleteForm.region,
          specialty: athleteForm.specialty,
          wins: athleteForm.wins,
          photoFile: athletePhotoFile,
        });
        setAthletes((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
        showToast('success', 'Athlète mis à jour avec succès !');
      } else {
        const created = await athleteService.createAthlete({
          name: athleteForm.name,
          nickname: athleteForm.nickname,
          region: athleteForm.region,
          specialty: athleteForm.specialty,
          wins: athleteForm.wins,
          photoFile: athletePhotoFile,
        });
        setAthletes((prev) => [created, ...prev]);
        showToast('success', 'Athlète inscrit avec succès !');
      }
      setIsAthleteModalOpen(false);
    } catch (err) {
      console.error('Erreur sauvegarde athlète:', err);
      showToast('error', 'Erreur lors de l\'enregistrement de l\'athlète.');
    } finally {
      setSavingAthlete(false);
    }
  };

  const handleDeleteAthlete = (ath: Athlete) => {
    setConfirmModal({
      title: 'Suppression de l\'athlète',
      message: `Voulez-vous vraiment supprimer l'athlète "${ath.name}" ?`,
      confirmLabel: 'Supprimer',
      onConfirm: async () => {
        setConfirmLoading(true);
        try {
          await athleteService.deleteAthlete(ath.id);
          setAthletes((prev) => prev.filter((a) => a.id !== ath.id));
          setConfirmModal(null);
          showToast('success', 'Athlète supprimé avec succès !');
        } catch {
          showToast('error', 'Échec de la suppression de l\'athlète.');
        } finally {
          setConfirmLoading(false);
        }
      },
    });
  };

  // Sponsoring Requests Handlers
  const handleUpdateStatus = async (id: string, newStatut: string) => {
    setUpdatingRequestId(id);
    try {
      const updated = await sponsorService.updateSponsoringRequestStatus(id, newStatut);
      setSponsoringRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, statut: updated.statut } : r))
      );
      if (selectedRequestDetail?.id === id) {
        setSelectedRequestDetail((prev) => (prev ? { ...prev, statut: updated.statut } : null));
      }
      showToast('success', `Statut mis à jour : "${newStatut}"`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur lors du changement de statut.';
      showToast('error', msg);
    } finally {
      setUpdatingRequestId(null);
    }
  };

  const handleDeleteRequest = (req: SponsoringRequest) => {
    setConfirmModal({
      title: 'Suppression de la demande de partenariat',
      message: `Voulez-vous vraiment supprimer la demande de "${req.entreprise || req.nom}" ?`,
      confirmLabel: 'Supprimer',
      onConfirm: async () => {
        setConfirmLoading(true);
        try {
          await sponsorService.deleteSponsoringRequest(req.id);
          setSponsoringRequests((prev) => prev.filter((r) => r.id !== req.id));
          if (selectedRequestDetail?.id === req.id) {
            setSelectedRequestDetail(null);
          }
          setConfirmModal(null);
          showToast('success', 'Demande supprimée avec succès !');
        } catch {
          showToast('error', 'Échec de la suppression de la demande.');
        } finally {
          setConfirmLoading(false);
        }
      },
    });
  };

  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(searchArticle.toLowerCase()) ||
      a.category.toLowerCase().includes(searchArticle.toLowerCase())
  );

  const filteredSponsors = sponsors.filter((s) =>
    s.name.toLowerCase().includes(searchSponsor.toLowerCase())
  );

  const filteredRequests = sponsoringRequests.filter((req) => {
    const q = searchRequest.toLowerCase();
    const matchesSearch =
      !q ||
      req.nom.toLowerCase().includes(q) ||
      req.entreprise.toLowerCase().includes(q) ||
      req.e_mail.toLowerCase().includes(q) ||
      req.numero.includes(q) ||
      req.message.toLowerCase().includes(q);

    const matchesStatus =
      requestStatusFilter === 'all' || req.statut === requestStatusFilter;

    return matchesSearch && matchesStatus;
  });

  const pendingRequestsCount = sponsoringRequests.filter(
    (r) => r.statut === 'En attente'
  ).length;

  const inProgressRequestsCount = sponsoringRequests.filter(
    (r) => r.statut === 'En cours de traitement'
  ).length;

  const doneRequestsCount = sponsoringRequests.filter(
    (r) => r.statut === 'Traité'
  ).length;

  return (
    // 1. Bloque la hauteur totale de l'écran et empêche le scroll sur la page globale
    <div className="h-screen w-screen bg-[#f4f6f5] flex font-sans text-slate-800 overflow-hidden">
      
      {/* Sidebar Navigation - 2. Garde la hauteur fixe (h-screen/h-full) */}
      <div className="shrink-0 h-full">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpenMobile={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
          user={user}
          onLogout={handleLogout}
        />
      </div>

      {/* Main Content Area - 3. Le contenu principal prend toute la hauteur et a son propre scroll vertical */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto">
        
        {/* Top Header Admin - 4. Optionnel : 'sticky top-0 z-10' si tu veux que le header soit aussi fixe en haut */}
        <div className="sticky top-0 z-10 bg-[#f4f6f5]">
          <HeaderAdmin
            activeTab={activeTab}
            onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
            user={user}
            onLogout={handleLogout}
            onQuickAction={
              activeTab === 'articles'
                ? handleOpenCreateArticle
                : activeTab === 'sponsors'
                ? handleOpenCreateSponsor
                : activeTab === 'athletes'
                ? () => setIsAthleteModalOpen(true)
                : handleOpenCreateArticle
            }
          />
        </div>

        {/* Dashboard Body Content */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto space-y-6">
          
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin text-[#bc4209] mb-3" />
              <p className="text-xs font-semibold uppercase tracking-wider">Chargement des données du Back-Office...</p>
            </div>
          )}

          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* KPI Summary Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                
                {/* Articles KPI */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Articles & Actualités
                    </span>
                    <h3 className="text-3xl font-black text-slate-900 mt-1">{articles.length}</h3>
                    <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> Publiés sur le site
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#bc4209] flex items-center justify-center border border-orange-100 shrink-0">
                    <Newspaper className="w-6 h-6" />
                  </div>
                </div>

                {/* Sponsors & Demandes KPI */}
                <div
                  onClick={() => {
                    setActiveTab('sponsors');
                    setSponsorSubTab(pendingRequestsCount > 0 ? 'demandes' : 'sponsors');
                  }}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between hover:border-emerald-300 transition cursor-pointer group"
                >
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider group-hover:text-[#154e19] transition">
                      Sponsors & Partenaires
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <h3 className="text-3xl font-black text-slate-900">{sponsors.length}</h3>
                      <span className="text-xs font-bold text-slate-400">confirmés</span>
                    </div>
                    <p className="text-[11px] font-semibold mt-1 flex items-center gap-1.5">
                      {pendingRequestsCount > 0 ? (
                        <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {pendingRequestsCount} demande{pendingRequestsCount > 1 ? 's' : ''} en attente
                        </span>
                      ) : (
                        <span className="text-emerald-600 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" /> {sponsoringRequests.length} demande{sponsoringRequests.length > 1 ? 's' : ''} au total
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#154e19] flex items-center justify-center border border-emerald-100 shrink-0 group-hover:scale-105 transition-transform">
                    <Handshake className="w-6 h-6" />
                  </div>
                </div>

                {/* Athlètes KPI */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Champions
                    </span>
                    <h3 className="text-3xl font-black text-slate-900 mt-1">{athletes.length}</h3>
                    <p className="text-[11px] text-slate-500 font-semibold mt-1">
                      Athlètes
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 shrink-0">
                    <Medal className="w-6 h-6" />
                  </div>
                </div>

                {/* Programme KPI */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Championnat Maradi
                    </span>
                    <h3 className="text-3xl font-black text-slate-900 mt-1">{programItems.length}</h3>
                    <p className="text-[11px] text-amber-600 font-semibold mt-1">
                      Épreuves planifiées
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 shrink-0">
                    <Calendar className="w-6 h-6" />
                  </div>
                </div>

              </div>

              {/* Quick Actions & Recent Articles */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left: Recent Articles List */}
                <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900">Derniers Articles Publiés</h3>
                      <p className="text-xs text-slate-500 font-medium">Gestion rapide des actualités</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('articles')}
                      className="text-xs font-bold text-[#bc4209] hover:underline"
                    >
                      Voir tout ({articles.length})
                    </button>
                  </div>

                  <div className="space-y-3">
                    {articles.slice(0, 3).map((art) => (
                      <div
                        key={art.id}
                        className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-4 hover:border-slate-300 transition"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={art.image}
                            alt={art.title}
                            className="w-12 h-12 rounded-lg object-cover bg-slate-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="text-[10px] font-extrabold text-[#154e19] uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                              {art.category}
                            </span>
                            <h4 className="text-xs font-bold text-slate-900 truncate mt-1">
                              {art.title}
                            </h4>
                            <p className="text-[11px] text-slate-500 truncate">{art.date}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleOpenEditArticle(art)}
                            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition cursor-pointer"
                            title="Modifier"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteArticle(art)}
                            className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition cursor-pointer"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Quick Admin Controls */}
                <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
                  <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">
                    Actions Rapides
                  </h3>

                  <div className="space-y-2.5">
                    <button
                      onClick={handleOpenCreateArticle}
                      className="w-full bg-[#bc4209] hover:bg-[#a33705] text-white font-bold px-4 py-3 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-between cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Newspaper className="w-4 h-4" /> Ajouter un article
                      </span>
                      <Plus className="w-4 h-4" />
                    </button>

                    <button
                      onClick={handleOpenCreateSponsor}
                      className="w-full bg-[#154e19] hover:bg-[#0f3b13] text-white font-bold px-4 py-3 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-between cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Handshake className="w-4 h-4" /> Ajouter un Sponsor
                      </span>
                      <Plus className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setIsAthleteModalOpen(true)}
                      className="w-full bg-slate-900 hover:bg-slate-950 text-white font-bold px-4 py-3 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-between cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Medal className="w-4 h-4" /> Inscrire un Athlète
                      </span>
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: ARTICLES MANAGEMENT */}
          {activeTab === 'articles' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Header Bar with Search & Add Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchArticle}
                    onChange={(e) => setSearchArticle(e.target.value)}
                    placeholder="Rechercher un article par titre ou catégorie..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs font-medium focus:outline-none focus:border-[#bc4209]"
                  />
                </div>

                <button
                  onClick={handleOpenCreateArticle}
                  className="bg-[#bc4209] hover:bg-[#a33705] text-white font-extrabold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Nouvel Article
                </button>
              </div>

              {/* Articles Data Table */}
              <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3.5 px-4">Article</th>
                        <th className="py-3.5 px-4">Catégorie</th>
                        <th className="py-3.5 px-4">Date</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredArticles.map((art) => (
                        <tr key={art.id} className="hover:bg-slate-50/80 transition">
                          <td className="py-3.5 px-4 font-bold text-slate-900 max-w-xs">
                            <div className="flex items-center gap-3">
                              <img
                                src={art.image}
                                alt={art.title}
                                className="w-10 h-10 rounded-lg object-cover bg-slate-200 shrink-0"
                              />
                              <span className="line-clamp-2">{art.title}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="bg-[#154e19]/10 text-[#154e19] border border-[#154e19]/20 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider inline-block">
                              {art.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-slate-800">
                            {art.date}
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-1">
                            <button
                              onClick={() => handleOpenEditArticle(art)}
                              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition cursor-pointer"
                              title="Modifier"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteArticle(art)}
                              className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition cursor-pointer"
                              title="Supprimer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: SPONSORS & DEMANDES MANAGEMENT */}
          {activeTab === 'sponsors' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Sub-Tabs Switcher */}
              <div className="bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSponsorSubTab('sponsors')}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                      sponsorSubTab === 'sponsors'
                        ? 'bg-[#154e19] text-white shadow-sm'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <Handshake className="w-4 h-4" />
                    <span>Sponsors Partenaires</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-md font-extrabold ${
                        sponsorSubTab === 'sponsors'
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {sponsors.length}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSponsorSubTab('demandes')}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                      sponsorSubTab === 'demandes'
                        ? 'bg-[#bc4209] text-white shadow-sm'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <Inbox className="w-4 h-4" />
                    <span>Demandes de Partenariat</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-md font-extrabold ${
                        sponsorSubTab === 'demandes'
                          ? 'bg-white/20 text-white'
                          : pendingRequestsCount > 0
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {sponsoringRequests.length}
                    </span>
                    {pendingRequestsCount > 0 && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[10px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-full shadow-xs">
                        <Clock className="w-3 h-3" /> {pendingRequestsCount} en attente
                      </span>
                    )}
                  </button>
                </div>

                {sponsorSubTab === 'sponsors' && (
                  <button
                    onClick={handleOpenCreateSponsor}
                    className="bg-[#154e19] hover:bg-[#0f3b13] text-white font-extrabold px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-xs cursor-pointer ml-auto"
                  >
                    <Plus className="w-4 h-4" /> Nouveau Sponsor
                  </button>
                )}
              </div>

              {/* SUB-TAB 1: SPONSORS OFFICIELS */}
              {sponsorSubTab === 'sponsors' && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Search Bar */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                    <div className="relative flex-1 max-w-md">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchSponsor}
                        onChange={(e) => setSearchSponsor(e.target.value)}
                        placeholder="Rechercher un sponsor officiel..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs font-medium focus:outline-none focus:border-[#154e19]"
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-500">
                      {filteredSponsors.length} partenaire{filteredSponsors.length > 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Sponsors Grid */}
                  {filteredSponsors.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredSponsors.map((sp) => (
                        <div
                          key={sp.id}
                          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition group"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-200 p-1.5 flex items-center justify-center overflow-hidden">
                                {sp.logo || sp.image ? (
                                  <img
                                    src={sp.image || sp.logo}
                                    alt={sp.name}
                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                                  />
                                ) : (
                                  <span className="font-black text-[#bc4209] text-base">
                                    {sp.name.substring(0, 2).toUpperCase()}
                                  </span>
                                )}
                              </div>
                              <span
                                className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider ${
                                  sp.category === 'Or'
                                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                    : sp.category === 'Argent'
                                    ? 'bg-slate-100 text-slate-700 border border-slate-200'
                                    : 'bg-emerald-50 text-[#154e19] border border-emerald-200'
                                }`}
                              >
                                {sp.category}
                              </span>
                            </div>

                            <h4 className="text-base font-extrabold text-slate-900">{sp.name}</h4>
                            <p className="text-xs text-slate-600 mt-1 line-clamp-3 leading-relaxed">
                              {sp.description || 'Aucune description renseignée.'}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleOpenEditSponsor(sp)}
                              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
                              title="Modifier"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteSponsor(sp)}
                              className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition cursor-pointer"
                              title="Supprimer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                      <Handshake className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <h4 className="text-base font-black text-slate-800">Aucun sponsor trouvé</h4>
                      <p className="text-xs text-slate-500 mt-1">Modifiez vos filtres ou ajoutez un nouveau partenaire officiel.</p>
                    </div>
                  )}
                </div>
              )}

              {/* SUB-TAB 2: DEMANDES DE SPONSORING */}
              {sponsorSubTab === 'demandes' && (
                <div className="space-y-6 animate-fadeIn">
                  
                  {/* Filters Bar */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchRequest}
                        onChange={(e) => setSearchRequest(e.target.value)}
                        placeholder="Rechercher par nom, entreprise, email, téléphone..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs font-medium focus:outline-none focus:border-[#bc4209]"
                      />
                    </div>

                    {/* Status Pill Filters */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setRequestStatusFilter('all')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                          requestStatusFilter === 'all'
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        Toutes ({sponsoringRequests.length})
                      </button>

                      <button
                        type="button"
                        onClick={() => setRequestStatusFilter('En attente')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer ${
                          requestStatusFilter === 'En attente'
                            ? 'bg-amber-500 text-white shadow-xs'
                            : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>En attente ({pendingRequestsCount})</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setRequestStatusFilter('En cours de traitement')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer ${
                          requestStatusFilter === 'En cours de traitement'
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100'
                        }`}
                      >
                        <Loader2 className="w-3.5 h-3.5" />
                        <span>En cours ({inProgressRequestsCount})</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setRequestStatusFilter('Traité')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer ${
                          requestStatusFilter === 'Traité'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Traitées ({doneRequestsCount})</span>
                      </button>
                    </div>
                  </div>

                  {/* Requests Grid */}
                  {filteredRequests.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                      {filteredRequests.map((req) => (
                        <div
                          key={req.id}
                          className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-slate-300 transition flex flex-col justify-between space-y-4 relative"
                        >
                          <div>
                            {/* Card Top: Enterprise, Contact, Category badge & Current Status */}
                            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <Building2 className="w-4 h-4 text-[#bc4209] shrink-0" />
                                  <h4 className="text-base font-black text-slate-900 leading-tight">
                                    {req.entreprise || 'Entreprise non spécifiée'}
                                  </h4>
                                </div>
                                <p className="text-xs text-slate-600 font-semibold flex items-center gap-1.5">
                                  <span className="text-slate-400">Contact :</span>
                                  <span className="text-slate-800 font-bold">{req.nom}</span>
                                </p>
                              </div>

                              <div className="flex flex-col items-end gap-1.5">
                                <span
                                  className={`text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider ${
                                    req.niveau === 'Or'
                                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                      : req.niveau === 'Argent'
                                      ? 'bg-slate-100 text-slate-700 border border-slate-200'
                                      : req.niveau === 'Institutionnel'
                                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                      : 'bg-purple-50 text-purple-800 border border-purple-200'
                                  }`}
                                >
                                  Niveau {req.niveau}
                                </span>

                                {/* Status Badge */}
                                <span
                                  className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 ${
                                    req.statut === 'Traité'
                                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                      : req.statut === 'En cours de traitement'
                                      ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                                  }`}
                                >
                                  {req.statut === 'Traité' ? (
                                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                  ) : req.statut === 'En cours de traitement' ? (
                                    <Loader2 className="w-3 h-3 text-blue-600 animate-spin" />
                                  ) : (
                                    <Clock className="w-3 h-3 text-amber-600" />
                                  )}
                                  <span>{req.statut}</span>
                                </span>
                              </div>
                            </div>

                            {/* Card Middle: Contacts & Message */}
                            <div className="mt-3 space-y-3">
                              {/* Contacts */}
                              <div className="flex flex-wrap items-center gap-3 text-xs">
                                <a
                                  href={`mailto:${req.e_mail}`}
                                  className="inline-flex items-center gap-1.5 font-bold text-slate-700 hover:text-[#bc4209] bg-slate-50 hover:bg-orange-50 px-2.5 py-1 rounded-lg border border-slate-200 transition"
                                  title="Envoyer un email"
                                >
                                  <Mail className="w-3.5 h-3.5 text-[#bc4209]" />
                                  <span>{req.e_mail}</span>
                                </a>

                                <a
                                  href={`tel:${req.numero}`}
                                  className="inline-flex items-center gap-1.5 font-bold text-slate-700 hover:text-[#154e19] bg-slate-50 hover:bg-emerald-50 px-2.5 py-1 rounded-lg border border-slate-200 transition"
                                  title="Appeler le numéro"
                                >
                                  <Phone className="w-3.5 h-3.5 text-[#154e19]" />
                                  <span>{req.numero}</span>
                                </a>
                              </div>

                              {/* Message Quote */}
                              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80">
                                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                                  <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                                  <span>Message du partenaire :</span>
                                </div>
                                <p className="text-xs text-slate-700 leading-relaxed font-medium line-clamp-3">
                                  {req.message}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Card Bottom: Status Quick Actions & Tools */}
                          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                            {/* Fast Status Change Buttons */}
                            <div className="flex items-center gap-1">
                              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mr-1">
                                Marquer :
                              </span>

                              <button
                                type="button"
                                disabled={updatingRequestId === req.id}
                                onClick={() => handleUpdateStatus(req.id, 'En attente')}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer disabled:opacity-50 ${
                                  req.statut === 'En attente'
                                    ? 'bg-amber-500 text-white shadow-2xs'
                                    : 'bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-700 border border-slate-200'
                                }`}
                                title="Passer en attente"
                              >
                                <Clock className="w-3 h-3" />
                                <span>En attente</span>
                              </button>

                              <button
                                type="button"
                                disabled={updatingRequestId === req.id}
                                onClick={() => handleUpdateStatus(req.id, 'En cours de traitement')}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer disabled:opacity-50 ${
                                  req.statut === 'En cours de traitement'
                                    ? 'bg-blue-600 text-white shadow-2xs'
                                    : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700 border border-slate-200'
                                }`}
                                title="Passer en cours de traitement"
                              >
                                <Loader2 className="w-3 h-3" />
                                <span>En cours</span>
                              </button>

                              <button
                                type="button"
                                disabled={updatingRequestId === req.id}
                                onClick={() => handleUpdateStatus(req.id, 'Traité')}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer disabled:opacity-50 ${
                                  req.statut === 'Traité'
                                    ? 'bg-emerald-600 text-white shadow-2xs'
                                    : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200'
                                }`}
                                title="Marquer comme traité"
                              >
                                <Check className="w-3 h-3" />
                                <span>Traité</span>
                              </button>
                            </div>

                            {/* View full & Delete actions */}
                            <div className="flex items-center gap-1 ml-auto">
                              <button
                                type="button"
                                onClick={() => setSelectedRequestDetail(req)}
                                className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
                                title="Voir tous les détails"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteRequest(req)}
                                className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition cursor-pointer"
                                title="Supprimer cette demande"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                      <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <h4 className="text-base font-black text-slate-800">Aucune demande de sponsoring</h4>
                      <p className="text-xs text-slate-500 mt-1">
                        {requestStatusFilter !== 'all'
                          ? `Aucune demande avec le statut "${requestStatusFilter}".`
                          : 'Aucune demande reçue pour le moment.'}
                      </p>
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

          {/* TAB 4: ATHLETES MANAGEMENT */}
          {activeTab === 'athletes' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Sélection Nationale Mena Cycliste</h3>
                  <p className="text-xs text-slate-500 font-medium">Athlètes des 8 ligues régionales du Niger</p>
                </div>

                <button
                  onClick={handleOpenCreateAthlete}
                  className="bg-slate-900 hover:bg-slate-950 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Inscrire un Athlète
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {athletes.map((ath) => (
                  <div
                    key={ath.id}
                    className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs p-5 space-y-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <img
                          src={ath.image}
                          alt={ath.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-[#154e19]"
                        />
                        <div>
                          <h4 className="text-base font-extrabold text-slate-900 leading-tight">{ath.name}</h4>
                          {ath.nickname && <p className="text-xs text-[#bc4209] font-bold italic">"{ath.nickname}"</p>}
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded mt-1 inline-block">
                            Région {ath.region}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs space-y-1 pt-3 border-t border-slate-100 mt-3">
                        <p><strong className="text-slate-700">Spécialité :</strong> {ath.specialty}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-amber-600">🏆 {ath.wins} victoires</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditAthlete(ath)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
                          title="Modifier"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteAthlete(ath)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition cursor-pointer"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 5: PROGRAM */}
          {activeTab === 'program' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">
                  Programme Officiel — 6ème Édition Maradi 2026
                </h3>

                <div className="space-y-3">
                  {programItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <span className="text-xs font-black text-[#bc4209] uppercase tracking-wider block">
                          {item.time}
                        </span>
                        <h4 className="text-sm font-extrabold text-slate-900 mt-0.5">{item.title}</h4>
                        <p className="text-xs text-slate-600 mt-1 font-medium">{item.description}</p>
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-[#154e19] px-3 py-1 rounded-full shrink-0 self-start sm:self-center">
                        Confirmé FNC
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>

        {/* MODAL ARTICLE */}
        {isArticleModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative border border-slate-200 animate-fadeIn my-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-lg font-black text-slate-900">
                  {editingArticle ? 'Modifier l\'article' : 'Créer un nouvel article'}
                </h3>
                <button
                  onClick={() => setIsArticleModalOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveArticle} className="space-y-4">
                {/* Banner Message Erreur */}
                {modalError && (
                  <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-3 animate-fadeIn">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Erreur d'enregistrement</p>
                      <p className="mt-0.5 font-medium text-red-700">{modalError}</p>
                    </div>
                  </div>
                )}

                {/* Banner Message Succès */}
                {modalSuccess && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-3 animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Succès</p>
                      <p className="mt-0.5 font-medium text-emerald-700">{modalSuccess}</p>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Titre de l'article *
                  </label>
                  <input
                    type="text"
                    required
                    value={articleForm.title}
                    onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                    placeholder="Ex: Succès du Championnat National à Maradi"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-[#bc4209]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Catégorie
                    </label>
                    <select
                      value={articleForm.category}
                      onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-[#bc4209]"
                    >
                      <option value="CHAMPIONNAT NATIONAL">CHAMPIONNAT NATIONAL</option>
                      <option value="MENA CYCLISTE">MENA CYCLISTE</option>
                      <option value="AES / INTERNATIONAL">AES / INTERNATIONAL</option>
                      <option value="COMPÉTITIONS">COMPÉTITIONS</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={articleForm.date}
                      onChange={(e) => setArticleForm({ ...articleForm, date: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-[#bc4209]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Image d'illustration (Photo)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-medium focus:outline-none focus:border-[#bc4209]"
                  />
                  {editingArticle && editingArticle.image && !photoFile && (
                    <p className="text-[11px] text-slate-500 mt-1 truncate max-w-md">
                      Photo actuelle : <span className="font-semibold text-slate-700">{getFileName(editingArticle.image)}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Contenu de l'article *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={articleForm.content}
                    onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                    placeholder="Rédigez ici le contenu détaillé de l'article..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:border-[#bc4209]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsArticleModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={savingArticle}
                    className="bg-[#bc4209] hover:bg-[#a33705] text-white font-extrabold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider transition shadow-sm cursor-pointer disabled:opacity-50 flex items-center gap-2"
                  >
                    {savingArticle ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Enregistrement...</span>
                      </>
                    ) : (
                      <span>{editingArticle ? 'Mettre à jour' : 'Enregistrer'}</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL SPONSOR */}
        {isSponsorModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-6 relative border border-slate-200 animate-fadeIn my-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-lg font-black text-slate-900">
                  {editingSponsor ? 'Modifier le sponsor' : 'Ajouter un sponsor'}
                </h3>
                <button
                  onClick={() => setIsSponsorModalOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveSponsor} className="space-y-4">
                {/* Nom du sponsor */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Nom du sponsor *
                  </label>
                  <input
                    type="text"
                    required
                    value={sponsorForm.name}
                    onChange={(e) => setSponsorForm({ ...sponsorForm, name: e.target.value })}
                    placeholder="Ex: Société Nigérienne de Télécoms"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-[#bc4209]"
                  />
                </div>

                {/* Niveau / Catégorie */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Niveau de partenariat *
                  </label>
                  <select
                    value={sponsorForm.category}
                    onChange={(e) => setSponsorForm({ ...sponsorForm, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-[#bc4209]"
                  >
                    <option value="Or">Sponsor Or — Visibilité Maximale</option>
                    <option value="Argent">Sponsor Argent — Événementiel</option>
                    <option value="Institutionnel">Partenaire Institutionnel</option>
                    <option value="Autre">Autre partenariat</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={sponsorForm.description}
                    onChange={(e) => setSponsorForm({ ...sponsorForm, description: e.target.value })}
                    placeholder="Brève description du partenaire (secteur, mission...)."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-[#bc4209] resize-none"
                  />
                </div>

                {/* Logo du sponsor */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Logo du sponsor (Image)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSponsorPhotoFile(e.target.files?.[0] || null)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-medium focus:outline-none focus:border-[#bc4209]"
                  />
                  {editingSponsor && (editingSponsor.image || editingSponsor.logo) && !sponsorPhotoFile && (
                    <div className="mt-2 flex items-center gap-3">
                      <img
                        src={editingSponsor.image || editingSponsor.logo}
                        alt={editingSponsor.name}
                        className="w-10 h-10 rounded-lg object-contain border border-slate-200 bg-white p-1"
                      />
                      <p className="text-[11px] text-slate-500 font-medium">
                        Logo actuel : <span className="font-semibold text-slate-700">{getFileName(editingSponsor.image || editingSponsor.logo)}</span>
                      </p>
                    </div>
                  )}
                  {sponsorPhotoFile && (
                    <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                      ✓ Nouveau logo sélectionné : {sponsorPhotoFile.name}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsSponsorModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={savingSponsor}
                    className="bg-[#154e19] hover:bg-[#0f3b13] text-white font-extrabold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider transition shadow-sm cursor-pointer disabled:opacity-50 flex items-center gap-2"
                  >
                    {savingSponsor ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Enregistrement...</span>
                      </>
                    ) : (
                      <span>{editingSponsor ? 'Mettre à jour' : 'Enregistrer'}</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL ATHLÈTE */}
        {isAthleteModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative border border-slate-200 animate-fadeIn my-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-lg font-black text-slate-900">
                  {editingAthlete ? 'Modifier l\'athlète' : 'Inscrire un nouvel athlète'}
                </h3>
                <button
                  onClick={() => setIsAthleteModalOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveAthlete} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Nom complet de l'athlète *
                  </label>
                  <input
                    type="text"
                    required
                    value={athleteForm.name}
                    onChange={(e) => setAthleteForm({ ...athleteForm, name: e.target.value })}
                    placeholder="Ex: Oumarou Moumouni"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-[#bc4209]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Surnom / Slogan
                    </label>
                    <input
                      type="text"
                      value={athleteForm.nickname}
                      onChange={(e) => setAthleteForm({ ...athleteForm, nickname: e.target.value })}
                      placeholder="Ex: Le Rouleur de Maradi"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-[#bc4209]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Région / Ligue
                    </label>
                    <select
                      value={athleteForm.region}
                      onChange={(e) => setAthleteForm({ ...athleteForm, region: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-[#bc4209]"
                    >
                      <option value="Niamey">Niamey</option>
                      <option value="Maradi">Maradi</option>
                      <option value="Zinder">Zinder</option>
                      <option value="Tahoua">Tahoua</option>
                      <option value="Dosso">Dosso</option>
                      <option value="Tillabéri">Tillabéri</option>
                      <option value="Agadez">Agadez</option>
                      <option value="Diffa">Diffa</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Spécialité
                    </label>
                    <input
                      type="text"
                      value={athleteForm.specialty}
                      onChange={(e) => setAthleteForm({ ...athleteForm, specialty: e.target.value })}
                      placeholder="Ex: Sprinteur / Rouleur"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-[#bc4209]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Victoires / Distinctions
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={athleteForm.wins}
                      onChange={(e) => setAthleteForm({ ...athleteForm, wins: parseInt(e.target.value, 10) || 0 })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-[#bc4209]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Photo de l'athlète
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setAthletePhotoFile(e.target.files?.[0] || null)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-medium focus:outline-none focus:border-[#bc4209]"
                  />
                  {editingAthlete && editingAthlete.image && !athletePhotoFile && (
                    <p className="text-[11px] text-slate-500 mt-1 truncate max-w-md">
                      Photo actuelle : <span className="font-semibold text-slate-700">{getFileName(editingAthlete.image)}</span>
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsAthleteModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={savingAthlete}
                    className="bg-[#154e19] hover:bg-[#0f3b13] text-white font-extrabold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider transition shadow-sm cursor-pointer disabled:opacity-50 flex items-center gap-2"
                  >
                    {savingAthlete ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Enregistrement...</span>
                      </>
                    ) : (
                      <span>{editingAthlete ? 'Mettre à jour' : 'Inscrire'}</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL DÉTAIL DEMANDE DE SPONSORING */}
        {selectedRequestDetail && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative border border-slate-200 animate-fadeIn my-8">
              {/* Header */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[#bc4209]" />
                    <h3 className="text-lg font-black text-slate-900 leading-tight">
                      {selectedRequestDetail.entreprise || 'Entreprise non spécifiée'}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 font-semibold mt-1">
                    Demande de partenariat reçue {selectedRequestDetail.date_demande ? `le ${selectedRequestDetail.date_demande.split('T')[0]}` : ''}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedRequestDetail(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Personne de contact
                  </span>
                  <p className="text-xs font-black text-slate-800 mt-0.5">{selectedRequestDetail.nom}</p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Niveau souhaité
                  </span>
                  <span
                    className={`inline-block mt-0.5 text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider ${
                      selectedRequestDetail.niveau === 'Or'
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : selectedRequestDetail.niveau === 'Argent'
                        ? 'bg-slate-100 text-slate-700 border border-slate-200'
                        : selectedRequestDetail.niveau === 'Institutionnel'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-purple-50 text-purple-800 border border-purple-200'
                    }`}
                  >
                    {selectedRequestDetail.niveau}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Adresse Email
                  </span>
                  <a
                    href={`mailto:${selectedRequestDetail.e_mail}`}
                    className="text-xs font-bold text-[#bc4209] hover:underline mt-0.5 flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{selectedRequestDetail.e_mail}</span>
                  </a>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Téléphone
                  </span>
                  <a
                    href={`tel:${selectedRequestDetail.numero}`}
                    className="text-xs font-bold text-[#154e19] hover:underline mt-0.5 flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{selectedRequestDetail.numero}</span>
                  </a>
                </div>
              </div>

              {/* Message */}
              <div>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-slate-500" />
                  <span>Message & Attentes du Partenaire</span>
                </span>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-h-48 overflow-y-auto">
                  <p className="text-xs text-slate-700 leading-relaxed font-medium whitespace-pre-wrap">
                    {selectedRequestDetail.message}
                  </p>
                </div>
              </div>

              {/* Changer le statut */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Statut du dossier
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    disabled={updatingRequestId === selectedRequestDetail.id}
                    onClick={() => handleUpdateStatus(selectedRequestDetail.id, 'En attente')}
                    className={`py-2 px-3 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 ${
                      selectedRequestDetail.statut === 'En attente'
                        ? 'bg-amber-500 text-white shadow-sm ring-2 ring-amber-300'
                        : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>En attente</span>
                  </button>

                  <button
                    type="button"
                    disabled={updatingRequestId === selectedRequestDetail.id}
                    onClick={() => handleUpdateStatus(selectedRequestDetail.id, 'En cours de traitement')}
                    className={`py-2 px-3 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 ${
                      selectedRequestDetail.statut === 'En cours de traitement'
                        ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-300'
                        : 'bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100'
                    }`}
                  >
                    <Loader2 className="w-3.5 h-3.5" />
                    <span>En cours</span>
                  </button>

                  <button
                    type="button"
                    disabled={updatingRequestId === selectedRequestDetail.id}
                    onClick={() => handleUpdateStatus(selectedRequestDetail.id, 'Traité')}
                    className={`py-2 px-3 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 ${
                      selectedRequestDetail.statut === 'Traité'
                        ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-300'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Traité</span>
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    const req = selectedRequestDetail;
                    setSelectedRequestDetail(null);
                    handleDeleteRequest(req);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition cursor-pointer flex items-center gap-1.5"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Supprimer</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRequestDetail(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-950 text-white font-extrabold text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* POPUP CONFIRMATION MODAL */}
        {confirmModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 border border-slate-200 animate-fadeIn relative">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">{confirmModal.title}</h3>
                  <p className="text-xs text-slate-500 font-semibold">Confirmation requise</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {confirmModal.message}
              </p>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  disabled={confirmLoading}
                  onClick={() => setConfirmModal(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  disabled={confirmLoading}
                  onClick={confirmModal.onConfirm}
                  className="bg-red-600 hover:bg-red-700 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {confirmLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Suppression...</span>
                    </>
                  ) : (
                    <span>{confirmModal.confirmLabel || 'Confirmer'}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FLOATING TOAST NOTIFICATION POPUP */}
        {toast && (
          <div className="fixed top-5 right-5 z-50 animate-fadeIn">
            <div className={`p-4 rounded-2xl shadow-2xl border flex items-center gap-3 text-xs font-bold text-white transition-all ${
              toast.type === 'success' ? 'bg-emerald-900 border-emerald-600' : 'bg-red-900 border-red-600'
            }`}>
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              )}
              <span>{toast.message}</span>
              <button onClick={() => setToast(null)} className="ml-2 text-white/70 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};