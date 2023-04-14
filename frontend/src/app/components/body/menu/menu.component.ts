import { Component, OnInit } from '@angular/core';
import { JantekService } from 'src/app/service/jantek.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{
  username: string;

  constructor(private _jantekService: JantekService) {}

  ngOnInit(): void {
    this.username = this._jantekService.dummyUser1.username;
  }

}
