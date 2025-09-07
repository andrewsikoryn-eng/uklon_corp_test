import { useState } from "react";
import { X, Phone, MapPin, Calendar, TrendingUp, Clock, Home, Building2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface GuestProfileProps {
  guestId: string;
  isOpen: boolean;
  onClose: () => void;
  onSetupTrigger: (guestId: string) => void;
}

interface OrderHistory {
  id: string;
  date: string;
  time: string;
  amount: string;
  items: string;
  status: string;
  deliveryAddress: string;
}

interface GuestData {
  id: string;
  name: string;
  phoneNumber: string;
  segment: string;
  totalOrders: number;
  totalSpend: string;
  avgOrderValue: string;
  lastOrderDate: string;
  deliveryZone: string;
  behaviorPattern: string;
  favoriteAddresses: string[];
  orderFrequency: string;
  orderHistory: OrderHistory[];
}

export default function GuestProfile({ guestId, isOpen, onClose, onSetupTrigger }: GuestProfileProps) {
  // Sample guest data - in real app this would be fetched based on guestId
  const [guestData] = useState<GuestData>({
    id: guestId,
    name: "Олена Петренко",
    phoneNumber: "+380 67 123 4567",
    segment: "Office worker",
    totalOrders: 25,
    totalSpend: "4,350.00",
    avgOrderValue: "174.00",
    lastOrderDate: "2024-01-15",
    deliveryZone: "Центр",
    behaviorPattern: "Обідній покупець",
    favoriteAddresses: [
      "вул. Хрещатик, 22 (Офіс)",
      "вул. Лесі Українки, 15, кв. 42 (Дом)",
      "просп. Перемоги, 8 (Робота)"
    ],
    orderFrequency: "2-3 рази на тиждень",
    orderHistory: [
      {
        id: "ord-1",
        date: "15.01.2024",
        time: "12:30",
        amount: "185.50",
        items: "Салат Цезар, Суп дня, Хліб",
        status: "Доставлено",
        deliveryAddress: "вул. Хрещатик, 22"
      },
      {
        id: "ord-2", 
        date: "12.01.2024",
        time: "13:15",
        amount: "210.00",
        items: "Борщ, Котлета по-київськи, Компот",
        status: "Доставлено",
        deliveryAddress: "вул. Лесі Українки, 15"
      },
      {
        id: "ord-3",
        date: "10.01.2024",
        time: "12:45",
        amount: "155.75",
        items: "Салат грецький, Паста карбонара",
        status: "Доставлено", 
        deliveryAddress: "вул. Хрещатик, 22"
      }
    ]
  });

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case "Office worker": return "bg-blue-100 text-blue-800";
      case "Student": return "bg-green-100 text-green-800";
      case "Parent": return "bg-purple-100 text-purple-800";
      case "Night user": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Доставлено": return "bg-green-100 text-green-800";
      case "В дорозі": return "bg-yellow-100 text-yellow-800";
      case "Скасовано": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid="guest-profile-modal">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span data-testid="guest-profile-title">Профіль гостя</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSetupTrigger(guestId)}
              data-testid="btn-setup-trigger"
            >
              <Star className="w-4 h-4 mr-2" />
              Налаштувати тригер
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-uklon-yellow" />
                <span>Основна інформація</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Ім'я</p>
                  <p className="font-medium" data-testid="profile-name">{guestData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Телефон</p>
                  <p className="font-medium" data-testid="profile-phone">{guestData.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Сегмент</p>
                  <Badge className={getSegmentColor(guestData.segment)} data-testid="profile-segment">
                    {guestData.segment}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Район доставки</p>
                  <p className="font-medium" data-testid="profile-zone">{guestData.deliveryZone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Поведінковий патерн</p>
                  <p className="font-medium" data-testid="profile-behavior">{guestData.behaviorPattern}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Частота замовлень</p>
                  <p className="font-medium" data-testid="profile-frequency">{guestData.orderFrequency}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-uklon-yellow" />
                <span>Статистика замовлень</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900" data-testid="profile-total-orders">
                    {guestData.totalOrders}
                  </div>
                  <div className="text-sm text-gray-600">Всього замовлень</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900" data-testid="profile-total-spend">
                    ₴{guestData.totalSpend}
                  </div>
                  <div className="text-sm text-gray-600">Загальна сума</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900" data-testid="profile-avg-order">
                    ₴{guestData.avgOrderValue}
                  </div>
                  <div className="text-sm text-gray-600">Середній чек</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Favorite Addresses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-uklon-yellow" />
                <span>Улюблені адреси доставки</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {guestData.favoriteAddresses.map((address, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    {address.includes("Офіс") || address.includes("Робота") ? (
                      <Building2 className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Home className="w-4 h-4 text-green-600" />
                    )}
                    <span className="text-sm" data-testid={`profile-address-${index}`}>
                      {address}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-uklon-yellow" />
                <span>Історія замовлень</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="profile-orders-table">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Дата</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Час</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Сума</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Страви</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Статус</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Адреса</th>
                    </tr>
                  </thead>
                  <tbody>
                    {guestData.orderHistory.map((order) => (
                      <tr key={order.id} className="border-b" data-testid={`profile-order-${order.id}`}>
                        <td className="py-3 text-sm text-gray-900">{order.date}</td>
                        <td className="py-3 text-sm text-gray-600">{order.time}</td>
                        <td className="py-3 text-sm font-medium text-gray-900">₴{order.amount}</td>
                        <td className="py-3 text-sm text-gray-600 max-w-xs truncate">{order.items}</td>
                        <td className="py-3">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="py-3 text-sm text-gray-600 max-w-xs truncate">{order.deliveryAddress}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}