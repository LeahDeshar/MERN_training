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

@NgModule({
  declarations: [],
  imports: [CommonModule, ButtonComponent, CardComponent, CurrencyFormatPipe],
  exports: [ButtonComponent, CardComponent, CurrencyFormatPipe],
})
export class SharedModule {}
