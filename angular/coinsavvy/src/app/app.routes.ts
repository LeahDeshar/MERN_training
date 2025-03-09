import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NoAuthGuard } from './core/guards/no-auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [NoAuthGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'expenses',
    loadChildren: () =>
      import('./modules/expenses/expenses.module').then(
        (m) => m.ExpensesModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'budgeting',
    loadChildren: () =>
      import('./modules/budgeting/budgeting.module').then(
        (m) => m.BudgetingModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'insights',
    loadChildren: () =>
      import('./modules/insights/insights.module').then(
        (m) => m.InsightsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'market-trends',
    loadChildren: () =>
      import('./modules/market-trends/market-trends.module').then(
        (m) => m.MarketTrendsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'portfolio',
    loadChildren: () =>
      import('./modules/portfolio/portfolio.module').then(
        (m) => m.PortfolioModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./modules/settings/settings.module').then(
        (m) => m.SettingsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'transactions',
    loadChildren: () =>
      import('./modules/transactions/transactions.module').then(
        (m) => m.TransactionsModule
      ),
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/dashboard' },
];
