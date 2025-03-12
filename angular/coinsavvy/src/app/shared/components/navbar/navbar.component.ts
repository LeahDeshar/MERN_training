import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isSidebarOpen = false;
  isDropdownOpen = false;
  preferredCurrency = 'NPR';
  isNotificationModalOpen = false;
  isCurrencySelectorOpen = false;
  searchQuery = '';
  availableCurrencies = [
    'NPR',
    'USD',
    'EUR',
    'GBP',
    'JPY',
    'AUD',
    'CAD',
    'INR',
    'BTC',
    'ETH',
  ];
  notifications = [
    { message: 'Bitcoin price increased by 5%' },
    { message: 'Ethereum is now at $3,000' },
    { message: 'New transaction received' },
  ];

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleNotificationsModal() {
    this.isNotificationModalOpen = !this.isNotificationModalOpen;
  }
  toggleCurrencySelector() {
    this.isCurrencySelectorOpen = !this.isCurrencySelectorOpen;
  }

  selectCurrency(currency: string) {
    this.preferredCurrency = currency;
    this.isCurrencySelectorOpen = false;
    this.searchQuery = ''; // Clear search after selection
  }

  get filteredCurrencies() {
    return this.availableCurrencies.filter((currency) =>
      currency.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  closeModal(event: Event) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.isNotificationModalOpen = false;
    }
  }
}
