/**
 * Strongly typed and validated environment variables for Bharat Sudhar.
 */

interface AppConfig {
  appName: string;
  appSlogan: string;
  apiBaseUrl: string;
  environment: 'development' | 'staging' | 'production';
  isDevelopment: boolean;
  isProduction: boolean;
  enableAnalytics: boolean;
  portalHelpline: string;
}

export const env: AppConfig = {
  appName: import.meta.env.VITE_APP_NAME || 'Bharat Sudhar',
  appSlogan: import.meta.env.VITE_APP_SLOGAN || 'Ab Har Nagrik Zimmedaar',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  environment: (import.meta.env.VITE_ENV as AppConfig['environment']) || 'development',
  isDevelopment: (import.meta.env.VITE_ENV || 'development') === 'development',
  isProduction: import.meta.env.VITE_ENV === 'production',
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  portalHelpline: import.meta.env.VITE_PORTAL_HELPLINE || '1969',
};
