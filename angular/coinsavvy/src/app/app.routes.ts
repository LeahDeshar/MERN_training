// import { Routes } from '@angular/router';
// import { DashboardModule } from './modules/dashboard/dashboard.module';
// import { ExpensesModule } from './modules/expenses/expenses.module';

// export const routes: Routes = [
//   { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
//   {
//     path: 'auth',
//     loadChildren: () =>
//       import('./modules/auth/auth.module').then((m) => m.AuthModule),
//   },
//   { path: 'dashboard', component: DashboardModule },
//   { path: 'expense', component: ExpensesModule },

//   { path: '**', redirectTo: '/dashboard' },
// ];

import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'expense',
    loadChildren: () =>
      import('./modules/expenses/expenses.module').then(
        (m) => m.ExpensesModule
      ),
  },
  { path: '**', redirectTo: '/dashboard' },
];
