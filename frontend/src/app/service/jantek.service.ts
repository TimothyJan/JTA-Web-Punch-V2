import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JantekService {

  constructor() { }

  get_wp_getinfo() {
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
      "fktype": 17,
      "caption": "Tip Entry",
      "msg1": "Enter Tip",
      "msg2": "",
      "msg3": "",
      "PC": 7
      }
    }
    return data;
  }


}
