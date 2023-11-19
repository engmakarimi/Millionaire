import { NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
//material modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from 'src/app/core';
@Component({
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  hide = true;
  authService = inject(AuthService);
  router = inject(Router);
  snackBar = inject(MatSnackBar);
  ngOnInit() {
    this.form = new FormGroup({
      userName: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string>('', [Validators.required]),
    });
  }

  submit() {
    const value = this.form.value;
    if (value && this.form.valid) {
      this.authService
        .login(value['userName'], value['password'])
        .subscribe((p) => {
          if (p) {
            this.router.navigate(['/']);
          } else {
            this.snackBar.open('wrong information');
          }
        });
    }
  }
}
