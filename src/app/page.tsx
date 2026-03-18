import { SurveyForm } from '@/components/SurveyForm';
import { ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE] py-8 sm:py-24 px-4 sm:px-6 lg:px-8 font-sans selection:bg-blue-100">
      <div className="max-w-xl mx-auto space-y-8">
        {/* Header / Anonymity Notice */}
        <div className="relative overflow-hidden bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 sm:p-10 text-center">
          {/* Subtle accent blur */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#019DF4]/10 rounded-full blur-3xl"></div>

          <div className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-blue-50/50 rounded-full text-[#019DF4] mb-8 border border-blue-100/50 scale-90">
            <ShieldCheck size={16} className="shrink-0" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] leading-none"></span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-6">
            Encuesta
          </h1>

          <p className="text-gray-500 text-lg leading-relaxed max-w-sm mx-auto font-medium">
            Identifiquemos juntos puntos de mejora para que el equipo brille aún más. 100% Anónimo.

          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 sm:p-12 relative overflow-hidden">
          <SurveyForm />
        </div>

        <div className="text-center pt-4 pb-12">
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em] drop-shadow-sm">
          </p>
        </div>
      </div>
    </main>
  );
}
