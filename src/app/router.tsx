import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from '../shared/layouts/PublicLayout';
import { DashboardLayout } from '../shared/layouts/DashboardLayout';

// Guards
import { GuestRoute, ProtectedRoute, StudentRoute, UMKMRoute, AdminRoute } from './guards';

// Public Module
const LandingHero = React.lazy(() => import('../modules/public/LandingHero').then(m => ({ default: m.LandingHero })));
const ProjectMarket = React.lazy(() => import('../modules/public/ProjectMarket').then(m => ({ default: m.ProjectMarket })));
const ProjectDetails = React.lazy(() => import('../modules/public/ProjectDetails').then(m => ({ default: m.ProjectDetails })));
const GlobalSearch = React.lazy(() => import('../modules/public/GlobalSearch').then(m => ({ default: m.GlobalSearch })));
const HelpCenter = React.lazy(() => import('../modules/public/HelpCenter').then(m => ({ default: m.HelpCenter })));
const PublicStudentProfile = React.lazy(() => import('../modules/public/PublicStudentProfile').then(m => ({ default: m.PublicStudentProfile })));
const PublicBusinessProfile = React.lazy(() => import('../modules/public/PublicBusinessProfile').then(m => ({ default: m.PublicBusinessProfile })));

// Auth Module
const Login = React.lazy(() => import('../modules/auth/Login').then(m => ({ default: m.Login })));
const Register = React.lazy(() => import('../modules/auth/Register').then(m => ({ default: m.Register })));
const ForgotPassword = React.lazy(() => import('../modules/auth/ForgotPassword').then(m => ({ default: m.ForgotPassword })));

// Student Module
const StudentDashboard = React.lazy(() => import('../modules/student/StudentDashboard').then(m => ({ default: m.StudentDashboard })));
const MyProjectsWorkspace = React.lazy(() => import('../modules/student/MyProjectsWorkspace').then(m => ({ default: m.MyProjectsWorkspace })));

// UMKM Module
const UMKMDashboard = React.lazy(() => import('../modules/umkm/UMKMDashboard').then(m => ({ default: m.UMKMDashboard })));
const UMKMProjects = React.lazy(() => import('../modules/umkm/UMKMProjects').then(m => ({ default: m.UMKMProjects })));
const UMKMProjectDetail = React.lazy(() => import('../modules/umkm/UMKMProjectDetail').then(m => ({ default: m.UMKMProjectDetail })));
const TalentSearch = React.lazy(() => import('../modules/umkm/TalentSearch').then(m => ({ default: m.TalentSearch })));

// Admin Module
const AdminOverview = React.lazy(() => import('../modules/admin/AdminOverview').then(m => ({ default: m.AdminOverview })));
const AdminProjectManagement = React.lazy(() => import('../modules/admin/AdminProjectManagement').then(m => ({ default: m.AdminProjectManagement })));
const CategoryManagement = React.lazy(() => import('../modules/admin/CategoryManagement').then(m => ({ default: m.CategoryManagement })));
const MatchingManagement = React.lazy(() => import('../modules/admin/MatchingManagement').then(m => ({ default: m.MatchingManagement })));
const UserManagement = React.lazy(() => import('../modules/admin/UserManagement').then(m => ({ default: m.UserManagement })));
const VerificationCenter = React.lazy(() => import('../modules/admin/VerificationCenter').then(m => ({ default: m.VerificationCenter })));

// User Module (Shared Protected)
const MyProfile = React.lazy(() => import('../modules/user/MyProfile').then(m => ({ default: m.MyProfile })));
const Settings = React.lazy(() => import('../modules/user/Settings').then(m => ({ default: m.Settings })));
const EditProfile = React.lazy(() => import('../modules/user/EditProfile').then(m => ({ default: m.EditProfile })));
const ChangePassword = React.lazy(() => import('../modules/user/ChangePassword').then(m => ({ default: m.ChangePassword })));
const ChatList = React.lazy(() => import('../modules/user/ChatList').then(m => ({ default: m.ChatList })));
const ChatDetail = React.lazy(() => import('../modules/user/ChatDetail').then(m => ({ default: m.ChatDetail })));

export const router = createBrowserRouter([
  // Public Routes with Public Layout
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { path: '/', element: <LandingHero /> },
      { path: 'market', element: <ProjectMarket /> },
      { path: 'projects/:id', element: <ProjectDetails /> },
      { path: 'search', element: <GlobalSearch /> },
      { path: 'help', element: <HelpCenter /> },
      { path: 'students/:id', element: <PublicStudentProfile /> },
      { path: 'umkm/:id', element: <PublicBusinessProfile /> },

      // Auth Routes mapped behind GuestRoute to prevent logged-in users from seeing them
      {
        element: <GuestRoute />,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
          { path: 'forgot-password', element: <ForgotPassword /> },
        ]
      }
    ]
  },

  // Dashboard Routes with Dashboard Layout
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      // Protected Shared Routes (Accessible by any logged in user)
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'profile', element: <MyProfile /> },
          { path: 'settings', element: <Settings /> },
          { path: 'settings/edit-profile', element: <EditProfile /> },
          { path: 'settings/change-password', element: <ChangePassword /> },
          { path: 'messages', element: <ChatList /> },
          { path: 'messages/:id', element: <ChatDetail /> },
        ]
      },

      // Student Routes
      {
        path: 'student',
        element: <StudentRoute />,
        children: [
          { path: 'dashboard', element: <StudentDashboard /> },
          { path: 'my-projects', element: <MyProjectsWorkspace /> },
        ]
      },

      // UMKM Routes
      {
        path: 'umkm',
        element: <UMKMRoute />,
        children: [
          { path: 'dashboard', element: <UMKMDashboard /> },
          { path: 'projects', element: <UMKMProjects /> },
          { path: 'projects/:id', element: <UMKMProjectDetail /> },
          { path: 'talent-search', element: <TalentSearch /> },
        ]
      },

      // Admin Routes
      {
        path: 'admin',
        element: <AdminRoute />,
        children: [
          { path: 'overview', element: <AdminOverview /> },
          { path: 'projects', element: <AdminProjectManagement /> },
          { path: 'categories', element: <CategoryManagement /> },
          { path: 'matching', element: <MatchingManagement /> },
          { path: 'settings', element: <Settings /> },
          { path: 'users', element: <UserManagement /> },
          { path: 'verifications', element: <VerificationCenter /> },
        ]
      },
    ]
  },

  // Fallback
  { path: '*', element: <Navigate to="/" replace /> }
]);
