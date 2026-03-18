'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ScoreChartProps {
  responses: any[];
}

export function ScoreChart({ responses }: ScoreChartProps) {
  // Count frequency of scores from 0 to 10
  const scoreCounts = Array(11).fill(0);
  responses.forEach(r => {
    if (r.score >= 0 && r.score <= 10) {
      scoreCounts[r.score]++;
    }
  });

  const data = scoreCounts.map((count, index) => {
    // Determine category and color based on index
    let category = 'Detractor';
    let fill = '#f43f5e'; // rose-500
    if (index >= 9) {
      category = 'Promotor';
      fill = '#10b981'; // emerald-500
    } else if (index >= 7) {
      category = 'Pasivo';
      fill = '#f59e0b'; // amber-500
    }

    return {
      score: index.toString(),
      count,
      category,
      fill
    };
  });

  if (responses.length === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center text-gray-300 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-100 italic">
        <p>Aún no hay respuestas para mostrar</p>
      </div>
    );
  }

  return (
    <div className="h-72 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
          <XAxis 
            dataKey="score" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
            dy={10}
          />
          <YAxis 
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
          />
          <Tooltip 
            cursor={{ fill: '#f1f5f9', radius: 8 }}
            contentStyle={{ 
              borderRadius: '1rem', 
              border: 'none', 
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
              padding: '12px'
            }}
            itemStyle={{ fontWeight: 800, fontSize: '14px' }}
            formatter={(value: any) => [value, 'Votos']}
            labelFormatter={(label) => `Puntuación: ${label}`}
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={32}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.fill} 
                fillOpacity={0.9}
                className="hover:fill-opacity-100 transition-opacity duration-300"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

