import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetingpageComponent } from './budgetingpage/budgetingpage.component';

const routes: Routes = [{ path: '', component: BudgetingpageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetingRoutingModule {}
