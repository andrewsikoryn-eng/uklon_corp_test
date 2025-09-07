import { Building, Receipt, Hash } from "lucide-react";

interface DashboardStatsProps {
  currentBalance: string;
  totalExpenses: string;
  orderCount: string;
}

export default function DashboardStats({ 
  currentBalance, 
  totalExpenses, 
  orderCount 
}: DashboardStatsProps) {
  const stats = [
    {
      id: 'balance',
      title: 'Поточний баланс',
      value: `₴ ${currentBalance}`,
      icon: Building,
      testId: 'stat-balance'
    },
    {
      id: 'expenses',
      title: 'Сума витрат',
      value: `₴ ${totalExpenses}`,
      icon: Receipt,
      hasInfo: true,
      testId: 'stat-expenses'
    },
    {
      id: 'orders',
      title: 'Кількість замовлень',
      value: orderCount,
      icon: Hash,
      testId: 'stat-orders'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      {stats.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <div 
            key={stat.id} 
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            data-testid={stat.testId}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  {stat.hasInfo && (
                    <div className="w-3 h-3 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-xs text-gray-600">i</span>
                    </div>
                  )}
                </div>
                <p 
                  className="text-3xl font-bold text-gray-900 mt-2"
                  data-testid={`${stat.testId}-value`}
                >
                  {stat.value}
                </p>
              </div>
              <div className="bg-gray-100 p-3 rounded-full">
                <IconComponent className="text-gray-600 w-6 h-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
