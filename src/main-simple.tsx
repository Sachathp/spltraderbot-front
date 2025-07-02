import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Version ultra-simple pour debug
function SimpleApp() {
  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)', 
      color: 'white', 
      padding: '40px', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#a855f7', marginBottom: '20px' }}>
        🎉 REACT FONCTIONNE !
      </h1>
      <div style={{ 
        background: 'rgba(255,255,255,0.1)', 
        padding: '20px', 
        borderRadius: '10px',
        marginBottom: '20px'
      }}>
        <h3>✅ Tests Réussis:</h3>
        <p>✅ TypeScript transpilé correctement</p>
        <p>✅ React chargé et rendu</p>
        <p>✅ Serveur Vite fonctionnel</p>
        <p>✅ Styles inline appliqués</p>
      </div>
      
      <p style={{ fontSize: '18px', color: '#10b981' }}>
        <strong>Le problème n'était PAS React/TypeScript mais probablement les CSS complexes ou les imports de composants.</strong>
      </p>
    </div>
  )
}

const rootElement = document.getElementById('root')
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <SimpleApp />
    </StrictMode>
  )
} else {
  console.error('Element #root non trouvé!')
} 