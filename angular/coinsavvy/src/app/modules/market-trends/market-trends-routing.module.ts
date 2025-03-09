import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketPageComponent } from './market-page/market-page.component';

const routes: Routes = [{ path: '', component: MarketPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketTrendsRoutingModule {}
