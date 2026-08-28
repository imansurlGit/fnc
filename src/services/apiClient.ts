/**
 * Configuration globale de l'API Client
 */
export const API_CONFIG = {
  // BASE_URL: (import.meta.env.VITE_API_URL || '/api').replace(/\/+$/, ''),
  BASE_URL: "https://dev2iman.pythonanywhere.com/api",
};

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
  success?: boolean;
}

let isRefreshing = false;

/**
 * Formate proprement les messages d'erreur retournés par l'API Backend.
 */
function formatApiErrorMessage(errorData: Record<string, unknown> | null | undefined): string {
  if (!errorData) return 'Erreur réseau ou serveur indisponible';
  if (typeof errorData.message === 'string') return errorData.message;
  if (typeof errorData.detail === 'string') return errorData.detail;
  if (typeof errorData.error === 'string') return errorData.error;

  const errObj = errorData.error || errorData.errors;
  if (typeof errObj === 'object' && errObj !== null) {
    const entries = Object.entries(errObj).map(([field, msgs]) => {
      const msgStr = Array.isArray(msgs) ? msgs.join(', ') : String(msgs);
      return `${field}: ${msgStr}`;
    });
    if (entries.length > 0) return entries.join(' | ');
  }

  return "Une erreur s'est produite lors de l'opération.";
}

/**
 * Tente de rafraîchir le token JWT via le cookie httpOnly ou refresh_token.
 */
async function attemptTokenRefresh(): Promise<string | null> {
  if (isRefreshing) return null;
  isRefreshing = true;

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

    if (response.ok) {
      const data = await response.json();
      if (data.success && data.access) {
        localStorage.setItem('fnc_auth_token', data.access);
        return data.access;
      }
    }
  } catch {
    // Échec silencieux
  } finally {
    isRefreshing = false;
  }

  return null;
}

/**
 * Fetch générique pour les appels API backend.
 * Transmet automatiquement le header `Authorization: Bearer <token>` et les cookies.
 * En cas d'erreur 401 (token expiré), tente un rafraîchissement automatique.
 */
export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  isRetry: boolean = false
): Promise<ApiResponse<T>> {
  const cleanEndpoint = endpoint.replace(/^\/+/, '');
  const url = `${API_CONFIG.BASE_URL}/${cleanEndpoint}`;

  const defaultHeaders: Record<string, string> = {
    Accept: 'application/json',
  };

  if (!(options.body instanceof FormData)) {
    defaultHeaders['Content-Type'] = 'application/json';
  }

  const accessToken = localStorage.getItem('fnc_auth_token');
  if (accessToken) {
    defaultHeaders['Authorization'] = `Bearer ${accessToken}`;
  }

  const response = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (response.status === 401 && !isRetry && endpoint !== 'auth/login/') {
    const newAccessToken = await attemptTokenRefresh();
    if (newAccessToken) {
      return apiFetch<T>(endpoint, options, true);
    } else {
      localStorage.removeItem('fnc_auth_token');
      throw new Error('Session expirée. Veuillez vous reconnecter.');
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(formatApiErrorMessage(errorData));
  }

  const jsonResult = await response.json();

  return {
    data: jsonResult.data !== undefined ? jsonResult.data : jsonResult,
    status: response.status,
    message: jsonResult.message,
    success: jsonResult.success,
  };
}
