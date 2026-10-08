import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StrengthBar } from "./StrengthBar";
import { AlertTriangle } from "lucide-react";

interface CompetitorCardProps {
  name: string;
  ratings: Array<{ category: string; score: number; maxScore: number }>;
  vulnerabilities: Array<{ content: string }>;
}

export function CompetitorCard({ name, ratings, vulnerabilities }: CompetitorCardProps) {
  return (
    <Card className="border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl text-primary font-bold">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 mb-6">
          {ratings.map((rating, idx) => (
            <StrengthBar 
              key={idx}
              label={rating.category}
              score={rating.score}
              maxScore={rating.maxScore}
            />
          ))}
        </div>
        
        {vulnerabilities.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-start gap-2 text-sm">
              <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800 block mb-1">Key Vulnerability:</span>
                <p className="text-slate-600">{vulnerabilities[0].content}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
