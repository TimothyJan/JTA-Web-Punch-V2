import { Component, OnInit } from '@angular/core';
import { FunctionKey } from 'src/app/models/function-key';
import { MsgEntry } from 'src/app/models/msg-entry.model';
import { Punch } from 'src/app/models/punch';
import { JantekService } from 'src/app/service/jantek.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{
  username: string;
  cfg: {};
  functionKeyParams = new FunctionKey(0, "");

  constructor(private _jantekService: JantekService) {}

  ngOnInit(): void {
    this.username = this._jantekService.dummyUser1.username;
    this.read_wp_getpunchcfg();
  }

  read_wp_getpunchcfg(): void {
    /** Get Function Keys */
    this.cfg = this._jantekService.get_wp_getpunchcfg();
  }

  onFunctionKeyClick(fkParams:FunctionKey): string {
    /** Handles function key clicks */
    this.functionKeyParams = fkParams;

    var desc = "";
    switch (this.functionKeyParams.fktype) {
      case 0:
      case 1:
        desc = "None";
        break;
      case 2:
        desc = "In";
        this.onPunchIn();
        break;
      case 3:
        desc = "Out";
        this.onPunchOut();
        break;
      case 4:
        desc = "Swipe-and-go w/ L3 change";
        this.onSwipeAndGo();
        break;
      case 12:
        desc = "Break Start";
        this.onPunchOut();
        break;
      case 13:
        desc = "Break End";
        this.onPunchIn();
        break;
      case 14:
        desc = "Lunch Start";
        this.onPunchOut();
        break;
      case 15:
        desc = "Lunch End";
        this.onPunchIn();
        break;
      case 16:
        desc = "Hour Entry";
        break;
      case 17:
        desc = "Amount Entry";
        break;
      case 18:
        desc = "View Last Punch";
        this._jantekService.onViewLastPunch();
        break;
      case 19:
        desc = "View Total Hours";
        this._jantekService.onViewTotalHours();
        break;
      case 20:
        desc = "Calculated Pay Code";
        break;
      default:
        desc = "?";
    }
    return desc;
  }

  onPunchIn() {
    /** Emits 'IN' Punch with currentDateTime*/
    let currentDateTime = new Date();
    let newPunch = new Punch("IN", currentDateTime);
    this._jantekService.onPunch(newPunch);
  }

  onPunchOut() {
    /** Emits 'OUT' Punch with currentDateTime*/
    let currentDateTime = new Date();
    let newPunch = new Punch("OUT", currentDateTime);
    this._jantekService.onPunch(newPunch);
  }

  onSwipeAndGo(): void {
    /** Emits 'SWIPEANDGO' Punch with currentDateTime*/
    let currentDateTime = new Date();
    var newPunch = new Punch("SWIPEANDGO", currentDateTime);
    this._jantekService.onPunch(newPunch);
  }

  onMsgEntry(msgEntry: MsgEntry): void {
    /** Handles function key clicks with msgEntry for fktypes 4-11, 16 and 17 */
    this._jantekService.onMsgEntry(this.functionKeyParams, msgEntry);
    /** resets the functionKeyParams and closes the msgEntry component */
    this.functionKeyParams = new FunctionKey(0, "");
  }

}
