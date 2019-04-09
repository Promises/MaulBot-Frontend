import { WINDOW } from '@ng-toolkit/universal';
import {Component, Input, NgModule, OnInit, Inject} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import 'brace/index';
declare let ace: any;
import 'brace/theme/dracula';
import 'brace/mode/sql';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Tour of Heroes';

  @Input()
  public alerts: Array<IAlert> = [];

  private backup: Array<IAlert>;

  constructor(@Inject(WINDOW) private window: Window, private router: Router) {
    this.alerts.push({
      id: 1,
      type: 'success',
      message: 'This is an success alert',
    }, {
      id: 2,
      type: 'info',
      message: 'This is an info alert',
    }, {
      id: 3,
      type: 'warning',
      message: 'This is a warning alert',
    }, {
      id: 4,
      type: 'danger',
      message: 'This is a danger alert',
    }, {
      id: 5,
      type: 'primary',
      message: 'This is a primary alert',
    }, {
      id: 6,
      type: 'secondary',
      message: 'This is a secondary alert',
    }, {
      id: 7,
      type: 'light',
      message: 'This is a light alert',
    }, {
      id: 8,
      type: 'dark',
      message: 'This is a dark alert',
    });
    this.backup = this.alerts.map((alert: IAlert) => Object.assign({}, alert));
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      this.window.scrollTo(0, 0);
    });
  }

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  public reset() {
    this.alerts = this.backup.map((alert: IAlert) => Object.assign({}, alert));
  }
}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
