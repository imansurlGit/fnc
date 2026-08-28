import type { Sponsor, SponsoringRequest } from '../types';
import { apiFetch } from './apiClient';

export interface BackendSponsor {
  id: number;
  nom: string;
  description: string | null;
  niveau: string;
  photo: string | null;
}

export interface BackendSponsoringRequest {
  id: number;
  nom: string;
  entreprise: string;
  e_mail: string;
  numero: string;
  niveau: string;
  message: string;
  statut: string;
  date_demande?: string;
}

function mapBackendSponsor(item: BackendSponsor): Sponsor {
  let photoUrl = item.photo || '';
  if (photoUrl && !photoUrl.startsWith('http://') && !photoUrl.startsWith('https://')) {
    if (!photoUrl.startsWith('/')) {
      photoUrl = `/media/${photoUrl}`;
    }
  }

  return {
    id: String(item.id),
    name: item.nom || '',
    category: (item.niveau as 'Or' | 'Argent' | 'Institutionnel') || 'Or',
    logo: photoUrl,
    logoUrl: photoUrl,
    image: photoUrl,
    website: 'https://fnc.ne',
    description: item.description || '',
  };
}

function mapBackendSponsoringRequest(item: BackendSponsoringRequest): SponsoringRequest {
  return {
    id: String(item.id),
    nom: item.nom || '',
    entreprise: item.entreprise || '',
    e_mail: item.e_mail || '',
    numero: item.numero || '',
    niveau: (item.niveau as 'Or' | 'Argent' | 'Institutionnel' | 'Autre') || 'Or',
    message: item.message || '',
    statut: item.statut || 'En attente',
    date_demande: item.date_demande || '',
  };
}

export const sponsorService = {
  /**
   * Récupérer tous les partenaires & sponsors (/api/sponsor/)
   */
  async getSponsors(category?: Sponsor['category']): Promise<Sponsor[]> {
    try {
      const res = await apiFetch<BackendSponsor[]>('sponsor/');
      if (res.data && Array.isArray(res.data)) {
        const mapped = res.data.map(mapBackendSponsor);
        if (category) {
          return mapped.filter((s) => s.category.toLowerCase() === category.toLowerCase());
        }
        return mapped;
      }
      return [];
    } catch (err) {
      console.error('Erreur getSponsors backend:', err);
      return [];
    }
  },

  /**
   * Récupérer un sponsor par son ID (/api/sponsor/:id/)
   */
  async getSponsorById(id: string): Promise<Sponsor | null> {
    try {
      const res = await apiFetch<BackendSponsor>(`sponsor/${id}/`);
      return res.data ? mapBackendSponsor(res.data) : null;
    } catch (err) {
      console.error(`Erreur getSponsorById (${id}):`, err);
      return null;
    }
  },

  /**
   * Ajouter un nouveau sponsor (Administration)
   */
  async createSponsor(
    newSponsor: { name: string; category: string; description?: string },
    photoFile?: File | null
  ): Promise<Sponsor> {
    if (photoFile) {
      const formData = new FormData();
      formData.append('nom', newSponsor.name);
      formData.append('niveau', newSponsor.category);
      if (newSponsor.description) {
        formData.append('description', newSponsor.description);
      }
      formData.append('photo', photoFile);

      const res = await apiFetch<BackendSponsor>('sponsor/', {
        method: 'POST',
        body: formData,
      });
      return mapBackendSponsor(res.data);
    } else {
      const res = await apiFetch<BackendSponsor>('sponsor/', {
        method: 'POST',
        body: JSON.stringify({
          nom: newSponsor.name,
          niveau: newSponsor.category,
          description: newSponsor.description || '',
        }),
      });
      return mapBackendSponsor(res.data);
    }
  },

  /**
   * Modifier un sponsor existant (/api/sponsor/:id/)
   */
  async updateSponsor(
    id: string,
    updates: { name?: string; category?: string; description?: string },
    photoFile?: File | null
  ): Promise<Sponsor> {
    if (photoFile) {
      const formData = new FormData();
      if (updates.name) formData.append('nom', updates.name);
      if (updates.category) formData.append('niveau', updates.category);
      if (updates.description !== undefined) {
        formData.append('description', updates.description || '');
      }
      formData.append('photo', photoFile);

      const res = await apiFetch<BackendSponsor>(`sponsor/${id}/`, {
        method: 'PUT',
        body: formData,
      });
      return mapBackendSponsor(res.data);
    } else {
      const res = await apiFetch<BackendSponsor>(`sponsor/${id}/`, {
        method: 'PUT',
        body: JSON.stringify({
          nom: updates.name,
          niveau: updates.category,
          description: updates.description,
        }),
      });
      return mapBackendSponsor(res.data);
    }
  },

  /**
   * Supprimer un sponsor (/api/sponsor/:id/)
   */
  async deleteSponsor(id: string): Promise<boolean> {
    await apiFetch(`sponsor/${id}/`, { method: 'DELETE' });
    return true;
  },

  /**
   * Envoyer une nouvelle demande de sponsoring (/api/sponsoring/)
   */
  async sendSponsoringRequest(payload: {
    nom: string;
    entreprise: string;
    e_mail: string;
    numero: string;
    niveau: string;
    message: string;
  }): Promise<{ success: boolean; message: string }> {
    const res = await apiFetch<{ id: number }>('sponsoring/', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return {
      success: true,
      message: res.message || 'Votre demande de sponsoring a été transmise avec succès.',
    };
  },

  /**
   * Récupérer toutes les demandes de sponsoring (/api/sponsoring/)
   */
  async getSponsoringRequests(): Promise<SponsoringRequest[]> {
    try {
      const res = await apiFetch<BackendSponsoringRequest[]>('sponsoring/');
      if (res.data && Array.isArray(res.data)) {
        return res.data.map(mapBackendSponsoringRequest);
      }
      return [];
    } catch (err) {
      console.error('Erreur getSponsoringRequests:', err);
      return [];
    }
  },

  /**
   * Mettre à jour le statut d'une demande de sponsoring (/api/sponsoring/:id/)
   */
  async updateSponsoringRequestStatus(
    id: string,
    statut: string
  ): Promise<SponsoringRequest> {
    const res = await apiFetch<BackendSponsoringRequest>(`sponsoring/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify({ statut }),
    });
    return mapBackendSponsoringRequest(res.data);
  },

  /**
   * Supprimer une demande de sponsoring (/api/sponsoring/:id/)
   */
  async deleteSponsoringRequest(id: string): Promise<boolean> {
    await apiFetch(`sponsoring/${id}/`, { method: 'DELETE' });
    return true;
  },
};

