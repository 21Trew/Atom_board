import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsComponent } from './components/controls/controls.component';
import { PieChartComponent } from './components/charts/pie-chart/pie-chart.component';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';
import { LineChartComponent } from './components/charts/line-chart/line-chart.component';
import { DataService } from './services/data.service';
import { Period } from './interfaces/chart.interface';

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
export class AppComponent implements OnInit {
  pieChartData: number[] = [];
  barChartData: number[] = [];
  lineChartData: number[] = [];
  currentPeriod: Period = 'daily';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadData('daily');
  }

  onPeriodChange(period: Period): void {
    this.currentPeriod = period;
    this.loadData(period);
  }

  onDataChange(data: any): void {
    // Обработка изменения данных
    this.pieChartData = data.pieData || [];
    this.barChartData = data.barData || [];
    this.lineChartData = data.lineData || [];
  }

  private loadData(period: Period): void {
    this.dataService.getData(period).subscribe(data => {
      this.pieChartData = data.pieData;
      this.barChartData = data.barData;
      this.lineChartData = data.lineData;
    });
  }
}
