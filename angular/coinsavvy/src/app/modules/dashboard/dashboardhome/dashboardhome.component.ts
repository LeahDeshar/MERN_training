import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-dashboardhome',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './dashboardhome.component.html',
  styleUrl: './dashboardhome.component.css',
})
export class DashboardhomeComponent {
  transactions = [
    { description: 'Groceries', amount: 120 },
    { description: 'Rent', amount: 1500 },
    { description: 'Internet Bill', amount: 60 },
  ];

  budgetUsage = 62;
}
