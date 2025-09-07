import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertGuestSchema, insertMarketingTriggerSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Guest routes
  app.get("/api/guests", async (req, res) => {
    try {
      const guests = await storage.getAllGuests();
      res.json(guests);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch guests" });
    }
  });

  app.get("/api/guests/:id", async (req, res) => {
    try {
      const guest = await storage.getGuest(req.params.id);
      if (!guest) {
        return res.status(404).json({ error: "Guest not found" });
      }
      res.json(guest);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch guest" });
    }
  });

  app.post("/api/guests", async (req, res) => {
    try {
      const validatedData = insertGuestSchema.parse(req.body);
      const guest = await storage.createGuest(validatedData);
      res.status(201).json(guest);
    } catch (error) {
      res.status(400).json({ error: "Invalid guest data" });
    }
  });

  app.patch("/api/guests/:id", async (req, res) => {
    try {
      const validatedData = insertGuestSchema.partial().parse(req.body);
      const guest = await storage.updateGuest(req.params.id, validatedData);
      if (!guest) {
        return res.status(404).json({ error: "Guest not found" });
      }
      res.json(guest);
    } catch (error) {
      res.status(400).json({ error: "Invalid guest data" });
    }
  });

  // Marketing trigger routes
  app.get("/api/marketing-triggers", async (req, res) => {
    try {
      const triggers = await storage.getAllMarketingTriggers();
      res.json(triggers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch marketing triggers" });
    }
  });

  app.get("/api/marketing-triggers/:id", async (req, res) => {
    try {
      const trigger = await storage.getMarketingTrigger(req.params.id);
      if (!trigger) {
        return res.status(404).json({ error: "Marketing trigger not found" });
      }
      res.json(trigger);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch marketing trigger" });
    }
  });

  app.post("/api/marketing-triggers", async (req, res) => {
    try {
      const validatedData = insertMarketingTriggerSchema.parse(req.body);
      const trigger = await storage.createMarketingTrigger(validatedData);
      res.status(201).json(trigger);
    } catch (error) {
      res.status(400).json({ error: "Invalid marketing trigger data" });
    }
  });

  app.patch("/api/marketing-triggers/:id", async (req, res) => {
    try {
      const validatedData = insertMarketingTriggerSchema.partial().parse(req.body);
      const trigger = await storage.updateMarketingTrigger(req.params.id, validatedData);
      if (!trigger) {
        return res.status(404).json({ error: "Marketing trigger not found" });
      }
      res.json(trigger);
    } catch (error) {
      res.status(400).json({ error: "Invalid marketing trigger data" });
    }
  });

  app.delete("/api/marketing-triggers/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteMarketingTrigger(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Marketing trigger not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete marketing trigger" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
