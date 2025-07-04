import React from 'react';
import { RegisterForm } from '../../components/auth/RegisterForm';
import { PublicRoute } from '../../components/auth/ProtectedRoute';

export const RegisterPage: React.FC = () => {
  return (
    <PublicRoute>
      <RegisterForm />
    </PublicRoute>
  );
}; 