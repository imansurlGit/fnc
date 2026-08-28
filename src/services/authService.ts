import { API_CONFIG } from './apiClient';

/**
 * Représente la session utilisateur côté frontend.
 * Mappé depuis le UserSerializer.
 */
export interface UserSession {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'EDITOR';
  avatar?: string;
  username: string;
}

const AUTH_KEY = 'fnc_auth_token';

/**
 * Transforme les données utilisateur du backend en UserSession frontend.
 */
function mapBackendUser(backendUser: {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
}): UserSession {
  const fullName = [backendUser.first_name, backendUser.last_name]
    .filter(Boolean)
    .join(' ') || backendUser.username;

  return {
    id: backendUser.id,
    username: backendUser.username,
    name: fullName,
    email: backendUser.email,
    role: backendUser.is_staff ? 'ADMIN' : 'EDITOR',
  };
}

/**
 * Décode le payload d'un JWT (base64url) sans vérification de signature.
 */
function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const payloadPart = token.split('.')[1];
    const decoded = atob(payloadPart.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

// Cache en mémoire pour les données utilisateur
let cachedUser: UserSession | null = null;

export const authService = {
  /**
   * Effectue la connexion administrateur
   */
  async login(username: string, password: string): Promise<UserSession> {
    const url = `${API_CONFIG.BASE_URL}/auth/login/`;

    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      const errorMsg =
        data.message ||
        data.errors?.non_field_errors?.[0] ||
        data.errors?.detail ||
        'Identifiants incorrects. Veuillez réessayer.';
      throw new Error(errorMsg);
    }

    // Stocker uniquement le token d'accès
    const accessToken = data.access;
    if (accessToken) {
      localStorage.setItem(AUTH_KEY, accessToken);
    }

    // Données utilisateur en mémoire uniquement
    if (data.user) {
      cachedUser = mapBackendUser(data.user);
    } else {
      cachedUser = this._userFromToken(accessToken);
    }

    return cachedUser!;
  },

  /**
   * Rafraîchit le token d'accès via le refresh token (cookie httpOnly)
   */
  async refreshToken(): Promise<boolean> {
    try {
      const url = `${API_CONFIG.BASE_URL}/auth/refresh/`;

      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (data.access) {
          localStorage.setItem(AUTH_KEY, data.access);
        }
        if (data.user) {
          cachedUser = mapBackendUser(data.user);
        }
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },

  /**
   * Déconnexion de l'utilisateur
   */
  async logout(): Promise<void> {
    localStorage.removeItem(AUTH_KEY);
    cachedUser = null;
  },

  /**
   * Récupère l'utilisateur connecté actuellement.
   */
  getCurrentUser(): UserSession | null {
    if (cachedUser) return cachedUser;

    const token = localStorage.getItem(AUTH_KEY);
    if (token) {
      cachedUser = this._userFromToken(token);
      return cachedUser;
    }

    return null;
  },

  /**
   * Vérifie si un administrateur est authentifié
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem(AUTH_KEY);
  },

  /**
   * Extrait les infos utilisateur minimales depuis le payload JWT.
   */
  _userFromToken(token: string): UserSession | null {
    const payload = decodeJwtPayload(token);
    if (!payload) return null;

    return {
      id: (payload.user_id as number) ?? 0,
      username: (payload.username as string) ?? `user_${payload.user_id}`,
      name: (payload.username as string) ?? `Utilisateur ${payload.user_id}`,
      email: '',
      role: 'ADMIN',
    };
  },
};
