import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  private router = inject(Router);
  movieImg: string = 'assets/icon-movie.png';

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
  ]);

  redirectoLogin() {
    this.router.navigate(['login']);
  }
}
