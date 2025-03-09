import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './core/services/auth.service';
import { AuthGuard } from './core/guards/auth.guard';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { AsidebarComponent } from './shared/components/asidebar/asidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CoreModule,
    AuthModule,
    NavbarComponent,
    AsidebarComponent,
  ],
  providers: [AuthService, AuthGuard],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'coinsavvy';
}
