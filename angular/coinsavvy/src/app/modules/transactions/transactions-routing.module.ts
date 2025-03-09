import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionpageComponent } from './transactionpage/transactionpage.component';

const routes: Routes = [{ path: '', component: TransactionpageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsRoutingModule {}
