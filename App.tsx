import React, { useState, useEffect, useRef } from 'react';
import { AllocatorMode, FinancialState, CalculationResult } from './types';
import Background from './components/Background';
import InputSection from './components/InputSection';
import ResultSection from './components/ResultSection';
import SimulatorSection from './components/SimulatorSection';
import PrinciplesSection from './components/PrinciplesSection';

const App: React.FC = () => {
  const [formData, setFormData] = useState<FinancialState>({
    income: 0,
    fixedCost: 0,
    mode: AllocatorMode.NORMAL,
    investPercentOverride: null
  });

  const [result, setResult] = useState<CalculationResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Calculate derived values based on state
  const calculateResult = () => {
    const { income, fixedCost, mode, investPercentOverride } = formData;

    if (income <= 0) {
      alert("Isi pemasukannya woy! Mana bisa ngatur duit kalau 0.");
      return;
    }

    let investPct = 0.20;
    let emergencyPct = 0.10;

    if (mode === AllocatorMode.SANTAI) {
      investPct = 0.10;
      emergencyPct = 0.05;
    } else if (mode === AllocatorMode.HARDCORE) {
      investPct = 0.40;
      emergencyPct = 0.10;
    }

    // Override invest percent if slider is used
    if (investPercentOverride !== null) {
      investPct = investPercentOverride / 100;
    }

    const investAmount = income * investPct;
    const emergencyAmount = income * emergencyPct;
    const spendingAmount = income - investAmount - emergencyAmount - fixedCost;
    const dailySpending = spendingAmount > 0 ? spendingAmount / 30 : 0;

    setResult({
      investAmount,
      emergencyAmount,
      spendingAmount,
      dailySpending,
      isDanger: spendingAmount < 0,
      investPercent: Math.round(investPct * 100),
      emergencyPercent: Math.round(emergencyPct * 100)
    });
  };

  // Scroll to results when calculation is first done
  const handleCalculate = () => {
    calculateResult();
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleFormChange = (newData: Partial<FinancialState>) => {
    setFormData(prev => {
      const updated = { ...prev, ...newData };
      return updated;
    });
  };

  // Live update if results are already shown and user changes slider
  const handleSliderChange = (percent: number) => {
    setFormData(prev => {
      const updated = { ...prev, investPercentOverride: percent };
      return updated;
    });
  };
  
  // Effect to re-calculate when slider moves (if results exist)
  useEffect(() => {
    if (result && formData.investPercentOverride !== null) {
      calculateResult();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.investPercentOverride]);

  return (
    <div className="relative min-h-screen font-sans text-slate-200 selection:bg-neon selection:text-black pb-20">
      <Background />
      
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-10 md:py-16">
        
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-block border border-neon px-3 py-1 rounded text-xs font-mono text-neon mb-4 tracking-widest uppercase bg-neon/5">
            Financial Reality Check
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-2">
            THE RUTHLESS <span className="text-neon">ALLOCATOR</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl">
            Stop ngeluh gaji numpang lewat. Atur atau hancur.
          </p>
        </header>

        <InputSection 
          data={formData} 
          onChange={handleFormChange} 
          onCalculate={handleCalculate} 
        />

        <div ref={resultRef} className="scroll-mt-10">
          {result && (
            <>
              <div className="mt-12">
                <ResultSection result={result} fixedCost={formData.fixedCost} />
              </div>
              <SimulatorSection 
                income={formData.income} 
                investAmount={result.investAmount} 
                currentPercent={result.investPercent}
                onSliderChange={handleSliderChange}
              />
            </>
          )}
        </div>

        <PrinciplesSection />

        <footer className="text-center mt-20 text-slate-600 text-sm font-mono">
          <p>The Ruthless Allocator © 2025</p>
          <p className="text-xs mt-2">Not financial advice. Just common sense.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;