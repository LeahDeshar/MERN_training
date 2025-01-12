import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],

  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form Data:', this.registerForm.value);
      alert('Registration successful!');
      this.registerForm.reset();
    }
  }
}
