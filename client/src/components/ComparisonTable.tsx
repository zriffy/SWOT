import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ComparisonEntry {
  category: string;
  andritzStatus: string;
  andritzBadge: string;
  alfaLavalStatus: string;
  alfaLavalBadge: string;
  geaStatus: string;
  geaBadge: string;
  flottwegStatus: string;
  flottwegBadge: string;
  huberStatus: string;
  huberBadge: string;
  centrisysOpportunity: string;
}

interface ComparisonTableProps {
  entries: ComparisonEntry[];
}

export function ComparisonTable({ entries }: ComparisonTableProps) {
  const getBadgeVariant = (badgeType: string) => {
    if (badgeType === "badge-strength") return "bg-green-100 text-green-800 hover:bg-green-200 border-none";
    if (badgeType === "badge-weakness") return "bg-red-100 text-red-800 hover:bg-red-200 border-none";
    if (badgeType === "badge-neutral") return "bg-slate-100 text-slate-600 hover:bg-slate-200 border-none";
    return "secondary";
  };

  return (
    <div className="rounded-xl border shadow-sm bg-white overflow-hidden my-8">
      <Table>
        <TableHeader className="bg-primary">
          <TableRow className="hover:bg-primary/95 border-none">
            <TableHead className="text-white font-bold w-[180px]">Category</TableHead>
            <TableHead className="text-white font-bold">Andritz</TableHead>
            <TableHead className="text-white font-bold">Alfa Laval</TableHead>
            <TableHead className="text-white font-bold">GEA</TableHead>
            <TableHead className="text-white font-bold">Flottweg</TableHead>
            <TableHead className="text-white font-bold">HUBER</TableHead>
            <TableHead className="text-white font-bold bg-primary/80">Centrisys Opportunity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry, idx) => (
            <TableRow key={idx} className="hover:bg-slate-50">
              <TableCell className="font-semibold text-slate-700 bg-slate-50/50">{entry.category}</TableCell>
              <TableCell>
                <Badge className={getBadgeVariant(entry.andritzBadge)}>{entry.andritzStatus}</Badge>
              </TableCell>
              <TableCell>
                <Badge className={getBadgeVariant(entry.alfaLavalBadge)}>{entry.alfaLavalStatus}</Badge>
              </TableCell>
              <TableCell>
                <Badge className={getBadgeVariant(entry.geaBadge)}>{entry.geaStatus}</Badge>
              </TableCell>
              <TableCell>
                <Badge className={getBadgeVariant(entry.flottwegBadge)}>{entry.flottwegStatus}</Badge>
              </TableCell>
              <TableCell>
                <Badge className={getBadgeVariant(entry.huberBadge)}>{entry.huberStatus}</Badge>
              </TableCell>
              <TableCell className="font-bold text-primary bg-blue-50/30 border-l border-blue-100">
                {entry.centrisysOpportunity}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
