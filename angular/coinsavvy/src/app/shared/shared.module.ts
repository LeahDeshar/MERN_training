// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ]
// })
// export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';
import { AuthService } from '../core/services/auth.service';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AsidebarComponent } from './components/asidebar/asidebar.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonComponent,
    CardComponent,
    NavbarComponent,
    CurrencyFormatPipe,
    AuthFormComponent,
    AsidebarComponent
  ],
  exports: [
    ButtonComponent,
    CardComponent,
    CurrencyFormatPipe,
    AuthFormComponent,
    NavbarComponent,
    AsidebarComponent

  ],
})
export class SharedModule {}
