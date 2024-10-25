import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ChartData, FilteredData, Period } from '../interfaces/chart.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private mockData: ChartData[] = this.generateMockData();

  getData(period: Period): Observable<FilteredData> {
    const filteredData = this.filterDataByPeriod(period);
    return of(filteredData);
  }

  private generateMockData(): ChartData[] {
    const data: ChartData[] = [];
    const startDate = new Date(2023, 0, 1); // 1 января 2023

    for (let i = 0; i < 365; i++) {
      data.push({
        date: new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000),
        value: Math.floor(Math.random() * 100)
      });
    }

    return data;
  }

  private filterDataByPeriod(period: Period): FilteredData {
    let filteredValues: number[];

    switch (period) {
      case 'daily':
        filteredValues = this.mockData.slice(-24).map(item => item.value);
        break;
      case 'weekly':
        filteredValues = this.mockData.slice(-7).map(item => item.value);
        break;
      case 'monthly':
        const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
        filteredValues = this.mockData.slice(-daysInMonth).map(item => item.value);
        break;
      default:
        filteredValues = this.mockData.slice(-30).map(item => item.value);
    }

    return {
      lineData: filteredValues,
      barData: filteredValues, // Для столбчатой диаграммы берем последние 10 значений
      pieData: filteredValues   // Для круговой диаграммы берем последние 5 значений
    };
  }

  private aggregateByWeeks(data: ChartData[]): number[] {
    const weeks: number[] = [];
    let currentWeek: number[] = [];

    data.forEach((item, index) => {
      currentWeek.push(item.value);
      if ((index + 1) % 7 === 0 || index === data.length - 1) {
        weeks.push(this.calculateAverage(currentWeek));
        currentWeek = [];
      }
    });

    return weeks;
  }

  private aggregateByMonths(data: ChartData[]): number[] {
    const months: { [key: string]: number[] } = {};

    data.forEach(item => {
      const monthKey = `${item.date.getFullYear()}-${item.date.getMonth()}`;
      if (!months[monthKey]) {
        months[monthKey] = [];
      }
      months[monthKey].push(item.value);
    });

    return Object.values(months).map(values => this.calculateAverage(values));
  }

  private calculateAverage(values: number[]): number {
    return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
  }
}
