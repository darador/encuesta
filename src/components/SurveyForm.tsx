'use client';

import { useState, useEffect } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';

export function SurveyForm() {
  const [score, setScore] = useState<number | null>(null);
  const [negativeFeedback, setNegativeFeedback] = useState('');
  const [improvement, setImprovement] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check localStorage on mount
  useEffect(() => {
    const hasSubmitted = localStorage.getItem('feedback_submitted');
    if (hasSubmitted) {
      setIsSubmitted(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (score === null) {
      setError('Por favor, selecciona una puntuación antes de enviar.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          score,
          negative_feedback: negativeFeedback,
          improvement,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar la respuesta');
      }

      setIsSubmitted(true);
      localStorage.setItem('feedback_submitted', 'true');
    } catch (err: any) {
      setError(err.message || 'Ha ocurrido un error inesperado. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6 text-center space-y-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900">¡Gracias!</h3>
        <p className="text-gray-600 text-lg">Tu respuesta fue registrada de forma anónima.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      {/* 1. eNPS Question */}
      <div className="space-y-6">
        <label className="block text-xl font-bold text-gray-900 tracking-tight leading-tight">
          ¿Con qué probabilidad recomendarías la empresa como un buen lugar para trabajar a alguien cercano?
        </label>

        {/* Container optimized to fit all 11 buttons on one line even on small screens */}
        <div className="relative pt-2 pb-6 px-1 overflow-x-visible">
          <div className="flex justify-between items-center gap-1 sm:gap-2">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
              const isSelected = score === num;
              let activeClass = '';
              
              if (isSelected) {
                if (num <= 6) activeClass = 'bg-red-500 text-white shadow-lg shadow-red-200 scale-125 ring-2 ring-red-500 ring-offset-2 z-10';
                else if (num <= 8) activeClass = 'bg-amber-400 text-amber-950 shadow-lg shadow-amber-100 scale-125 ring-2 ring-amber-400 ring-offset-2 z-10';
                else activeClass = 'bg-emerald-500 text-white shadow-lg shadow-emerald-200 scale-125 ring-2 ring-emerald-500 ring-offset-2 z-10';
              }

              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => {
                    setScore(num);
                    setError(null);
                  }}
                  className={`flex-1 min-w-0 h-8 sm:h-12 rounded-lg sm:rounded-xl text-[10px] sm:text-base font-bold transition-all duration-300 ease-out flex items-center justify-center
                    ${isSelected 
                      ? activeClass 
                      : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-[#019DF4] hover:scale-105 active:scale-95 border border-gray-100'
                    }
                  `}
                >
                  {num}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between text-xs font-semibold uppercase tracking-widest text-gray-400 px-1 mt-1">
          <span>0 - Nada probable</span>
          <span>10 - Muy probable</span>
        </div>
      </div>

      {/* 2. Negative Feedback Question */}
      <div className="space-y-4">
        <label htmlFor="negativeFeedback" className="block text-xl font-bold text-gray-900 tracking-tight">
          ¿Qué es lo que más afecta negativamente tu experiencia laboral hoy?
        </label>
        <div className="relative group">
          <textarea
            id="negativeFeedback"
            rows={4}
            value={negativeFeedback}
            onChange={(e) => setNegativeFeedback(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 bg-gray-50/30 focus:bg-white focus:border-[#019DF4] focus:ring-4 focus:ring-blue-50 transition-all duration-300 outline-none resize-none text-gray-700 leading-relaxed placeholder:text-gray-400"
            placeholder="Escribe tus comentarios de forma honesta..."
          />
          <div className="absolute right-4 bottom-4 text-[10px] font-bold text-gray-300 uppercase tracking-widest">Opcional</div>
        </div>
      </div>

      {/* 3. Improvement Question */}
      <div className="space-y-4">
        <label htmlFor="improvement" className="block text-xl font-bold text-gray-900 tracking-tight">
          Si pudieras cambiar una sola cosa en la empresa mañana, ¿qué cambiarías?
        </label>
        <div className="relative group">
          <textarea
            id="improvement"
            rows={4}
            value={improvement}
            onChange={(e) => setImprovement(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 bg-gray-50/30 focus:bg-white focus:border-[#019DF4] focus:ring-4 focus:ring-blue-50 transition-all duration-300 outline-none resize-none text-gray-700 leading-relaxed placeholder:text-gray-400"
            placeholder="Danos una idea para mejorar el día a día..."
          />
          <div className="absolute right-4 bottom-4 text-[10px] font-bold text-gray-300 uppercase tracking-widest">Opcional</div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium border border-red-100 animate-pulse">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || score === null}
        className="group relative w-full overflow-hidden py-5 px-8 bg-[#019DF4] text-white rounded-2xl font-black text-lg transition-all duration-500 hover:bg-[#015494] disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed shadow-xl shadow-blue-200 hover:shadow-2xl active:scale-[0.98]"
      >
        <div className="relative flex items-center justify-center space-x-2">
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin h-5 w-5" />
              <span className="tracking-tight">Enviando respuesta...</span>
            </>
          ) : (
            <>
              <span className="tracking-tight">Enviar</span>
              <CheckCircle2 className="h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </>
          )}
        </div>
      </button>
    </form>
  );
}
