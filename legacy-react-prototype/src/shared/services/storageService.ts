const TOKEN_KEY = 'sb_access_token';
const REFRESH_TOKEN_KEY = 'sb_refresh_token';

export const storageService = {
  saveAccessToken: (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
  },
  getAccessToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },
  removeAccessToken: () => {
    localStorage.removeItem(TOKEN_KEY);
  },

  saveRefreshToken: (token: string) => {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },
  getRefreshToken: (): string | null => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },
  removeRefreshToken: () => {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  clearSession: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};
