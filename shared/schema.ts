import { pgTable, text, serial, integer, real, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const competitors = pgTable("competitors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const competitorRatings = pgTable("competitor_ratings", {
  id: serial("id").primaryKey(),
  competitorId: integer("competitor_id").notNull(),
  category: text("category").notNull(),
  score: real("score").notNull(),
  maxScore: real("max_score").default(10).notNull(),
});

export const keyVulnerabilities = pgTable("key_vulnerabilities", {
  id: serial("id").primaryKey(),
  competitorId: integer("competitor_id").notNull(),
  content: text("content").notNull(),
});

export const comparisonTableEntries = pgTable("comparison_table_entries", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(),
  andritzStatus: text("andritz_status").notNull(),
  andritzBadge: text("andritz_badge").notNull(),
  alfaLavalStatus: text("alfa_laval_status").notNull(),
  alfaLavalBadge: text("alfa_laval_badge").notNull(),
  geaStatus: text("gea_status").notNull(),
  geaBadge: text("gea_badge").notNull(),
  flottwegStatus: text("flottweg_status").notNull(),
  flottwegBadge: text("flottweg_badge").notNull(),
  huberStatus: text("huber_status").notNull().default("N/A"),
  huberBadge: text("huber_badge").notNull().default("badge-neutral"),
  centrisysOpportunity: text("centrisys_opportunity").notNull(),
});

export const strategies = pgTable("strategies", {
  id: serial("id").primaryKey(),
  competitorId: integer("competitor_id").notNull(),
  title: text("title").notNull(),
  threatLevel: text("threat_level").notNull(),
  threatDescription: text("threat_description").notNull(),
  winStrategy: text("win_strategy").notNull(),
});

export const strategyItems = pgTable("strategy_items", {
  id: serial("id").primaryKey(),
  strategyId: integer("strategy_id").notNull(),
  type: text("type").notNull(), // "weakness_to_exploit" | "winning_bid_strategy"
  content: text("content").notNull(),
});

export const swotEntries = pgTable("swot_entries", {
  id: serial("id").primaryKey(),
  competitorId: integer("competitor_id").notNull(),
  category: text("category").notNull(), // "strengths", "weaknesses", "opportunities", "threats"
  content: text("content").notNull(),
});

export const marketInsights = pgTable("market_insights", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // "insight" | "trend" | "stat"
  title: text("title"),
  content: text("content").notNull(),
  value: text("value"), // For stats
});

// === RELATIONS ===

export const competitorsRelations = relations(competitors, ({ many }) => ({
  ratings: many(competitorRatings),
  vulnerabilities: many(keyVulnerabilities),
  strategies: many(strategies),
  swotEntries: many(swotEntries),
}));

export const competitorRatingsRelations = relations(competitorRatings, ({ one }) => ({
  competitor: one(competitors, {
    fields: [competitorRatings.competitorId],
    references: [competitors.id],
  }),
}));

export const keyVulnerabilitiesRelations = relations(keyVulnerabilities, ({ one }) => ({
  competitor: one(competitors, {
    fields: [keyVulnerabilities.competitorId],
    references: [competitors.id],
  }),
}));

export const strategiesRelations = relations(strategies, ({ one, many }) => ({
  competitor: one(competitors, {
    fields: [strategies.competitorId],
    references: [competitors.id],
  }),
  items: many(strategyItems),
}));

export const strategyItemsRelations = relations(strategyItems, ({ one }) => ({
  strategy: one(strategies, {
    fields: [strategyItems.strategyId],
    references: [strategies.id],
  }),
}));

export const swotEntriesRelations = relations(swotEntries, ({ one }) => ({
  competitor: one(competitors, {
    fields: [swotEntries.competitorId],
    references: [competitors.id],
  }),
}));

// === BASE SCHEMAS ===

export const insertCompetitorSchema = createInsertSchema(competitors);
export const insertCompetitorRatingSchema = createInsertSchema(competitorRatings);
export const insertKeyVulnerabilitySchema = createInsertSchema(keyVulnerabilities);
export const insertComparisonTableEntrySchema = createInsertSchema(comparisonTableEntries);
export const insertStrategySchema = createInsertSchema(strategies);
export const insertStrategyItemSchema = createInsertSchema(strategyItems);
export const insertSwotEntrySchema = createInsertSchema(swotEntries);
export const insertMarketInsightSchema = createInsertSchema(marketInsights);

// === EXPLICIT API CONTRACT TYPES ===

export type Competitor = typeof competitors.$inferSelect;
export type InsertCompetitor = typeof competitors.$inferInsert;
export type CompetitorRating = typeof competitorRatings.$inferSelect;
export type InsertCompetitorRating = typeof competitorRatings.$inferInsert;
export type KeyVulnerability = typeof keyVulnerabilities.$inferSelect;
export type InsertKeyVulnerability = typeof keyVulnerabilities.$inferInsert;
export type ComparisonTableEntry = typeof comparisonTableEntries.$inferSelect;
export type InsertComparisonTableEntry = typeof comparisonTableEntries.$inferInsert;
export type Strategy = typeof strategies.$inferSelect;
export type InsertStrategy = typeof strategies.$inferInsert;
export type StrategyItem = typeof strategyItems.$inferSelect;
export type InsertStrategyItem = typeof strategyItems.$inferInsert;
export type SwotEntry = typeof swotEntries.$inferSelect;
export type InsertSwotEntry = typeof swotEntries.$inferInsert;
export type MarketInsight = typeof marketInsights.$inferSelect;
export type InsertMarketInsight = typeof marketInsights.$inferInsert;

export type CompetitorWithDetails = Competitor & {
  ratings: CompetitorRating[];
  vulnerabilities: KeyVulnerability[];
  swotEntries: SwotEntry[];
  strategies: (Strategy & { items: StrategyItem[] })[];
};

export type StrategyWithItems = Strategy & {
  items: StrategyItem[];
};
