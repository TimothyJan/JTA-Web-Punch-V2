import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FunctionKey } from 'src/app/models/function-key';
import { MsgEntry } from 'src/app/models/msg-entry.model';

@Component({
  selector: 'app-msg-entry',
  templateUrl: './msg-entry.component.html',
  styleUrls: ['./msg-entry.component.scss']
})
export class MsgEntryComponent implements OnInit {
  @Input() fkParams = new FunctionKey(0, "");
  msgEntry1 = "";
  msgEntry2 = "";
  msgEntry3 = "";
  msg1 = "";
  msg2 = "";
  msg3 = "";
  @Output() msg = new EventEmitter<MsgEntry>();

  constructor() { }

  ngOnInit(): void {
    if (this.fkParams.msg1) {
      this.msg1 = this.fkParams.msg1;
    }
    if (this.fkParams.msg2) {
      this.msg2 = this.fkParams.msg2;
    }
    if (this.fkParams.msg3) {
      this.msg3 = this.fkParams.msg3;
    }
  }

  onEnter() {
    /** Gets user input and emits MsgEntry to InputComp*/
    if (this.fkParams.msg1) {
      this.msgEntry1 = (<HTMLInputElement>document.getElementById("msgEntry1")).value;
    }
    if (this.fkParams.msg2) {
      this.msgEntry2 = (<HTMLInputElement>document.getElementById("msgEntry2")).value;
    }
    if (this.fkParams.msg3) {
      this.msgEntry3 = (<HTMLInputElement>document.getElementById("msgEntry3")).value;
    }
    var MessageEntry = new MsgEntry(this.msgEntry1, this.msgEntry2, this.msgEntry3);
    this.msg.emit(MessageEntry);
  }

  onCancel(): void {
    /** Resets inputs to empty */
    if (this.fkParams.msg1) {
      this.msgEntry1 = "";
    }
    if (this.fkParams.msg2) {
      this.msgEntry2 = "";
    }
    if (this.fkParams.msg3) {
      this.msgEntry3 = "";
    }
  }
}
