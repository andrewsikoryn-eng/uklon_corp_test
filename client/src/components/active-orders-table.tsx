import { Car, ChevronDown } from "lucide-react";

interface Order {
  id: string;
  status: string;
  createdAt: string;
  createdTime: string;
  employeeName: string;
  employeeId: string;
  deliveredAt: string;
  deliveredTime: string;
  route: string;
  address: string;
}

interface ActiveOrdersTableProps {
  orders: Order[];
}

export default function ActiveOrdersTable({ orders }: ActiveOrdersTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Активні замовлення</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full" data-testid="orders-table">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Статус
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center space-x-1">
                  <span>Дата створ.</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </div>
                <div className="text-xs text-gray-400 normal-case mt-1">Час</div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Співробітник
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Дата под.
                <div className="text-xs text-gray-400 normal-case mt-1">Час</div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Маршрут
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  Немає активних замовлень
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} data-testid={`order-row-${order.id}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="status-dot status-executing"></span>
                      <span 
                        className="text-sm text-gray-900"
                        data-testid={`order-status-${order.id}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div 
                      className="text-sm text-gray-900"
                      data-testid={`order-created-date-${order.id}`}
                    >
                      {order.createdAt}
                    </div>
                    <div 
                      className="text-sm text-gray-500"
                      data-testid={`order-created-time-${order.id}`}
                    >
                      {order.createdTime}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div 
                      className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                      data-testid={`order-employee-name-${order.id}`}
                    >
                      {order.employeeName}
                    </div>
                    <div 
                      className="text-sm text-gray-500"
                      data-testid={`order-employee-id-${order.id}`}
                    >
                      {order.employeeId}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div 
                      className="text-sm text-gray-900"
                      data-testid={`order-delivered-date-${order.id}`}
                    >
                      {order.deliveredAt}
                    </div>
                    <div 
                      className="text-sm text-gray-500"
                      data-testid={`order-delivered-time-${order.id}`}
                    >
                      {order.deliveredTime}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center space-x-2">
                        <Car className="w-4 h-4 text-gray-400" />
                        <span data-testid={`order-route-${order.id}`}>
                          {order.route}
                        </span>
                      </div>
                      <div 
                        className="text-sm text-gray-500 mt-1"
                        data-testid={`order-address-${order.id}`}
                      >
                        {order.address}
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
