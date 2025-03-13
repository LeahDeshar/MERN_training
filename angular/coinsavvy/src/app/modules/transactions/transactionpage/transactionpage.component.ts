import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transactionpage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transactionpage.component.html',
  styleUrl: './transactionpage.component.css',
})
export class TransactionpageComponent {
  isModalOpen = false;
  searchQuery = '';
  categories = [
    'Financial Income',
    'Income',
    'Other (income)',
    'Home',
    'Family',
    'Health/Sports',
    'Pets',
  ];
  filteredCategories = [...this.categories];
  selectedCategory = '';

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  filterCategories() {
    this.filteredCategories = this.categories.filter((category) =>
      category.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.closeModal();
  }
}
