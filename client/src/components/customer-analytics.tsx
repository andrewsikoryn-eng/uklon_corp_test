import { useState } from "react";
import { BarChart3, PieChart, MapPin, Clock, TrendingUp, Users, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CustomerAnalyticsProps {
  onBack: () => void;
}

interface SegmentData {
  segment: string;
  count: number;
  percentage: number;
  avgSpend: string;
  color: string;
}

interface DeliveryZoneData {
  zone: string;
  orderCount: number;
  revenue: string;
  avgOrderValue: string;
}

interface TimeActivityData {
  timeSlot: string;
  orderCount: number;
  percentage: number;
}

export default function CustomerAnalytics({ onBack }: CustomerAnalyticsProps) {
  // Sample analytics data
  const [segmentData] = useState<SegmentData[]>([
    { segment: "Office worker", count: 45, percentage: 40, avgSpend: "2,850.00", color: "bg-blue-500" },
    { segment: "Parent", count: 34, percentage: 30, avgSpend: "3,420.00", color: "bg-purple-500" },
    { segment: "Student", count: 23, percentage: 20, avgSpend: "1,680.00", color: "bg-green-500" },
    { segment: "Night user", count: 11, percentage: 10, avgSpend: "2,100.00", color: "bg-orange-500" }
  ]);

  const [deliveryZones] = useState<DeliveryZoneData[]>([
    { zone: "Центр", orderCount: 125, revenue: "21,750.00", avgOrderValue: "174.00" },
    { zone: "Печерськ", orderCount: 89, revenue: "16,420.00", avgOrderValue: "184.50" },
    { zone: "Оболонь", orderCount: 67, revenue: "12,890.00", avgOrderValue: "192.40" },
    { zone: "Подол", orderCount: 45, revenue: "8,100.00", avgOrderValue: "180.00" },
    { zone: "Шевченківський", orderCount: 38, revenue: "6,840.00", avgOrderValue: "180.00" }
  ]);

  const [timeActivity] = useState<TimeActivityData[]>([
    { timeSlot: "Ранок (6:00-11:00)", orderCount: 35, percentage: 12 },
    { timeSlot: "Обід (11:00-15:00)", orderCount: 145, percentage: 48 },
    { timeSlot: "Вечір (15:00-20:00)", orderCount: 95, percentage: 32 },
    { timeSlot: "Ніч (20:00-6:00)", orderCount: 25, percentage: 8 }
  ]);

  const totalGuests = segmentData.reduce((sum, segment) => sum + segment.count, 0);
  const totalRevenue = deliveryZones.reduce((sum, zone) => sum + parseFloat(zone.revenue.replace(/,/g, '')), 0);
  const totalOrders = deliveryZones.reduce((sum, zone) => sum + zone.orderCount, 0);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center space-x-2"
            data-testid="btn-back-analytics"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Назад</span>
          </Button>
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-8 h-8 text-uklon-yellow" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900" data-testid="analytics-title">
                Аналітика клієнтів
              </h1>
              <p className="text-sm text-gray-600">
                Групові інсайти на базі даних Uklon + Kyivstar
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900" data-testid="total-guests">
                  {totalGuests}
                </p>
                <p className="text-sm text-gray-600">Всього гостей</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900" data-testid="total-orders">
                  {totalOrders}
                </p>
                <p className="text-sm text-gray-600">Всього замовлень</p>
              </div>
              <BarChart3 className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900" data-testid="total-revenue">
                  ₴{totalRevenue.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Загальний дохід</p>
              </div>
              <TrendingUp className="w-8 h-8 text-uklon-yellow" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900" data-testid="avg-order-value">
                  ₴{Math.round(totalRevenue / totalOrders)}
                </p>
                <p className="text-sm text-gray-600">Середній чек</p>
              </div>
              <PieChart className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Segment Distribution */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PieChart className="w-5 h-5 text-uklon-yellow" />
            <span>Розподіл за сегментами</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart Visualization */}
            <div className="flex items-center justify-center">
              <div className="relative w-64 h-64">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  {segmentData.map((segment, index) => {
                    const circumference = 2 * Math.PI * 30;
                    const strokeDasharray = `${(segment.percentage / 100) * circumference} ${circumference}`;
                    const rotation = segmentData.slice(0, index).reduce((sum, s) => sum + (s.percentage / 100) * 360, 0);
                    
                    return (
                      <circle
                        key={segment.segment}
                        cx="50"
                        cy="50" 
                        r="30"
                        fill="transparent"
                        stroke={segment.color.replace('bg-', '').replace('-500', '')}
                        strokeWidth="8"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset="0"
                        transform={`rotate(${rotation} 50 50)`}
                        className="transition-all duration-300"
                      />
                    );
                  })}
                </svg>
              </div>
            </div>
            
            {/* Legend and Stats */}
            <div className="space-y-4">
              {segmentData.map((segment) => (
                <div key={segment.segment} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${segment.color}`}></div>
                    <div>
                      <p className="font-medium text-gray-900" data-testid={`segment-${segment.segment.replace(' ', '-')}`}>
                        {segment.segment}
                      </p>
                      <p className="text-sm text-gray-600">
                        {segment.count} гостей ({segment.percentage}%)
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">₴{segment.avgSpend}</p>
                    <p className="text-sm text-gray-600">середній чек</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Zones Heatmap */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-uklon-yellow" />
            <span>Тепловая карта районів доставки</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full" data-testid="delivery-zones-table">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Район</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Кількість замовлень</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Дохід</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Середній чек</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Популярність</th>
                </tr>
              </thead>
              <tbody>
                {deliveryZones.map((zone, index) => (
                  <tr key={zone.zone} className="border-b hover:bg-gray-50" data-testid={`zone-row-${zone.zone}`}>
                    <td className="py-4 px-4 font-medium text-gray-900">{zone.zone}</td>
                    <td className="py-4 px-4 text-gray-900">{zone.orderCount}</td>
                    <td className="py-4 px-4 text-gray-900">₴{zone.revenue}</td>
                    <td className="py-4 px-4 text-gray-900">₴{zone.avgOrderValue}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-uklon-yellow h-2 rounded-full"
                            style={{ width: `${Math.max(10, (zone.orderCount / Math.max(...deliveryZones.map(z => z.orderCount))) * 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">#{index + 1}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Activity by Time */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-uklon-yellow" />
            <span>Активність за часом доби</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timeActivity.map((activity) => (
              <div key={activity.timeSlot} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900" data-testid={`time-slot-${activity.timeSlot.split(' ')[0]}`}>
                      {activity.timeSlot}
                    </p>
                    <p className="text-sm text-gray-600">
                      {activity.orderCount} замовлень ({activity.percentage}%)
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-uklon-yellow h-3 rounded-full"
                      style={{ width: `${activity.percentage}%` }}
                    ></div>
                  </div>
                  <Badge variant="secondary">
                    {activity.percentage}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}