import { useState } from "react";
import { 
  BarChart3, 
  Package, 
  CreditCard, 
  Users, 
  Settings, 
  LogOut,
  UserCheck,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ activeItem, onItemClick, isCollapsed, onToggle }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Дашборд', icon: BarChart3 },
    { id: 'orders', label: 'Замовлення', icon: Package },
    { id: 'balance', label: 'Баланс компанії', icon: CreditCard },
    { id: 'employees', label: 'Співробітники', icon: Users },
    { id: 'guests', label: 'Гості', icon: UserCheck },
    { id: 'settings', label: 'Налаштування', icon: Settings },
  ];

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} bg-uklon-dark text-white flex flex-col h-screen fixed left-0 top-0 z-50 transition-all duration-300`}>
      {/* Logo and Header */}
      <div className="p-4 border-b border-gray-600">
        <div className="flex items-center justify-between">
          <div className={`flex items-center space-x-2 ${isCollapsed ? 'hidden' : ''}`}>
            <div className="w-6 h-6 bg-uklon-yellow rounded flex items-center justify-center">
              <span className="text-uklon-dark text-sm font-bold">u</span>
            </div>
            <span className="text-lg font-semibold">uklon</span>
            <span className="text-uklon-yellow text-lg">📍</span>
          </div>
          {isCollapsed && (
            <div className="w-6 h-6 bg-uklon-yellow rounded flex items-center justify-center mx-auto">
              <span className="text-uklon-dark text-sm font-bold">u</span>
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-1 hover:bg-gray-600 rounded transition-colors"
            data-testid="sidebar-toggle"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
      
      {/* Navigation Menu */}
      <nav className="flex-1 py-4 relative">
        <div className="px-2 space-y-1">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                data-testid={`nav-${item.id}`}
                className={`sidebar-item px-4 py-3 rounded-lg mx-2 flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} cursor-pointer ${
                  activeItem === item.id ? 'active' : ''
                }`}
                onClick={() => onItemClick(item.id)}
                title={isCollapsed ? item.label : ''}
              >
                <IconComponent className="w-5 h-5" />
                {!isCollapsed && <span className="font-medium">{item.label}</span>}
              </div>
            );
          })}
        </div>
        
        {/* Bottom Navigation */}
        <div className="absolute bottom-4 left-2 right-2">
          <div 
            className={`sidebar-item px-4 py-3 rounded-lg flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} cursor-pointer`}
            data-testid="nav-logout"
            title={isCollapsed ? "Вихід з облікового запису" : ""}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span className="font-medium">Вихід з облікового запису</span>}
          </div>
        </div>
      </nav>
    </div>
  );
}
