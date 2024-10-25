import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { PIE_CHART_DATA, PIE_CHART_OPTIONS } from './pie-chart.config';
import { Period } from '../../../interfaces/chart.interface';
import { Chart, ChartConfiguration, ChartType, PieController, ArcElement, Legend, Tooltip } from 'chart.js';

Chart.register(PieController, ArcElement, Legend, Tooltip);

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnChanges {
  @Input() data: number[] = [];
  @Input() period: Period = 'daily';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  pieChartData: ChartConfiguration['data'] = PIE_CHART_DATA;
  pieChartOptions: ChartConfiguration['options'] = PIE_CHART_OPTIONS;
  chartType: ChartType = 'pie';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['period']) {
      this.updateChart();
    }
  }

  private updateChart(): void {
    this.pieChartData.datasets[0].data = this.data;
    this.pieChartData.labels = this.generateLabels();

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
