import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Period } from '../../interfaces/chart.interface';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent {
  @Output() periodChange = new EventEmitter<Period>();
  @Output() dataInput = new EventEmitter<number[]>();

  selectedPeriod: Period = 'daily';
  inputData: string = '';

  changePeriod(period: Period): void {
    this.selectedPeriod = period;
    this.periodChange.emit(period);
  }

  submitData(): void {
    const numbers = this.inputData
      .split(',')
      .map(num => Number(num.trim()))
      .filter(num => !isNaN(num));

    if (numbers.length > 0) {
      this.dataInput.emit(numbers);
      this.inputData = '';
    }
  }
}
