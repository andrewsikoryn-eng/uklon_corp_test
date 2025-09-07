import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  status: text("status").notNull(),
  employeeName: text("employee_name").notNull(),
  employeeId: text("employee_id").notNull(),
  createdAt: timestamp("created_at").notNull(),
  deliveredAt: timestamp("delivered_at"),
  route: text("route").notNull(),
  address: text("address").notNull(),
});

export const statistics = pgTable("statistics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  currentBalance: decimal("current_balance", { precision: 10, scale: 2 }).notNull(),
  totalExpenses: decimal("total_expenses", { precision: 10, scale: 2 }).notNull(),
  orderCount: text("order_count").notNull(),
  dateFrom: timestamp("date_from").notNull(),
  dateTo: timestamp("date_to").notNull(),
});

export const guests = pgTable("guests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  phoneNumber: text("phone_number").notNull(),
  totalOrders: decimal("total_orders", { precision: 10, scale: 0 }).notNull().default('0'),
  totalSpend: decimal("total_spend", { precision: 10, scale: 2 }).notNull().default('0.00'),
  lastOrderDate: timestamp("last_order_date"),
  segment: text("segment").notNull(), // Office worker, Student, Parent, Night user
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  favoriteAddresses: text("favorite_addresses").array(),
  avgOrderValue: decimal("avg_order_value", { precision: 10, scale: 2 }).default('0.00'),
  deliveryZone: text("delivery_zone"),
  behaviorPattern: text("behavior_pattern"), // Evening user, Lunch buyer, etc.
});

export const marketingTriggers = pgTable("marketing_triggers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  triggerType: text("trigger_type").notNull(), // No orders in 30 days, High spender, New user
  conditions: text("conditions").notNull(), // JSON string of conditions
  messageTemplate: text("message_template").notNull(),
  channel: text("channel").notNull(), // Push, SMS
  isActive: text("is_active").notNull().default('true'),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  sentCount: decimal("sent_count", { precision: 10, scale: 0 }).default('0'),
  openRate: decimal("open_rate", { precision: 5, scale: 2 }).default('0.00'),
  clickRate: decimal("click_rate", { precision: 5, scale: 2 }).default('0.00'),
  conversionRate: decimal("conversion_rate", { precision: 5, scale: 2 }).default('0.00'),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
});

export const insertStatisticsSchema = createInsertSchema(statistics).omit({
  id: true,
});

export const insertGuestSchema = createInsertSchema(guests).omit({
  id: true,
  createdAt: true,
});

export const insertMarketingTriggerSchema = createInsertSchema(marketingTriggers).omit({
  id: true,
  createdAt: true,
  sentCount: true,
  openRate: true,
  clickRate: true,
  conversionRate: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Statistics = typeof statistics.$inferSelect;
export type InsertStatistics = z.infer<typeof insertStatisticsSchema>;
export type Guest = typeof guests.$inferSelect;
export type InsertGuest = z.infer<typeof insertGuestSchema>;
export type MarketingTrigger = typeof marketingTriggers.$inferSelect;
export type InsertMarketingTrigger = z.infer<typeof insertMarketingTriggerSchema>;
