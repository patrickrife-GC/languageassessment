'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { LanguageData } from '@/types';
import { formatPercentage } from '@/lib/utils/demographics';

interface LanguageChartProps {
  languages: LanguageData[];
  maxLanguages?: number;
}

const COLORS = [
  '#0066CC', // Convey Blue
  '#3B82F6',
  '#60A5FA',
  '#93C5FD',
  '#BFDBFE',
];

export default function LanguageChart({ languages, maxLanguages = 5 }: LanguageChartProps) {
  const chartData = languages.slice(0, maxLanguages).map((lang) => ({
    name: lang.language,
    percentage: lang.percentage,
    speakers: lang.speakers,
  }));

  return (
    <div className="w-full h-80 md:h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" unit="%" />
          <YAxis dataKey="name" type="category" width={70} />
          <Tooltip
            formatter={(value: number, name: string, props: any) => {
              if (name === 'percentage') {
                return [formatPercentage(value), `${props.payload.speakers.toLocaleString()} speakers`];
              }
              return value;
            }}
            labelStyle={{ color: '#1a1a1a' }}
          />
          <Bar dataKey="percentage" radius={[0, 8, 8, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
