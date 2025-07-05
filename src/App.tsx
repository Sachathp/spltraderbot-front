import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { DashboardPage, TransactionsPage, ConfigPage, AccountPage } from './pages';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AuthProvider } from './components/auth/AuthProvider';
import { useAuthEvents } from './store/authStore';
import { AuthDebug } from './components/debug/AuthDebug';

function AppContent() {
  // Initialiser les événements d'authentification
  useAuthEvents();

  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Routes publiques avec Layout (mode démonstration) */}
      <Route path="/" element={
        <Layout>
          <DashboardPage />
        </Layout>
      } />
      <Route path="/dashboard" element={
        <Layout>
          <DashboardPage />
        </Layout>
      } />
      <Route path="/transactions" element={
        <Layout>
          <TransactionsPage />
        </Layout>
      } />
      <Route path="/journal" element={<Navigate to="/transactions" replace />} />
      
      {/* Routes qui nécessitent une authentification */}
      <Route path="/config" element={
        <ProtectedRoute>
          <Layout>
            <ConfigPage />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/account" element={
        <ProtectedRoute>
          <Layout>
            <AccountPage />
          </Layout>
        </ProtectedRoute>
      } />
      
      {/* Route par défaut */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
      <AuthDebug />
    </AuthProvider>
  );
}

export default App;
