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
    <main className="min-h-screen bg-[#F8FAFC] py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center space-x-4 mb-10">
          <div className="p-3 bg-blue-600 rounded-xl text-white shadow-md">
            <BarChart3 size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Analytics Dashboard</h1>
            <p className="text-gray-500 mt-1">Resultados agregados de la encuesta de clima laboral</p>
          </div>
        </div>

        {/* 1. Dashboard Cards (Total & eNPS) */}
        <DashboardCards responses={validResponses} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Chart Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* 2. Score Distribution Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Distribución de Puntuaciones</h2>
              <ScoreChart responses={validResponses} />
            </div>

            {/* 3. Feedback List */}
            <FeedbackList responses={validResponses} />
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            {/* 4. Keyword Analysis */}
            <KeywordAnalysis responses={validResponses} />
            
            {/* Context Widget */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-2xl border border-indigo-100/50">
              <h3 className="font-semibold text-indigo-900 mb-2">Sobre el eNPS</h3>
              <p className="text-sm text-indigo-700/80 leading-relaxed mb-4">
                El eNPS (Employee Net Promoter Score) se calcula restando el porcentaje de detractores (0-6) al porcentaje de promotores (9-10). Los pasivos (7-8) no se incluyen en el cálculo final pero cuentan para el total.
              </p>
              <div className="text-xs space-y-1 text-indigo-600/70">
                <div className="flex justify-between"><span>Promotores (9-10):</span> <span>Se quedan</span></div>
                <div className="flex justify-between"><span>Pasivos (7-8):</span> <span>Satisfechos</span></div>
                <div className="flex justify-between"><span>Detractores (0-6):</span> <span>Riesgo</span></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
