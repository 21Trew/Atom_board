import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartDataInput } from '../../interfaces/chart.interface';
import { EXPENSE_CATEGORIES, ExpenseCategory } from '../../constants/categories';

@Component({
  selector: 'app-data-input-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class DataInputModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<ChartDataInput>();

  categories = [...EXPENSE_CATEGORIES];
  selectedCategory: ExpenseCategory = 'продукты';

  inputData: ChartDataInput = {
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString().slice(0, 5),
    category: 'продукты',
    value: 0
  };

  closeModal(): void {
    this.close.emit();
  }

  submitData(): void {
    const data: ChartDataInput = {
      ...this.inputData,
      category: this.selectedCategory,
      time: this.inputData.time || undefined
    };
    this.submit.emit(data);
    this.closeModal();
  }
}
