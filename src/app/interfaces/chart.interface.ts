import { ExpenseCategory } from '../constants/categories';

export interface StoredData {
  date: string;
  time?: string;
  category: ExpenseCategory;
  value: number;
}

export interface ChartDataInput {
  date: string;
  time?: string;
  category: ExpenseCategory;
  value: number | undefined;
}

export type Period = 'daily' | 'weekly' | 'monthly';

export interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    label?: string;
    backgroundColor?: string | string[];
    borderColor?: string;
    borderWidth?: number;
  }[];
}

export interface CategoryData {
  [key: string]: number;
}
