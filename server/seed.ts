import { db } from "./db";
import { 
  competitors, competitorRatings, keyVulnerabilities,
  comparisonTableEntries, strategies, strategyItems,
  swotEntries, marketInsights
} from "@shared/schema";
import { eq } from "drizzle-orm";
import { seedCompetitors, seedCompetitorRatings, seedKeyVulnerabilities, seedComparisonTableEntries, seedMarketInsights } from "./seed-data";
import { seedStrategies, seedStrategyItems } from "./seed-data-strategies";
import { seedSwotEntries } from "./seed-data-swot";

export async function seedDatabase() {
  console.log("Checking if database needs seeding...");
  
  const existingCompetitors = await db.select().from(competitors);
  
  if (existingCompetitors.length > 0) {
    console.log(`Database already has ${existingCompetitors.length} competitors. Skipping seed.`);
    return;
  }
  
  console.log("Database is empty. Seeding with competitive intelligence data...");
  
  try {
    const competitorMap: Record<string, number> = {};
    for (const comp of seedCompetitors) {
      const [inserted] = await db.insert(competitors).values({ name: comp.name }).returning();
      competitorMap[comp.name] = inserted.id;
      console.log(`  Created competitor: ${comp.name} (id: ${inserted.id})`);
    }
    
    console.log("Seeding competitor ratings...");
    for (const rating of seedCompetitorRatings) {
      const competitorId = competitorMap[rating.competitorName];
      if (competitorId) {
        await db.insert(competitorRatings).values({
          competitorId,
          category: rating.category,
          score: rating.score,
          maxScore: rating.maxScore
        });
      }
    }
    
    console.log("Seeding key vulnerabilities...");
    for (const vuln of seedKeyVulnerabilities) {
      const competitorId = competitorMap[vuln.competitorName];
      if (competitorId) {
        await db.insert(keyVulnerabilities).values({
          competitorId,
          content: vuln.content
        });
      }
    }
    
    console.log("Seeding comparison table entries...");
    for (const entry of seedComparisonTableEntries) {
      await db.insert(comparisonTableEntries).values(entry);
    }
    
    console.log("Seeding market insights...");
    for (const insight of seedMarketInsights) {
      await db.insert(marketInsights).values(insight);
    }
    
    console.log("Seeding strategies...");
    const strategyMap: Record<string, number> = {};
    for (const strategy of seedStrategies) {
      const competitorId = competitorMap[strategy.competitorName];
      if (competitorId) {
        const [inserted] = await db.insert(strategies).values({
          competitorId,
          title: strategy.title,
          threatLevel: strategy.threatLevel,
          threatDescription: strategy.threatDescription,
          winStrategy: strategy.winStrategy
        }).returning();
        strategyMap[strategy.title] = inserted.id;
      }
    }
    
    console.log("Seeding strategy items...");
    for (const item of seedStrategyItems) {
      const strategyId = strategyMap[item.strategyTitle];
      if (strategyId) {
        await db.insert(strategyItems).values({
          strategyId,
          type: item.type,
          content: item.content
        });
      }
    }
    
    console.log("Seeding SWOT entries...");
    for (const entry of seedSwotEntries) {
      const competitorId = competitorMap[entry.competitorName];
      if (competitorId) {
        await db.insert(swotEntries).values({
          competitorId,
          category: entry.category,
          content: entry.content
        });
      }
    }
    
    console.log("Database seeding complete!");
    console.log(`  - ${seedCompetitors.length} competitors`);
    console.log(`  - ${seedCompetitorRatings.length} ratings`);
    console.log(`  - ${seedKeyVulnerabilities.length} vulnerabilities`);
    console.log(`  - ${seedComparisonTableEntries.length} comparison entries`);
    console.log(`  - ${seedMarketInsights.length} market insights`);
    console.log(`  - ${seedStrategies.length} strategies`);
    console.log(`  - ${seedStrategyItems.length} strategy items`);
    console.log(`  - ${seedSwotEntries.length} SWOT entries`);
    
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}
