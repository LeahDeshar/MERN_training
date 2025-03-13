import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-dashboardhome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboardhome.component.html',
  styleUrl: './dashboardhome.component.css',
})
export class DashboardhomeComponent implements AfterViewInit {
  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;
  @ViewChild('barChartContainer', { static: false })
  barChartContainer!: ElementRef;
  @ViewChild('pieChartContainer', { static: false })
  pieChartContainer!: ElementRef;
  @ViewChild('balanceTrendsChartContainer', { static: false })
  balanceTrendsChartContainer!: ElementRef;

  transactions = [
    { description: 'Groceries', amount: -120 },
    { description: 'Rent', amount: -1500 },
    { description: 'Internet Bill', amount: -60 },
    { description: 'Salary', amount: 3000 },
    { description: 'Freelance', amount: 500 },
  ];

  budgetUsage = 62;

  public lineChartLabels: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];

  public lineChartData: number[] = [65, 59, 80, 81, 56, 55, 40];
  public barChartLabels: string[] = this.lineChartLabels;
  public incomeData: number[] = [];
  public expenseData: number[] = [];
  public balanceTrendsData: number[] = [];
  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];

  totalBalance: number = 0;
  totalExpense: number = 0;
  totalIncome: number = 0;
  constructor() {}

  ngAfterViewInit(): void {
    this.calculateTotals();
    this.updateChartData();
    this.createLineChart();
    this.createBarChart();
    this.createPieChart();
    this.createBalanceTrendsChart();
  }
  private calculateTotals(): void {
    this.totalBalance = this.transactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );
    this.totalExpense = this.transactions
      .filter((transaction) => transaction.amount < 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    this.totalIncome = this.transactions
      .filter((transaction) => transaction.amount > 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0);
  }

  private updateChartData(): void {
    let cumulativeBalance = 0;
    this.lineChartData = this.transactions.map((transaction) => {
      cumulativeBalance += transaction.amount;
      return cumulativeBalance;
    });

    this.incomeData = this.transactions
      .filter((transaction) => transaction.amount > 0)
      .map((transaction) => transaction.amount);

    this.expenseData = this.transactions
      .filter((transaction) => transaction.amount < 0)
      .map((transaction) => Math.abs(transaction.amount));
    const expenseTransactions = this.transactions.filter(
      (transaction) => transaction.amount < 0
    );

    this.pieChartLabels = expenseTransactions.map(
      (transaction) => transaction.description
    );
    this.pieChartData = expenseTransactions.map((transaction) =>
      Math.abs(transaction.amount)
    );
    this.balanceTrendsData = this.lineChartData;
  }

  private createLineChart(): void {
    if (!this.chartContainer) return;

    const ctx = this.chartContainer.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.lineChartLabels,
        datasets: [
          {
            label: 'Total Balance Over Time',
            data: this.lineChartData,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Month',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Balance',
            },
          },
        },
      },
    });
  }

  private createBarChart(): void {
    if (!this.barChartContainer) return;

    const ctx = this.barChartContainer.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.barChartLabels,
        datasets: [
          {
            label: 'Income',
            data: this.incomeData,
            backgroundColor: 'rgb(54, 162, 235)',
          },
          {
            label: 'Expenses',
            data: this.expenseData,
            backgroundColor: 'rgb(255, 99, 132)',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { title: { display: true, text: 'Month' } },
          y: { title: { display: true, text: 'Amount ($)' } },
        },
      },
    });
  }
  private createPieChart(): void {
    if (!this.pieChartContainer) return;

    const ctx = this.pieChartContainer.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.pieChartLabels,
        datasets: [
          {
            label: 'Expense Distribution',
            data: this.pieChartData,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 206, 86)',
              'rgb(75, 192, 192)',
              'rgb(153, 102, 255)',
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
  // private createBalanceTrendsChart(): void {
  //   if (!this.balanceTrendsChartContainer) return;

  //   const ctx = this.balanceTrendsChartContainer.nativeElement.getContext('2d');
  //   new Chart(ctx, {
  //     type: 'line',
  //     data: {
  //       labels: this.lineChartLabels,
  //       datasets: [
  //         {
  //           label: 'Balance Trends',
  //           data: this.balanceTrendsData,
  //           fill: false,
  //           borderColor: 'rgb(153, 102, 255)',
  //           tension: 0.1,
  //         },
  //       ],
  //     },
  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: false,
  //       plugins: {
  //         legend: {
  //           display: true,
  //           position: 'top',
  //         },
  //         tooltip: {
  //           enabled: true,
  //         },
  //       },
  //       scales: {
  //         x: {
  //           title: {
  //             display: true,
  //             text: 'Month',
  //           },
  //         },
  //         y: {
  //           title: {
  //             display: true,
  //             text: 'Balance',
  //           },
  //         },
  //       },
  //     },
  //   });
  // }
  // private createBalanceTrendsChart(): void {
  //   if (!this.balanceTrendsChartContainer) return;

  //   const ctx = this.balanceTrendsChartContainer.nativeElement.getContext('2d');

  //   // Create a gradient effect for the line fill
  //   const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  //   gradient.addColorStop(0, 'rgba(153, 102, 255, 0.5)'); // Top (lighter)
  //   gradient.addColorStop(1, 'rgba(153, 102, 255, 0)'); // Bottom (transparent)

  //   new Chart(ctx, {
  //     type: 'line',
  //     data: {
  //       labels: this.lineChartLabels,

  //       datasets: [
  //         {
  //           label: 'Balance Trends',
  //           data: this.balanceTrendsData,
  //           fill: true, // Fill the area below the line
  //           backgroundColor: gradient,
  //           borderColor: 'rgb(153, 102, 255)',
  //           borderWidth: 2,
  //           pointBackgroundColor: 'rgb(255, 255, 255)',
  //           pointBorderColor: 'rgb(153, 102, 255)',
  //           pointRadius: 6, // Bigger points
  //           pointHoverRadius: 8, // Highlighted points on hover
  //           tension: 0.4, // Smooth curves
  //         },
  //         {
  //           label: 'Income',
  //           data: [7000, 7500, 7800, 8000], // Example Data
  //           fill: false,
  //           borderColor: 'rgb(75, 192, 192)',
  //           borderDash: [5, 5], // Dashed line
  //           pointStyle: 'triangle', // Different point shape
  //           tension: 0.3,
  //         },
  //         {
  //           label: 'Expenses',
  //           data: [2000, 2300, 2500, 2800], // Example Data
  //           fill: false,
  //           borderColor: 'rgb(255, 99, 132)',
  //           borderDash: [2, 3], // Another dashed style
  //           pointStyle: 'rectRounded',
  //           tension: 0.3,
  //         },
  //       ],
  //     },
  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: false,
  //       plugins: {
  //         legend: {
  //           display: true,
  //           position: 'top',
  //         },
  //         tooltip: {
  //           enabled: true,
  //           callbacks: {
  //             label: function (tooltipItem) {
  //               return `${tooltipItem.dataset.label}: $${tooltipItem.raw}`;
  //             },
  //           },
  //         },
  //         annotation: {
  //           annotations: [
  //             {
  //               type: 'line',
  //               mode: 'horizontal',
  //               scaleID: 'y',
  //               value: 5000,
  //               borderColor: 'red',
  //               borderWidth: 2,
  //               label: {
  //                 content: 'Threshold',
  //                 enabled: true,
  //                 position: 'start',
  //               },
  //             },
  //           ],
  //         },
  //       },
  //       scales: {
  //         x: {
  //           title: {
  //             display: true,
  //             text: 'Month',
  //             font: {
  //               size: 14,
  //               weight: 'bold',
  //             },
  //           },
  //           grid: {
  //             display: true,
  //             borderDash: [5, 5], // Dashed grid lines
  //           },
  //         },
  //         y: {
  //           title: {
  //             display: true,
  //             text: 'Balance ($)',
  //             font: {
  //               size: 14,
  //               weight: 'bold',
  //             },
  //           },
  //           grid: {
  //             display: true,
  //             borderDash: [3, 3], // Dashed grid lines
  //           },
  //           ticks: {
  //             callback: function (value) {
  //               return `$${value}`;
  //             },
  //           },
  //         },
  //       },
  //     },
  //   });
  // }
  private createBalanceTrendsChart(): void {
    if (!this.balanceTrendsChartContainer) return;

    const ctx = this.balanceTrendsChartContainer.nativeElement.getContext('2d');

    // Create a gradient effect for the line fill
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(153, 102, 255, 0.5)'); // Top (lighter)
    gradient.addColorStop(1, 'rgba(153, 102, 255, 0)'); // Bottom (transparent)

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.lineChartLabels,
        datasets: [
          {
            label: 'Balance Trends',
            data: this.balanceTrendsData,
            fill: true, // Fill the area below the line
            backgroundColor: gradient,
            borderColor: 'rgb(153, 102, 255)',
            borderWidth: 2,
            pointBackgroundColor: 'rgb(255, 255, 255)',
            pointBorderColor: 'rgb(153, 102, 255)',
            pointRadius: 6, // Bigger points
            pointHoverRadius: 8, // Highlighted points on hover
            tension: 0.4, // Smooth curves
          },
          {
            label: 'Income',
            data: [7000, 7500, 7800, 8000], // Example Data
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            borderDash: [5, 5], // Dashed line
            pointStyle: 'triangle', // Different point shape
            tension: 0.3,
          },
          {
            label: 'Expenses',
            data: [2000, 2300, 2500, 2800], // Example Data
            fill: false,
            borderColor: 'rgb(255, 99, 132)',
            borderDash: [2, 3], // Another dashed style
            pointStyle: 'rectRounded',
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.dataset.label}: $${tooltipItem.raw}`;
              },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Month',
              font: {
                size: 14,
                weight: 'bold',
              },
            },
            grid: {
              display: true,
            },
          },
          y: {
            title: {
              display: true,
              text: 'Balance ($)',
              font: {
                size: 14,
                weight: 'bold',
              },
            },
            grid: {
              display: true,
            },
            ticks: {
              callback: function (value) {
                return `$${value}`;
              },
            },
          },
        },
      },
    });
  }
}
