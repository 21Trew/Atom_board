import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Period, ChartDataInput } from '../../interfaces/chart.interface';
import { ChartDataService } from '../../services/chart.data.service';
import { DataInputModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [CommonModule, FormsModule, DataInputModalComponent],
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})

export class ControlsComponent {
  showDescription = false;

  toggleDescription(): void {
    this.showDescription = !this.showDescription;
  }

  @Output() periodChange = new EventEmitter<Period>();
  @Output() dataChange = new EventEmitter<ChartDataInput>();

  selectedPeriod: Period = 'daily';
  showModal = false;

  constructor(private chartDataService: ChartDataService) {}

  changePeriod(period: Period): void {
    this.selectedPeriod = period;
    this.periodChange.emit(period);
    this.chartDataService.updatePeriod(period);
  }

  onDataSubmit(data: ChartDataInput): void {
    this.dataChange.emit(data);
    this.chartDataService.addData(data);
    this.showModal = false;
  }
}
