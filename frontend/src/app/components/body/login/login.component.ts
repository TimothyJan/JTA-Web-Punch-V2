import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/components/header/_alert';
import { LoginInfo } from 'src/app/models/login-info';
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
    public alertService: AlertService
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
    if (this._jantekService.login(loginInfo)) {
    } else {
      this.alertService.error("Incorrect login");
    }
  }

  onCancel() {
    /** Resets inputs to empty */
    (<HTMLInputElement>document.getElementById("Employee-Number")).value = "";
    (<HTMLInputElement>document.getElementById("Card-Number")).value="";
  }
}
