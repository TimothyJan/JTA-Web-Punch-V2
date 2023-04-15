import { Component, OnInit } from '@angular/core';
import { JantekService } from 'src/app/service/jantek.service';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss']
})
export class DateTimeComponent implements OnInit{
  currentDateTime = new Date();

  /** wp_getinfo */
  companyName: string;
  dateFormat: string;
  timeFormat: string;
  weekStartDate: string;
  lvl1Label: string;
  lvl2Label: string;
  lvl3Label: string;
  lvl3LabelShort: string;

  constructor(
    private _jantekService: JantekService
  ) {}

  ngOnInit(): void {
    this.currentDateTimeUpdate();
    this.read_wp_getinfo();
  }

  currentDateTimeUpdate(): void {
    /** Updates currentDateTime every 1 sec */
    setInterval(() => {
      this.currentDateTime = new Date();
    }, 1000);
  }

  read_wp_getinfo() {
    let cfg = this._jantekService.get_wp_getinfo();
    console.log("wp_getinfo status: " + cfg.status)
    this.companyName = cfg.companyname
    this.lvl1Label = cfg.lvl1label;
    this.lvl2Label = cfg.lvl2label;
    this.lvl3Label = cfg.lvl3label;
    this.lvl3LabelShort = cfg.lvl3labelshort;
    this.dateFormat = this.dateFormatDisplay(cfg.dateformat);
    this.timeFormat = this.timeFormatDisplay(cfg.timeformat);
    this.weekStartDate = this.weekStart(cfg.wkstart);
    // console.log("wp_getinfo orient: " + cfg.orient);
    // console.log("wp_getinfo size: " + cfg.size);
    // console.log("wp_getinfo memfore: " + cfg.memfore);
    // console.log("wp_getinfo memback: " + cfg.memback);
  }

  dateFormatDisplay(dateformat: number): string {
    /** Returns the date format display to be used in the pipe of the date */
    let desc = "";
    switch(dateformat) {
      case 0:
        // "mm/dd/yyyy"
        desc = "EEEE, M/d/y";
        break;
      case 1:
        // "mm/dd/yy"
        desc = "EEEE, M/d/yy";
          break;
      case 2:
        // "dd/mm/yyyy"
        desc = "EEEE, d/M/y";
        break;
      case 3:
        // "dd/mm/yy"
        desc = "EEEE, d/M/yy";
        break;
      case 4:
        // "yyyy/mm/dd"
        desc = "EEEE, y/M/d";
        break;
      case 5:
        // "yy/mm/dd"
        desc = "EEEE, yy/M/d";
        break;
      default: desc = "?";
    }
    return desc;
  }

  timeFormatDisplay(timeformat: number): string {
    /** Returns the time format display to be used in the pipe of the time */
    let desc = "";
    if (timeformat === 0) {
      // "am/pm"
      desc = "h:mm:ss a";
    } else {
      // "military"
      desc = "H:mm";
    }
    return desc;
  }

  weekStart(wkstart: number): string {
    /** Returns the week start day */
    let desc = "";
    switch (wkstart) {
      case 1:
        desc = "Sun";
        break;
      case 2:
        desc = "Mon";
        break;
      case 3:
        desc = "Tue";
        break;
      case 4:
        desc = "Wed";
        break;
      case 5:
        desc = "Thu";
        break;
      case 6:
        desc = "Fri";
        break;
      case 7:
        desc = "Sat";
        break;
      default:
        desc = "?";
    }
    return desc;
  }
}
