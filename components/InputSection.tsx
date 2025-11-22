import React from 'react';
import { Terminal, Zap } from 'lucide-react';
import { AllocatorMode, FinancialState } from '../types';

interface InputSectionProps {
  data: FinancialState;
  onChange: (newData: Partial<FinancialState>) => void;
  onCalculate: () => void;
}

const InputSection: React.FC<InputSectionProps> = ({ data, onChange, onCalculate }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value === '' ? 0 : parseFloat(value) });
  };

  const handleModeChange = (mode: AllocatorMode) => {
    // Reset override when mode changes to give the user the default experience first
    onChange({ mode, investPercentOverride: null });
  };

  return (
    <section className="glass-panel bg-slate-800/70 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl shadow-neon/10 transition-all duration-500">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-200">
        <Terminal className="text-neon" />
        INPUT DATA (Jujur woii!)
      </h2>

      <div className="space-y-6">
        {/* Income */}
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2 uppercase tracking-wider">
            Pemasukan Bersih (Gaji + Sampingan)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-3.5 text-slate-500 font-mono">Rp</span>
            <input
              type="number"
              name="income"
              value={data.income || ''}
              onChange={handleInputChange}
              placeholder="0"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 pl-12 pr-4 text-white font-mono text-lg focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-colors placeholder-slate-600"
            />
          </div>
        </div>

        {/* Fixed Cost */}
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2 uppercase tracking-wider flex justify-between">
            <span>Pengeluaran Wajib (Fixed Cost)</span>
            <span className="text-xs text-slate-500 lowercase italic">*kos, cicilan, listrik, makan pokok</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-3.5 text-slate-500 font-mono">Rp</span>
            <input
              type="number"
              name="fixedCost"
              value={data.fixedCost || ''}
              onChange={handleInputChange}
              placeholder="0"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 pl-12 pr-4 text-white font-mono text-lg focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-colors placeholder-slate-600"
            />
          </div>
        </div>

        {/* Mode Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-3 uppercase tracking-wider">
            Pilih Level Penderitaan
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { id: AllocatorMode.SANTAI, label: 'SANTAI', desc: 'Invest 10%\nDarurat 5%', color: 'text-neon' },
              { id: AllocatorMode.NORMAL, label: 'NORMAL', desc: 'Invest 20%\nDarurat 10%', color: 'text-neon' },
              { id: AllocatorMode.HARDCORE, label: 'SIKSA GW', desc: 'Invest 40%\nDarurat 10%', color: 'text-red-500' },
            ].map((m) => (
              <label key={m.id} className="cursor-pointer relative group">
                <input
                  type="radio"
                  name="mode"
                  value={m.id}
                  checked={data.mode === m.id}
                  onChange={() => handleModeChange(m.id)}
                  className="peer sr-only"
                />
                <div className="p-4 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-750 transition-all peer-checked:border-neon peer-checked:bg-neon/10 text-center h-full">
                  <div className={`${m.color} font-bold mb-1 uppercase`}>{m.label}</div>
                  <div className="text-xs text-slate-400 whitespace-pre-line">{m.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={onCalculate}
          className="w-full bg-neon text-slate-950 font-bold py-4 rounded-lg text-lg hover:bg-lime-300 hover:scale-[1.01] transition-all shadow-[0_0_20px_rgba(57,255,20,0.4)] flex items-center justify-center gap-2"
        >
          HAJAR! <Zap size={20} />
        </button>
      </div>
    </section>
  );
};

export default InputSection;