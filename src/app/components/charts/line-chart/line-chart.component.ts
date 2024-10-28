import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryScale, Chart, ChartType, ChartConfiguration, LinearScale, LineController, LineElement, PointElement} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { LINE_CHART_DATA, LINE_CHART_OPTIONS } from './line-chart.config';
import { ChartDataService } from '../../../services/chart.data.service';
import { Subscription } from 'rxjs';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale);

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnDestroy {
  showDescription = false;

  toggleDescription(): void {
    this.showDescription = !this.showDescription;
  }

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  lineChartData: ChartConfiguration['data'] = LINE_CHART_DATA;
  lineChartOptions: ChartConfiguration['options'] = LINE_CHART_OPTIONS;
  chartType: ChartType = 'line';
  private subscription?: Subscription;

  constructor(private chartDataService: ChartDataService) {}

  ngOnInit(): void {
    this.subscription = this.chartDataService.lineChartData$.subscribe(data => {
      this.lineChartData.datasets = data.datasets;
      this.lineChartData.labels = data.labels;
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
