import { Component, inject } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  movieImg: string = 'assets/icon-movie.png';
  private router = inject(Router);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
  ]);

  redirectoSignUp() {
    this.router.navigate(['signup']);
  }
}
