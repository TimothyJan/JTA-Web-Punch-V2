import { Component, OnInit } from '@angular/core';
import { FunctionKey } from 'src/app/models/function-key';
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
    console.log(this.cfg);
  }

  onFunctionKeyClick(fkParams:FunctionKey): string {
    /** Handles function key clicks */
    this.functionKeyParams = fkParams;
    console.log(this.functionKeyParams);

    var desc = "";
    switch (this.functionKeyParams.fktype) {
      case 0:
      case 1:
        desc = "None";
        break;
      case 2:
        desc = "In";
        break;
      case 3:
        desc = "Out";
        break;
      case 4:
        desc = "Swipe-and-go w/ L3 change";
        break;
      case 5:
        desc = "L1 change";
        break;
      case 6:
        desc = "L2 change";
        break;
      case 7:
        desc = "L3 change";
        break;
      case 8:
        desc = "L1, L2 change";
        break;
      case 9:
        desc = "L1, L3 change";
        break;
      case 10:
        desc = "L2, L3 change";
        break;
      case 11:
        desc = "L1, L2, L3 change";
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
        // this.onViewTotalHours();
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
    let currentDateTime = new Date();
    let newPunch = new Punch("IN", currentDateTime);
    this._jantekService.onPunch(newPunch);
  }

  onPunchOut() {
    let currentDateTime = new Date();
    let newPunch = new Punch("OUT", currentDateTime);
    this._jantekService.onPunch(newPunch);
  }

}
