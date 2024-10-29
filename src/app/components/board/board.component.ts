/*
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineChartComponent } from '../charts/line-chart/line-chart.component';
import { BarChartComponent } from '../charts/bar-chart/bar-chart.component';
import { PieChartComponent } from '../charts/pie-chart/pie-chart.component';
import { Period } from '../../interfaces/chart.interface';
import { ChartDataService } from '../../services/chart.data.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    LineChartComponent,
    BarChartComponent,
    PieChartComponent
  ],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  currentPeriod: Period = 'daily';

  constructor(private chartDataService: ChartDataService) {}

  ngOnInit(): void {
    this.loadData('daily');
  }

  loadData(period: Period): void {
    this.currentPeriod = period;
    this.chartDataService.updatePeriod(period);
  }
}
*/
