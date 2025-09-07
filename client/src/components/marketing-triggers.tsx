import { useState } from "react";
import { Plus, Settings, ArrowLeft, Play, Pause, Trash2, BarChart3, MessageSquare, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

interface MarketingTriggersProps {
  onBack: () => void;
}

interface Trigger {
  id: string;
  name: string;
  triggerType: string;
  conditions: string;
  messageTemplate: string;
  channel: string;
  isActive: boolean;
  sentCount: number;
  openRate: number;
  clickRate: number;
  conversionRate: number;
  createdAt: string;
}

interface TriggerFormData {
  name: string;
  triggerType: string;
  conditions: string;
  messageTemplate: string;
  channel: string;
}

export default function MarketingTriggers({ onBack }: MarketingTriggersProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showResultsView, setShowResultsView] = useState(false);
  const [formData, setFormData] = useState<TriggerFormData>({
    name: '',
    triggerType: '',
    conditions: '',
    messageTemplate: '',
    channel: ''
  });

  // Sample triggers data
  const [triggers] = useState<Trigger[]>([
    {
      id: "1",
      name: "Повернення неактивних клієнтів",
      triggerType: "No orders in 30 days",
      conditions: "Останнє замовлення > 30 днів",
      messageTemplate: "Привіт! Сумуємо за тобою 😊 Спеціально для тебе знижка 15% на наступне замовлення!",
      channel: "Push",
      isActive: true,
      sentCount: 45,
      openRate: 68.5,
      clickRate: 12.3,
      conversionRate: 8.7,
      createdAt: "2024-01-10"
    },
    {
      id: "2", 
      name: "Преміум клієнти",
      triggerType: "High spender",
      conditions: "Загальна сума замовлень > ₴5000",
      messageTemplate: "Дякуємо за вірність! Ваш персональний промокод на безкоштовну доставку: PREMIUM2024",
      channel: "SMS",
      isActive: true,
      sentCount: 23,
      openRate: 89.2,
      clickRate: 34.8,
      conversionRate: 26.1,
      createdAt: "2024-01-05"
    },
    {
      id: "3",
      name: "Вітання нових користувачів",
      triggerType: "New user",
      conditions: "Перше замовлення",
      messageTemplate: "Ласкаво просимо! Отримайте 20% знижку на друге замовлення з кодом: WELCOME20",
      channel: "Push",
      isActive: false,
      sentCount: 78,
      openRate: 72.4,
      clickRate: 18.9,
      conversionRate: 15.4,
      createdAt: "2023-12-15"
    }
  ]);

  const getChannelIcon = (channel: string) => {
    return channel === "SMS" ? <Smartphone className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />;
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800";
  };

  const handleCreateTrigger = () => {
    // In real app, this would submit to backend
    console.log("Creating trigger:", formData);
    setShowCreateModal(false);
    setFormData({ name: '', triggerType: '', conditions: '', messageTemplate: '', channel: '' });
  };

  if (showResultsView) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowResultsView(false)}
              className="flex items-center space-x-2"
              data-testid="btn-back-results"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Назад до тригерів</span>
            </Button>
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-8 h-8 text-uklon-yellow" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900" data-testid="results-title">
                  Результати кампаній
                </h1>
                <p className="text-sm text-gray-600">
                  Ефективність маркетингових тригерів
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Results */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900" data-testid="total-campaigns">
                  {triggers.length}
                </p>
                <p className="text-sm text-gray-600">Всього кампаній</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900" data-testid="total-sent">
                  {triggers.reduce((sum, t) => sum + t.sentCount, 0)}
                </p>
                <p className="text-sm text-gray-600">Відправлено</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900" data-testid="avg-open-rate">
                  {(triggers.reduce((sum, t) => sum + t.openRate, 0) / triggers.length).toFixed(1)}%
                </p>
                <p className="text-sm text-gray-600">Відкриваність</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900" data-testid="avg-conversion">
                  {(triggers.reduce((sum, t) => sum + t.conversionRate, 0) / triggers.length).toFixed(1)}%
                </p>
                <p className="text-sm text-gray-600">Конверсія</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Results Table */}
        <Card>
          <CardHeader>
            <CardTitle>Детальна статистика кампаній</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full" data-testid="campaign-results-table">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Назва кампанії</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Відправлено</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Відкриваність</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">CTR</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Конверсія</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">ROI</th>
                  </tr>
                </thead>
                <tbody>
                  {triggers.map((trigger) => (
                    <tr key={trigger.id} className="border-b hover:bg-gray-50" data-testid={`result-row-${trigger.id}`}>
                      <td className="py-4 px-4 font-medium text-gray-900">{trigger.name}</td>
                      <td className="py-4 px-4 text-gray-900">{trigger.sentCount}</td>
                      <td className="py-4 px-4 text-gray-900">{trigger.openRate}%</td>
                      <td className="py-4 px-4 text-gray-900">{trigger.clickRate}%</td>
                      <td className="py-4 px-4 text-gray-900">{trigger.conversionRate}%</td>
                      <td className="py-4 px-4">
                        <Badge variant="secondary">
                          +{Math.round(trigger.conversionRate * 15)}%
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center space-x-2"
            data-testid="btn-back-triggers"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Назад</span>
          </Button>
          <div className="flex items-center space-x-3">
            <Settings className="w-8 h-8 text-uklon-yellow" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900" data-testid="triggers-title">
                Маркетингові тригери
              </h1>
              <p className="text-sm text-gray-600">
                Автоматичні кампанії для залучення та утримання клієнтів
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => setShowResultsView(true)}
            className="flex items-center space-x-2"
            data-testid="btn-view-results"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Результати</span>
          </Button>
          
          <Button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 bg-uklon-yellow text-uklon-dark hover:bg-uklon-yellow/90"
            data-testid="btn-create-trigger"
          >
            <Plus className="w-4 h-4" />
            <span>Створити тригер</span>
          </Button>
        </div>
      </div>

      {/* Active Triggers */}
      <div className="grid grid-cols-1 gap-6">
        {triggers.map((trigger) => (
          <Card key={trigger.id} data-testid={`trigger-card-${trigger.id}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getChannelIcon(trigger.channel)}
                  <div>
                    <CardTitle className="text-lg">{trigger.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      {trigger.triggerType} • {trigger.conditions}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(trigger.isActive)}>
                    {trigger.isActive ? 'Активний' : 'Неактивний'}
                  </Badge>
                  <Button variant="outline" size="sm">
                    {trigger.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {/* Message Preview */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Шаблон повідомлення:</p>
                  <p className="text-sm text-gray-900">{trigger.messageTemplate}</p>
                </div>
                
                {/* Statistics */}
                <div className="grid grid-cols-4 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900" data-testid={`trigger-sent-${trigger.id}`}>
                      {trigger.sentCount}
                    </p>
                    <p className="text-xs text-gray-600">Відправлено</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900" data-testid={`trigger-open-rate-${trigger.id}`}>
                      {trigger.openRate}%
                    </p>
                    <p className="text-xs text-gray-600">Відкриваність</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900" data-testid={`trigger-click-rate-${trigger.id}`}>
                      {trigger.clickRate}%
                    </p>
                    <p className="text-xs text-gray-600">CTR</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900" data-testid={`trigger-conversion-${trigger.id}`}>
                      {trigger.conversionRate}%
                    </p>
                    <p className="text-xs text-gray-600">Конверсія</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Trigger Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-2xl" data-testid="create-trigger-modal">
          <DialogHeader>
            <DialogTitle>Створити новий тригер</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="trigger-name">Назва тригера</Label>
              <Input
                id="trigger-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Введіть назву тригера"
                data-testid="input-trigger-name"
              />
            </div>

            <div>
              <Label htmlFor="trigger-type">Тип тригера</Label>
              <Select value={formData.triggerType} onValueChange={(value) => setFormData({ ...formData, triggerType: value })}>
                <SelectTrigger data-testid="select-trigger-type">
                  <SelectValue placeholder="Оберіть тип тригера" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="No orders in 30 days">Немає замовлень протягом 30 днів</SelectItem>
                  <SelectItem value="High spender">Високі витрати</SelectItem>
                  <SelectItem value="New user">Новий користувач</SelectItem>
                  <SelectItem value="Frequent customer">Постійний клієнт</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="conditions">Умови спрацювання</Label>
              <Input
                id="conditions"
                value={formData.conditions}
                onChange={(e) => setFormData({ ...formData, conditions: e.target.value })}
                placeholder="Наприклад: Загальна сума > ₴1000"
                data-testid="input-conditions"
              />
            </div>

            <div>
              <Label htmlFor="message-template">Шаблон повідомлення</Label>
              <Textarea
                id="message-template"
                value={formData.messageTemplate}
                onChange={(e) => setFormData({ ...formData, messageTemplate: e.target.value })}
                placeholder="Введіть текст повідомлення..."
                rows={3}
                data-testid="textarea-message"
              />
            </div>

            <div>
              <Label htmlFor="channel">Канал відправки</Label>
              <Select value={formData.channel} onValueChange={(value) => setFormData({ ...formData, channel: value })}>
                <SelectTrigger data-testid="select-channel">
                  <SelectValue placeholder="Оберіть канал" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Push">Push-уведомлення</SelectItem>
                  <SelectItem value="SMS">SMS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowCreateModal(false)}
                data-testid="btn-cancel-trigger"
              >
                Скасувати
              </Button>
              <Button
                onClick={handleCreateTrigger}
                className="bg-uklon-yellow text-uklon-dark hover:bg-uklon-yellow/90"
                data-testid="btn-save-trigger"
              >
                Зберегти тригер
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}