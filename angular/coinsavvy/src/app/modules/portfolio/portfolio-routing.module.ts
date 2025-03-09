import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioPageComponent } from './portfolio-page/portfolio-page.component';

const routes: Routes = [{ path: '', component: PortfolioPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortfolioRoutingModule {}
