import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { AccueilPage } from './pages/Accueil';
import { HistoriquePage } from './pages/Historique';
import { AproposPage } from './pages/Apropos';
import { ActivitesPage } from './pages/Activites';
import { ChampionsPage } from './pages/Champions';
import { EcolePage } from './pages/Ecole';
import { BlogPage } from './pages/Blog';
import { SponsorPage } from './pages/Sponsor';
import { AuthPage } from './pages/Auth';
import { AdminPage } from './pages/Admin';
import type { Article } from './types';
import { ArticleModal } from './components/ArticleModal';
import { Footer } from './components/Footer';

// Layout wrapper to conditionally render public Header & Footer
function PublicLayout({
  onSelectArticle,
  selectedArticle,
  onCloseArticle,
}: {
  onSelectArticle: (article: Article) => void;
  selectedArticle: Article | null;
  onCloseArticle: () => void;
}) {
  const location = useLocation();
  const isAdminOrAuth = location.pathname === '/login' || location.pathname === '/admin';

  if (isAdminOrAuth) {
    return (
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6f5] text-slate-900 font-sans selection:bg-[#72f179] selection:text-white">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<AccueilPage onSelectArticle={onSelectArticle} />} />
          <Route path="/historique" element={<HistoriquePage />} />
          <Route path="/apropos" element={<AproposPage />} />
          <Route path="/activites" element={<ActivitesPage />} />
          <Route path="/leaders" element={<ChampionsPage />} />
          <Route path="/ecole" element={<EcolePage />} />
          <Route path="/blog" element={<BlogPage onSelectArticle={onSelectArticle} />} />
          <Route path="/sponsor" element={<SponsorPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <ArticleModal article={selectedArticle} onClose={onCloseArticle} />
    </div>
  );
}

export function App() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <BrowserRouter basename="/fnc">
      <PublicLayout
        onSelectArticle={(art) => setSelectedArticle(art)}
        selectedArticle={selectedArticle}
        onCloseArticle={() => setSelectedArticle(null)}
      />
    </BrowserRouter>
  );
}

export default App;
