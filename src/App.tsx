import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { DashboardPage, ConfigPage, AccountPage, SecurityPage } from './pages';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/config" element={<ConfigPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/security" element={<SecurityPage />} />
      </Routes>
    </Layout>
  );
}

export default App;

