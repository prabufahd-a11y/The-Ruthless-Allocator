export const formatIDR = (number: number): string => {
  return new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR', 
    maximumFractionDigits: 0 
  }).format(number);
};

export const calculateFutureValue = (monthlyInvest: number, years: number = 5, annualReturn: number = 0.08): number => {
  const r = annualReturn / 12;
  const n = years * 12;
  
  if (monthlyInvest <= 0) return 0;
  
  // FV = P * (((1 + r)^n - 1) / r) * (1 + r)
  // Assuming deposits made at beginning of period
  return monthlyInvest * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
};

export const getRuthlessAdvice = (dailySpending: number, isDanger: boolean): string => {
  if (isDanger) {
    return `DARURAT! GAYA HIDUP LU KETINGGIAN! Opsi lu cuma dua: 1. Cari kerjaan sampingan SEKARANG. 2. Jual barang-barang lu yg ga guna. Jangan harap bisa invest kalau utang numpuk.`;
  }
  
  if (dailySpending < 20000) {
    return `Sisa duit lu cuma ${formatIDR(dailySpending)} sehari. Fix makan warteg atau masak mie instan. Jangan gaya-gayaan ngopi di cafe, lu belum mampu.`;
  } else if (dailySpending < 50000) {
    return "Not bad. Cukup buat makan layak 3x sehari, tapi weekend mending rebahan di rumah nonton Netflix. Jangan foya-foya.";
  } else if (dailySpending < 100000) {
    return "Lumayan longgar. Lu bisa jajan enak sesekali, tapi inget target investasinya jangan dicomot lagi!";
  } else {
    return "Wah, sisa duit lu banyak. Pastiin investasi lu udah maksimal. Kalau sisa segini banyak dan lu ga invest lebih, lu rugi bandar.";
  }
};

export const getSimulationQuote = (fv: number): { text: string; colorClass: string } => {
  if (fv < 10000000) {
    return { text: '"Masih dikit. Naikin lagi persennya kalau berani!"', colorClass: "text-slate-500" };
  } else if (fv < 50000000) {
    return { text: '"Not bad. Bisa buat DP Rumah subsidi atau beli motor cash."', colorClass: "text-neon-dim" };
  } else {
    return { text: '"NAH INI BARU DUIT! Pertahankan 5 tahun, lu bakal berterima kasih sama diri lu yg sekarang."', colorClass: "text-neon font-bold" };
  }
};