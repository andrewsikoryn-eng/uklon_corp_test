import { useState } from "react";
import { Users, Search, Filter, BarChart3, Plus, Eye, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Guest {
  id: string;
  name: string;
  phoneNumber: string;
  totalOrders: number;
  totalSpend: string;
  lastOrderDate: string;
  segment: string;
  deliveryZone: string;
}

interface GuestsPageProps {
  onViewProfile: (guestId: string) => void;
  onViewAnalytics: () => void;
  onViewTriggers: () => void;
}

export default function GuestsPage({ onViewProfile, onViewAnalytics, onViewTriggers }: GuestsPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [segmentFilter, setSegmentFilter] = useState("");
  const [activityFilter, setActivityFilter] = useState("");
  const [spendFilter, setSpendFilter] = useState("");

  // Sample data for guests
  const [guests] = useState<Guest[]>([
    {
      id: "1",
      name: "Олена Петренко",
      phoneNumber: "+380 67 123 4567",
      totalOrders: 25,
      totalSpend: "4,350.00",
      lastOrderDate: "2024-01-15",
      segment: "Office worker",
      deliveryZone: "Центр"
    },
    {
      id: "2", 
      name: "Андрій Коваленко",
      phoneNumber: "+380 95 987 6543",
      totalOrders: 15,
      totalSpend: "2,780.50",
      lastOrderDate: "2024-01-10",
      segment: "Student",
      deliveryZone: "Печерськ"
    },
    {
      id: "3",
      name: "Марія Іваненко",
      phoneNumber: "+380 50 456 7890",
      totalOrders: 35,
      totalSpend: "6,420.75",
      lastOrderDate: "2024-01-18",
      segment: "Parent",
      deliveryZone: "Оболонь"
    },
    {
      id: "4",
      name: "Дмитро Сидоренко",
      phoneNumber: "+380 66 234 5678",
      totalOrders: 8,
      totalSpend: "1,250.00",
      lastOrderDate: "2023-12-20",
      segment: "Night user",
      deliveryZone: "Подол"
    }
  ]);

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case "Office worker": return "bg-blue-100 text-blue-800";
      case "Student": return "bg-green-100 text-green-800";
      case "Parent": return "bg-purple-100 text-purple-800";
      case "Night user": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.phoneNumber.includes(searchTerm);
    const matchesSegment = !segmentFilter || guest.segment === segmentFilter;
    
    // Activity filter logic
    let matchesActivity = true;
    if (activityFilter) {
      const lastOrder = new Date(guest.lastOrderDate);
      const now = new Date();
      const daysDiff = Math.floor((now.getTime() - lastOrder.getTime()) / (1000 * 3600 * 24));
      
      if (activityFilter === ">14days") {
        matchesActivity = daysDiff > 14;
      } else if (activityFilter === ">30days") {
        matchesActivity = daysDiff > 30;
      }
    }

    // Spend filter logic
    let matchesSpend = true;
    if (spendFilter) {
      const spend = parseFloat(guest.totalSpend.replace(/,/g, ''));
      if (spendFilter === ">500") {
        matchesSpend = spend > 500;
      } else if (spendFilter === ">1000") {
        matchesSpend = spend > 1000;
      } else if (spendFilter === ">5000") {
        matchesSpend = spend > 5000;
      }
    }

    return matchesSearch && matchesSegment && matchesActivity && matchesSpend;
  });

  return (
    <div className="p-8 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Users className="w-8 h-8 text-uklon-yellow" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900" data-testid="guests-title">
              Гості
            </h1>
            <p className="text-sm text-gray-600">
              Управління клієнтською базою ресторану
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={onViewAnalytics}
            className="flex items-center space-x-2"
            data-testid="btn-analytics"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Аналітика клієнтів</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={onViewTriggers}
            className="flex items-center space-x-2"
            data-testid="btn-triggers"
          >
            <Settings className="w-4 h-4" />
            <span>Маркетингові тригери</span>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Пошук по імені або телефону"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              data-testid="search-guests"
            />
          </div>

          {/* Segment Filter */}
          <Select value={segmentFilter} onValueChange={setSegmentFilter}>
            <SelectTrigger data-testid="filter-segment">
              <SelectValue placeholder="Сегмент" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Всі сегменти</SelectItem>
              <SelectItem value="Office worker">Офісний працівник</SelectItem>
              <SelectItem value="Student">Студент</SelectItem>
              <SelectItem value="Parent">Батько</SelectItem>
              <SelectItem value="Night user">Нічний користувач</SelectItem>
            </SelectContent>
          </Select>

          {/* Activity Filter */}
          <Select value={activityFilter} onValueChange={setActivityFilter}>
            <SelectTrigger data-testid="filter-activity">
              <SelectValue placeholder="Активність" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Вся активність</SelectItem>
              <SelectItem value=">14days">Останнє замовлення {'>'} 14 днів</SelectItem>
              <SelectItem value=">30days">Останнє замовлення {'>'} 30 днів</SelectItem>
            </SelectContent>
          </Select>

          {/* Spend Filter */}
          <Select value={spendFilter} onValueChange={setSpendFilter}>
            <SelectTrigger data-testid="filter-spend">
              <SelectValue placeholder="Витрати" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Всі витрати</SelectItem>
              <SelectItem value=">500">{'>'} ₴500</SelectItem>
              <SelectItem value=">1000">{'>'} ₴1,000</SelectItem>
              <SelectItem value=">5000">{'>'} ₴5,000</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-900">{guests.length}</div>
          <div className="text-sm text-gray-600">Всього гостей</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-900">
            {guests.reduce((sum, guest) => sum + guest.totalOrders, 0)}
          </div>
          <div className="text-sm text-gray-600">Всього замовлень</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-900">
            ₴{guests.reduce((sum, guest) => sum + parseFloat(guest.totalSpend.replace(/,/g, '')), 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Загальна сума</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-900">
            ₴{Math.round(guests.reduce((sum, guest) => sum + parseFloat(guest.totalSpend.replace(/,/g, '')), 0) / guests.length).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Середній чек</div>
        </div>
      </div>

      {/* Guests Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            База гостей ({filteredGuests.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full" data-testid="guests-table">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ім'я гостя
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Номер телефону
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Кількість замовлень
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Загальна сума (₴)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Останнє замовлення
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Сегмент
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дії
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredGuests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    Гостей не знайдено
                  </td>
                </tr>
              ) : (
                filteredGuests.map((guest) => (
                  <tr key={guest.id} data-testid={`guest-row-${guest.id}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900" data-testid={`guest-name-${guest.id}`}>
                        {guest.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {guest.deliveryZone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900" data-testid={`guest-phone-${guest.id}`}>
                        {guest.phoneNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900" data-testid={`guest-orders-${guest.id}`}>
                        {guest.totalOrders}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900" data-testid={`guest-spend-${guest.id}`}>
                        ₴{guest.totalSpend}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900" data-testid={`guest-last-order-${guest.id}`}>
                        {new Date(guest.lastOrderDate).toLocaleDateString('uk-UA')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge 
                        className={getSegmentColor(guest.segment)}
                        data-testid={`guest-segment-${guest.id}`}
                      >
                        {guest.segment}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewProfile(guest.id)}
                        className="flex items-center space-x-1"
                        data-testid={`btn-details-${guest.id}`}
                      >
                        <Eye className="w-4 h-4" />
                        <span>Деталі</span>
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}