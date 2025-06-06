"use client"

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { Suspense, lazy } from "react"
import { useUserStore } from "./store/userStore"
import { useEffect } from "react"
import Navbar from "./components/Navbar"
import "@radix-ui/themes/styles.css";

const HomePage = lazy(() => import("./pages/HomePage"))

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
  </div>
)

function App() {
  const { hydrateUser } = useUserStore()

  useEffect(() => {
    // Hidratar el estado del usuario al cargar la aplicación
    hydrateUser()
  }, [hydrateUser])

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container py-6">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
      </div>
      <Toaster position="top-right" />
    </BrowserRouter>
  )
}

export default App
