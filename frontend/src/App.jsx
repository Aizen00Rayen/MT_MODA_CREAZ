import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { PageLoader } from '@/components/ui/LoadingSpinner'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import RoleRoute from '@/components/auth/RoleRoute'
import PublicLayout from '@/components/layout/PublicLayout'
import ClientDashboardLayout from '@/components/layout/ClientDashboardLayout'
import TailorDashboardLayout from '@/components/layout/TailorDashboardLayout'
import AdminLayout from '@/components/layout/AdminLayout'

// Public pages
import LandingPage from '@/pages/public/LandingPage'
import TailorDirectoryPage from '@/pages/public/TailorDirectoryPage'
import TailorProfilePage from '@/pages/public/TailorProfilePage'
import AIStudioPage from '@/pages/public/AIStudioPage'

// Auth pages
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'

// Client dashboard
import ClientOverview from '@/pages/dashboard/client/ClientOverview'
import ClientOrders from '@/pages/dashboard/client/ClientOrders'
import OrderDetail from '@/pages/dashboard/client/OrderDetail'
import SavedDesigns from '@/pages/dashboard/client/SavedDesigns'
import ClientProfile from '@/pages/dashboard/client/ClientProfile'

// Tailor dashboard
import TailorOverview from '@/pages/dashboard/tailor/TailorOverview'
import IncomingRequests from '@/pages/dashboard/tailor/IncomingRequests'
import ActiveOrders from '@/pages/dashboard/tailor/ActiveOrders'
import TailorOrderDetail from '@/pages/dashboard/tailor/TailorOrderDetail'
import TailorPortfolio from '@/pages/dashboard/tailor/TailorPortfolio'
import TailorPricing from '@/pages/dashboard/tailor/TailorPricing'
import TailorReviews from '@/pages/dashboard/tailor/TailorReviews'
import TailorProfileEdit from '@/pages/dashboard/tailor/TailorProfileEdit'

// Admin
import AdminDashboard from '@/pages/admin/AdminDashboard'
import TailorVerification from '@/pages/admin/TailorVerification'
import UserManagement from '@/pages/admin/UserManagement'
import AdminOrders from '@/pages/admin/AdminOrders'

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/couturieres" element={<TailorDirectoryPage />} />
          <Route path="/couturieres/:id" element={<TailorProfilePage />} />
          <Route path="/studio" element={<AIStudioPage />} />
        </Route>

        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Client dashboard */}
        <Route
          element={
            <ProtectedRoute>
              <RoleRoute role="client">
                <ClientDashboardLayout />
              </RoleRoute>
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard/client" element={<ClientOverview />} />
          <Route path="/dashboard/client/orders" element={<ClientOrders />} />
          <Route path="/dashboard/client/orders/:id" element={<OrderDetail />} />
          <Route path="/dashboard/client/designs" element={<SavedDesigns />} />
          <Route path="/dashboard/client/profile" element={<ClientProfile />} />
        </Route>

        {/* Tailor dashboard */}
        <Route
          element={
            <ProtectedRoute>
              <RoleRoute role="tailor">
                <TailorDashboardLayout />
              </RoleRoute>
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard/tailor" element={<TailorOverview />} />
          <Route path="/dashboard/tailor/requests" element={<IncomingRequests />} />
          <Route path="/dashboard/tailor/orders" element={<ActiveOrders />} />
          <Route path="/dashboard/tailor/orders/:id" element={<TailorOrderDetail />} />
          <Route path="/dashboard/tailor/portfolio" element={<TailorPortfolio />} />
          <Route path="/dashboard/tailor/pricing" element={<TailorPricing />} />
          <Route path="/dashboard/tailor/reviews" element={<TailorReviews />} />
          <Route path="/dashboard/tailor/profile" element={<TailorProfileEdit />} />
        </Route>

        {/* Admin */}
        <Route
          element={
            <ProtectedRoute>
              <RoleRoute role="admin">
                <AdminLayout />
              </RoleRoute>
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/tailors" element={<TailorVerification />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
