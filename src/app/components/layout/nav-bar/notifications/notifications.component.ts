import {Component, Input, OnInit} from '@angular/core';
import {NotificationMenu, Notifications} from '../../../../services/django-client/Classes';
import {DjangoClientService} from '../../../../services/django-client/django-client.service';
import {Router} from '@angular/router';
import {WebSocketConstants} from '../../../../services/websocket/webSocketConstants';
import {Howl, Howler} from 'howler';
import {environment} from '../../../../../environments/environment';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})

export class NotificationsComponent implements OnInit {
  @Input() loginStatus;
  @Input() authService;
  notificationMenu: NotificationMenu;
  interval: any;

  sound;

  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];
  notes: Section[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }
  ];

  constructor(private djangoClientService: DjangoClientService, private router: Router, private webSocketConstants: WebSocketConstants) {
    if (environment.production) {
      this.sound = new Howl({
        src: ['/static/ang/assets/audio/busy.mp3']
      });
    } else {
      this.sound = new Howl({
        src: ['/assets/audio/busy.mp3']
      });
    }

  }

  ngOnInit() {
    if (this.loginStatus) {
      this.getNotifications();

      this.authService.wsIncommingMessages.subscribe((data) => {
        if (data.Action === this.webSocketConstants.WSActions.Notification) {
          this.notificationMenu.notifications.unshift(data.Message);
          this.notificationMenu.new++;
          this.sound.play();
        }
      });
      // this.interval = setInterval(() => {
      //   this.getNotifications();
      // }, 10000);
    }
  }

  getNotifications() {
    return this.djangoClientService.getNotifications().subscribe((data: NotificationMenu) => {
      this.notificationMenu = data;
    });
  }

  clickNotif(notification: Notifications) {
    if (notification.active) {
      notification.active = false;
      this.notificationMenu.new--;
    }
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
}
