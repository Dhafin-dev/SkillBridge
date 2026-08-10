import React, { useState, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { PublicNavbar } from './Navbars/PublicNavbar';
import { NotificationDrawer } from '../components/NotificationDrawer';
import { PageLoader } from '../components/ui/PageLoader';

export const PublicLayout: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9ff] font-sans antialiased text-slate-900 selection:bg-blue-100 selection:text-blue-900 flex flex-col">
      {/* Public Navbar (no sidebar offset) */}
      <PublicNavbar />

      <main className="flex-1 w-full">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>

      {showNotifications && (
        <NotificationDrawer
          onClose={() => setShowNotifications(false)}
        />
      )}
    </div>
  );
};
