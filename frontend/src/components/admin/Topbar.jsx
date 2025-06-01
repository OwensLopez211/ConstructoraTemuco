// src/components/admin/Topbar.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
// Importar la imagen del logo
import LogoNav from '../../../public/LogoNav2.png';

const Topbar = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y Menu Toggle */}
          <div className="flex items-center flex-1">
            {/* Menu Toggle para móvil */}
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 focus:outline-none focus:ring-2 focus:ring-green-500/30 transition-all duration-200 mr-3"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo */}
            <Link to="/admin" className="flex items-center group">
              <div className="flex items-center">
                {/* Logo adaptativo - más pequeño en móvil */}
                <img 
                  src={LogoNav} 
                  alt="Logo" 
                  className="w-10 h-10 lg:w-12 lg:h-12 object-contain mr-2 lg:mr-3"
                />
                <div className="hidden sm:block">
                  <h1 className="text-lg lg:text-xl font-bold text-gray-900 leading-tight">
                    Constructora Temuco
                  </h1>
                  <span className="text-xs text-green-600 font-medium -mt-1 block">
                    Panel Administrativo
                  </span>
                </div>
                {/* Versión simplificada para pantallas muy pequeñas */}
                <div className="sm:hidden">
                  <h1 className="text-lg font-bold text-gray-900">
                    CT
                  </h1>
                </div>
              </div>
            </Link>
          </div>

          {/* Usuario */}
          <div className="flex items-center space-x-2 lg:space-x-4">

            {/* Dropdown del Usuario */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 lg:space-x-3 p-2 rounded-xl hover:bg-gray-100/80 transition-all duration-200 group"
              >
                {/* Avatar */}
                <div className="w-8 h-8 lg:w-9 lg:h-9 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
                  <span className="text-white text-sm lg:text-base font-semibold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                
                {/* Nombre y rol - Oculto en móvil */}
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-gray-900 leading-tight">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user?.role || 'Admin'}
                  </p>
                </div>

                {/* Chevron */}
                <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <>
                  {/* Overlay para cerrar dropdown */}
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setDropdownOpen(false)}
                  ></div>
                  
                  {/* Menu - Ajustado para móvil */}
                  <div className="absolute right-0 mt-2 w-64 sm:w-72 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 py-2 z-20">
                    {/* Header del usuario */}
                    <div className="px-4 py-4 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {user?.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
                          <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                          <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full mt-1 capitalize">
                            {user?.role || 'Admin'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        to="/admin/profile"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50/80 transition-all duration-200 group"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-green-100 transition-colors">
                          <svg className="w-4 h-4 text-gray-600 group-hover:text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-medium">Mi Perfil</span>
                          <p className="text-xs text-gray-500">Gestionar información personal</p>
                        </div>
                      </Link>
                      
                      <Link
                        to="/admin/settings"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50/80 transition-all duration-200 group"
                        onClick={() => setDropdownOpen(false)}
                      >
                      </Link>

                      <Link
                        to="/"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50/80 transition-all duration-200 group"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-green-100 transition-colors">
                          <svg className="w-4 h-4 text-gray-600 group-hover:text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-medium">Ver Sitio Web</span>
                          <p className="text-xs text-gray-500">Ir al sitio público</p>
                        </div>
                      </Link>
                    </div>
                    
                    {/* Logout */}
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          handleLogout();
                        }}
                        className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50/80 transition-all duration-200 group"
                      >
                        <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-red-100 transition-colors">
                          <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-medium">Cerrar Sesión</span>
                          <p className="text-xs text-red-400">Salir del panel</p>
                        </div>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;