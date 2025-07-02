import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-x-hidden">
      {/* Background avec particules */}
      <div className="fixed inset-0 particles-bg opacity-50"></div>
      
      {/* Grille de fond subtile */}
      <div 
        className="fixed inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(148 163 184 / 0.1)'%3e%3cpath d='m0 .5h32v32'/%3e%3c/svg%3e")`,
          backgroundSize: '32px 32px'
        }}
      ></div>
      
      {/* Gradient overlay animé */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-accent-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-primary-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-success-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Contenu principal */}
      <div className="relative z-10">
        <Header />
        <main className="max-w-7xl mx-auto px-6 lg:px-8 pb-12">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
      
      {/* Effet de vignette */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-dark-950/20"></div>
      </div>
    </div>
  );
} 