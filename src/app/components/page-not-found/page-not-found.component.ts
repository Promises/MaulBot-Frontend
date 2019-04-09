import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  isProduction = environment.production;
  constructor(private titleService: Title, private meta: Meta) {
    this.titleService.setTitle(`404 Page has been eaten my murlocs - Maulbot`);
    this.meta.addTag({ name: 'description', content: `404 page not found` });
    this.meta.addTag({ name: 'author', content: 'Henning Berge' });
    this.meta.addTag({ name: 'author', content: 'Promises' });
    this.meta.addTag({ name: 'author', content: 'runi95' });
    this.meta.addTag({ name: 'keywords', content: 'Warcraft, Maul, Warcraft 3, MaulBot, botmod, reimagined, wintermaul, warcraftmaul, wcm' });
  }

  ngOnInit() {
  }

}
