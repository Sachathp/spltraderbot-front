import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { DashboardPage, TransactionsPage, ConfigPage, AccountPage } from './pages';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/config" element={<ConfigPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </Layout>
  );
}

export default App;

