import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChartDataInput, Period, StoredData, CategoryData } from '../interfaces/chart.interface';
import { EXPENSE_CATEGORIES, CATEGORY_COLORS } from '../constants/categories';
import { PIE_CHART_DATA } from '../components/charts/pie-chart/pie-chart.config';
import { LINE_CHART_DATA } from '../components/charts/line-chart/line-chart.config';
import { BAR_CHART_DATA } from '../components/charts/bar-chart/bar-chart.config';
import { ChartConfiguration } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {
  private readonly STORAGE_KEY = 'chart_data';
  private currentPeriod: Period = 'daily';

  private lineChartData = new BehaviorSubject<ChartConfiguration['data']>(LINE_CHART_DATA);
  private barChartData = new BehaviorSubject<ChartConfiguration['data']>(BAR_CHART_DATA);
  private pieChartData = new BehaviorSubject<ChartConfiguration['data']>(PIE_CHART_DATA);

  lineChartData$ = this.lineChartData.asObservable();
  barChartData$ = this.barChartData.asObservable();
  pieChartData$ = this.pieChartData.asObservable();

  constructor() {
    this.loadFromStorage();
  }

  addData(newData: ChartDataInput): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    const data: StoredData[] = stored ? JSON.parse(stored) : [];

    const dataToAdd: StoredData = {
      ...newData,
      time: newData.time || '23:00'
    };

    const existingData = data.find(
      item =>
        item.date === dataToAdd.date &&
        item.category === dataToAdd.category &&
        item.time === dataToAdd.time
    );

    if (existingData) {
      // Если запись существует, обновляем её значение (не добавляем к существующему)
      existingData.value = dataToAdd.value;
    } else {
      // Если записи нет, добавляем новую
      data.push(dataToAdd);
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    this.updateCharts(data);
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      const data: StoredData[] = JSON.parse(stored);
      this.updateCharts(data);
    }
  }

  public aggregateByTime(data: StoredData[]): { labels: string[], values: number[] } {
    const timeMap = new Map<string, number>();
    const today = new Date().toISOString().split('T')[0];

    data.forEach(item => {
      if (item.date === today && item.time) {
        const hour = parseInt(item.time.split(':')[0]);
        const key = `${hour}:00`;
        timeMap.set(key, (timeMap.get(key) || 0) + item.value);
      }
    });

    const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    return {
      labels: hours,
      values: hours.map(hour => timeMap.get(hour) || 0)
    };
  }

  public aggregateByWeek(data: StoredData[]): { labels: string[], values: number[] } {
    const weekDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    const dayMap = new Map<string, number>();

    // Инициализируем все дни недели нулями
    weekDays.forEach(day => dayMap.set(day, 0));

    // Получаем границы текущей недели
    const now = new Date();
    const monday = new Date(now);
    monday.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1));
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    // Группируем данные по дням недели
    data.forEach(item => {
      const itemDate = new Date(item.date);
      if (itemDate >= monday && itemDate <= sunday) {
        const dayIndex = itemDate.getDay();
        const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1;
        const dayName = weekDays[adjustedIndex];
        dayMap.set(dayName, (dayMap.get(dayName) || 0) + item.value);
      }
    });

    return {
      labels: weekDays,
      values: weekDays.map(day => dayMap.get(day) || 0)
    };
  }

  public aggregateByMonth(data: StoredData[]): { labels: string[], values: number[] } {
    const dayMap = new Map<number, number>();
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    // Группируем данные по дням месяца
    data.forEach(item => {
      const itemDate = new Date(item.date);
      if (itemDate >= startOfMonth && itemDate <= endOfMonth) {
        const day = itemDate.getDate();
        dayMap.set(day, (dayMap.get(day) || 0) + item.value);
      }
    });

    const daysInMonth = endOfMonth.getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return {
      labels: days.map(day => `${day}`),
      values: days.map(day => dayMap.get(day) || 0)
    };
  }

  private aggregateByCategory(data: StoredData[]): CategoryData {
    return data.reduce((acc: CategoryData, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.value;
      return acc;
    }, {});
  }

  private updateCharts(data: StoredData[]): void {
    let chartData;

    switch (this.currentPeriod) {
      case 'daily':
        chartData = this.aggregateByTime(data);
        break;
      case 'weekly':
        chartData = this.aggregateByWeek(data);
        break;
      case 'monthly':
        chartData = this.aggregateByMonth(data);
        break;
      default:
        chartData = { labels: [], values: [] };
    }

    this.updateLineChart(chartData);
    this.updateBarChart(chartData);
    this.updatePieChart(data);
  }

  private updateLineChart(chartData: { labels: string[], values: number[] }): void {
    this.lineChartData.next({
      labels: chartData.labels,
      datasets: [{
        ...LINE_CHART_DATA.datasets[0],
        data: chartData.values
      }]
    });
  }

  private updateBarChart(chartData: { labels: string[], values: number[] }): void {
    this.barChartData.next({
      labels: chartData.labels,
      datasets: [{
        ...BAR_CHART_DATA.datasets[0],
        data: chartData.values
      }]
    });
  }

  private updatePieChart(data: StoredData[]): void {
    const filteredData = this.filterDataByPeriod(data);
    const categoryData = this.aggregateByCategory(filteredData);
    const labels = [...EXPENSE_CATEGORIES];

    this.pieChartData.next({
      labels: labels,
      datasets: [{
        data: labels.map(category => categoryData[category] || 0),
        backgroundColor: labels.map(category => CATEGORY_COLORS[category])
      }]
    });
  }

  private filterDataByPeriod(data: StoredData[]): StoredData[] {
    const now = new Date();

    switch (this.currentPeriod) {
      case 'daily':
        const today = now.toISOString().split('T')[0];
        return data.filter(item => item.date === today);

      case 'weekly':
        const monday = new Date(now);
        monday.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1));
        monday.setHours(0, 0, 0, 0);
        return data.filter(item => new Date(item.date) >= monday);

      case 'monthly':
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        return data.filter(item => new Date(item.date) >= startOfMonth);

      default:
        return data;
    }
  }

  updatePeriod(period: Period): void {
    this.currentPeriod = period;
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      const data: StoredData[] = JSON.parse(stored);
      this.updateCharts(data);
    }
  }

}
