import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Shared } from '../shared/shared';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatIcon } from '@angular/material/icon';
import { MatError } from '@angular/material/input';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, MatIcon, MatError],
})
export class Signup {
  private router = inject(Router);
  shared = inject(Shared);
  authService = inject(AuthService);
  toastr = inject(ToastrService);

  isSubmitted = false;

  movieImg = 'assets/icon-movie.png';

  signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
        ],
      ],
      confirmPassword: ['', Validators.required],
    });
  }

  redirectoLogin() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.signupForm.invalid) return;

    const { password, confirmPassword } = this.signupForm.value;
    if (password !== confirmPassword) {
      this.toastr.error('Passwords do not match');
      return;
    }

    this.authService.signup(this.signupForm.value).subscribe({
      next: (res: any) => {
        this.toastr.success('You successfully signed up!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.toastr.error(err.error?.message || 'Signup failed');
      },
    });
  }
}
