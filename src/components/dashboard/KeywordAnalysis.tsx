import { Hash } from 'lucide-react';

interface KeywordAnalysisProps {
  responses: any[];
}

export function KeywordAnalysis({ responses }: KeywordAnalysisProps) {
  // Common stop words in Spanish to filter out
  const stopWords = new Set([
     'que', 'de', 'la', 'el', 'en', 'y', 'a', 'los', 'se', 'del', 'las', 'un',
     'por', 'con', 'no', 'una', 'su', 'para', 'es', 'como', 'más', 'pero', 'al',
     'lo', 'o', 'este', 'ya', 'muy', 'nos', 'todo', 'está', 'sus', 'me', 'porque',
     'son', 'sin', 'hay', 'hacer', 'bien', 'si', 'te', 'esta', 'le', 'cuando', 'mi',
     'eso', 'estoy', 'también', 'nada', 'hasta', 'sobre', 'poco', 'tiene', 'donde'
  ]);

  const wordCounts: Record<string, number> = {};

  responses.forEach(r => {
    const text = `${r.negative_feedback || ''} ${r.improvement || ''}`.toLowerCase();
    
    // Extract words
    const words = text.match(/\b\w+\b/g) || [];
    
    words.forEach(word => {
      // Filter out numbers and short words and stop words
      if (word.length > 3 && !stopWords.has(word) && isNaN(Number(word))) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    });
  });

  // Sort and pick top 10
  const topWords = Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .filter(([_, count]) => count > 1) // Only show words appearing more than once
    .slice(0, 10);

  if (topWords.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Temas Recurrentes</h3>
        <p className="text-sm text-gray-500">No hay suficientes datos de texto para analizar temas recurrentes.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center space-x-2 mb-6">
        <Hash size={20} className="text-indigo-500" />
        <h3 className="text-lg font-semibold text-gray-900">Temas Recurrentes</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {topWords.map(([word, count]) => (
          <div 
            key={word} 
            className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 text-sm"
          >
            <span className="font-medium text-gray-700 capitalize">{word}</span>
            <span className="ml-2 text-xs text-gray-400 bg-white px-1.5 py-0.5 rounded-full border border-gray-100">
              {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
