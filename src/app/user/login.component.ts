import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { getTogglePasswordMask } from './state';
import { State } from '../state/app.state';
import * as ProductActions from './state/user.action'

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';

  maskUserName$: Observable<boolean>;
  private destroy$=new Subject<any>();

  constructor(private authService: AuthService, private router: Router,private store:Store<State>) { }

  ngOnInit(): void {
    this.maskUserName$=this.store.select(getTogglePasswordMask);
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.complete()
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(): void {
    //this.maskUserName = !this.maskUserName;
    this.store.dispatch(ProductActions.userPasswordMaskToggle())
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    }
  }
}
