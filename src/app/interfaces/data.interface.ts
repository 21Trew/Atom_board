export interface DailyData {
  date: string;
  values: number[];
}

export interface StorageData {
  dailyRecords: DailyData[];
}
