import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-menu-button',
  templateUrl: './main-menu-button.component.html',
  styleUrls: ['./main-menu-button.component.css']
})
export class MainMenuButtonComponent implements OnInit {
  active = false;
  clicked = false;
  constructor() { }

  ngOnInit() {
  }

  mouseEnter() {
    this.active = true;
  }
  mouseLeave() {
    this.active = true;
  }

}
