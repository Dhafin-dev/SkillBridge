import React, { useState, Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardNavbar } from './Navbars/DashboardNavbar';
import { StudentSidebar } from './Sidebars/StudentSidebar';
import { UMKMSidebar } from './Sidebars/UMKMSidebar';
import { AdminSidebar } from './Sidebars/AdminSidebar';
import { useAuth } from '../context/AuthContext';
import { BottomNav } from './BottomNav';
import { NotificationDrawer } from '../components/NotificationDrawer';
import { CreateProjectModal } from '../components/modals/CreateProjectModal';
import { PageLoader } from '../components/ui/PageLoader';
import { notificationService } from '../services/api/notificationService';
import { NotificationItem } from '../types/types';

export const DashboardLayout: React.FC = () => {
  const { currentUser } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (currentUser) {
      notificationService.getNotifications().then(data => {
        setUnreadCount(data.filter(n => !n.isRead).length);
      }).catch(err => console.error(err));
    }
  }, [currentUser, showNotifications]); // re-fetch when drawer closes

  return (
    <div className="min-h-screen bg-[#f8f9ff] font-sans antialiased text-slate-900 selection:bg-blue-100 selection:text-blue-900 md:pl-64 flex flex-col">
      {/* Sidebar for Desktop based on role */}
      {currentUser?.role === 'student' && <StudentSidebar />}
      {currentUser?.role === 'umkm' && <UMKMSidebar />}
      {currentUser?.role === 'admin' && <AdminSidebar />}

      {/* Top Navbar */}
      <DashboardNavbar
        onOpenNotifications={() => setShowNotifications(true)}
        onOpenCreateProject={() => setShowCreateProject(true)}
        unreadCount={unreadCount}
      />

      {/* Main Screen Content Body */}
      <main className="flex-1 w-full pb-20 md:pb-0">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>

      {/* Sticky Bottom Navigation Bar for Mobile */}
      <BottomNav />

      {/* Shared Modals/Drawers */}
      {showNotifications && (
        <NotificationDrawer
          onClose={() => setShowNotifications(false)}
        />
      )}

      {showCreateProject && (
        <CreateProjectModal
          onClose={() => setShowCreateProject(false)}
          onCreate={(proj) => {
            console.log('Project created:', proj);
            setShowCreateProject(false);
          }}
        />
      )}

    </div>
  );
};
