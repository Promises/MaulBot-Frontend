import { Component, OnInit, OnDestroy } from '@angular/core';
import {AdminStatusBar, GameTable} from '../../../services/django-client/Classes';
import {DjangoClientService} from '../../../services/django-client/django-client.service';

@Component({
  selector: 'app-admin-status-bar',
  templateUrl: './admin-status-bar.component.html',
  styleUrls: ['./admin-status-bar.component.css']
})
export class AdminStatusBarComponent implements OnInit, OnDestroy {
  statuses: AdminStatusBar;
  interval: any;

  constructor(private djangoClientService: DjangoClientService) { }

  ngOnInit() {
    this.getStatusBar();
    this.interval = setInterval(() => {
      this.getStatusBar();
    }, 5000);
  }
  getStatusBar() {
    return this.djangoClientService.getAdminStatusBar().subscribe((data: AdminStatusBar) => {
      this.statuses = data;
    });
  }
  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

}
