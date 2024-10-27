import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType, Chart, BarController, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { BAR_CHART_DATA, BAR_CHART_OPTIONS } from './bar-chart.config';
import { ChartDataService } from '../../../services/chart.data.service';
import { Subscription } from 'rxjs';

Chart.register(BarController, BarElement, CategoryScale, LinearScale);

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnDestroy {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  barChartData: ChartConfiguration['data'] = BAR_CHART_DATA;
  barChartOptions: ChartConfiguration['options'] = BAR_CHART_OPTIONS;
  chartType: ChartType = 'bar';
  private subscription?: Subscription;

  constructor(private chartDataService: ChartDataService) {}

  ngOnInit(): void {
    this.subscription = this.chartDataService.chartData$.subscribe(data => {
      this.barChartData.datasets = data.datasets;
      this.barChartData.labels = data.labels;
      if (this.chart) {
        this.chart.update();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
