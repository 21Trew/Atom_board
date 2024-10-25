export interface ChartData {
  date: Date;
  value: number;
}

export interface FilteredData {
  lineData: number[];
  barData: number[];
  pieData: number[];
}

export type Period = 'daily' | 'weekly' | 'monthly';
