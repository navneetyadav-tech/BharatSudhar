import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { LoadingScreen } from '../components/feedback/LoadingScreen';
import { ErrorBoundary } from '../components/feedback/ErrorBoundary';

// Lazy loaded page components for optimal bundle performance
const HomePage = lazy(() => import('../pages/HomePage').then((m) => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('../pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const IssuesPage = lazy(() => import('../pages/IssuesPage').then((m) => ({ default: m.IssuesPage })));
const DashboardPage = lazy(() => import('../pages/DashboardPage').then((m) => ({ default: m.DashboardPage })));
const LoginPage = lazy(() => import('../pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const DesignSystemPage = lazy(() => import('../pages/DesignSystemPage').then((m) => ({ default: m.DesignSystemPage })));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

export function AppRoutes() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingScreen message="Loading Bharat Sudhar..." />}>
        <Routes>
          {/* Standalone Citizen Portal & Mobile UI (no outer marketing header/footer) */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/mobile" element={<DashboardPage />} />

          {/* Marketing & Public Information Pages */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="issues" element={<IssuesPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="design-system" element={<DesignSystemPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
