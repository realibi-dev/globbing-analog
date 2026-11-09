import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import AdminLayout from '@/layouts/AdminLayout'
import { useAdminAuthStore } from '@/store/auth.store'

const LoginPage = lazy(() => import('@/pages/LoginPage'))
const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
const PackagesPage = lazy(() => import('@/pages/packages/PackagesPage'))
const PackageDetailPage = lazy(() => import('@/pages/packages/PackageDetailPage'))
const ClientsPage = lazy(() => import('@/pages/clients/ClientsPage'))
const ClientDetailPage = lazy(() => import('@/pages/clients/ClientDetailPage'))
const InvoicesPage = lazy(() => import('@/pages/InvoicesPage'))
const BuyForMePage = lazy(() => import('@/pages/BuyForMePage'))
const PickupPointsPage = lazy(() => import('@/pages/PickupPointsPage'))
const SettingsPage = lazy(() => import('@/pages/settings/SettingsPage'))

function PageLoader() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
    </div>
  )
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  const token = useAdminAuthStore((s) => s.accessToken)
  if (!token) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            element={
              <RequireAuth>
                <AdminLayout />
              </RequireAuth>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/packages/:id" element={<PackageDetailPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/clients/:id" element={<ClientDetailPage />} />
            <Route path="/invoices" element={<InvoicesPage />} />
            <Route path="/buy-for-me" element={<BuyForMePage />} />
            <Route path="/pickup-points" element={<PickupPointsPage />} />
            <Route path="/settings/*" element={<SettingsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
