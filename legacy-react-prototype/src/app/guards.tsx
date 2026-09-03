import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../shared/context/AuthContext';

export const GuestRoute = () => {
  const { isAuthenticated, currentUser } = useAuth();

  if (isAuthenticated && currentUser) {
    if (currentUser.role === 'student') return <Navigate to="/student/dashboard" replace />;
    if (currentUser.role === 'umkm') return <Navigate to="/umkm/dashboard" replace />;
    if (currentUser.role === 'admin') return <Navigate to="/admin/overview" replace />;
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
};

export const StudentRoute = () => {
  const { isAuthenticated, currentUser } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (currentUser?.role !== 'student') return <Navigate to="/" replace />;
  return <Outlet />;
};

export const UMKMRoute = () => {
  const { isAuthenticated, currentUser } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (currentUser?.role !== 'umkm') return <Navigate to="/" replace />;
  return <Outlet />;
};

export const AdminRoute = () => {
  const { isAuthenticated, currentUser } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (currentUser?.role !== 'admin') return <Navigate to="/" replace />;
  return <Outlet />;
};
