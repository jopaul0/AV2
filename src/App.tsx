import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth'
import { AeronavesProvider } from './hooks/useAeronaves'
import { Layout } from './components/layout/Layout'

import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { AeronavesPage } from './pages/AeronavesPage'
import { AeronaveDetailPage } from './pages/AeronaveDetailPage'
import { FuncionariosPage } from './pages/FuncionariosPage'
import { TestesPage } from './pages/TestesPage'
import { RelatoriosPage, RelatorioDetailPage } from './pages/RelatoriosPage'
import { PerfilPage } from './pages/PerfilPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return <Layout>{children}</Layout>
}

function AppRoutes() {
  const { user } = useAuth()
  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />

      <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/aeronaves" element={<ProtectedRoute><AeronavesPage /></ProtectedRoute>} />
      <Route path="/aeronaves/:codigo" element={<ProtectedRoute><AeronaveDetailPage /></ProtectedRoute>} />
      <Route path="/funcionarios" element={<ProtectedRoute><FuncionariosPage /></ProtectedRoute>} />
      <Route path="/testes" element={<ProtectedRoute><TestesPage /></ProtectedRoute>} />
      <Route path="/relatorios" element={<ProtectedRoute><RelatoriosPage /></ProtectedRoute>} />
      <Route path="/relatorios/:codigo" element={<ProtectedRoute><RelatorioDetailPage /></ProtectedRoute>} />
      <Route path="/perfil" element={<ProtectedRoute><PerfilPage /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AeronavesProvider>
          <AppRoutes />
        </AeronavesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}