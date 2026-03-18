import { MessageSquareWarning, Lightbulb } from 'lucide-react';

interface FeedbackListProps {
  responses: any[];
}

export function FeedbackList({ responses }: FeedbackListProps) {
  const withNegative = responses.filter(r => r.negative_feedback?.trim());
  const withImprovement = responses.filter(r => r.improvement?.trim());

  if (withNegative.length === 0 && withImprovement.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Negative Feedback Section */}
      {withNegative.length > 0 && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-100">
            <div className="p-2 bg-red-50 text-red-500 rounded-lg">
              <MessageSquareWarning size={20} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Comentarios Negativos</h2>
            <span className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full text-sm font-medium">
              {withNegative.length}
            </span>
          </div>
          
          <div className="space-y-4">
            {withNegative.map((response) => (
              <div key={response.id} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-gray-700 whitespace-pre-wrap">{response.negative_feedback}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                  <span>Score dado: {response.score}</span>
                  <span>{new Date(response.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Improvement Suggestions Section */}
      {withImprovement.length > 0 && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-100">
            <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg">
              <Lightbulb size={20} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Ideas de Mejora</h2>
            <span className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full text-sm font-medium">
              {withImprovement.length}
            </span>
          </div>
          
          <div className="space-y-4">
            {withImprovement.map((response) => (
              <div key={response.id} className="p-4 rounded-xl bg-yellow-50/50 border border-yellow-100/50">
                <p className="text-gray-800 whitespace-pre-wrap">{response.improvement}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                  <span>Score dado: {response.score}</span>
                  <span>{new Date(response.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
