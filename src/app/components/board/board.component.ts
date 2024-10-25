import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { LineChartComponent } from '../charts/line-chart/line-chart.component';
import { BarChartComponent } from '../charts/bar-chart/bar-chart.component';
import { PieChartComponent } from '../charts/pie-chart/pie-chart.component';
import { Period } from '../../interfaces/chart.interface';

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
  lineChartData: number[] = [];
  barChartData: number[] = [];
  pieChartData: number[] = [];
  maxDataValue: number = 0;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.loadData('daily');
  }

  loadData(period: Period): void {
    this.dataService.getData(period).subscribe(data => {
      this.maxDataValue = Math.max(...data.lineData, ...data.barData);
      this.lineChartData = data.lineData;
      this.barChartData = data.barData;
      this.pieChartData = data.pieData;
    });
  }
}
