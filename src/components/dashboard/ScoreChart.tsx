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
    let fill = '#ef4444'; // red-500
    if (index >= 9) {
      category = 'Promotor';
      fill = '#22c55e'; // green-500
    } else if (index >= 7) {
      category = 'Pasivo';
      fill = '#eab308'; // yellow-500
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
      <div className="h-64 flex items-center justify-center text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
        No hay datos suficientes
      </div>
    );
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <XAxis 
            dataKey="score" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 12 }}
          />
          <Tooltip 
            cursor={{ fill: '#f3f4f6' }}
            contentStyle={{ borderRadius: '0.75rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            formatter={(value: any) => [value, 'Respuestas']}
            labelFormatter={(label) => `Puntuación: ${label}`}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
