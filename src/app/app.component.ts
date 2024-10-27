import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsComponent } from './components/controls/controls.component';
import { PieChartComponent } from './components/charts/pie-chart/pie-chart.component';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';
import { LineChartComponent } from './components/charts/line-chart/line-chart.component';
import { ChartDataService } from './services/chart.data.service';
import { Period, ChartDataInput } from './interfaces/chart.interface';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ControlsComponent,
    PieChartComponent,
    BarChartComponent,
    LineChartComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  pieChartData: number[] = [];
  barChartData: number[] = [];
  lineChartData: number[] = [];
  currentPeriod: Period = 'daily';
  private chartSubscription?: Subscription;

  constructor(private chartDataService: ChartDataService) {}

  ngOnInit(): void {
    /*this.chartSubscription = this.chartDataService.chartData$.subscribe(chartData => {
      const data = chartData.datasets[0].data;
      this.barChartData = [...data];
      this.lineChartData = [...data];
      this.pieChartData = [...data];
    });*/
  }

  onPeriodChange(period: Period): void {
    this.currentPeriod = period;
    this.chartDataService.updatePeriod(period);
  }

  onDataChange(data: ChartDataInput): void {
    this.chartDataService.addData(data);
  }

  ngOnDestroy(): void {
    if (this.chartSubscription) {
      this.chartSubscription.unsubscribe();
    }
  }
}
