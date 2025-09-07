import { useState } from "react";
import { 
  BarChart3, 
  Package, 
  CreditCard, 
  Users, 
  Settings, 
  LogOut 
} from "lucide-react";

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

export default function Sidebar({ activeItem, onItemClick }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Дашборд', icon: BarChart3 },
    { id: 'orders', label: 'Замовлення', icon: Package },
    { id: 'balance', label: 'Баланс компанії', icon: CreditCard },
    { id: 'employees', label: 'Співробітники', icon: Users },
    { id: 'settings', label: 'Налаштування', icon: Settings },
  ];

  return (
    <div className="w-64 bg-uklon-dark text-white flex flex-col h-screen">
      {/* Logo and Header */}
      <div className="p-4 border-b border-gray-600">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-uklon-yellow rounded flex items-center justify-center">
            <span className="text-uklon-dark text-sm font-bold">u</span>
          </div>
          <span className="text-lg font-semibold">uklon</span>
          <span className="text-uklon-yellow text-lg">📍</span>
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
                className={`sidebar-item px-4 py-3 rounded-lg mx-2 flex items-center space-x-3 cursor-pointer ${
                  activeItem === item.id ? 'active' : ''
                }`}
                onClick={() => onItemClick(item.id)}
              >
                <IconComponent className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
            );
          })}
        </div>
        
        {/* Bottom Navigation */}
        <div className="absolute bottom-4 left-2 right-2">
          <div 
            className="sidebar-item px-4 py-3 rounded-lg flex items-center space-x-3 cursor-pointer"
            data-testid="nav-logout"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Вихід з облікового запису</span>
          </div>
        </div>
      </nav>
    </div>
  );
}
