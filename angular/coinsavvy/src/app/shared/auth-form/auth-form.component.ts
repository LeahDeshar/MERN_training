// import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { Component, Input, Output, EventEmitter } from '@angular/core';
// import {
//   FormBuilder,
//   FormGroup,
//   ReactiveFormsModule,
//   Validators,
// } from '@angular/forms';
// @Component({
//   selector: 'app-auth-form',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
//   templateUrl: './auth-form.component.html',
//   styleUrl: './auth-form.component.css',
// })
// export class AuthFormComponent {
//   @Input() formType: 'login' | 'signup' = 'login';
//   @Output() formSubmit = new EventEmitter<any>();

//   authForm: FormGroup;

//   constructor(private fb: FormBuilder) {
//     this.authForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       // ...(this.formType === 'signup' && {
//       //   confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
//       // }),
//     });
//     if (this.formType === 'signup') {
//       this.authForm.addControl(
//         'username',
//         this.fb.control('', [Validators.required])
//       );
//       this.authForm.addControl(
//         'confirmPassword',
//         this.fb.control('', [Validators.required, Validators.minLength(6)])
//       );
//     }
//   }

//   ngOnChanges() {
//     if (this.formType === 'signup') {
//       this.authForm.addControl(
//         'confirmPassword',
//         this.fb.control('', [Validators.required, Validators.minLength(6)])
//       );
//     } else {
//       this.authForm.removeControl('confirmPassword');
//     }
//   }
//   onSubmit() {
//     if (this.authForm.valid) {
//       this.formSubmit.emit(this.authForm.value);
//     }
//   }
// }

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css',
})
export class AuthFormComponent implements OnInit, OnChanges {
  @Input() formType: 'login' | 'signup' = 'login';
  @Output() formSubmit = new EventEmitter<any>();

  authForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formType'] && !changes['formType'].firstChange) {
      this.updateFormFields();
    }
  }

  private initializeForm() {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    if (this.formType === 'signup') {
      this.authForm.addControl(
        'username',
        this.fb.control('', [Validators.required])
      );
      this.authForm.addControl(
        'confirmPassword',
        this.fb.control('', [Validators.required, Validators.minLength(6)])
      );
    }
  }

  private updateFormFields() {
    if (this.formType === 'signup') {
      if (!this.authForm.contains('username')) {
        this.authForm.addControl(
          'username',
          this.fb.control('', [Validators.required])
        );
      }
      if (!this.authForm.contains('confirmPassword')) {
        this.authForm.addControl(
          'confirmPassword',
          this.fb.control('', [Validators.required, Validators.minLength(6)])
        );
      }
    } else {
      this.authForm.removeControl('username');
      this.authForm.removeControl('confirmPassword');
    }
  }

  onSubmit() {
    if (this.authForm.valid) {
      this.formSubmit.emit(this.authForm.value);
    }
  }
}
