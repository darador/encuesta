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
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* 1. eNPS Question */}
      <div className="space-y-4">
        <label className="block text-lg font-medium text-gray-900">
          ¿Con qué probabilidad recomendarías la empresa como un buen lugar para trabajar a alguien cercano?
        </label>
        <div className="flex justify-between items-center gap-1 sm:gap-2 mt-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
            const isSelected = score === num;
            let activeClass = 'bg-blue-600 text-white shadow-md scale-110 ring-2 ring-blue-600 ring-offset-2';
            
            if (isSelected) {
              if (num <= 6) activeClass = 'bg-red-500 text-white shadow-md scale-110 ring-2 ring-red-500 ring-offset-2';
              else if (num <= 8) activeClass = 'bg-yellow-400 text-gray-900 shadow-md scale-110 ring-2 ring-yellow-400 ring-offset-2';
              else activeClass = 'bg-green-500 text-white shadow-md scale-110 ring-2 ring-green-500 ring-offset-2';
            }

            return (
              <button
                key={num}
                type="button"
                onClick={() => {
                  setScore(num);
                  setError(null);
                }}
                className={`flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 rounded-lg text-xs sm:text-base font-semibold transition-all duration-200 flex items-center justify-center
                  ${isSelected ? activeClass : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'}
                `}
              >
                {num}
              </button>
            );
          })}
        </div>
        <div className="flex justify-between text-[10px] sm:text-xs text-gray-500 px-1 mt-1">
          <span>0 - Nada probable</span>
          <span>10 - Muy probable</span>
        </div>
      </div>

      {/* 2. Negative Feedback Question */}
      <div className="space-y-3">
        <label htmlFor="negativeFeedback" className="block text-lg font-medium text-gray-900">
          ¿Qué es lo que más afecta negativamente tu experiencia laboral hoy?
        </label>
        <p className="text-sm text-gray-500">Opcional</p>
        <textarea
          id="negativeFeedback"
          rows={4}
          value={negativeFeedback}
          onChange={(e) => setNegativeFeedback(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 outline-none resize-none"
          placeholder="Escribe tus comentarios aquí..."
        />
      </div>

      {/* 3. Improvement Question */}
      <div className="space-y-3">
        <label htmlFor="improvement" className="block text-lg font-medium text-gray-900">
          Si pudieras cambiar una sola cosa en la empresa mañana, ¿qué cambiarías?
        </label>
        <p className="text-sm text-gray-500">Opcional</p>
        <textarea
          id="improvement"
          rows={4}
          value={improvement}
          onChange={(e) => setImprovement(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 outline-none resize-none"
          placeholder="Escribe tus ideas de mejora aquí..."
        />
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || score === null}
        className="w-full py-4 px-6 bg-gray-900 hover:bg-black text-white rounded-xl font-medium text-lg transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin mr-2 h-5 w-5" />
            Enviando...
          </>
        ) : (
          'Enviar respuesta'
        )}
      </button>
    </form>
  );
}
