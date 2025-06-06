"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { ROLES } from "@/config/constants";
import LoginModal from "./modals/LoginModal";
import RegisterModal from "./modals/RegisterModal";
import { useAuthStore } from "@/store/auth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setIsRegisterModalOpen, setIsLoginModalOpen } = useAuthStore();
  

  const { logout, user } = useUserStore();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold text-xl">EnerSmart</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4 ml-auto">
            {!user ? (
              <>
                <button
                  onClick={() => setIsRegisterModalOpen(true)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Registrarse
                </button>
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Iniciar Sesión
                </button>
              </>
            ) : user.rol === ROLES.Client.value ? (
              <>
                <button
                  title="-"
                  onClick={handleLogout}
                  className="p-2 rounded-md text-gray-700 hover:bg-gray-100 flex gap-2"
                >
                  <LogOut size={20} />
                  Salir
                </button>
              </>
            ) : user.rol === ROLES.Admin.value ? (
              <>
                <p className="mr-8">{user?.fullName}</p>
                <button
                  title="-"
                  onClick={handleLogout}
                  className="p-2 rounded-md text-gray-700 hover:bg-gray-100 flex"
                >
                  <LogOut size={20} />
                  Salir
                </button>
              </>
            ) : null}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center ml-auto">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {!user ? (
                <>
                  <button
                    onClick={() => {
                      setIsRegisterModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Registrarse
                  </button>
                  <button
                    onClick={() => {
                      setIsLoginModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Iniciar Sesión
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 w-full"
                  >
                    <LogOut size={20} className="mr-2" />
                    Salir
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
      {/* Modals */}
      <LoginModal />
      <RegisterModal />
      
    </>
  );
};

export default Navbar;
