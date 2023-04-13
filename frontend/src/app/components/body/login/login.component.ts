import { Component, OnInit } from '@angular/core';
import { LoginInfo } from 'src/app/models/login-info';
import { AuthService } from 'src/app/service/auth.service';
import { JantekService } from 'src/app/service/jantek.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginType: string;
  employeeNumber: string;
  cardNumber: string;

  constructor(
    private _jantekService: JantekService,
    private _authService: AuthService
    ) {}

  ngOnInit(): void {
    this.read_wp_getpunchcfg();
  }

  read_wp_getpunchcfg(): void {
    this.loginType = this.FkLoginTypeDesc(this._jantekService.get_wp_getpunchcfg().logintype)
  }

  FkLoginTypeDesc(logintype: Number): string {
    /** Returns login type */
    var desc = "";
    switch (logintype) {
      case 1:
        desc = "Employee # and Card #";
        break;
      case 2:
        desc = "Employee #";
        break;
      case 3:
        desc = "Card #";
        break;
      default:
        desc = "?";
    }
    return desc;
  }

  onEnter() {
    /** Gets user login and sends to authService */
    this.employeeNumber = (<HTMLInputElement>document.getElementById("Employee-Number")).value;
    this.cardNumber = (<HTMLInputElement>document.getElementById("Card-Number")).value;
    var loginInfo = new LoginInfo(this.employeeNumber, this.cardNumber)
    if (this._authService.login(loginInfo)) {
      console.log("Correct Info");
    } else {
      console.log("Wrong info");
    }
  }

  onCancel() {
    /** Resets inputs to empty */
    (<HTMLInputElement>document.getElementById("Employee-Number")).value = "";
    (<HTMLInputElement>document.getElementById("Card-Number")).value="";
  }
}
