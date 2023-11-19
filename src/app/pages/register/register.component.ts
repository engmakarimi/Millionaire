import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/core/services';
import { confirmPasswordValidator } from 'src/app/core';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form!: FormGroup;
  hide = true;
  authService = inject(AuthService);
  router = inject(Router);
  snackBar = inject(MatSnackBar);
  ngOnInit() {
    this.form = new FormGroup(
      {
        userName: new FormControl<string>('', [
          Validators.required,
          Validators.email,
        ]),
        password: new FormControl<string>('', [Validators.required]),
        confirmPassword: new FormControl<string>('', [Validators.required]),
      },
      { validators: confirmPasswordValidator }
    );
  }

  submit() {
    const value = this.form.value;
    if (value && this.form.valid) {
      this.authService
        .register(value['userName'], value['password'])
        .subscribe((p: any) => {
          if (p) {
            this.form.reset();
            this.router.navigate(['/']);
          } else {
            this.snackBar.open('username is already exist');
          }
        });
    }
  }
}
