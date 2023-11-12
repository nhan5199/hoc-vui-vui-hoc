import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-question',
  templateUrl: './manage-question.component.html',
  styleUrls: ['./manage-question.component.css'],
})
export class ManageQuestionComponent implements OnInit {
  authorize: string | null = '';
  isAuthorize: boolean = false;
  isLoading: boolean = true;
  listUsers: any[] = [];
  passwordVisible: boolean = false;

  isInvalidInput: boolean = false;
  isWrongCredential: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _db: AngularFireDatabase,
    private _fb: FormBuilder
  ) {}
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
              console.log(this.listUsers);
            });
        } else {
          this.isLoading = false;
        }
      });
  }
}
