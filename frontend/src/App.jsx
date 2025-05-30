import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import ToastContainer from './components/ui/Toast/ToastContainer';

// Tus componentes existentes
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import ContactPage from "./pages/ContactPage";
// Importar las nuevas páginas de servicios
import PrivateProjectsPage from "./pages/PrivateProjectsPage";
import CivilWorksPage from "./pages/CivilWorksPage";
import PublicProjectsPage from "./pages/PublicProjectsPage";
import ProfessionalServicesPage from "./pages/ProfessionalServicesPage";

// Componentes de autenticación
import LoginPage from './pages/LoginPage';

// Layout para admin
import AdminLayout from './components/AdminLayout';

// Páginas de admin
import Dashboard from './pages/admin/Dashboard';
import PropertyManagement from './pages/admin/PropertyManagement';
import ProjectList from './pages/admin/ProjectList';
import CreateProject from './pages/admin/CreateProject';
import ProjectEditPage from './pages/admin/ProjectEditPage';

function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {/* Rutas Públicas - Con tu MainLayout (Navbar + Footer) */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="contacto" element={<ContactPage />} />
            {/* Rutas para las páginas de servicios */}
            <Route path="servicios/proyectos-privados" element={<PrivateProjectsPage />} />
            <Route path="servicios/obras-civiles" element={<CivilWorksPage />} />
            <Route path="servicios/proyectos-publicos" element={<PublicProjectsPage />} />
            <Route path="servicios/servicios-profesionales" element={<ProfessionalServicesPage />} />
          </Route>
          
          {/* Rutas de Autenticación - Sin layout (páginas completas) */}
          <Route path="/login" element={<LoginPage />} />

          
          {/* Rutas Protegidas - Admin (con AdminLayout) */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="propiedades" element={<PropertyManagement />} />
            <Route path="proyectos" element={<ProjectList />} />
            <Route path="proyectos/crear" element={<CreateProject />} />
            <Route path="proyectos/editar/:projectId" element={<ProjectEditPage />} />
          </Route>
          
          {/* Ruta 404 - Redirigir al home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <SpeedInsights />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;