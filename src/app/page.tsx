import { SurveyForm } from '@/components/SurveyForm';
import { ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDFDFD] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] py-12 sm:py-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-xl mx-auto space-y-10">
        {/* Header / Anonymity Notice */}
        <div className="relative overflow-hidden bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-8 sm:p-10 text-center">
          {/* Subtle accent blur */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl"></div>
          
          <div className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 mb-8 border border-blue-100/50 scale-95">
            <ShieldCheck size={16} className="shrink-0" />
            <span className="text-xs font-bold uppercase tracking-widest">Feedback 100% Anónimo</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-6">
            Encuesta
          </h1>
          
          <p className="text-gray-500 text-lg leading-relaxed max-w-sm mx-auto">
            Tu voz importa. Identifiquemos juntos puntos de mejora para que el equipo brille aún más.
          </p>
        </div>

        {/* Survey Form Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-8 sm:p-12">
          <SurveyForm />
        </div>

        <div className="text-center pt-4">
          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">
            Desarrollado para el crecimiento del equipo
          </p>
        </div>
      </div>
    </main>
  );
}
