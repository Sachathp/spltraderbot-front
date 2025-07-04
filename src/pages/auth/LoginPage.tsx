import React from 'react';
import { LoginForm } from '../../components/auth/LoginForm';
import { PublicRoute } from '../../components/auth/ProtectedRoute';

export const LoginPage: React.FC = () => {
  return (
    <PublicRoute>
      <LoginForm />
    </PublicRoute>
  );
};
