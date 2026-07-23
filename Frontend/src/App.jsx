import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Student
import DashboardHome from "./pages/dashboard/DashboardHome";
import ReportIssue from "./pages/dashboard/ReportIssue";
import MyIssues from "./pages/dashboard/MyIssues";
import Notifications from "./pages/dashboard/Notifications";
import IssueDetails from "./pages/dashboard/IssueDetails";
import Settings from "./pages/dashboard/Settings";
import DashboardLayout from "./components/dashboard/DashboardLayout";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminIssues from "./pages/admin/AdminIssues";
import AdminIssueDetails from "./pages/admin/AdminIssueDetails";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminLayout from "./components/admin/AdminLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Student */}
      <Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<DashboardHome />} />
  <Route path="report" element={<ReportIssue />} />
  <Route path="my-issues" element={<MyIssues />} />
  <Route path="notifications" element={<Notifications />} />
  <Route path="issue/:id" element={<IssueDetails />} />
  <Route path="settings" element={<Settings />} />
</Route>

      {/* Admin */}
  <Route path="/admin" element={<AdminLayout />}>
  <Route index element={<AdminDashboard />} />
  <Route path="dashboard" element={<AdminDashboard />} />
  <Route path="issues" element={<AdminIssues />} />
  <Route path="issues/:id" element={<AdminIssueDetails />} />
  <Route path="notifications" element={<AdminNotifications />} />
  <Route path="settings" element={<AdminSettings />} />
</Route>
</Routes>
  );
}

export default App;