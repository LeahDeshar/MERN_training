import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  isTransactionModalOpen = false;

  searchQuery = '';
  categories = [
    {
      name: 'Financial Income',
      subcategories: ['Salary', 'Investments', 'Other'],
    },
    {
      name: 'Income',
      subcategories: ['Freelance', 'Gifts', 'Other'],
    },
    {
      name: 'Other (income)',
      subcategories: ['Miscellaneous'],
    },
    {
      name: 'Food/Drinks',
      subcategories: ['Groceries', 'Restaurants', 'Cafes'],
    },
    {
      name: 'Shopping',
      subcategories: ['Clothing', 'Electronics', 'Other'],
    },
    {
      name: 'Transportation',
      subcategories: ['Public Transport', 'Fuel', 'Taxi'],
    },
    {
      name: 'Entertainment',
      subcategories: ['Movies', 'Concerts', 'Games'],
    },
    {
      name: 'Home',
      subcategories: ['Rent', 'Utilities', 'Maintenance'],
    },
    {
      name: 'Family',
      subcategories: ['Childcare', 'Education', 'Other'],
    },
    {
      name: 'Health/Sports',
      subcategories: ['Gym', 'Doctor', 'Pharmacy'],
    },
    {
      name: 'Pets',
      subcategories: ['Food', 'Vet', 'Toys'],
    },
    {
      name: 'Travels',
      subcategories: ['Flights', 'Hotels', 'Other'],
    },
    {
      name: 'Other (Expenses)',
      subcategories: ['Miscellaneous'],
    },
    {
      name: 'Debt',
      subcategories: ['Loans', 'Credit Cards', 'Other'],
    },
    {
      name: 'Credit',
      subcategories: ['Credit Cards', 'Loans', 'Other'],
    },
  ];
  transactions = [
    {
      title: 'Salary',
      date: new Date(),
      amount: 5000,
      type: 'income',
    },
    {
      title: 'Groceries',
      date: new Date(),
      amount: -150,
      type: 'expense',
    },
    {
      title: 'Electricity Bill',
      date: new Date(),
      amount: -75,
      type: 'expense',
    },
  ];
  filteredCategories = [...this.categories];
  selectedCategory = '';
  selectedSubcategory = '';
  expandedCategories: { [key: string]: boolean } = {};

  startDate: string;
  endDate: string;
  maxDate: string;

  // newTransaction = {
  //   title: '',
  //   date: this.formatDate(new Date()),
  //   amount: 0,
  //   type: 'income',
  //   category: '',
  //   subcategory: '',
  // };
  newTransaction: any = {
    category: '',
    subcategory: '',
    amount: null,
    date: this.formatDate(new Date()),
    type: 'expense',
  };
  constructor() {
    const today = new Date();
    const last30Days = new Date();
    last30Days.setDate(today.getDate() - 30);

    this.endDate = this.formatDate(today);
    this.startDate = this.formatDate(last30Days);
    this.maxDate = this.formatDate(today);
  }
  openTransactionModal() {
    this.isTransactionModalOpen = true;
  }

  closeTransactionModal() {
    this.isTransactionModalOpen = false;
    this.resetForm();
  }

  resetForm() {
    this.newTransaction = {
      category: '',
      subcategory: '',
      amount: null,
      date: '',
      type: 'expense',
    };
    this.searchQuery = '';
    this.filteredCategories = [...this.categories];
    this.expandedCategories = {};
  }
  addTransaction() {
    if (
      !this.newTransaction.category ||
      !this.newTransaction.amount ||
      !this.newTransaction.date
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    console.log('Transaction Added:', this.newTransaction);
    this.closeTransactionModal();
  }
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  filterCategories() {
    this.filteredCategories = this.categories.filter(
      (category) =>
        category.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        category.subcategories.some((subcategory) =>
          subcategory.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
    );
  }

  selectCategory(category: string, subcategory: string) {
    this.selectedCategory = category;
    this.selectedSubcategory = subcategory;
    this.newTransaction.category = category;
    this.newTransaction.subcategory = subcategory;
    this.closeModal();
  }
  toggleCategory(categoryName: string) {
    this.expandedCategories[categoryName] =
      !this.expandedCategories[categoryName];
  }
}
