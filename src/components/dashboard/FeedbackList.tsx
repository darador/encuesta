import { MessageSquareWarning, Lightbulb } from 'lucide-react';

interface FeedbackListProps {
  responses: any[];
}

export function FeedbackList({ responses }: FeedbackListProps) {
  const withNegative = [...responses].filter(r => r.negative_feedback?.trim()).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  const withImprovement = [...responses].filter(r => r.improvement?.trim()).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  if (withNegative.length === 0 && withImprovement.length === 0) {
    return null;
  }

  return (
    <div className="space-y-12">
      {/* Negative Feedback Section */}
      {withNegative.length > 0 && (
        <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-50">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-rose-50 text-rose-500 rounded-2xl">
                <MessageSquareWarning size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Puntos Críticos</h2>
                <p className="text-gray-400 text-sm font-medium">Lo que más afecta hoy</p>
              </div>
            </div>
            <span className="bg-gray-50 text-gray-400 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
              {withNegative.length}
            </span>
          </div>
          
          <div className="space-y-6">
            {withNegative.map((response) => (
              <div key={response.id} className="group p-6 rounded-3xl bg-gray-50/50 border border-gray-100 hover:border-rose-100 hover:bg-white transition-all duration-300">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed font-medium">"{response.negative_feedback}"</p>
                <div className="mt-4 flex items-center justify-between border-t border-gray-100/50 pt-4">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-tighter ${response.score <= 6 ? 'bg-rose-100 text-rose-600' : 'bg-gray-200 text-gray-500'}`}>
                      Score: {response.score}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {new Date(response.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Improvement Suggestions Section */}
      {withImprovement.length > 0 && (
        <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-50">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-[#019DF4]/10 text-[#019DF4] rounded-2xl">
                <Lightbulb size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Ideas de Mejora</h2>
                <p className="text-gray-400 text-sm font-medium">Propuestas del equipo</p>
              </div>
            </div>
            <span className="bg-gray-50 text-gray-400 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
              {withImprovement.length}
            </span>
          </div>
          
          <div className="space-y-6">
            {withImprovement.map((response) => (
              <div key={response.id} className="group p-6 rounded-3xl bg-blue-50/30 border border-blue-50/50 hover:border-blue-100 hover:bg-white transition-all duration-300">
                <p className="text-gray-800 whitespace-pre-wrap leading-relaxed font-medium italic">"{response.improvement}"</p>
                <div className="mt-4 flex items-center justify-between border-t border-blue-50 pt-4">
                   <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-tighter ${response.score >= 9 ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-200 text-gray-500'}`}>
                      Score: {response.score}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {new Date(response.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

