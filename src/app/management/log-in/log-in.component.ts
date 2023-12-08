import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  authorize: string | null = '';
  isAuthorize: boolean = false;
  isLoading: boolean = true;
  listUsers: any[] = [];
  loginForm!: FormGroup;
  passwordVisible: boolean = false;

  isInvalidInput: boolean = false;
  isWrongCredential: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _db: AngularFireDatabase,
    private _fb: FormBuilder,
    private _router: Router
  ) {
    this.loginForm = this._fb.group({
      username: '',
      password: '',
    });
  }
  ngOnInit(): void {
    this.authorize = this._route.snapshot.paramMap.get('authorize');
    this._db
      .object('login')
      .valueChanges()
      .subscribe((data: any) => {
        if (data.toLowerCase() === this.authorize?.toLowerCase()) {
          this.isAuthorize = true;
          this.isLoading = false;
          fetch(
            `https://hoc-vui-vui-hoc-343f8-default-rtdb.asia-southeast1.firebasedatabase.app/user.json`
          )
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              this.listUsers = data;
            });
        } else {
          this.isLoading = false;
        }
      });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  onLogin() {
    this.isWrongCredential = false;
    this.isInvalidInput = false;
    if (
      this.loginForm.value.username === null ||
      this.loginForm.value.username === undefined ||
      this.loginForm.value.password === null ||
      this.loginForm.value.password === undefined
    ) {
      this.isInvalidInput = true;
      return;
    }

    let isCorrectCredentials = false;
    this.listUsers.forEach((user: any) => {
      if (user.username === this.loginForm.value.username) {
        if (user.password === this.loginForm.value.password) {
          isCorrectCredentials = true;
          this._router.navigateByUrl(
            `/log-in/${this.authorize}/manage-question`
          );
        }
      }
    });

    if (!isCorrectCredentials) {
      this.loginForm.get('username')?.setValue('');
      this.loginForm.get('password')?.setValue('');
      this.isWrongCredential = true;
    }
  }
}
