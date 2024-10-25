import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [BaseChartDirective],
  template: '<canvas baseChart [data]="chartData" [options]="chartOptions" [type]="chartType"></canvas>',
  styles: ['canvas { width: 100%; height: 300px; }']
})
export class LineChartComponent implements OnChanges {
  @Input() data: number[] = [];

  chartData: ChartConfiguration['data'] = {
    datasets: [{ data: [], label: 'Line Chart' }],
    labels: []
  };

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false
  };

  chartType: ChartType = 'line';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.updateChart();
    }
  }

  private updateChart(): void {
    this.chartData.datasets[0].data = this.data;
    this.chartData.labels = this.data.map((_, index) => `Day ${index + 1}`);
  }
}
