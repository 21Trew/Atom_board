import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CategoryScale,
  Chart,
  ChartType,
  ChartConfiguration,
  LinearScale,
  LineController,
  LineElement,
  PointElement
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { LINE_CHART_DATA, LINE_CHART_OPTIONS } from './line-chart.config';
import { Period } from '../../../interfaces/chart.interface';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale);

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnChanges {
  @Input() data: number[] = [];
  @Input() period: Period = 'daily';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  lineChartData: ChartConfiguration['data'] = LINE_CHART_DATA;
  lineChartOptions: ChartConfiguration['options'] = LINE_CHART_OPTIONS;
  chartType: ChartType = 'line';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['period']) {
      this.updateChart();
    }
  }

  private updateChart(): void {
    this.lineChartData.datasets[0].data = this.data;
    this.lineChartData.labels = this.generateLabels();

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
