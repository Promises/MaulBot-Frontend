import {Component, OnInit} from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";


@Component({
  selector: 'app-map-tools',
  templateUrl: './map-tools.component.html',
  styleUrls: ['./map-tools.component.css'],
})
export class MapToolsComponent implements OnInit {


  constructor(private titleService: Title, private meta: Meta) {
  }

  ngOnInit() {
    this.titleService.setTitle(`Warcraft Map Tools - Maulbot`);
    this.meta.addTag({ name: 'description', content: `Warcraft 3 map development tools, including out easy to use famous loading screen generator.` });
    this.meta.addTag({ name: 'author', content: 'Henning Berge' });
    this.meta.addTag({ name: 'author', content: 'Promises' });
    this.meta.addTag({ name: 'author', content: 'runi95' });
    this.meta.addTag({ name: 'keywords', content: 'Warcraft, Maul, Warcraft 3, MaulBot, botmod, reimagined, wintermaul, warcraftmaul, wcm' });
  }

}
