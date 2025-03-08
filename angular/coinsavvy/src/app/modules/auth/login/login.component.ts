import { Component } from '@angular/core';
import { AuthFormComponent } from '../../../shared/auth-form/auth-form.component';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthFormComponent, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  onLogin(formData: any) {
    console.log('onLogin', formData);
    this.authService.login(formData.email, formData.password).subscribe(
      (response) => {
        console.log('Login successful', response);
      },
      (error) => {
        console.error('Login error', error);
      }
    );
  }
}
