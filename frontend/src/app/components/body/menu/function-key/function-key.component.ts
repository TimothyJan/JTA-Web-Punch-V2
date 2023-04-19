import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FunctionKey } from 'src/app/models/function-key';

@Component({
  selector: 'app-function-key',
  templateUrl: './function-key.component.html',
  styleUrls: ['./function-key.component.scss']
})
export class FunctionKeyComponent implements OnInit {
  caption: string;
  @Input() fkParams = new FunctionKey(0, "");
  @Output() clicked = new EventEmitter<FunctionKey>();

  constructor() {}

  ngOnInit(): void {
    this.caption = this.fkParams.caption;
  }

  onClick() {
    /** Emits FunctionKey Click*/
    this.clicked.emit(this.fkParams);
  }

}
