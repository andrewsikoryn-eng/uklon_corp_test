import { type User, type InsertUser, type Guest, type InsertGuest, type MarketingTrigger, type InsertMarketingTrigger } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Guest management
  getAllGuests(): Promise<Guest[]>;
  getGuest(id: string): Promise<Guest | undefined>;
  createGuest(guest: InsertGuest): Promise<Guest>;
  updateGuest(id: string, updates: Partial<InsertGuest>): Promise<Guest | undefined>;
  
  // Marketing triggers
  getAllMarketingTriggers(): Promise<MarketingTrigger[]>;
  getMarketingTrigger(id: string): Promise<MarketingTrigger | undefined>;
  createMarketingTrigger(trigger: InsertMarketingTrigger): Promise<MarketingTrigger>;
  updateMarketingTrigger(id: string, updates: Partial<InsertMarketingTrigger>): Promise<MarketingTrigger | undefined>;
  deleteMarketingTrigger(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private guests: Map<string, Guest>;
  private marketingTriggers: Map<string, MarketingTrigger>;

  constructor() {
    this.users = new Map();
    this.guests = new Map();
    this.marketingTriggers = new Map();
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Guest methods
  async getAllGuests(): Promise<Guest[]> {
    return Array.from(this.guests.values());
  }

  async getGuest(id: string): Promise<Guest | undefined> {
    return this.guests.get(id);
  }

  async createGuest(insertGuest: InsertGuest): Promise<Guest> {
    const id = randomUUID();
    const guest: Guest = {
      id,
      createdAt: new Date(),
      totalOrders: insertGuest.totalOrders || '0',
      totalSpend: insertGuest.totalSpend || '0.00',
      lastOrderDate: insertGuest.lastOrderDate || null,
      favoriteAddresses: insertGuest.favoriteAddresses || null,
      avgOrderValue: insertGuest.avgOrderValue || null,
      deliveryZone: insertGuest.deliveryZone || null,
      behaviorPattern: insertGuest.behaviorPattern || null,
      ...insertGuest
    };
    this.guests.set(id, guest);
    return guest;
  }

  async updateGuest(id: string, updates: Partial<InsertGuest>): Promise<Guest | undefined> {
    const guest = this.guests.get(id);
    if (!guest) return undefined;
    
    const updatedGuest: Guest = { ...guest, ...updates };
    this.guests.set(id, updatedGuest);
    return updatedGuest;
  }

  // Marketing trigger methods
  async getAllMarketingTriggers(): Promise<MarketingTrigger[]> {
    return Array.from(this.marketingTriggers.values());
  }

  async getMarketingTrigger(id: string): Promise<MarketingTrigger | undefined> {
    return this.marketingTriggers.get(id);
  }

  async createMarketingTrigger(insertTrigger: InsertMarketingTrigger): Promise<MarketingTrigger> {
    const id = randomUUID();
    const trigger: MarketingTrigger = {
      id,
      createdAt: new Date(),
      isActive: insertTrigger.isActive || 'true',
      sentCount: '0',
      openRate: '0.00',
      clickRate: '0.00',
      conversionRate: '0.00',
      ...insertTrigger
    };
    this.marketingTriggers.set(id, trigger);
    return trigger;
  }

  async updateMarketingTrigger(id: string, updates: Partial<InsertMarketingTrigger>): Promise<MarketingTrigger | undefined> {
    const trigger = this.marketingTriggers.get(id);
    if (!trigger) return undefined;
    
    const updatedTrigger: MarketingTrigger = { ...trigger, ...updates };
    this.marketingTriggers.set(id, updatedTrigger);
    return updatedTrigger;
  }

  async deleteMarketingTrigger(id: string): Promise<boolean> {
    return this.marketingTriggers.delete(id);
  }

  private initializeSampleData() {
    // Sample guests data
    const sampleGuests: Guest[] = [
      {
        id: "guest-1",
        name: "Олена Петренко",
        phoneNumber: "+380 67 123 4567",
        totalOrders: "25",
        totalSpend: "4350.00",
        lastOrderDate: new Date('2024-01-15'),
        segment: "Office worker",
        createdAt: new Date('2023-06-15'),
        favoriteAddresses: ["вул. Хрещатик, 22 (Офіс)", "вул. Лесі Українки, 15, кв. 42 (Дом)"],
        avgOrderValue: "174.00",
        deliveryZone: "Центр",
        behaviorPattern: "Обідній покупець"
      },
      {
        id: "guest-2", 
        name: "Андрій Коваленко",
        phoneNumber: "+380 95 987 6543",
        totalOrders: "15",
        totalSpend: "2780.50",
        lastOrderDate: new Date('2024-01-10'),
        segment: "Student",
        createdAt: new Date('2023-09-20'),
        favoriteAddresses: ["вул. Володимирська, 60 (Гуртожиток)"],
        avgOrderValue: "185.37",
        deliveryZone: "Печерськ",
        behaviorPattern: "Вечірній користувач"
      },
      {
        id: "guest-3",
        name: "Марія Іваненко",
        phoneNumber: "+380 50 456 7890",
        totalOrders: "35",
        totalSpend: "6420.75",
        lastOrderDate: new Date('2024-01-18'),
        segment: "Parent",
        createdAt: new Date('2023-03-10'),
        favoriteAddresses: ["вул. Оболонський проспект, 12, кв. 85 (Дом)", "вул. Героїв Дніпра, 32 (Офіс)"],
        avgOrderValue: "183.45",
        deliveryZone: "Оболонь",
        behaviorPattern: "Сімейні замовлення"
      },
      {
        id: "guest-4",
        name: "Дмитро Сидоренко",
        phoneNumber: "+380 66 234 5678",
        totalOrders: "8",
        totalSpend: "1250.00",
        lastOrderDate: new Date('2023-12-20'),
        segment: "Night user",
        createdAt: new Date('2023-11-05'),
        favoriteAddresses: ["вул. Контрактова площа, 4, кв. 12 (Дом)"],
        avgOrderValue: "156.25",
        deliveryZone: "Подол",
        behaviorPattern: "Нічний користувач"
      }
    ];

    // Sample marketing triggers
    const sampleTriggers: MarketingTrigger[] = [
      {
        id: "trigger-1",
        name: "Повернення неактивних клієнтів",
        triggerType: "No orders in 30 days",
        conditions: "Останнє замовлення > 30 днів",
        messageTemplate: "Привіт! Сумуємо за тобою 😊 Спеціально для тебе знижка 15% на наступне замовлення!",
        channel: "Push",
        isActive: "true",
        createdAt: new Date('2024-01-10'),
        sentCount: "45",
        openRate: "68.50",
        clickRate: "12.30",
        conversionRate: "8.70"
      },
      {
        id: "trigger-2", 
        name: "Преміум клієнти",
        triggerType: "High spender",
        conditions: "Загальна сума замовлень > ₴5000",
        messageTemplate: "Дякуємо за вірність! Ваш персональний промокод на безкоштовну доставку: PREMIUM2024",
        channel: "SMS",
        isActive: "true",
        createdAt: new Date('2024-01-05'),
        sentCount: "23",
        openRate: "89.20",
        clickRate: "34.80",
        conversionRate: "26.10"
      },
      {
        id: "trigger-3",
        name: "Вітання нових користувачів",
        triggerType: "New user",
        conditions: "Перше замовлення",
        messageTemplate: "Ласкаво просимо! Отримайте 20% знижку на друге замовлення з кодом: WELCOME20",
        channel: "Push",
        isActive: "false",
        createdAt: new Date('2023-12-15'),
        sentCount: "78",
        openRate: "72.40",
        clickRate: "18.90",
        conversionRate: "15.40"
      }
    ];

    // Initialize data
    sampleGuests.forEach(guest => this.guests.set(guest.id, guest));
    sampleTriggers.forEach(trigger => this.marketingTriggers.set(trigger.id, trigger));
  }
}

export const storage = new MemStorage();
