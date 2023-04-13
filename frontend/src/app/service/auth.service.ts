import { Injectable } from '@angular/core';
import { LoginInfo } from '../models/login-info';
import { UserInfo } from '../models/user-info';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;
  isAuthenticatedChange: Subject<boolean> = new Subject<boolean>();
  dummyUser1 = new UserInfo("MICHELLE PETERSON", [], "201","201");

  constructor() {
  }

  login(loginInfo: LoginInfo) {
    /* Check if user in database */
    if(loginInfo.cardNumber == this.dummyUser1.cardNumber && loginInfo.employeeNumber == this.dummyUser1.employeeNumber) {
      this.isAuthenticatedChange.next(true);
      return true;
    }
    return false;
  }
}
