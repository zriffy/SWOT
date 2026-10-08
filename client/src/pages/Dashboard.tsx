import { PageHeader } from "@/components/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompetitorCard } from "@/components/CompetitorCard";
import { ComparisonTable } from "@/components/ComparisonTable";
import { StrategyCard } from "@/components/StrategyCard";
import { SwotGrid } from "@/components/SwotGrid";
import { MarketIntelligence } from "@/components/MarketIntelligence";
import { useCompetitors, useComparisonTable, useStrategies, useSwot } from "@/hooks/use-competitors";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { data: competitors, isLoading: loadingCompetitors } = useCompetitors();
  const { data: comparisonData, isLoading: loadingComparison } = useComparisonTable();
  const { data: strategies, isLoading: loadingStrategies } = useStrategies();
  const { data: swotData, isLoading: loadingSwot } = useSwot();

  const isLoading = loadingCompetitors || loadingComparison || loadingStrategies || loadingSwot;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
          <p className="text-lg text-slate-500 font-medium">Loading intelligence data...</p>
        </div>
      </div>
    );
  }

  // Group SWOT data by competitor
  const swotByCompetitor = swotData?.reduce((acc: any, item: any) => {
    if (!acc[item.competitorName]) {
      acc[item.competitorName] = [];
    }
    acc[item.competitorName].push(item);
    return acc;
  }, {});

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <PageHeader />

        <Tabs defaultValue="strengths" className="space-y-8">
          <TabsList className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 w-full sm:w-auto grid grid-cols-2 sm:flex sm:inline-flex h-auto gap-1">
            <TabsTrigger 
              value="strengths"
              className="px-6 py-2.5 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
            >
              Competitor Strengths
            </TabsTrigger>
            <TabsTrigger 
              value="strategies"
              className="px-6 py-2.5 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
            >
              Winning Strategies
            </TabsTrigger>
            <TabsTrigger 
              value="swot"
              className="px-6 py-2.5 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
            >
              Enhanced SWOT
            </TabsTrigger>
            <TabsTrigger 
              value="market"
              className="px-6 py-2.5 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
            >
              Market Intelligence
            </TabsTrigger>
          </TabsList>

          <TabsContent value="strengths" className="space-y-8 focus:outline-none">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-primary mb-2">Competitor Strength Assessment</h2>
              <p className="text-slate-500">Quantitative analysis of competitor capabilities across key dimensions.</p>
            </div>
            
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {competitors?.filter(c => c.name !== "CentriTek").map((competitor) => (
                <motion.div key={competitor.id} variants={item}>
                  <CompetitorCard 
                    name={competitor.name}
                    ratings={competitor.ratings}
                    vulnerabilities={competitor.vulnerabilities}
                  />
                </motion.div>
              ))}
            </motion.div>

            {comparisonData && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="mt-12 mb-6">
                  <h2 className="text-2xl font-bold text-primary mb-2">Feature Comparison Matrix</h2>
                  <p className="text-slate-500">Head-to-head feature analysis highlighting Centrisys opportunities.</p>
                </div>
                <ComparisonTable entries={comparisonData} />
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="strategies" className="focus:outline-none">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-2">Strategies to Win</h2>
              <p className="text-slate-500">Actionable battle cards for countering specific competitor threats.</p>
            </div>
            <div className="space-y-6">
              {strategies?.map((strategy) => (
                <StrategyCard
                  key={strategy.id}
                  title={strategy.title}
                  threatLevel={strategy.threatLevel}
                  threatDescription={strategy.threatDescription}
                  items={strategy.items}
                  winStrategy={strategy.winStrategy}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="swot" className="focus:outline-none">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-2">Enhanced SWOT Analysis</h2>
              <p className="text-slate-500">Deep dive into strengths, weaknesses, opportunities, and threats.</p>
            </div>
            {Object.entries(swotByCompetitor || {}).map(([competitor, entries]: [string, any]) => (
              <SwotGrid 
                key={competitor}
                competitorName={competitor}
                entries={entries}
              />
            ))}
          </TabsContent>

          <TabsContent value="market" className="focus:outline-none">
            <MarketIntelligence />
          </TabsContent>
        </Tabs>
      </div>
      
      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-500 text-sm">
            Powered by <span className="font-semibold text-centrisys-blue">Centrisys</span>/<span className="font-semibold text-centrisys-orange">CNP</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
