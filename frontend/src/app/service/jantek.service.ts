import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserInfo } from '../models/user-info';
import { LoginInfo } from '../models/login-info';
import { Punch } from '../models/punch';
import { AlertService } from '../components/header/_alert';
import { MsgEntry } from '../models/msg-entry.model';
import { FunctionKey } from '../models/function-key';

@Injectable({
  providedIn: 'root'
})
export class JantekService {
  isAuthenticated: boolean = false;
  isAuthenticatedChange: Subject<boolean> = new Subject<boolean>();

  /** Dummy Info */
  dummyUser1 = new UserInfo("MICHELLE PETERSON", [], "201","201");
  dummyL1 = ['10'];
  dummyL2 = ['10', '20'];
  dummyL3 = ['10', '30'];

  constructor(
    public alertService: AlertService
  ) { }

  get_wp_getinfo() {
    /** Gets wp_getinfo */
    let data = {
      "status": "OK",
      "companyname": "Jantek Electronics, Inc.",
      "lvl1label": "Company",
      "lvl2label": "Branch",
      "lvl3label": "Department",
      "lvl3labelshort": "Dept.",
      "dateformat": 0,
      "timeformat": 0,
      "orient": 1,
      "size": 4,
      "wkstart": 2,
      "memfore": 134217728,
      "memback": 67108864
      }
    return data;
  }

  get_wp_getmodule() {
    /** Gets wp_getmodule */
    let data = {
      "status": "OK",
      "accrual": 1,
      "lockout": 1,
      "multicollect": 1,
      "pcinput": 1,
      "j150tcpip": 1,
      "rsiclock": 1,
      "rsitcpip": 1,
      "vp2kclock": 0,
      "rptwriter": 0,
      "mergemodule": 1,
      "EmpIdChange": 1,
      "webpunch": 1,
      "accesscontrol": 1,
      "phonepunch": 1,
      "webpaydata": 0,
      "jta250": 0,
      "jta250tcpip": 0,
      "jfp520": 0,
      "jfp520tcpip": 0,
      "gt400": 0,
      "maxclient": 10,
      "maxemp": 15,
      "payroll": 15
      }
    return data;
  }

  get_wp_getpunchcfg() {
    /** Gets wp_getpunchcfg */
    let data = {
      "status": "OK",
      "logintype": 1,
      "clocktype": 1,
      "checklo": 0,
      "fk1": {
      "fktype": 18,
      "caption": "View Last Punch",
      "msg1": "",
      "msg2": "",
      "msg3": "",
      "PC": 0
      },
      "fk2": {
      "fktype": 19,
      "caption": "View Total Hour",
      "msg1": "",
      "msg2": "",
      "msg3": "",
      "PC": 0
      },
      "fk3": {
      "fktype": 5,
      "caption": "Company Change",
      "msg1": "Enter Company",
      "msg2": "",
      "msg3": "",
      "PC": 0
      },
      "fk4": {
      "fktype": 6,
      "caption": "Branch Change",
      "msg1": "Enter Branch",
      "msg2": "",
      "msg3": "",
      "PC": 0
      },
      "fk5": {
      "fktype": 7,
      "caption": "Dept Change",
      "msg1": "Enter Department",
      "msg2": "",
      "msg3": "",
      "PC": 0
      },
      "fk6": {
      "fktype": 16,
      "caption": "Hour Entry",
      "msg1": "Enter Hour",
      "msg2": "",
      "msg3": "",
      "PC": 7
      },
      "fk7": {
        "fktype": 17,
        "caption": "Amount Entry",
        "msg1": "Enter Amount",
        "msg2": "",
        "msg3": "",
        "PC": 7
        },
      "fk8": {
        "fktype": 12,
        "caption": "Break Start",
        "msg1": "",
        "msg2": "",
        "msg3": "",
        "PC": 0
      },
      "fk9": {
        "fktype": 13,
        "caption": "Break End",
        "msg1": "",
        "msg2": "",
        "msg3": "",
        "PC": 0
      }
    }
    return data;
  }

  login(loginInfo: LoginInfo): boolean {
    /* Check if user in database */
    if(loginInfo.cardNumber == this.dummyUser1.cardNumber && loginInfo.employeeNumber == this.dummyUser1.employeeNumber) {
      this.isAuthenticatedChange.next(true);
      return true;
    }
    return false;
  }

  onPunch(punchInfo: Punch): void {
    /** Handles punches (In, Out, Swipe and Go) */
    let serverResponse = true;
    if (serverResponse) {
      /* Add punch to dummyUser punchlist */
      this.dummyUser1.punches.push(punchInfo);

      let punchType = punchInfo.punchType;
      let clockType = this.get_wp_getpunchcfg().clocktype;
      let currentDateTime = "";
      if (clockType == 1) {
        currentDateTime = punchInfo.dateTime.toLocaleTimeString();
      } else {
        currentDateTime = punchInfo.dateTime.getHours() + ":" + punchInfo.dateTime.getMinutes() + ":" + punchInfo.dateTime.getSeconds();
      }
      this.alertService.success(punchType + " accepted at " + currentDateTime);
    } else {
      this.alertService.error('Punch is not allowed');
    }
  }

  onViewLastPunch(): void {
    /** Handles viewing the last punch */
    if (this.dummyUser1.punches.length > 0) {
      let lastPunch = this.dummyUser1.punches[this.dummyUser1.punches.length - 1];
      let lastPunchType = lastPunch.punchType;
      let lastPunchTime = new Date(lastPunch.dateTime);
      this.alertService.success("Last punch accepted at " + lastPunchTime + " " + lastPunchType)
    } else {
      this.alertService.error("No last punch recorded");
    }
  }

  onViewTotalHours(): void {
    /** Handles View Total Hours */
    let serverResponse = true;
    let totalHours = 13;
    if (serverResponse) {
      this.alertService.success("Total Hours: " + totalHours + " hrs.")
    } else {
      this.alertService.error("Cannot view total hours");
    }
  }

  onMsgEntry(functionKeyParams: FunctionKey, msgEntry: MsgEntry): void {
    /** Handles functions involving msgEntries */
    console.log(msgEntry);

    switch (functionKeyParams.fktype) {
      case 4: // Swipe-and-go w/ L3 change

      case 5: // L1 change
        this.checkL1(msgEntry.msgEntry1);
        break;
      case 6: // L2 change
        this.checkL2(msgEntry.msgEntry1);
        break;
      case 7: // L3 change
        this.checkL3(msgEntry.msgEntry1);
        break;
      case 8: // L1, L2 change
        this.checkL1(msgEntry.msgEntry1);
        this.checkL2(msgEntry.msgEntry2);
        break;
      case 9: // L1, L3 change
        this.checkL1(msgEntry.msgEntry1);
        this.checkL3(msgEntry.msgEntry2);
        break;
      case 10: // L2, L3 change
        this.checkL2(msgEntry.msgEntry1);
        this.checkL3(msgEntry.msgEntry2);
        break;
      case 11: // L1, L2, L3 change
        this.checkL1(msgEntry.msgEntry1);
        this.checkL2(msgEntry.msgEntry2);
        this.checkL3(msgEntry.msgEntry3);
        break;
      case 16: // Hour Entry
        let hourEntryAllowed = true;
        if (hourEntryAllowed) {
          this.alertService.success("Hour Entry Accepted");
        } else {
          this.alertService.error("Hour Entry Denied");
        }
      case 17: // Amount Entry
        let amountEntryAllowed = true;
        if (amountEntryAllowed) {
          this.alertService.success("Amount Entry Accepted");
        } else {
          this.alertService.error("Amount Entry Denied");
        }
    }
  }

  checkL1(msgEntry: string): void {
    /** Handles L1 Changes */
    if ((this.dummyL1.includes(msgEntry))) {
      this.alertService.success("L1 Change Accepted");
    } else {
      this.alertService.error("COMPANY " + msgEntry + " NOT FOUND");
    }
  }

  checkL2(msgEntry: string): void {
    /** Handles L2 Changes */
    if ((this.dummyL2.includes(msgEntry))) {
      this.alertService.success("L2 Change Accepted");
    } else {
      this.alertService.error("BRANCH " + msgEntry + " NOT FOUND");
    }
  }

  checkL3(msgEntry: string): void {
    /** Handles L3 Changes */
    if ((this.dummyL3.includes(msgEntry))) {
      this.alertService.success("L3 Change Accepted");
    } else {
      this.alertService.error("DEPARTMENT " + msgEntry + " NOT FOUND");
    }
  }

}
