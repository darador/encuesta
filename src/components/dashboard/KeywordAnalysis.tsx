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
     'eso', 'estoy', 'también', 'nada', 'hasta', 'sobre', 'poco', 'tiene', 'donde', 'hacia', 'tenemos', 'puedo', 'pueden'
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

  // Sort and pick top 12
  const topWords = Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .filter(([_, count]) => count >= 1) 
    .slice(0, 12);

  if (topWords.length === 0) {
    return (
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center space-y-4">
        <div className="p-4 bg-gray-50 text-gray-300 rounded-full">
          <Hash size={32} />
        </div>
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-relaxed">No hay suficientes datos<br/>para análisis de temas</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-5 rotate-12 transition-transform duration-700 group-hover:rotate-45">
        <Hash size={64} />
      </div>
      
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-2 bg-blue-50 text-[#019DF4] rounded-xl">
          <Hash size={20} />
        </div>
        <h3 className="text-xl font-black text-gray-900 tracking-tight">Temas Recurrentes</h3>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {topWords.map(([word, count]) => (
          <div 
            key={word} 
            className="group flex items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 py-2 hover:bg-[#019DF4] hover:text-white hover:border-[#019DF4] transition-all duration-300 cursor-default"
          >
            <span className="font-bold text-gray-600 group-hover:text-white capitalize text-sm">{word}</span>
            <div className="ml-3 text-[10px] font-black bg-white text-gray-400 group-hover:bg-[#015494] group-hover:text-white px-2 py-0.5 rounded-lg border border-gray-100 group-hover:border-transparent transition-colors">
              {count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
