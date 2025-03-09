import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingspageComponent } from './settingspage/settingspage.component';

const routes: Routes = [{ path: '', component: SettingspageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
