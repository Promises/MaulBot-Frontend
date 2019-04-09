import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../account/auth/auth.service';
import {DjangoClientService} from '../../../services/django-client/django-client.service';
import {NotificationMenu, Notifications} from '../../../services/django-client/Classes';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public isCollapsed = false;
  isNavToggle = true;
  notificationMenu: NotificationMenu;
  interval: any;
  isProduction = environment.production;
  navBarimg: string;

  constructor(public _authService: AuthService,
              private djangoClientService: DjangoClientService,
              private router: Router,
  ) {
    this.setNavbarImage();
    router.events.subscribe((event: RouterEvent) => {

      if (event instanceof NavigationEnd) {
        if (this._authService.loggedIn()) {
          // this.getNotifications();
        }
      }

    });
  }

  ngOnInit() {
    if (this._authService.loggedIn()) {
      // this.interval = setInterval(() => {
      //   this.getNotifications();
      // }, 10000);
    }

  }


  sideNavToggleClick() {
    this.isNavToggle = !this.isNavToggle;
  }

  getNotifications() {
    return this.djangoClientService.getNotifications().subscribe((data: NotificationMenu) => {
      this.notificationMenu = data;
      console.log(data);
    });
  }

  clickNotif(notification: Notifications) {
    this.djangoClientService.MarkNotification(notification.pk).subscribe();
    // this.getNotifications();
    this.router.navigate([notification.link]);
  }

  getType(s: String) {
    if (s.startsWith('Status')) {
      return 'fas fa-info';
    } else {
      return 'fa fa-comments';
    }
  }

  getBadge(s: String) {
    if (s.startsWith('Status')) {
      return 'badge-warning';
    } else {
      return 'badge-success';
    }
  }

  counter(i: number) {
    return new Array(i);
  }

  clearAll() {
    this.djangoClientService.ClearNotifications().subscribe((data) => {
      // this.getNotifications();
    });
  }

  setNavbarImage() {
    if (environment.production) {
      this.navBarimg = 'url("' + '/static/ang/assets/img/undead.png' + '")';
    } else {
      this.navBarimg = 'url("' + '/assets/img/undead.png' + '")';
    }
  }
}
