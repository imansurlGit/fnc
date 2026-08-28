export interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  image: string;
  summary: string;
  content: string;
  likes: number;
}

export interface Sponsor {
  id: string;
  name: string;
  category: 'Or' | 'Argent' | 'Institutionnel' | 'Autre' | string;
  logo: string;
  image?: string;
  logoUrl?: string;
  website: string;
  description: string;
}

export interface SponsoringRequest {
  id: string;
  nom: string;
  entreprise: string;
  e_mail: string;
  numero: string;
  niveau: 'Or' | 'Argent' | 'Institutionnel' | 'Autre' | string;
  message: string;
  statut: 'En attente' | 'En cours de traitement' | 'Traité' | string;
  date_demande?: string;
}

export interface Athlete {
  id: string;
  name: string;
  nickname: string;
  region: string;
  specialty: string;
  jersey: 'Maillot Orange (Leader)' | 'Maillot Vert (Sprint)' | 'Maillot Blanc (Jeune)' | 'Champion National';
  image: string;
  wins: number;
}

export interface ProgramItem {
  id: string;
  time: string;
  title: string;
  description: string;
  badgeColor?: string;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface AccueilProps {
  onSelectArticle: (article: Article) => void;
}

export interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
}

export interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}
