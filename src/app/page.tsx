import { SurveyForm } from '@/components/SurveyForm';
import { ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] py-12 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header / Anonymity Notice */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
            <ShieldCheck size={28} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Encuesta de Clima Laboral
          </h1>
          <div className="bg-blue-50/50 rounded-xl p-5 border border-blue-100">
            <p className="text-gray-700 leading-relaxed">
              Esta encuesta es <span className="font-semibold text-blue-700">completamente anónima</span>.<br />
              No se recopilan correos ni datos personales.<br />
              El objetivo es identificar mejoras reales en el equipo y en la organización.
            </p>
          </div>
        </div>

        {/* Survey Form Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <SurveyForm />
        </div>

        <p className="text-center text-sm text-gray-400">
        </p>
      </div>
    </main>
  );
}
