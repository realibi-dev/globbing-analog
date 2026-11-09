import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'

import AppLayout from '@/layouts/AppLayout'
import AuthLayout from '@/layouts/AuthLayout'
import PublicLayout from '@/layouts/PublicLayout'
import { useAuthStore } from '@/store/auth.store'
import PageLoader from '@/components/PageLoader'

const LoginPage = lazy(() => import('@/pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'))
const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage'))
const VerifyEmailPage = lazy(() => import('@/pages/auth/VerifyEmailPage'))

const PackagesPage = lazy(() => import('@/pages/packages/PackagesPage'))
const PackageDetailPage = lazy(() => import('@/pages/packages/PackageDetailPage'))
const NewPackagePage = lazy(() => import('@/pages/packages/NewPackagePage'))

const BuyForMePage = lazy(() => import('@/pages/buy-for-me/BuyForMePage'))
const NewBuyForMePage = lazy(() => import('@/pages/buy-for-me/NewBuyForMePage'))

const PickupPointsPage = lazy(() => import('@/pages/PickupPointsPage'))
const CalculatorPage = lazy(() => import('@/pages/CalculatorPage'))

const ProfilePage = lazy(() => import('@/pages/profile/ProfilePage'))
const AddressesPage = lazy(() => import('@/pages/profile/AddressesPage'))
const RecipientsPage = lazy(() => import('@/pages/profile/RecipientsPage'))
const NotificationsPage = lazy(() => import('@/pages/profile/NotificationsPage'))

function RequireAuth({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((s) => s.accessToken)
  if (!token) return <Navigate to="/auth/login" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public */}
          <Route element={<PublicLayout />}>
            <Route path="/calculator" element={<CalculatorPage />} />
          </Route>

          {/* Auth */}
          <Route element={<AuthLayout />}>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
          </Route>

          {/* Protected */}
          <Route
            element={
              <RequireAuth>
                <AppLayout />
              </RequireAuth>
            }
          >
            <Route index element={<Navigate to="/packages" replace />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/packages/new" element={<NewPackagePage />} />
            <Route path="/packages/:id" element={<PackageDetailPage />} />
            <Route path="/buy-for-me" element={<BuyForMePage />} />
            <Route path="/buy-for-me/new" element={<NewBuyForMePage />} />
            <Route path="/pickup-points" element={<PickupPointsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/addresses" element={<AddressesPage />} />
            <Route path="/profile/recipients" element={<RecipientsPage />} />
            <Route path="/profile/notifications" element={<NotificationsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
