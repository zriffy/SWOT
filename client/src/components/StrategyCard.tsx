import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, ShieldAlert, Zap, Lightbulb } from "lucide-react";

interface StrategyCardProps {
  title: string;
  threatLevel: string;
  threatDescription: string;
  items: Array<{ type: string; content: string }>;
  winStrategy: string;
}

export function StrategyCard({ title, threatLevel, threatDescription, items, winStrategy }: StrategyCardProps) {
  const weaknesses = items.filter(i => i.type === "weakness_to_exploit");
  const strategies = items.filter(i => i.type === "winning_bid_strategy");

  let threatColor = "bg-blue-100 text-blue-800 border-blue-200";
  if (threatLevel.includes("CRITICAL") || threatLevel.includes("HIGH")) {
    threatColor = "bg-orange-50 text-orange-900 border-orange-200 border-l-orange-500";
  } else if (threatLevel.includes("MEDIUM")) {
    threatColor = "bg-yellow-50 text-yellow-900 border-yellow-200 border-l-yellow-500";
  }

  return (
    <Card className="border-t-4 border-t-primary shadow-md hover:shadow-lg transition-all duration-300 mb-6 overflow-hidden">
      <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-2xl text-primary font-bold flex items-center gap-2">
            <Target className="h-6 w-6 text-secondary" />
            {title}
          </CardTitle>
          <div className={`px-4 py-3 rounded-lg border-l-4 text-sm font-medium ${threatColor} max-w-xl`}>
            <span className="font-bold mr-1">🎯 Threat Level: {threatLevel}</span>
             - {threatDescription}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6 grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="flex items-center gap-2 font-bold text-slate-800 border-b-2 border-slate-100 pb-2 mb-4">
            <ShieldAlert className="h-5 w-5 text-red-500" />
            Key Weaknesses to Exploit
          </h4>
          <ul className="space-y-3">
            {weaknesses.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: item.content }} />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="flex items-center gap-2 font-bold text-slate-800 border-b-2 border-slate-100 pb-2 mb-4">
            <Zap className="h-5 w-5 text-yellow-500" />
            Winning Bid Strategies
          </h4>
          <ul className="space-y-3">
            {strategies.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: item.content }} />
              </li>
            ))}
          </ul>
        </div>
        
        <div className="md:col-span-2 mt-2">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-5 rounded-lg border border-indigo-100 border-l-4 border-l-indigo-500">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-6 w-6 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-indigo-900 mb-1">Win Strategy Summary</h5>
                <p className="text-indigo-800 text-sm leading-relaxed">{winStrategy}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
