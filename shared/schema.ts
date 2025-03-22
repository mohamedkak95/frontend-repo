import { pgTable, text, serial, integer, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Company table
export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameAr: text("name_ar").notNull(),
  logo: text("logo"),
  color: text("color").notNull(),
});

export const insertCompanySchema = createInsertSchema(companies).pick({
  name: true,
  nameAr: true,
  logo: true,
  color: true,
});

// Features table
export const features = pgTable("features", {
  id: serial("id").primaryKey(),
  icon: text("icon").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
});

export const insertFeatureSchema = createInsertSchema(features).pick({
  icon: true,
  title: true,
  description: true,
});

// Offers table
export const offers = pgTable("offers", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  companyId: integer("company_id").notNull(),
  price: integer("price").notNull(),
  originalPrice: integer("original_price"),
  discount: integer("discount"),
  internet: json("internet").notNull(),
  minutes: json("minutes").notNull(),
  messages: json("messages").notNull(),
  validity: integer("validity").notNull(),
  code: text("code").notNull(),
  tag: text("tag"),
  isPopular: boolean("is_popular").default(false),
  isLimited: boolean("is_limited").default(false),
  rating: integer("rating"),
  subscribers: integer("subscribers"),
  additionalFeatures: json("additional_features"),
  termsAndConditions: json("terms_and_conditions"),
  offerType: text("offer_type").notNull(),
  featuredAt: text("featured_at"),
});

export const insertOfferSchema = createInsertSchema(offers).pick({
  title: true,
  companyId: true,
  price: true,
  originalPrice: true,
  discount: true,
  internet: true,
  minutes: true,
  messages: true,
  validity: true,
  code: true,
  tag: true,
  isPopular: true,
  isLimited: true,
  rating: true,
  subscribers: true,
  additionalFeatures: true,
  termsAndConditions: true,
  offerType: true,
  featuredAt: true,
});

// offer features relation table
export const offerFeatures = pgTable("offer_features", {
  id: serial("id").primaryKey(),
  offerId: integer("offer_id").notNull(),
  featureId: integer("feature_id").notNull(),
});

export const insertOfferFeatureSchema = createInsertSchema(offerFeatures).pick({
  offerId: true,
  featureId: true,
});

// Export types
export type Company = typeof companies.$inferSelect;
export type InsertCompany = z.infer<typeof insertCompanySchema>;

export type Feature = typeof features.$inferSelect;
export type InsertFeature = z.infer<typeof insertFeatureSchema>;

export type Offer = typeof offers.$inferSelect;
export type InsertOffer = z.infer<typeof insertOfferSchema>;

export type OfferFeature = typeof offerFeatures.$inferSelect;
export type InsertOfferFeature = z.infer<typeof insertOfferFeatureSchema>;
