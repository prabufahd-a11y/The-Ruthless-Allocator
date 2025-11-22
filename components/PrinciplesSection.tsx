import React from 'react';
import { Layers, ShieldAlert, Hourglass } from 'lucide-react';

const PrinciplesSection: React.FC = () => {
  return (
    <section className="mt-16 border-t border-slate-800 pt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Prinsip Investasi (Biar Gak Boncos)</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 hover:border-neon/50 transition-colors group">
          <div className="mb-3 text-slate-600 group-hover:text-neon transition-colors">
            <Layers size={32} />
          </div>
          <h3 className="font-bold text-white mb-2">Jangan Taruh Telur Sebasket</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Namanya <strong>Diversifikasi</strong>. Jangan all-in di satu saham atau crypto. Kalau jatuh, pecah semua. Sebar duit lu: Saham, Reksadana, Emas.
          </p>
        </div>
        {/* Card 2 */}
        <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 hover:border-amber-500/50 transition-colors group">
          <div className="mb-3 text-slate-600 group-hover:text-amber-500 transition-colors">
            <ShieldAlert size={32} />
          </div>
          <h3 className="font-bold text-white mb-2">Dana Darurat itu WAJIB</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Sebelum lu sok-sokan invest saham gorengan, pastiin lu punya duit nganggur minimal <strong>3-6x pengeluaran bulanan</strong>. Buat jaga-jaga kalau di-PHK.
          </p>
        </div>
        {/* Card 3 */}
        <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 hover:border-blue-500/50 transition-colors group">
          <div className="mb-3 text-slate-600 group-hover:text-blue-500 transition-colors">
            <Hourglass size={32} />
          </div>
          <h3 className="font-bold text-white mb-2">Konsisten {'>'} Nominal</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Invest 100rb tiap bulan tapi rutin (DCA) itu jauh lebih sakti daripada invest 10 juta sekali doang terus lupa. <i>Time in the market beats timing the market.</i>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrinciplesSection;