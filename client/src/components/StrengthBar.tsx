import { motion } from "framer-motion";

interface StrengthBarProps {
  label: string;
  score: number;
  maxScore: number;
}

export function StrengthBar({ label, score, maxScore }: StrengthBarProps) {
  const percentage = (score / maxScore) * 100;
  
  // Determine color based on score
  let colorClass = "bg-gradient-to-r from-orange-500 to-red-500";
  if (score >= 8) colorClass = "bg-gradient-to-r from-green-500 to-emerald-400";
  else if (score >= 6) colorClass = "bg-gradient-to-r from-blue-500 to-cyan-400";
  
  return (
    <div className="flex items-center gap-3 my-3">
      <span className="text-sm font-medium text-slate-700 min-w-[140px] truncate" title={label}>
        {label}
      </span>
      <div className="flex-1 h-6 bg-slate-100 rounded-md overflow-hidden relative shadow-inner border border-slate-200">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full flex items-center justify-center text-[11px] font-bold text-white shadow-sm ${colorClass}`}
        >
          {score}/{maxScore}
        </motion.div>
      </div>
    </div>
  );
}
