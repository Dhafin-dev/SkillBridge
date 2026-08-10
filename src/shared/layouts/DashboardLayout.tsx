import React, { useState, Suspense } from 'react';
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

export const DashboardLayout: React.FC = () => {
  const { currentUser } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(false);

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
