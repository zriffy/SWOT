import { 
  competitors, competitorRatings, keyVulnerabilities, 
  comparisonTableEntries, strategies, strategyItems, 
  swotEntries, marketInsights,
  type Competitor, type CompetitorRating, type KeyVulnerability,
  type ComparisonTableEntry, type Strategy, type StrategyItem,
  type SwotEntry, type MarketInsight,
  type InsertCompetitor, type InsertCompetitorRating,
  type InsertKeyVulnerability, type InsertComparisonTableEntry,
  type InsertStrategy, type InsertStrategyItem,
  type InsertSwotEntry, type InsertMarketInsight
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Competitors
  getCompetitors(): Promise<(Competitor & {
    ratings: CompetitorRating[];
    vulnerabilities: KeyVulnerability[];
  })[]>;
  getCompetitor(id: number): Promise<(Competitor & {
    ratings: CompetitorRating[];
    vulnerabilities: KeyVulnerability[];
    swotEntries: SwotEntry[];
    strategies: (Strategy & { items: StrategyItem[] })[];
  }) | undefined>;
  createCompetitor(competitor: InsertCompetitor): Promise<Competitor>;
  
  // Ratings
  createCompetitorRating(rating: InsertCompetitorRating): Promise<CompetitorRating>;
  
  // Vulnerabilities
  createKeyVulnerability(vulnerability: InsertKeyVulnerability): Promise<KeyVulnerability>;
  
  // Comparison Table
  getComparisonTable(): Promise<ComparisonTableEntry[]>;
  createComparisonTableEntry(entry: InsertComparisonTableEntry): Promise<ComparisonTableEntry>;
  
  // Strategies
  getStrategies(): Promise<(Strategy & { items: StrategyItem[] })[]>;
  createStrategy(strategy: InsertStrategy): Promise<Strategy>;
  createStrategyItem(item: InsertStrategyItem): Promise<StrategyItem>;
  
  // SWOT
  getSwotEntries(): Promise<(SwotEntry & { competitorName: string })[]>;
  createSwotEntry(entry: InsertSwotEntry): Promise<SwotEntry>;
  
  // Market Insights
  getMarketInsights(): Promise<MarketInsight[]>;
  createMarketInsight(insight: InsertMarketInsight): Promise<MarketInsight>;
}

export class DatabaseStorage implements IStorage {
  async getCompetitors() {
    const allCompetitors = await db.select().from(competitors);
    const results = [];
    
    for (const comp of allCompetitors) {
      const ratings = await db.select().from(competitorRatings).where(eq(competitorRatings.competitorId, comp.id));
      const vulnerabilities = await db.select().from(keyVulnerabilities).where(eq(keyVulnerabilities.competitorId, comp.id));
      results.push({
        ...comp,
        ratings,
        vulnerabilities
      });
    }
    
    return results;
  }

  async getCompetitor(id: number) {
    const [comp] = await db.select().from(competitors).where(eq(competitors.id, id));
    if (!comp) return undefined;

    const ratings = await db.select().from(competitorRatings).where(eq(competitorRatings.competitorId, id));
    const vulnerabilities = await db.select().from(keyVulnerabilities).where(eq(keyVulnerabilities.competitorId, id));
    const swot = await db.select().from(swotEntries).where(eq(swotEntries.competitorId, id));
    
    const strats = await db.select().from(strategies).where(eq(strategies.competitorId, id));
    const strategiesWithItems = [];
    for (const s of strats) {
      const items = await db.select().from(strategyItems).where(eq(strategyItems.strategyId, s.id));
      strategiesWithItems.push({ ...s, items });
    }

    return {
      ...comp,
      ratings,
      vulnerabilities,
      swotEntries: swot,
      strategies: strategiesWithItems
    };
  }

  async createCompetitor(insertCompetitor: InsertCompetitor) {
    const [result] = await db.insert(competitors).values(insertCompetitor).returning();
    return result;
  }

  async createCompetitorRating(insertRating: InsertCompetitorRating) {
    const [result] = await db.insert(competitorRatings).values(insertRating).returning();
    return result;
  }

  async createKeyVulnerability(insertVulnerability: InsertKeyVulnerability) {
    const [result] = await db.insert(keyVulnerabilities).values(insertVulnerability).returning();
    return result;
  }

  async getComparisonTable() {
    return await db.select().from(comparisonTableEntries);
  }

  async createComparisonTableEntry(insertEntry: InsertComparisonTableEntry) {
    const [result] = await db.insert(comparisonTableEntries).values(insertEntry).returning();
    return result;
  }

  async getStrategies() {
    const allStrategies = await db.select().from(strategies);
    const results = [];
    for (const s of allStrategies) {
      const items = await db.select().from(strategyItems).where(eq(strategyItems.strategyId, s.id));
      results.push({ ...s, items });
    }
    return results;
  }

  async createStrategy(insertStrategy: InsertStrategy) {
    const [result] = await db.insert(strategies).values(insertStrategy).returning();
    return result;
  }

  async createStrategyItem(insertItem: InsertStrategyItem) {
    const [result] = await db.insert(strategyItems).values(insertItem).returning();
    return result;
  }

  async getSwotEntries() {
    // We need to join with competitors to get the name
    const entries = await db.select({
      id: swotEntries.id,
      competitorId: swotEntries.competitorId,
      category: swotEntries.category,
      content: swotEntries.content,
      competitorName: competitors.name
    })
    .from(swotEntries)
    .innerJoin(competitors, eq(swotEntries.competitorId, competitors.id));
    
    return entries;
  }

  async createSwotEntry(insertEntry: InsertSwotEntry) {
    const [result] = await db.insert(swotEntries).values(insertEntry).returning();
    return result;
  }

  async getMarketInsights() {
    return await db.select().from(marketInsights);
  }

  async createMarketInsight(insertInsight: InsertMarketInsight) {
    const [result] = await db.insert(marketInsights).values(insertInsight).returning();
    return result;
  }
}

export const storage = new DatabaseStorage();
