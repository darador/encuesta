import { Users, TrendingUp, HeartPulse } from 'lucide-react';

interface DashboardCardsProps {
  responses: any[];
}

export function DashboardCards({ responses }: DashboardCardsProps) {
  const total = responses.length;
  
  const promoters = responses.filter(r => r.score >= 9).length;
  const passives = responses.filter(r => r.score >= 7 && r.score <= 8).length;
  const detractors = responses.filter(r => r.score <= 6).length;

  const pctPromoters = total > 0 ? (promoters / total) * 100 : 0;
  const pctDetractors = total > 0 ? (detractors / total) * 100 : 0;
  
  const eNPS = Math.round(pctPromoters - pctDetractors);

  let enpsColor = 'text-gray-900';
  if (eNPS >= 30) enpsColor = 'text-green-600';
  else if (eNPS >= 0) enpsColor = 'text-blue-600';
  else if (total > 0) enpsColor = 'text-red-500';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Responses */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
        <div className="p-4 bg-gray-50 rounded-xl text-gray-500">
          <Users size={24} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
            Respuestas Totales
          </p>
          <p className="text-4xl font-bold text-gray-900">
            {total}
          </p>
        </div>
      </div>

      {/* eNPS Score */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
        <div className="p-4 bg-blue-50 rounded-xl text-blue-500">
          <TrendingUp size={24} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
            eNPS Global
          </p>
          <div className="flex items-baseline space-x-2">
            <p className={`text-4xl font-bold ${enpsColor}`}>
              {total > 0 ? (eNPS > 0 ? '+' : '') + eNPS : '-'}
            </p>
            <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">Score</span>
          </div>
        </div>
      </div>

      {/* Category Breakdown Mini */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="space-y-4 w-full">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-gray-600 font-medium">Promotores</span>
            </div>
            <span className="font-bold">{total > 0 ? Math.round(pctPromoters) : 0}%</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              <span className="text-gray-600 font-medium">Pasivos</span>
            </div>
            <span className="font-bold">{total > 0 ? Math.round((passives/total)*100) : 0}%</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span className="text-gray-600 font-medium">Detractores</span>
            </div>
            <span className="font-bold">{total > 0 ? Math.round(pctDetractors) : 0}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
