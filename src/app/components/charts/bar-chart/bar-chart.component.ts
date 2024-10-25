import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartType, BarController, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Period } from '../../../interfaces/chart.interface';
import { BAR_CHART_DATA, BAR_CHART_OPTIONS } from './bar-chart.config';

Chart.register(BarController, BarElement, CategoryScale, LinearScale);

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnChanges {
  @Input() data: number[] = [];
  @Input() period: Period = 'daily';

  barChartData: ChartConfiguration['data'] = BAR_CHART_DATA;
  barChartOptions: ChartConfiguration['options'] = BAR_CHART_OPTIONS;
  chartType: ChartType = 'bar';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['period']) {
      this.updateChart();
    }
  }

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  private updateChart(): void {
    this.barChartData.datasets[0].data = this.data;
    this.barChartData.labels = this.generateLabels();

    if (this.chart) {
      this.chart.update();
    }
  }

  private generateLabels(): string[] {
    switch (this.period) {
      case 'daily':
        return Array.from({ length: 24 }, (_, i) => `${i}:00`);
      case 'weekly':
        return ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
      case 'monthly':
        const weeksInMonth = Math.ceil(this.data.length / 7);
        return Array.from({ length: weeksInMonth }, (_, i) => `Неделя ${i + 1}`);
      default:
        return [];
    }
  }
}
