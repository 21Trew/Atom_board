import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { PIE_CHART_DATA, PIE_CHART_OPTIONS } from './pie-chart.config';
import { Chart, ChartConfiguration, ChartType, PieController, ArcElement, Legend, Tooltip } from 'chart.js';
import { ChartDataService } from '../../../services/chart.data.service';
import { Subscription } from 'rxjs';

Chart.register(PieController, ArcElement, Legend, Tooltip);

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, OnDestroy {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  pieChartData: ChartConfiguration['data'] = PIE_CHART_DATA;
  pieChartOptions: ChartConfiguration['options'] = PIE_CHART_OPTIONS;
  chartType: ChartType = 'pie';
  private subscription?: Subscription;

  constructor(private chartDataService: ChartDataService) {}

  ngOnInit(): void {
    this.subscription = this.chartDataService.pieChartData$.subscribe(data => {
      this.pieChartData = data;
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
