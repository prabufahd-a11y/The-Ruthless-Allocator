import React, { useMemo } from 'react';
import { CalculationResult } from '../types';
import { formatIDR, getRuthlessAdvice } from '../utils/helpers';
import { Banknote, AlertTriangle, Bot } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface ResultSectionProps {
  result: CalculationResult;
  fixedCost: number;
}

const ResultSection: React.FC<ResultSectionProps> = ({ result, fixedCost }) => {
  const advice = getRuthlessAdvice(result.dailySpending, result.isDanger);

  const chartData = useMemo(() => {
    // Determine display value for Spending (0 if negative for chart purposes)
    const safeSpending = result.spendingAmount > 0 ? result.spendingAmount : 0;
    return [
      { name: 'Investasi', value: result.investAmount, color: '#39ff14' }, // Neon
      { name: 'Dana Darurat', value: result.emergencyAmount, color: '#f59e0b' }, // Amber
      { name: 'Fixed Cost', value: fixedCost, color: '#64748b' }, // Slate
      { name: 'Sisa (Jajan)', value: safeSpending, color: '#3b82f6' }, // Blue
    ].filter(item => item.value > 0);
  }, [result, fixedCost]);

  return (
    <div id="resultSection" className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className={`glass-panel bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 md:p-8 border-l-4 relative overflow-hidden transition-colors duration-300 ${result.isDanger ? 'border-l-red-500' : 'border-l-neon'}`}>
        
        <div className="absolute top-0 right-0 p-4 opacity-10 text-white rotate-12 pointer-events-none">
          <Banknote size={120} />
        </div>

        {/* Main Stats */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-slate-400 text-sm uppercase tracking-widest mb-2">Potong Ini DULU (Wajib!):</h3>
            <div className="flex flex-col items-baseline gap-2 mb-6">
              <span className="text-4xl md:text-5xl font-mono font-bold text-neon">
                {formatIDR(result.investAmount)}
              </span>
              <span className="text-slate-500 text-sm font-mono">/ bulan masukin Reksadana/Saham</span>
            </div>

            <div className="space-y-3 text-sm font-mono">
              <div className="flex justify-between border-b border-slate-700 pb-2">
                <span className="text-amber-500">Dana Darurat</span>
                <span className="text-white">{formatIDR(result.emergencyAmount)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-700 pb-2">
                <span className="text-slate-400">Fixed Cost</span>
                <span className="text-white">{formatIDR(fixedCost)}</span>
              </div>
            </div>
            
            <div className={`mt-6 p-4 rounded-lg border ${result.isDanger ? 'bg-red-900/20 border-red-500/30' : 'bg-slate-900/50 border-slate-700'}`}>
                <div className="flex justify-between items-center mb-2">
                    <span className={`${result.isDanger ? 'text-red-400' : 'text-blue-400'} font-bold`}>Sisa Duit Seneng-Seneng</span>
                    <span className={`text-xl font-mono ${result.isDanger ? 'text-red-500' : 'text-white'}`}>{formatIDR(result.spendingAmount)}</span>
                </div>
                <div className="flex justify-between items-center text-xs md:text-sm">
                    <span className="text-slate-500">Jatah harian lu cuma:</span>
                    <span className="font-mono text-neon">{formatIDR(result.dailySpending)} / hari</span>
                </div>
            </div>
          </div>

          {/* Chart */}
          <div className="h-64 w-full min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(value: number) => formatIDR(value)}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Warning Box */}
        <div className={`mt-8 p-4 border-l-4 text-sm italic flex items-start gap-3 ${result.isDanger ? 'bg-red-900/20 border-red-500 text-red-200 animate-pulse' : 'bg-slate-900 border-neon text-slate-300'}`}>
          {result.isDanger ? <AlertTriangle className="shrink-0 text-red-500" /> : <Bot className="shrink-0 text-neon" />}
          <div>{advice}</div>
        </div>
      </div>
    </div>
  );
};

export default ResultSection;