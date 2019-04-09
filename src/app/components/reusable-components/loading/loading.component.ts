import {Component, isDevMode, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  production = !isDevMode();

  constructor() { }

  ngOnInit() {
  }

}
