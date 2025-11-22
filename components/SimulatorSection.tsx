import React, { useMemo } from 'react';
import { FlaskConical } from 'lucide-react';
import { formatIDR, calculateFutureValue, getSimulationQuote } from '../utils/helpers';

interface SimulatorSectionProps {
  income: number;
  investAmount: number;
  currentPercent: number;
  onSliderChange: (percent: number) => void;
}

const SimulatorSection: React.FC<SimulatorSectionProps> = ({ income, investAmount, currentPercent, onSliderChange }) => {
  
  const futureValue = useMemo(() => {
    return calculateFutureValue(investAmount, 5, 0.08);
  }, [investAmount]);

  const quote = useMemo(() => getSimulationQuote(futureValue), [futureValue]);

  return (
    <div className="glass-panel bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 md:p-8 mt-8 border border-white/10">
      <h3 className="text-xl font-bold mb-4 text-white flex items-center">
        <FlaskConical className="text-purple-500 mr-2" />
        Simulator Masa Depan
      </h3>
      <p className="text-slate-400 text-sm mb-6">
        Geser slider buat liat efek "menyiksa diri" sekarang demi masa depan.
      </p>

      <div className="mb-8">
        <div className="flex justify-between mb-2 font-mono text-sm">
          <span>Investasi: <span className="text-neon">{currentPercent}%</span></span>
          <span className="text-slate-400">{formatIDR(investAmount)}</span>
        </div>
        <input
          type="range"
          min="5"
          max="70"
          value={currentPercent}
          onChange={(e) => onSliderChange(parseInt(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-neon"
        />
        <div className="flex justify-between text-xs text-slate-600 mt-2 font-mono">
          <span>Pelit</span>
          <span>Wajar</span>
          <span>CRAZY RICH</span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 rounded-lg border border-slate-700 text-center">
        <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">Proyeksi 5 Tahun (Return 8%)</p>
        <div className="text-3xl md:text-4xl font-mono font-bold text-white mb-3">
          {formatIDR(futureValue)}
        </div>
        <p className={`text-sm italic ${quote.colorClass}`}>
          {quote.text}
        </p>
      </div>
    </div>
  );
};

export default SimulatorSection;