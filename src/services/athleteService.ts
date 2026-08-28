import type { Athlete } from '../types';
import { apiFetch, API_CONFIG } from './apiClient';

export interface BackendAthlete {
  id: number;
  photo: string | null;
  nom: string;
  slogan: string | null;
  region: string;
  specialite: string | null;
  distinction: string | null;
}

export function mapBackendAthlete(item: BackendAthlete): Athlete {
  let photoUrl = item.photo || '';
  if (photoUrl && !photoUrl.startsWith('http://') && !photoUrl.startsWith('https://')) {
    if (!photoUrl.startsWith('/')) {
      photoUrl = `/media/${photoUrl}`;
    }
    photoUrl = `${API_CONFIG.MEDIA_URL}${photoUrl}`;
  }

  return {
    id: String(item.id),
    name: item.nom || '',
    nickname: item.slogan || '',
    region: item.region || '',
    specialty: item.specialite || '',
    jersey: 'Champion National',
    image: photoUrl,
    wins: item.distinction ? parseInt(item.distinction, 10) || 0 : 0,
  };
}

export const athleteService = {
  /**
   * Récupérer la liste de tous les athlètes (/api/athelete/)
   */
  async getAthletes(): Promise<Athlete[]> {
    const res = await apiFetch<BackendAthlete[]>('athelete/');
    if (res.data && Array.isArray(res.data)) {
      return res.data.map(mapBackendAthlete);
    }
    return [];
  },

  /**
   * Récupérer un athlète par son ID (/api/athelete/:id/)
   */
  async getAthleteById(id: string | number): Promise<Athlete | null> {
    try {
      const res = await apiFetch<BackendAthlete>(`athelete/${id}/`);
      return res.data ? mapBackendAthlete(res.data) : null;
    } catch (err) {
      console.error(`Erreur getAthleteById (${id}):`, err);
      return null;
    }
  },

  /**
   * Filtrer les athlètes par région
   */
  async getAthletesByRegion(region: string): Promise<Athlete[]> {
    const athletes = await this.getAthletes();
    return athletes.filter((a) => a.region.toLowerCase() === region.toLowerCase());
  },

  /**
   * Ajouter un nouvel athlète (Administration)
   */
  async createAthlete(data: {
    name: string;
    nickname?: string;
    region: string;
    specialty?: string;
    wins?: number;
    photoFile?: File | null;
  }): Promise<Athlete> {
    let payload: FormData | string;

    if (data.photoFile) {
      const formData = new FormData();
      formData.append('nom', data.name);
      if (data.nickname) formData.append('slogan', data.nickname);
      formData.append('region', data.region);
      if (data.specialty) formData.append('specialite', data.specialty);
      if (data.wins !== undefined) formData.append('distinction', String(data.wins));
      formData.append('photo', data.photoFile);
      payload = formData;
    } else {
      payload = JSON.stringify({
        nom: data.name,
        slogan: data.nickname || '',
        region: data.region,
        specialite: data.specialty || '',
        distinction: String(data.wins || 0),
      });
    }

    const res = await apiFetch<BackendAthlete>('athelete/', {
      method: 'POST',
      body: payload,
    });

    return mapBackendAthlete(res.data);
  },

  /**
   * Mettre à jour un athlète existant (/api/athelete/:id/)
   */
  async updateAthlete(
    id: string | number,
    data: {
      name?: string;
      nickname?: string;
      region?: string;
      specialty?: string;
      wins?: number;
      photoFile?: File | null;
    }
  ): Promise<Athlete> {
    let payload: FormData | string;

    if (data.photoFile) {
      const formData = new FormData();
      if (data.name) formData.append('nom', data.name);
      if (data.nickname !== undefined) formData.append('slogan', data.nickname);
      if (data.region) formData.append('region', data.region);
      if (data.specialty !== undefined) formData.append('specialite', data.specialty);
      if (data.wins !== undefined) formData.append('distinction', String(data.wins));
      formData.append('photo', data.photoFile);
      payload = formData;
    } else {
      const bodyObj: Record<string, unknown> = {};
      if (data.name !== undefined) bodyObj.nom = data.name;
      if (data.nickname !== undefined) bodyObj.slogan = data.nickname;
      if (data.region !== undefined) bodyObj.region = data.region;
      if (data.specialty !== undefined) bodyObj.specialite = data.specialty;
      if (data.wins !== undefined) bodyObj.distinction = String(data.wins);
      payload = JSON.stringify(bodyObj);
    }

    const res = await apiFetch<BackendAthlete>(`athelete/${id}/`, {
      method: 'PUT',
      body: payload,
    });

    return mapBackendAthlete(res.data);
  },

  /**
   * Supprimer un athlète (/api/athelete/:id/)
   */
  async deleteAthlete(id: string | number): Promise<boolean> {
    await apiFetch(`athelete/${id}/`, { method: 'DELETE' });
    return true;
  },
};
