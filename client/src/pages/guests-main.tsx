import { useState } from "react";
import { useLocation } from "wouter";
import Sidebar from "@/components/sidebar";
import GuestsPage from "./guests";
import GuestProfile from "@/components/guest-profile";
import CustomerAnalytics from "@/components/customer-analytics";
import MarketingTriggers from "@/components/marketing-triggers";

type ViewMode = 'main' | 'profile' | 'analytics' | 'triggers';

export default function GuestsMain() {
  const [, setLocation] = useLocation();
  const [currentView, setCurrentView] = useState<ViewMode>('main');
  const [selectedGuestId, setSelectedGuestId] = useState<string>('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSidebarClick = (item: string) => {
    if (item === 'dashboard') {
      setLocation('/dashboard');
    }
    // Add other navigation handlers as needed
  };

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleViewProfile = (guestId: string) => {
    setSelectedGuestId(guestId);
    setCurrentView('profile');
  };

  const handleViewAnalytics = () => {
    setCurrentView('analytics');
  };

  const handleViewTriggers = () => {
    setCurrentView('triggers');
  };

  const handleSetupTrigger = (guestId: string) => {
    setSelectedGuestId(guestId);
    setCurrentView('triggers');
  };

  const handleBackToMain = () => {
    setCurrentView('main');
    setSelectedGuestId('');
  };

  // Profile modal overlay
  if (currentView === 'profile') {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar 
          activeItem="guests" 
          onItemClick={handleSidebarClick}
          isCollapsed={sidebarCollapsed}
          onToggle={handleSidebarToggle}
        />
        <div className={`flex-1 relative transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          <GuestsPage
            onViewProfile={handleViewProfile}
            onViewAnalytics={handleViewAnalytics}
            onViewTriggers={handleViewTriggers}
          />
          <GuestProfile
            guestId={selectedGuestId}
            isOpen={true}
            onClose={handleBackToMain}
            onSetupTrigger={handleSetupTrigger}
          />
        </div>
      </div>
    );
  }

  // Analytics view
  if (currentView === 'analytics') {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar 
          activeItem="guests" 
          onItemClick={handleSidebarClick}
          isCollapsed={sidebarCollapsed}
          onToggle={handleSidebarToggle}
        />
        <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          <CustomerAnalytics onBack={handleBackToMain} />
        </div>
      </div>
    );
  }

  // Marketing triggers view
  if (currentView === 'triggers') {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar 
          activeItem="guests" 
          onItemClick={handleSidebarClick}
          isCollapsed={sidebarCollapsed}
          onToggle={handleSidebarToggle}
        />
        <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          <MarketingTriggers onBack={handleBackToMain} />
        </div>
      </div>
    );
  }

  // Main guests view
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        activeItem="guests" 
        onItemClick={handleSidebarClick}
        isCollapsed={sidebarCollapsed}
        onToggle={handleSidebarToggle}
      />
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <GuestsPage
          onViewProfile={handleViewProfile}
          onViewAnalytics={handleViewAnalytics}
          onViewTriggers={handleViewTriggers}
        />
      </div>
    </div>
  );
}