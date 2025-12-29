import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import { ToastProvider } from './context/ToastContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import WhatsAppFAB from './components/WhatsAppFAB';

// Conditional WhatsApp FAB - hide on admin and developer pages
function ConditionalWhatsAppFAB() {
  const location = useLocation();
  const hideOnPaths = ['/admin', '/developer'];
  const shouldHide = hideOnPaths.some(path => location.pathname.startsWith(path));

  if (shouldHide) return null;
  return <WhatsAppFAB />;
}

// Layouts
import { MainLayout } from './components/layout';
import AdminLayout from './pages/admin/AdminLayout';

// Public Pages
import CustomerLanding from './pages/CustomerLanding';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';

// Auth Pages
import OAuthLogin from './pages/auth/OAuthLogin';
import OAuthCallback from './pages/auth/OAuthCallback';
import Register from './pages/auth/Register';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTasks from './pages/admin/AdminTasks';
import AdminPayments from './pages/admin/AdminPayments';
import AdminDevelopers from './pages/admin/AdminDevelopers';
import AdminSettings from './pages/admin/AdminSettings';
import AdminQuotes from './pages/admin/AdminQuotes';
import AdminQuoteBuilder from './pages/admin/AdminQuoteBuilder';
import AdminTaskDetail from './pages/admin/AdminTaskDetail';
import AdminContracts from './pages/admin/AdminContracts';
import AdminContractDetail from './pages/admin/AdminContractDetail';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminInvoices from './pages/admin/AdminInvoices';
import AdminMessages from './pages/admin/AdminMessages';

// Developer Pages
import DeveloperLayout from './pages/dashboard/developer/Layout';
import DeveloperDashboard from './pages/dashboard/developer/Dashboard';
import DeveloperProfile from './pages/dashboard/developer/Profile';
import DeveloperTasks from './pages/dashboard/developer/Tasks';
import TaskDetail from './pages/dashboard/developer/TaskDetail';
import DeveloperWorkspace from './pages/dashboard/developer/Workspace';
import WorkspaceDetail from './pages/dashboard/developer/WorkspaceDetail';
import BoardView from './pages/dashboard/developer/BoardView';
import JoinWorkspace from './pages/dashboard/developer/JoinWorkspace';
import DeveloperMessages from './pages/dashboard/developer/Messages';
import DeveloperEarnings from './pages/dashboard/developer/Earnings';

// Client Pages
import ClientLayout from './pages/dashboard/client/Layout';
import ClientDashboard from './pages/dashboard/client/Dashboard';
import ClientTasks from './pages/dashboard/client/Tasks';
import ClientPayment from './pages/dashboard/client/Payment';
import ClientQuotes from './pages/dashboard/client/Quotes';
import ClientQuoteView from './pages/dashboard/client/QuoteView';
import ClientContracts from './pages/dashboard/client/Contracts';
import ClientContractView from './pages/dashboard/client/ContractView';
import ClientInvoices from './pages/dashboard/client/Invoices';
import ClientOrderDetail from './pages/dashboard/client/OrderDetail';

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <BrowserRouter>
          <ToastProvider>
          <Routes>
          {/* Landing Page */}
          <Route path="/" element={<CustomerLanding />} />

          {/* Public Routes with MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/services" element={<Services />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Redirect old submit-task to new dashboard route */}
          <Route path="/submit-task" element={<Navigate to="/dashboard/client/new" replace />} />

          {/* Auth Routes */}
          <Route path="/auth/login" element={<OAuthLogin />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/callback" element={<OAuthCallback />} />
          <Route path="/auth/error" element={
            <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-red-400 mb-4">Authentication Error</h1>
                <p className="text-zinc-400 mb-6">{new URLSearchParams(window.location.search).get('message') || 'An error occurred during login'}</p>
                <a href="/auth/login" className="px-6 py-3 bg-blue-600 text-white rounded-xl">Try Again</a>
              </div>
            </div>
          } />
          <Route path="/admin" element={<AdminLogin />} />

          {/* Shortcuts to dashboards */}
          <Route path="/customer-dashboard" element={<Navigate to="/dashboard/client" replace />} />
          <Route path="/developer-dashboard" element={<Navigate to="/developer" replace />} />
          <Route path="/admin-dashboard" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/profile" element={<Navigate to="/dashboard/client" replace />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="tasks" element={<AdminTasks />} />
            <Route path="tasks/:taskId" element={<AdminTaskDetail />} />
            <Route path="developers" element={<AdminDevelopers />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="quotes" element={<AdminQuotes />} />
            <Route path="quotes/new" element={<AdminQuoteBuilder />} />
            <Route path="quotes/:id" element={<AdminQuoteBuilder />} />
            <Route path="quotes/:id/edit" element={<AdminQuoteBuilder />} />
            <Route path="quotes/:id/revise" element={<AdminQuoteBuilder />} />
            <Route path="contracts" element={<AdminContracts />} />
            <Route path="contracts/:id" element={<AdminContractDetail />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="invoices" element={<AdminInvoices />} />
            <Route path="messages" element={<AdminMessages />} />
          </Route>

          {/* Protected Developer Routes */}
          <Route
            path="/developer"
            element={
              <ProtectedRoute roles={['developer', 'admin']}>
                <DeveloperLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DeveloperDashboard />} />
            <Route path="tasks" element={<DeveloperTasks />} />
            <Route path="tasks/:taskId" element={<TaskDetail />} />
            <Route path="workspace" element={<DeveloperWorkspace />} />
            <Route path="workspace/join/:code" element={<JoinWorkspace />} />
            <Route path="workspace/:workspaceId" element={<WorkspaceDetail />} />
            <Route path="workspace/:workspaceId/board/:boardId" element={<BoardView />} />
            <Route path="messages" element={<DeveloperMessages />} />
            <Route path="earnings" element={<DeveloperEarnings />} />
            <Route path="profile" element={<DeveloperProfile />} />
          </Route>

          {/* Protected Client Routes - only for client role */}
          <Route
            path="/dashboard/client"
            element={
              <ProtectedRoute roles={['client']}>
                <ClientLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ClientDashboard />} />
            <Route path="tasks" element={<ClientTasks />} />
            <Route path="orders/:orderId" element={<ClientOrderDetail />} />
            <Route path="payment" element={<ClientPayment />} />
            <Route path="quotes" element={<ClientQuotes />} />
            <Route path="quotes/:quoteId" element={<ClientQuoteView />} />
            <Route path="contracts" element={<ClientContracts />} />
            <Route path="contracts/:id" element={<ClientContractView />} />
            <Route path="invoices" element={<ClientInvoices />} />
          </Route>

          {/* Redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <ConditionalWhatsAppFAB />
          </ToastProvider>
        </BrowserRouter>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
