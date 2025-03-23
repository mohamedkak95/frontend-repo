import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOfferSchema, insertCompanySchema, insertFeatureSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import axios from "axios";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all offers with optional filtering
  app.get("/api/offers", async (req: Request, res: Response) => {
    try {
      const { company, offerType, priceRange, sortBy, searchQuery } = req.query;
      
      let offers = await storage.getAllOffers();
      
      // Apply company filter
      if (company && company !== "all") {
        offers = offers.filter(offer => 
          offer.company.name.toLowerCase() === (company as string).toLowerCase());
      }
      
      // Apply offer type filter
      if (offerType && offerType !== "all") {
        offers = offers.filter(offer => {
          switch(offerType) {
            case "internet":
              return offer.offerType === "internet";
            case "calls":
              return offer.offerType === "calls";
            case "combo":
              return offer.offerType === "combo";
            case "special":
              return offer.offerType === "special";
            default:
              return true;
          }
        });
      }
      
      // Apply price range filter
      if (priceRange && priceRange !== "all") {
        offers = offers.filter(offer => {
          switch(priceRange) {
            case "under50":
              return offer.price < 50;
            case "50to100":
              return offer.price >= 50 && offer.price <= 100;
            case "100to200":
              return offer.price > 100 && offer.price <= 200;
            case "over200":
              return offer.price > 200;
            default:
              return true;
          }
        });
      }
      
      // Apply search query
      if (searchQuery) {
        const query = (searchQuery as string).toLowerCase();
        offers = offers.filter(offer => 
          offer.title.toLowerCase().includes(query) || 
          offer.company.name.toLowerCase().includes(query) ||
          offer.company.nameAr.toLowerCase().includes(query)
        );
      }
      
      // Apply sorting
      if (sortBy) {
        switch(sortBy) {
          case "popular":
            offers = offers.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
            break;
          case "priceAsc":
            offers = offers.sort((a, b) => a.price - b.price);
            break;
          case "priceDesc":
            offers = offers.sort((a, b) => b.price - a.price);
            break;
          case "newest":
            offers = offers.sort((a, b) => {
              if (!a.featuredAt || !b.featuredAt) return 0;
              return new Date(b.featuredAt).getTime() - new Date(a.featuredAt).getTime();
            });
            break;
        }
      }
      
      res.json(offers);
    } catch (error) {
      console.error("Error fetching offers:", error);
      res.status(500).json({ message: "Failed to fetch offers" });
    }
  });

  // Get a specific offer by ID
  app.get("/api/offers/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid offer ID" });
      }
      
      const offer = await storage.getOfferById(id);
      if (!offer) {
        return res.status(404).json({ message: "Offer not found" });
      }
      
      res.json(offer);
    } catch (error) {
      console.error("Error fetching offer details:", error);
      res.status(500).json({ message: "Failed to fetch offer details" });
    }
  });

  // Get all companies
  app.get("/api/companies", async (_req: Request, res: Response) => {
    try {
      const companies = await storage.getAllCompanies();
      res.json(companies);
    } catch (error) {
      console.error("Error fetching companies:", error);
      res.status(500).json({ message: "Failed to fetch companies" });
    }
  });

  // Create a new offer (admin functionality)
  app.post("/api/offers", async (req: Request, res: Response) => {
    try {
      const offerData = insertOfferSchema.parse(req.body);
      const newOffer = await storage.createOffer(offerData);
      res.status(201).json(newOffer);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error creating offer:", error);
      res.status(500).json({ message: "Failed to create offer" });
    }
  });

  // Create a new company (admin functionality)
  app.post("/api/companies", async (req: Request, res: Response) => {
    try {
      const companyData = insertCompanySchema.parse(req.body);
      const newCompany = await storage.createCompany(companyData);
      res.status(201).json(newCompany);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error creating company:", error);
      res.status(500).json({ message: "Failed to create company" });
    }
  });

  // Create a new feature (admin functionality)
  app.post("/api/features", async (req: Request, res: Response) => {
    try {
      const featureData = insertFeatureSchema.parse(req.body);
      const newFeature = await storage.createFeature(featureData);
      res.status(201).json(newFeature);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error creating feature:", error);
      res.status(500).json({ message: "Failed to create feature" });
    }
  });

  // Get packages (using mock data for development)
    // Get packages from external API
    app.get("/api/packages", async (req: Request, res: Response) => {
      try {
        const apiUrl = "http://localhost:5000/api/packages";
        const response = await axios.get(apiUrl, { params: req.query });
        res.json(response.data);
      } catch (error) {
        console.error("Error fetching packages from external API:", error);
        res.status(500).json({ message: "Failed to fetch packages" });
      }
    });
  
  
  // Get a specific package by ID
  app.get("/api/packages/:id", async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      
      // Import and use mock data
      const { getPackageById } = await import('./mockData');
      
      // Get package by ID
      const packageData = getPackageById(id);
      
      if (!packageData) {
        return res.status(404).json({ message: "Package not found" });
      }
      
      // Add a small delay to simulate API call
      setTimeout(() => {
        res.json(packageData);
      }, 200);
    } catch (error) {
      console.error("Error fetching package details:", error);
      res.status(500).json({ message: "Failed to fetch package details" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
