import type { Article } from '../types';
import { apiFetch, API_CONFIG } from './apiClient';

export interface BackendArticle {
  id: number;
  photo: string | null;
  titre: string;
  date: string | null;
  contenue: string;
  categorie: string | null;
  auteur: string | null;
}

/**
 * Mappe un objet Article du backend Django vers l'interface Article du frontend
 */
export function mapBackendArticle(item: BackendArticle): Article {
  let photoUrl = item.photo || '';
  if (photoUrl && !photoUrl.startsWith('http://') && !photoUrl.startsWith('https://')) {
    if (!photoUrl.startsWith('/')) {
      photoUrl = `/media/${photoUrl}`;
    }
    photoUrl = `${API_CONFIG.MEDIA_URL}${photoUrl}`;
  }

  const contentStr = item.contenue || '';
  const summaryStr = contentStr.length > 150 ? contentStr.slice(0, 150) + '...' : contentStr;

  return {
    id: String(item.id),
    title: item.titre || 'Sans titre',
    category: item.categorie || 'CHAMPIONNAT NATIONAL',
    date: item.date || new Date().toISOString().split('T')[0],
    author: item.auteur || 'Bureau Exécutif FNC',
    image: photoUrl,
    summary: summaryStr,
    content: contentStr,
    likes: 0,
  };
}

export const articleService = {
  /**
   * Récupérer tous les articles depuis le backend Django (/api/article/)
   */
  async getArticles(category?: string): Promise<Article[]> {
    const res = await apiFetch<BackendArticle[]>('article/');
    const articles = (res.data || []).map(mapBackendArticle);

    if (category && category !== 'ALL') {
      return articles.filter(
        (a) => a.category.toLowerCase() === category.toLowerCase()
      );
    }
    return articles;
  },

  /**
   * Récupérer un article par son ID (/api/article/:id/)
   */
  async getArticleById(id: string | number): Promise<Article | null> {
    try {
      const res = await apiFetch<BackendArticle>(`article/${id}/`);
      return res.data ? mapBackendArticle(res.data) : null;
    } catch (err) {
      console.error(`Erreur getArticleById (${id}):`, err);
      return null;
    }
  },

  /**
   * Créer un nouvel article (Administration)
   */
  async createArticle(data: {
    title: string;
    category?: string;
    date?: string;
    author?: string;
    content: string;
    summary?: string;
    image?: string;
    photoFile?: File | null;
  }): Promise<Article> {
    let payload: FormData | string;

    if (data.photoFile) {
      const formData = new FormData();
      formData.append('titre', data.title);
      if (data.category) formData.append('categorie', data.category);
      if (data.date) formData.append('date', data.date);
      if (data.author) formData.append('auteur', data.author);
      formData.append('contenue', data.content);
      formData.append('photo', data.photoFile);
      payload = formData;
    } else {
      payload = JSON.stringify({
        titre: data.title,
        categorie: data.category || 'CHAMPIONNAT NATIONAL',
        date: data.date || null,
        auteur: data.author || 'Bureau Exécutif FNC',
        contenue: data.content,
      });
    }

    const res = await apiFetch<BackendArticle>('article/', {
      method: 'POST',
      body: payload,
    });

    return mapBackendArticle(res.data);
  },

  /**
   * Mettre à jour un article existant (/api/article/:id/)
   */
  async updateArticle(
    id: string | number,
    data: {
      title?: string;
      category?: string;
      date?: string;
      author?: string;
      content?: string;
      summary?: string;
      image?: string;
      photoFile?: File | null;
    }
  ): Promise<Article> {
    let payload: FormData | string;

    if (data.photoFile) {
      const formData = new FormData();
      if (data.title) formData.append('titre', data.title);
      if (data.category) formData.append('categorie', data.category);
      if (data.date) formData.append('date', data.date);
      if (data.author) formData.append('auteur', data.author);
      if (data.content) formData.append('contenue', data.content);
      formData.append('photo', data.photoFile);
      payload = formData;
    } else {
      const bodyObj: Record<string, unknown> = {};
      if (data.title !== undefined) bodyObj.titre = data.title;
      if (data.category !== undefined) bodyObj.categorie = data.category;
      if (data.date !== undefined) bodyObj.date = data.date;
      if (data.author !== undefined) bodyObj.auteur = data.author;
      if (data.content !== undefined) bodyObj.contenue = data.content;
      payload = JSON.stringify(bodyObj);
    }

    const res = await apiFetch<BackendArticle>(`article/${id}/`, {
      method: 'PUT',
      body: payload,
    });

    return mapBackendArticle(res.data);
  },

  /**
   * Supprimer un article (/api/article/:id/)
   */
  async deleteArticle(id: string | number): Promise<boolean> {
    await apiFetch(`article/${id}/`, { method: 'DELETE' });
    return true;
  },
};
