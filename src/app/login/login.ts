import { Component, inject, Input, ViewEncapsulation } from '@angular/core';
import {
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Shared } from '../shared/shared';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  toastr = inject(ToastrService);
  submitted = false;
  authService = inject(AuthService);

  public shared = inject(Shared);
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

  movieImg: string = 'assets/icon-movie.png';

  redirectoSignUp() {
    this.router.navigate(['signup']);
  }

  onSubmit() {
    this.submitted = true;

    this.authService.login(this.loginForm.value).subscribe(
      (response: any) => {
        this.authService.saveToken(response.token);

        this.router.navigate(['/home/dashboard']);

        this.toastr.success('You successfully logged in!');
      },
      (error) => {
        this.toastr.error('Your login credentials are incorrect!');
        this.submitted = false;
      },
    );
  }
}
