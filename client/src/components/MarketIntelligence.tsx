import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Globe, Factory, Droplets, Award } from "lucide-react";

interface MetricRowProps {
  label: string;
  value: string;
}

function MetricRow({ label, value }: MetricRowProps) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-slate-100 last:border-b-0">
      <span className="text-slate-600 font-medium">{label}</span>
      <span className="font-bold text-primary">{value}</span>
    </div>
  );
}

interface ProgressRowProps {
  label: string;
  percentage: number;
  description: string;
}

function ProgressRow({ label, percentage, description }: ProgressRowProps) {
  return (
    <div className="space-y-2 py-3 border-b border-slate-100 last:border-b-0">
      <div className="flex justify-between items-center">
        <span className="text-slate-700 font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="h-6 bg-slate-200 rounded overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary via-secondary to-[#E87722] flex items-center justify-center text-white text-xs font-bold"
              style={{ width: `${Math.min(percentage * 2.7, 100)}%` }}
            >
              {description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MarketIntelligence() {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-2">Market Intelligence & Industry Trends</h2>
        <p className="text-slate-500">Comprehensive market analysis and strategic positioning insights.</p>
      </div>

      {/* Market Size & Growth */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-secondary" />
          <h3 className="font-bold text-lg text-primary">Market Size & Growth</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-50 p-4 rounded-lg text-center">
            <p className="text-slate-500 text-sm mb-1">Global Market Value (2024)</p>
            <p className="text-2xl font-bold text-primary">$2.12B</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg text-center">
            <p className="text-slate-500 text-sm mb-1">Projected Value (2034)</p>
            <p className="text-2xl font-bold text-primary">$3.44B</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg text-center">
            <p className="text-slate-500 text-sm mb-1">Growth Rate (CAGR)</p>
            <p className="text-2xl font-bold text-secondary">4.95%</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg text-center">
            <p className="text-slate-500 text-sm mb-1">Market Entry Value (2025)</p>
            <p className="text-2xl font-bold text-primary">$2.22B</p>
          </div>
        </div>
      </Card>

      {/* Regional Market Share */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="w-6 h-6 text-secondary" />
          <h3 className="font-bold text-lg text-primary">Regional Market Share</h3>
        </div>
        <ProgressRow label="Europe" percentage={34} description="34% (Dominant)" />
        <ProgressRow label="Asia-Pacific" percentage={23} description="23% (Fastest Growth)" />
        <ProgressRow label="North America" percentage={22} description="22%" />
        <ProgressRow label="Rest of World" percentage={21} description="21%" />
      </Card>

      {/* Design Type Market Leadership */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Factory className="w-6 h-6 text-secondary" />
          <h3 className="font-bold text-lg text-primary">Design Type Market Leadership</h3>
        </div>
        <ProgressRow label="2-Phase Decanters" percentage={62} description="62% (Dominant)" />
        <ProgressRow label="3-Phase Decanters" percentage={24} description="24%" />
        <ProgressRow label="Disc Stack Centrifuges" percentage={14} description="14%" />
      </Card>

      {/* Top Application Markets */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Droplets className="w-6 h-6 text-secondary" />
          <h3 className="font-bold text-lg text-primary">Top Application Markets</h3>
        </div>
        <ProgressRow label="Wastewater Treatment" percentage={37} description="37% (Largest)" />
        <ProgressRow label="Food & Beverage" percentage={20} description="20%" />
        <ProgressRow label="Mining & Minerals" percentage={18} description="18%" />
        <ProgressRow label="Oil & Gas" percentage={15} description="15%" />
        <ProgressRow label="Chemical & Pharma" percentage={10} description="10%" />
      </Card>

      {/* End-User Market Distribution */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Factory className="w-6 h-6 text-secondary" />
          <h3 className="font-bold text-lg text-primary">End-User Market Distribution</h3>
        </div>
        <ProgressRow label="Industrial Plants" percentage={45} description="45% (Largest)" />
        <ProgressRow label="Municipal Utilities" percentage={35} description="35%" />
        <ProgressRow label="Rental/Contractors" percentage={20} description="20%" />
      </Card>

      {/* Key Industry Drivers & Trends */}
      <Card className="p-6">
        <h3 className="font-bold text-xl text-primary mb-6">Key Industry Drivers & Trends</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-primary border-b-2 border-slate-200 pb-2">Regulatory Drivers</h4>
            <ul className="space-y-3">
              <li className="text-sm text-slate-600">
                <span className="font-semibold text-slate-800">Environmental Regulations:</span> Stringent EPA/EU standards driving wastewater treatment investments
              </li>
              <li className="text-sm text-slate-600">
                <span className="font-semibold text-slate-800">Zero-Liquid Discharge (ZLD):</span> Mandates forcing industrial adoption of efficient separation
              </li>
              <li className="text-sm text-slate-600">
                <span className="font-semibold text-slate-800">Circular Economy Focus:</span> Resource recovery and waste minimization policies
              </li>
              <li className="text-sm text-slate-600">
                <span className="font-semibold text-slate-800">ESG Compliance:</span> Sustainability requirements in pharma/food production
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-primary border-b-2 border-slate-200 pb-2">Technology Trends</h4>
            <ul className="space-y-3">
              <li className="text-sm text-slate-600">
                <span className="font-semibold text-slate-800">AI & Predictive Maintenance:</span> GEA leading with autonomous operator technology
              </li>
              <li className="text-sm text-slate-600">
                <span className="font-semibold text-slate-800">Energy Efficiency:</span> EngySpeed and similar technologies reducing power consumption
              </li>
              <li className="text-sm text-slate-600">
                <span className="font-semibold text-slate-800">IoT/Digital Monitoring:</span> Real-time performance tracking and optimization (KPInsight)
              </li>
              <li className="text-sm text-slate-600">
                <span className="font-semibold text-slate-800">Automation:</span> Reduced operator dependency, consistent performance
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-primary border-b-2 border-slate-200 pb-2">Market Growth Catalysts</h4>
            <ul className="space-y-3">
              <li className="text-sm text-slate-600">
                <span className="font-semibold text-slate-800">Urbanization:</span> Growing cities = increased wastewater treatment needs
              </li>
              <li className="text-sm text-slate-600">
                <span className="font-semibold text-slate-800">Industrial Expansion (Asia-Pacific):</span> Fastest growth region (food processing, mining)
              </li>
              <li className="text-sm text-slate-600">
                <span className="font-semibold text-slate-800">Food & Beverage Growth:</span> Plant-based, oil processing, dairy expansion
              </li>
              <li className="text-sm text-slate-600">
                <span className="font-semibold text-slate-800">Mining Recovery:</span> Commodity prices driving mining activity
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-primary border-b-2 border-slate-200 pb-2">Centrisys Positioning Opportunities</h4>
            <ul className="space-y-3">
              <li className="text-sm text-slate-600">
                <span className="font-semibold text-slate-800">Specialize in mid-market (15-24"):</span> Where Alfa Laval is weak and GEA is expensive
              </li>
              <li className="text-sm text-slate-600">
                <span className="font-semibold text-slate-800">Build US service advantage:</span> Counter GEA/Flottweg's Germany-dependent supply chains
              </li>
              <li className="text-sm text-slate-600">
                <span className="font-semibold text-slate-800">Invest in digital solutions:</span> Match GEA's AI advantage with own monitoring tech
              </li>
              <li className="text-sm text-slate-600">
                <span className="font-semibold text-slate-800">Expand rental offerings:</span> Counter Andritz's 21" limitation and GEA's weak rentals
              </li>
              <li className="text-sm text-slate-600">
                <span className="font-semibold text-slate-800">Municipal wastewater focus:</span> 35% of market, often underserved by large competitors
              </li>
              <li className="text-sm text-slate-600">
                <span className="font-semibold text-slate-800">Food processing expansion:</span> Growing segment with customization needs
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Top Industry Players */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Award className="w-6 h-6 text-secondary" />
          <h3 className="font-bold text-lg text-primary">Top Industry Players</h3>
        </div>
        
        <div className="mb-4">
          <h4 className="font-semibold text-slate-700 mb-3">Market Leadership (by category):</h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-lg">
              <span className="text-lg">&#129351;</span>
              <div>
                <p className="text-xs text-slate-500">Cost Leadership</p>
                <p className="font-semibold text-primary">GEA Group</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-lg">
              <span className="text-lg">&#129351;</span>
              <div>
                <p className="text-xs text-slate-500">Specialization</p>
                <p className="font-semibold text-primary">Flottweg SE</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-lg">
              <span className="text-lg">&#129351;</span>
              <div>
                <p className="text-xs text-slate-500">Brand Recognition</p>
                <p className="font-semibold text-primary">Alfa Laval</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-lg">
              <span className="text-lg">&#129351;</span>
              <div>
                <p className="text-xs text-slate-500">Geographic Diversity</p>
                <p className="font-semibold text-primary">Andritz AG</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-lg">
              <span className="text-lg">&#129351;</span>
              <div>
                <p className="text-xs text-slate-500">Innovation/Digital</p>
                <p className="font-semibold text-primary">GEA Group</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-lg">
              <span className="text-lg">&#129351;</span>
              <div>
                <p className="text-xs text-slate-500">Service Speed</p>
                <p className="font-semibold text-primary">Flottweg SE</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-600 mt-4">
          <span className="font-semibold">Other Notable Competitors:</span> Derrick Corporation, FLSmidth A/S, IHI Corporation, Mitsubishi Kakoki
        </p>
      </Card>

      {/* Data Sources */}
      <div className="text-center text-xs text-slate-400 mt-8">
        Market data from Precedence Research, Fortune Business Insights, GEA, and industry sources | Generated January 2026
      </div>
    </div>
  );
}
