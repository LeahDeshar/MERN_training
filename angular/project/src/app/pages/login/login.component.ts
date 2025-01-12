import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginserviceService } from '../../service/loginservice.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],

  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup<{
    username: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;

  constructor(
    private loginservice: LoginserviceService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value as {
        username: string;
        password: string;
      };

      console.log(loginData);

      this.loginservice.login(loginData).subscribe(
        (response) => {
          console.log('Login successful:', response);
          alert('Login successful!');
          localStorage.setItem('authToken', response.token);
          this.loginForm.reset();

          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Login failed:', error);
          alert('Login failed. Please try again.');
        }
      );
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
}
