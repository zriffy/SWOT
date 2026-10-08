import { motion } from "framer-motion";
import logoUrl from "@assets/image_1768839592091.png";

export function PageHeader() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="gradient-header text-white p-8 rounded-xl shadow-xl mb-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-6">
          <img 
            src={logoUrl} 
            alt="Centrisys CNP Logo" 
            className="h-16 md:h-20 w-auto bg-white rounded-lg p-2"
            data-testid="img-logo"
          />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">Competitive Intelligence Dashboard</h1>
            <p className="text-blue-100 text-base opacity-90">Strategic Analysis & Bid-Winning Intelligence for Decanter Centrifuges</p>
          </div>
        </div>
        <div className="hidden md:block">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-medium backdrop-blur-sm">
            Updated: Q1 2026
          </span>
        </div>
      </div>
    </motion.header>
  );
}
