import { Component, OnInit } from '@angular/core';
import {AccountInfo, LevelAvatar} from '../../services/django-client/Classes';
import {DjangoClientService} from '../../services/django-client/django-client.service';
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  accountInfo: AccountInfo;

  constructor(private djangoClientService: DjangoClientService, private titleService: Title, private meta: Meta) { }

  ngOnInit() {
    this.getAccountInfo();
    this.titleService.setTitle('Profile - Maulbot');
    this.meta.addTag({ name: 'description', content: 'view profile.' });
    this.meta.addTag({ name: 'author', content: 'Henning Berge' });
    this.meta.addTag({ name: 'author', content: 'Promises' });
    this.meta.addTag({ name: 'author', content: 'runi95' });
    this.meta.addTag({ name: 'keywords', content: 'Warcraft, Maul, Warcraft 3, MaulBot, botmod, reimagined, wintermaul, warcraftmaul, wcm' });

  }

  getAccountInfo() {
    return this.djangoClientService.getAccountInfo().subscribe((data: AccountInfo) => {
      this.accountInfo = data;
      this.titleService.setTitle(`${this.accountInfo.username} - Maulbot`);

    });
  }
  updateAvatar(event: boolean) {
    this.getAccountInfo();
  }

}
