export const dynamic = 'force-dynamic';

import { supabase } from '@/lib/supabase';
import { DashboardCards } from '@/components/dashboard/DashboardCards';
import { ScoreChart } from '@/components/dashboard/ScoreChart';
import { FeedbackList } from '@/components/dashboard/FeedbackList';
import { KeywordAnalysis } from '@/components/dashboard/KeywordAnalysis';
import { BarChart3 } from 'lucide-react';

export default async function DashboardPage() {
  const { data: responses, error } = await supabase
    .from('responses')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-red-500">
        Error cargando datos: {error.message}
      </div>
    );
  }

  const validResponses = responses || [];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE] py-8 sm:py-16 px-4 sm:px-6 lg:px-8 font-sans selection:bg-blue-100">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div className="flex items-center space-x-6">
            <div className="p-4 bg-[#019DF4] rounded-3xl text-white shadow-[0_8px_30px_rgba(1,157,244,0.3)] rotate-3">
              <BarChart3 size={32} />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-none mb-2">Dashboard</h1>
              <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">Análisis de resultados en tiempo real</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 text-[10px] font-black uppercase tracking-widest text-[#019DF4]">
            <span className="w-2 h-2 rounded-full bg-[#019DF4] animate-pulse"></span>
            <span>Live Data</span>
          </div>
        </div>

        {/* 1. Dashboard Cards (Total & eNPS) */}
        <DashboardCards responses={validResponses} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Chart Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* 2. Score Distribution Chart */}
            <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden">
               <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight">Distribución</h2>
                  <p className="text-gray-400 text-sm font-medium">Frecuencia de puntuaciones</p>
                </div>
              </div>
              <ScoreChart responses={validResponses} />
            </div>

            {/* 3. Feedback List */}
            <FeedbackList responses={validResponses} />
          </div>

          {/* Sidebar Column */}
          <div className="space-y-12">
            {/* 4. Keyword Analysis */}
            <KeywordAnalysis responses={validResponses} />

            {/* eNPS Infographic Card */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden relative group">
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-1000"></div>
              
              <h3 className="text-xl font-black text-gray-900 tracking-tight mb-4">¿Cómo se mide?</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium mb-8">
                El <strong className="text-gray-900">eNPS</strong> se calcula restando el % de detractores al % de promotores. Es el estándar para medir la lealtad y satisfacción del equipo.
              </p>
              
              <div className="space-y-4">
                <div className="p-4 rounded-3xl bg-emerald-50 border border-emerald-100/50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Promotores</span>
                    <span className="text-xs font-bold text-emerald-600">9-10</span>
                  </div>
                  <p className="text-[11px] text-emerald-800/70 font-medium leading-tight">Embajadores altamente comprometidos que recomiendan la empresa.</p>
                </div>
                
                <div className="p-4 rounded-3xl bg-amber-50 border border-amber-100/50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Pasivos</span>
                    <span className="text-xs font-bold text-amber-600">7-8</span>
                  </div>
                  <p className="text-[11px] text-amber-800/70 font-medium leading-tight">Satisfechos pero neutros. No se incluyen para calcular el score final.</p>
                </div>
                
                <div className="p-4 rounded-3xl bg-rose-50 border border-rose-100/50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest">Detractores</span>
                    <span className="text-xs font-bold text-rose-600">0-6</span>
                  </div>
                  <p className="text-[11px] text-rose-800/70 font-medium leading-tight">Descontentos. Representan un riesgo de rotación y clima negativo.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
