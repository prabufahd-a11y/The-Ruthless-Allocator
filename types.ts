export enum AllocatorMode {
  SANTAI = 'santai',
  NORMAL = 'normal',
  HARDCORE = 'hardcore'
}

export interface FinancialState {
  income: number;
  fixedCost: number;
  mode: AllocatorMode;
  investPercentOverride: number | null;
}

export interface CalculationResult {
  investAmount: number;
  emergencyAmount: number;
  spendingAmount: number;
  dailySpending: number;
  isDanger: boolean;
  investPercent: number;
  emergencyPercent: number;
}
