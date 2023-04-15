import { Component, OnInit } from '@angular/core';
import { Punch } from 'src/app/models/punch';
import { JantekService } from 'src/app/service/jantek.service';

@Component({
  selector: 'app-punch',
  templateUrl: './punch.component.html',
  styleUrls: ['./punch.component.scss']
})
export class PunchComponent implements OnInit {
  clockType: string;
  currentDateTime = new Date();

  constructor(
    private _jantekService: JantekService
  ) {}

  ngOnInit(): void {
    this.read_wp_getpunchcfg();
  }

  read_wp_getpunchcfg(): void {
    this.clockType = this.FkClockTypeDesc(this._jantekService.get_wp_getpunchcfg().clocktype)
  }

  FkClockTypeDesc(clocktype:Number): string {
    /** Returns clock type */
    var desc = "";
    switch (clocktype) {
      case 1:
        desc = "In and Out";
        break;
      case 2:
        desc = "Swipe and Go";
        break;
      case 3:
        desc = "Swipe and Go (Function Key)";
        break;
      default:
        desc = "?";
    }
    return desc;
  }

  onIn(): void {
    /** Emits 'IN' Punch with currentDateTime*/
    this.currentDateTime = new Date();
    var newPunch = new Punch("IN", this.currentDateTime);
    this._jantekService.onPunch(newPunch);
  }

  onOut(): void {
    /** Emits 'OUT' Punch with currentDateTime*/
    this.currentDateTime = new Date();
    var newPunch = new Punch("OUT", this.currentDateTime);
    this._jantekService.onPunch(newPunch);
  }

  onPunch(): void {
    /** Emits 'SWIPEANDGO' Punch with currentDateTime*/
    this.currentDateTime = new Date();
    var newPunch = new Punch("SWIPEANDGO", this.currentDateTime);
    this._jantekService.onPunch(newPunch);
  }

}
