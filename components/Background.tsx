import React from 'react';
import { TrendingUp, Coins, Target } from 'lucide-react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-10">
      {/* Chart lines using SVG */}
      <svg className="absolute top-20 left-0 w-full h-96 text-neon" fill="none" stroke="currentColor" viewBox="0 0 1000 200" preserveAspectRatio="none">
        <path strokeWidth="2" d="M0,150 C100,100 200,180 300,80 C400,120 500,40 600,100 C700,160 800,20 900,60 L1000,10" />
      </svg>
      <svg className="absolute bottom-0 right-0 w-2/3 h-64 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 1000 200" preserveAspectRatio="none">
        <path strokeWidth="2" d="M0,200 C150,180 250,100 400,150 C500,80 600,120 700,50 C800,90 900,20 1000,0" />
      </svg>
      
      {/* Floating Symbols */}
      <div className="absolute top-1/4 left-10 text-slate-700 animate-float">
        <TrendingUp size={64} />
      </div>
      <div className="absolute bottom-1/3 right-10 text-slate-700 animate-float" style={{ animationDelay: '1s' }}>
        <Coins size={96} />
      </div>
      <div className="absolute top-10 right-1/4 text-slate-700 animate-float" style={{ animationDelay: '2s' }}>
        <Target size={48} />
      </div>
    </div>
  );
};

export default Background;