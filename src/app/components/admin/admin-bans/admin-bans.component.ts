import { Component, OnInit } from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-admin-bans',
  templateUrl: './admin-bans.component.html',
  styleUrls: ['./admin-bans.component.css']
})
export class AdminBansComponent implements OnInit {

  constructor(private titleService: Title, private meta: Meta) {
    this.titleService.setTitle('Banned Players - Maulbot');
    this.meta.addTag({ name: 'description', content: 'View banned players on maulbot.' });
    this.meta.addTag({ name: 'author', content: 'Henning Berge' });
    this.meta.addTag({ name: 'author', content: 'Promises' });
    this.meta.addTag({ name: 'author', content: 'runi95' });
    this.meta.addTag({ name: 'keywords', content: 'Warcraft, Maul, Warcraft 3, MaulBot, botmod, reimagined, wintermaul, warcraftmaul, wcm' });
  }

  ngOnInit() {
  }

}
