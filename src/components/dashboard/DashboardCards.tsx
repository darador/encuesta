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

  let enpsBg = 'bg-blue-50';
  let enpsColor = 'text-[#019DF4]';
  if (total > 0) {
    if (eNPS >= 30) {
      enpsBg = 'bg-emerald-50';
      enpsColor = 'text-emerald-600';
    } else if (eNPS < 0) {
      enpsBg = 'bg-rose-50';
      enpsColor = 'text-rose-600';
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Responses */}
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 bg-gray-50 text-gray-400 rounded-bl-3xl">
          <Users size={20} />
        </div>
        <div>
          <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
            Total Respuestas
          </p>
          <p className="text-6xl font-black text-gray-900 leading-none">
            {total}
          </p>
        </div>
        <div className="mt-6 flex items-center space-x-2 text-xs font-bold text-gray-400">
          <span className="w-2 h-2 rounded-full bg-[#019DF4]"></span>
          <span>Actualizado en tiempo real</span>
        </div>
      </div>

      {/* eNPS Score */}
      <div className={`p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden ${enpsBg}`}>
        <div className={`absolute top-0 right-0 p-4 rounded-bl-3xl ${enpsBg} filter brightness-95`}>
          <TrendingUp size={20} className={enpsColor} />
        </div>
        <div>
          <p className={`text-xs font-black uppercase tracking-[0.2em] mb-4 ${enpsColor} opacity-70`}>
            eNPS Global
          </p>
          <p className={`text-6xl font-black leading-none ${enpsColor}`}>
            {total > 0 ? (eNPS > 0 ? '+' : '') + eNPS : '-'}
          </p>
        </div>
        <div className="mt-6">
          <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${enpsColor} border-current opacity-40`}>
            Score
          </span>
        </div>
      </div>

      {/* Breakdown Card */}
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6">
          Composición del eNPS
        </p>
        <div className="space-y-5">
          <div className="space-y-1">
            <div className="flex justify-between items-end">
              <span className="text-xs font-bold text-gray-500">Promotores</span>
              <span className="text-sm font-black text-emerald-600">{total > 0 ? Math.round(pctPromoters) : 0}%</span>
            </div>
            <div className="h-1.5 bg-emerald-50 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${pctPromoters}%` }} />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between items-end">
              <span className="text-xs font-bold text-gray-500">Pasivos</span>
              <span className="text-sm font-black text-amber-500">{total > 0 ? Math.round((passives/total)*100) : 0}%</span>
            </div>
            <div className="h-1.5 bg-amber-50 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 transition-all duration-1000" style={{ width: `${total > 0 ? (passives/total)*100 : 0}%` }} />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between items-end">
              <span className="text-xs font-bold text-gray-500">Detractores</span>
              <span className="text-sm font-black text-rose-600">{total > 0 ? Math.round(pctDetractors) : 0}%</span>
            </div>
            <div className="h-1.5 bg-rose-50 rounded-full overflow-hidden">
              <div className="h-full bg-rose-500 transition-all duration-1000" style={{ width: `${pctDetractors}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

