import { useState } from "react";
import { Calendar } from "lucide-react";
import { useLocation } from "wouter";
import Sidebar from "@/components/sidebar";
import DashboardStats from "@/components/dashboard-stats";
import ActiveOrdersTable from "@/components/active-orders-table";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [activeItem, setActiveItem] = useState('dashboard');
  const [dateRange] = useState('19.06.2023 - 19.06.2023');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Sample data matching the screenshot
  const statsData = {
    currentBalance: '703 937,94',
    totalExpenses: '103,50',
    orderCount: '1'
  };

  const ordersData = [
    {
      id: '1',
      status: 'Виконується',
      createdAt: '19.06.23',
      createdTime: '13:34',
      employeeName: 'Сергій',
      employeeId: '38096132079I',
      deliveredAt: '19.06.23',
      deliveredTime: '13:41',
      route: 'Mazda на Петрівці (Степана Бан...',
      address: 'Ярославська вулиця, 58'
    }
  ];

  const handleSidebarClick = (item: string) => {
    setActiveItem(item);
    if (item === 'guests') {
      setLocation('/guests');
    }
  };

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        activeItem={activeItem} 
        onItemClick={handleSidebarClick}
        isCollapsed={sidebarCollapsed}
        onToggle={handleSidebarToggle}
      />
      
      {/* Main Content */}
      <div className={`flex-1 flex flex-col bg-white transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 
                className="text-2xl font-semibold text-gray-900"
                data-testid="page-title"
              >
                Аналітика закладу - Китайський Пельмень 🥟
              </h1>
              <p className="text-sm text-gray-500 mt-1">Дані за</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Date Range Picker */}
              <div className="relative">
                <input 
                  type="text" 
                  value={dateRange}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-uklon-yellow focus:border-uklon-yellow w-64" 
                  readOnly
                  data-testid="date-range-input"
                />
                <Calendar className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Dashboard Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <DashboardStats 
            currentBalance={statsData.currentBalance}
            totalExpenses={statsData.totalExpenses}
            orderCount={statsData.orderCount}
          />
          
          <ActiveOrdersTable orders={ordersData} />
        </div>
      </div>
    </div>
  );
}
