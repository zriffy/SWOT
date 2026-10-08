import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

async function seedDatabase() {
  const existingCompetitors = await storage.getCompetitors();
  if (existingCompetitors.length > 0) return;

  console.log("Seeding database...");

  // 1. Competitors & Ratings
  const andritz = await storage.createCompetitor({ name: "Andritz" });
  await storage.createCompetitorRating({ competitorId: andritz.id, category: "Cost", score: 8 });
  await storage.createCompetitorRating({ competitorId: andritz.id, category: "Service Quality", score: 7 });
  await storage.createCompetitorRating({ competitorId: andritz.id, category: "Geographic Coverage", score: 8 });
  await storage.createCompetitorRating({ competitorId: andritz.id, category: "Rental Fleet", score: 6 });
  await storage.createCompetitorRating({ competitorId: andritz.id, category: "Innovation", score: 6 });
  await storage.createCompetitorRating({ competitorId: andritz.id, category: "Centrifuge Specialization", score: 6 });
  await storage.createKeyVulnerability({ competitorId: andritz.id, content: "Limited rental fleet >21\"" });

  const alfaLaval = await storage.createCompetitor({ name: "Alfa Laval" });
  await storage.createCompetitorRating({ competitorId: alfaLaval.id, category: "Cost", score: 6 });
  await storage.createCompetitorRating({ competitorId: alfaLaval.id, category: "Service Quality", score: 6 });
  await storage.createCompetitorRating({ competitorId: alfaLaval.id, category: "Brand Recognition", score: 9 });
  await storage.createCompetitorRating({ competitorId: alfaLaval.id, category: "Rental Fleet", score: 5 });
  await storage.createCompetitorRating({ competitorId: alfaLaval.id, category: "Innovation & R&D", score: 8 });
  await storage.createCompetitorRating({ competitorId: alfaLaval.id, category: "Large Centrifuge Focus", score: 8 });
  await storage.createKeyVulnerability({ competitorId: alfaLaval.id, content: "Poor mid-size bid performance" });

  const gea = await storage.createCompetitor({ name: "GEA Group" });
  await storage.createCompetitorRating({ competitorId: gea.id, category: "Cost/Bidding", score: 9 });
  await storage.createCompetitorRating({ competitorId: gea.id, category: "Service Quality", score: 5 });
  await storage.createCompetitorRating({ competitorId: gea.id, category: "Dairy Industry Focus", score: 9 });
  await storage.createCompetitorRating({ competitorId: gea.id, category: "Energy Efficiency Tech", score: 8.5 });
  await storage.createCompetitorRating({ competitorId: gea.id, category: "AI/Digital Solutions", score: 8.5 });
  await storage.createCompetitorRating({ competitorId: gea.id, category: "Rental Fleet", score: 4 });
  await storage.createKeyVulnerability({ competitorId: gea.id, content: "Poor service & long lead times" });

  const flottweg = await storage.createCompetitor({ name: "Flottweg" });
  await storage.createCompetitorRating({ competitorId: flottweg.id, category: "Cost", score: 8 });
  await storage.createCompetitorRating({ competitorId: flottweg.id, category: "Service Quality", score: 8 });
  await storage.createCompetitorRating({ competitorId: flottweg.id, category: "Centrifuge Specialization", score: 9 });
  await storage.createCompetitorRating({ competitorId: flottweg.id, category: "Rental Fleet", score: 7 });
  await storage.createCompetitorRating({ competitorId: flottweg.id, category: "Electrical Engineering", score: 8.5 });
  await storage.createCompetitorRating({ competitorId: flottweg.id, category: "Field Service Team", score: 8 });
  await storage.createKeyVulnerability({ competitorId: flottweg.id, content: "Only one US service location" });

  const centriTek = await storage.createCompetitor({ name: "CentriTek" });

  // 2. Comparison Table
  await storage.createComparisonTableEntry({
    category: "Cost Competitiveness",
    andritzStatus: "Strong", andritzBadge: "badge-strength",
    alfaLavalStatus: "Moderate", alfaLavalBadge: "badge-strength",
    geaStatus: "Strongest", geaBadge: "badge-strength",
    flottwegStatus: "Strong", flottwegBadge: "badge-strength",
    centrisysOpportunity: "Compete on value + service mix"
  });
  await storage.createComparisonTableEntry({
    category: "Service Speed",
    andritzStatus: "Good (US)", andritzBadge: "badge-strength",
    alfaLavalStatus: "Poor", alfaLavalBadge: "badge-weakness",
    geaStatus: "Poor (Germany)", geaBadge: "badge-weakness",
    flottwegStatus: "Excellent", flottwegBadge: "badge-strength",
    centrisysOpportunity: "Leverage faster response times"
  });
  await storage.createComparisonTableEntry({
    category: "Customization",
    andritzStatus: "Limited", andritzBadge: "badge-weakness",
    alfaLavalStatus: "Limited", alfaLavalBadge: "badge-weakness",
    geaStatus: "Limited", geaBadge: "badge-weakness",
    flottwegStatus: "Excellent", flottwegBadge: "badge-strength",
    centrisysOpportunity: "Custom solutions strength"
  });
  await storage.createComparisonTableEntry({
    category: "Rental Fleet",
    andritzStatus: "Small (21\" max)", andritzBadge: "badge-weakness",
    alfaLavalStatus: "Limited", alfaLavalBadge: "badge-weakness",
    geaStatus: "Very Limited", geaBadge: "badge-weakness",
    flottwegStatus: "Good", flottwegBadge: "badge-strength",
    centrisysOpportunity: "Expand rental offerings"
  });
  await storage.createComparisonTableEntry({
    category: "Digital Solutions",
    andritzStatus: "Outdated", andritzBadge: "badge-weakness",
    alfaLavalStatus: "Good", alfaLavalBadge: "badge-strength",
    geaStatus: "Industry leading (AI)", geaBadge: "badge-strength",
    flottwegStatus: "Good", flottwegBadge: "badge-strength",
    centrisysOpportunity: "Invest in digital/monitoring"
  });

  // 3. Strategies
  const s1 = await storage.createStrategy({
    competitorId: andritz.id,
    title: "vs. Andritz",
    threatLevel: "HIGH",
    threatDescription: "Strong cost & geographic presence, but limited centrifuge focus and poor customization",
    winStrategy: "Position as 'centrifuge specialists' vs their 'equipment conglomerate' status. Use speed of service and customization as differentiators. Target their weakness in food/industrial sectors with aggressive pricing and superior technical support."
  });
  await storage.createStrategyItem({ strategyId: s1.id, type: "weakness_to_exploit", content: "No rental fleet >21\": Position larger rental solutions for temporary/project needs" });
  await storage.createStrategyItem({ strategyId: s1.id, type: "weakness_to_exploit", content: "Not centrifuge specialists: Emphasize deep centrifuge domain expertise vs. broader equipment portfolio" });
  await storage.createStrategyItem({ strategyId: s1.id, type: "weakness_to_exploit", content: "Limited customization: Offer tailored configurations for specific applications" });
  await storage.createStrategyItem({ strategyId: s1.id, type: "winning_bid_strategy", content: "Target applications requiring custom bowl/scroll designs they can't match" });
  await storage.createStrategyItem({ strategyId: s1.id, type: "winning_bid_strategy", content: "Emphasize total cost of ownership including service/support efficiency" });
  await storage.createStrategyItem({ strategyId: s1.id, type: "winning_bid_strategy", content: "Pursue rental opportunities above 21\" where they cannot compete" });

  const s2 = await storage.createStrategy({
    competitorId: alfaLaval.id,
    title: "vs. Alfa Laval",
    threatLevel: "HIGH",
    threatDescription: "Strong brand & innovation, but weak in mid-range bids and poor technical support",
    winStrategy: "Attack their weakest segment: mid-range centrifuges. Build reputation for exceptional technical support to counter their known weakness. Use aggressive pricing in 15-24\" segment. Focus on retrofitting Sharples machine clients who want alternatives."
  });
  await storage.createStrategyItem({ strategyId: s2.id, type: "weakness_to_exploit", content: "Poor mid-range bid performance: Dominate 15-24\" centrifuge market where they're weakest" });
  await storage.createStrategyItem({ strategyId: s2.id, type: "weakness_to_exploit", content: "Bad technical support: Emphasize responsive support & local expertise" });
  await storage.createStrategyItem({ strategyId: s2.id, type: "winning_bid_strategy", content: "Aggressively price mid-range (15-24\") bids where they falter" });
  await storage.createStrategyItem({ strategyId: s2.id, type: "winning_bid_strategy", content: "Build case studies around faster, more responsive support" });

  const s3 = await storage.createStrategy({
    competitorId: gea.id,
    title: "vs. GEA Group",
    threatLevel: "CRITICAL",
    threatDescription: "Lowest cost bidder with AI innovation, but terrible service & long lead times",
    winStrategy: "You cannot beat them on price alone. Win on SERVICE. Position as 'German engineering with American service speed.' Highlight TCO advantage: low parts cost + fast repairs = happy customers. Attack their service reputation relentlessly. Target their dairy-focused customers with multi-application solutions."
  });
  await storage.createStrategyItem({ strategyId: s3.id, type: "weakness_to_exploit", content: "Poor service reputation: Repairs must go back to Germany = major customer pain point" });
  await storage.createStrategyItem({ strategyId: s3.id, type: "weakness_to_exploit", content: "Long lead times: Everything comes from Germany - highlight speed advantage" });
  await storage.createStrategyItem({ strategyId: s3.id, type: "winning_bid_strategy", content: "Compete on total cost: emphasize lower service costs vs. their long downtime/repair times" });
  await storage.createStrategyItem({ strategyId: s3.id, type: "winning_bid_strategy", content: "Position speed: 'Centrifuge fixed locally in 48 hours, not 3 months in Germany'" });

  const s4 = await storage.createStrategy({
    competitorId: flottweg.id,
    title: "vs. Flottweg",
    threatLevel: "VERY HIGH",
    threatDescription: "Strongest competitor. Centrifuge specialist with excellent service, but limited US presence",
    winStrategy: "They're your strongest competitor, so you must win on GEOGRAPHY & SUPPLY CHAIN. Position as 'local specialist vs. German import.' Build reputation in municipal/wastewater market they neglect. Emphasize faster delivery & parts availability. In oil/rendering applications, prove superior performance. Consider geographic pricing to undercut their logistics costs."
  });
  await storage.createStrategyItem({ strategyId: s4.id, type: "weakness_to_exploit", content: "Only one service location (KY): Geography = major disadvantage for West/East Coast" });
  await storage.createStrategyItem({ strategyId: s4.id, type: "weakness_to_exploit", content: "Expensive spares logistics: Everything from Germany = shipping costs & delays" });
  await storage.createStrategyItem({ strategyId: s4.id, type: "winning_bid_strategy", content: "Leverage geographic advantage: 'Local service, not 2000 miles away'" });
  await storage.createStrategyItem({ strategyId: s4.id, type: "winning_bid_strategy", content: "Target West Coast/Northeast bids where they have slow response" });

  const s5 = await storage.createStrategy({
    competitorId: centriTek.id,
    title: "vs. CentriTek (Internal Threat)",
    threatLevel: "MEDIUM",
    threatDescription: "Has deep knowledge of Centrisys but lacks resources and capabilities",
    winStrategy: "His primary weapon is price (no overhead), but emphasize his technical/liability risks. Win regulated bids by default (he can't). Build relationships with his past customers to understand what went wrong and position as upgrade."
  });
  await storage.createStrategyItem({ strategyId: s5.id, type: "weakness_to_exploit", content: "No ISO certification: Disqualifies from regulated/pharma bidding" });
  await storage.createStrategyItem({ strategyId: s5.id, type: "winning_bid_strategy", content: "Directly target regulated industries (pharma, food, municipal) where ISO is required" });

  // 4. SWOT
  await storage.createSwotEntry({ competitorId: andritz.id, category: "strengths", content: "Aggressive cost positioning & competitive pricing" });
  await storage.createSwotEntry({ competitorId: andritz.id, category: "strengths", content: "Large, established install base (20+ years)" });
  await storage.createSwotEntry({ competitorId: andritz.id, category: "weaknesses", content: "No rental fleet above 21\" - cannot serve large projects" });
  await storage.createSwotEntry({ competitorId: andritz.id, category: "weaknesses", content: "Low centrifuge margins (not profitable)" });
  await storage.createSwotEntry({ competitorId: andritz.id, category: "opportunities", content: "Mining sector growth (core strength)" });
  await storage.createSwotEntry({ competitorId: andritz.id, category: "threats", content: "Specialists taking market share in centrifuges" });

  await storage.createSwotEntry({ competitorId: alfaLaval.id, category: "strengths", content: "Dominant brand recognition globally" });
  await storage.createSwotEntry({ competitorId: alfaLaval.id, category: "weaknesses", content: "Weak in small-to-midrange CF bids (15-24\")" });
  await storage.createSwotEntry({ competitorId: alfaLaval.id, category: "opportunities", content: "Large-scale municipal wastewater (35% of market)" });
  await storage.createSwotEntry({ competitorId: alfaLaval.id, category: "threats", content: "Specialists dominating mid-range bids" });

  await storage.createSwotEntry({ competitorId: gea.id, category: "strengths", content: "Lowest-cost bidder on average (scale advantage)" });
  await storage.createSwotEntry({ competitorId: gea.id, category: "weaknesses", content: "Mining reputation damage (cannot serve that market)" });
  await storage.createSwotEntry({ competitorId: gea.id, category: "opportunities", content: "Dairy market growth (their core focus)" });
  await storage.createSwotEntry({ competitorId: gea.id, category: "threats", content: "Service-oriented competitors stealing frustrated customers" });

  await storage.createSwotEntry({ competitorId: flottweg.id, category: "strengths", content: "Aggressive, competitive pricing strategy" });
  await storage.createSwotEntry({ competitorId: flottweg.id, category: "weaknesses", content: "Only one US service location (KY)" });
  await storage.createSwotEntry({ competitorId: flottweg.id, category: "opportunities", content: "Wastewater market expansion" });
  await storage.createSwotEntry({ competitorId: flottweg.id, category: "threats", content: "Supply chain disruptions from Germany" });

  // 5. Market Insights
  // Market Stats
  await storage.createMarketInsight({ category: "stat", title: "Global Market Value (2024)", content: "Market Size", value: "$2.12 Billion" });
  await storage.createMarketInsight({ category: "stat", title: "Projected Value (2034)", content: "Market Projection", value: "$3.44 Billion" });
  await storage.createMarketInsight({ category: "stat", title: "Growth Rate (CAGR)", content: "Growth", value: "4.95% annually" });
  await storage.createMarketInsight({ category: "stat", title: "Market Entry Value (2025)", content: "Market Size", value: "$2.22 Billion" });

  // Regional Market Share
  await storage.createMarketInsight({ category: "trend", title: "Europe", content: "Dominant but mature", value: "34%" });
  await storage.createMarketInsight({ category: "trend", title: "Asia-Pacific", content: "Fastest growth region", value: "23%" });
  await storage.createMarketInsight({ category: "trend", title: "North America", content: "Steady growth", value: "22%" });

  // Design Type
  await storage.createMarketInsight({ category: "trend", title: "2-Phase Decanters", content: "Dominant technology", value: "62%" });
  
  // Top Application Markets
  await storage.createMarketInsight({ category: "trend", title: "Wastewater Treatment", content: "Largest application sector", value: "37%" });
  await storage.createMarketInsight({ category: "trend", title: "Food & Beverage", content: "Key growth area", value: "20%" });

  // Insights/Drivers
  await storage.createMarketInsight({ category: "insight", title: "Regulatory Drivers", content: "Environmental Regulations, Zero-Liquid Discharge (ZLD), Circular Economy Focus" });
  await storage.createMarketInsight({ category: "insight", title: "Technology Trends", content: "AI & Predictive Maintenance, Energy Efficiency, IoT/Digital Monitoring" });
  await storage.createMarketInsight({ category: "insight", title: "Centrisys Positioning", content: "Specialize in mid-market (15-24\"), Build US service advantage, Invest in digital solutions" });

  console.log("Seeding complete.");
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed the database
  await seedDatabase();

  app.get(api.competitors.list.path, async (req, res) => {
    const data = await storage.getCompetitors();
    res.json(data);
  });

  app.get(api.competitors.get.path, async (req, res) => {
    const data = await storage.getCompetitor(Number(req.params.id));
    if (!data) return res.status(404).json({ message: "Competitor not found" });
    res.json(data);
  });

  app.get(api.comparisonTable.list.path, async (req, res) => {
    const data = await storage.getComparisonTable();
    res.json(data);
  });

  app.get(api.strategies.list.path, async (req, res) => {
    const data = await storage.getStrategies();
    res.json(data);
  });

  app.get(api.swot.list.path, async (req, res) => {
    const data = await storage.getSwotEntries();
    res.json(data);
  });

  app.get(api.marketInsights.list.path, async (req, res) => {
    const data = await storage.getMarketInsights();
    res.json(data);
  });

  return httpServer;
}
