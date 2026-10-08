import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SwotEntry {
  category: string;
  content: string;
}

interface SwotGridProps {
  competitorName: string;
  entries: SwotEntry[];
}

export function SwotGrid({ competitorName, entries }: SwotGridProps) {
  const strengths = entries.filter(e => e.category === 'strengths');
  const weaknesses = entries.filter(e => e.category === 'weaknesses');
  const opportunities = entries.filter(e => e.category === 'opportunities');
  const threats = entries.filter(e => e.category === 'threats');

  const renderSection = (title: string, items: SwotEntry[], colorClass: string, icon: string) => (
    <div className={`bg-white rounded-lg shadow-sm border p-5 ${colorClass} h-full`}>
      <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-base">
        <span>{icon}</span> {title}
      </h4>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="text-sm text-slate-600 pl-3 border-l-2 border-slate-100 py-0.5">
            {item.content}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-3">
        {competitorName}
        <Badge variant="outline" className="text-xs font-normal text-slate-500">SWOT Analysis</Badge>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {renderSection("Strengths", strengths, "border-t-4 border-t-green-500", "💪")}
        {renderSection("Weaknesses", weaknesses, "border-t-4 border-t-red-500", "⚠️")}
        {renderSection("Opportunities", opportunities, "border-t-4 border-t-blue-500", "🎯")}
        {renderSection("Threats", threats, "border-t-4 border-t-orange-500", "🚨")}
      </div>
    </div>
  );
}
