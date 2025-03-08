import { Component } from '@angular/core';
import { AuthFormComponent } from '../../../shared/auth-form/auth-form.component';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(private authService: AuthService) {}

  onSignUp(formData: any) {
    console.log('onSignUp', formData);
    this.authService
      .signup(formData.username, formData.email, formData.password)
      .subscribe(
        (response) => {
          console.log('Register successful', response);
        },
        (error) => {
          console.error('Register error', error);
        }
      );
  }
}
