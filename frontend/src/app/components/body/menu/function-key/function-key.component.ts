import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-function-key',
  templateUrl: './function-key.component.html',
  styleUrls: ['./function-key.component.scss']
})
export class FunctionKeyComponent implements OnInit {
  caption: string;

  constructor() {}

  ngOnInit(): void {
    this.caption = "Test Button"
  }

  onClick() {
    console.log("Key Clicked!");

  }

}
