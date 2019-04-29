import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../account/auth/auth.service';
import {MarkdownParserService} from '../../../services/markdown-parser/markdown-parser.service';
import {DjangoClientService} from '../../../services/django-client/django-client.service';
import {FrontPageInfo, NewestMap} from '../../../services/django-client/Classes';
import {Meta, Title} from '@angular/platform-browser';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  convertedText: string;
  hosts: string;
  screenshots = [
    '/assets/img/screenshots/iscr1.png',
    '/assets/img/screenshots/iscr2.png',
    '/assets/img/screenshots/iscr3.png',
    '/assets/img/screenshots/iscr4.png',
    '/assets/img/screenshots/iscr5.png',
    '/assets/img/screenshots/iscr6.png'
  ];

  selecttedScreenshot: string;
  isProduction = environment.production;
  interval: any;
  selectedScreenshot: string;

  newestMap: NewestMap;


  constructor(public authService: AuthService,
              private mdService: MarkdownParserService,
              private djangoClient: DjangoClientService,
              private titleService: Title,
              private meta: Meta
  ) {
    // this.setHeaderImage();
    this.meta.addTag({name: 'description', content: 'Home of the Warcraft 3 map: Warcraft Maul Reimagined, and Maulbot.'});
    this.meta.addTag({name: 'author', content: 'Henning Berge'});
    this.meta.addTag({name: 'author', content: 'Promises'});
    this.meta.addTag({name: 'author', content: 'runi95'});
    this.meta.addTag({name: 'keywords', content: 'Warcraft, Maul, Warcraft 3, MaulBot, botmod, reimagined, wintermaul, warcraftmaul, wcm'});
    this.selectedScreenshot = this.screenshots[Math.floor(Math.random() * this.screenshots.length)];

  }

  ngOnInit() {
    this.titleService.setTitle('Warcraft Maul Reimagined - Maulbot');
    // this.interval = setInterval(() => {
    //   this.setHeaderImage();
    // }, 2000);
    this.getFrontPageInfo();
    this.getFrontPageHosts();
    this.getNewestMapFile();
  }

  ngOnDestroy(): void {
    this.interval = null;

  }

  getNewestMapFile() {
    return this.djangoClient.getNewestMap().subscribe((data: NewestMap) => {
      this.newestMap = data;
    });
  }

  getFrontPageInfo() {
    return this.djangoClient.getFrontPageInfo().subscribe((data: FrontPageInfo) => {
      this.convertedText = this.mdService.convert(data.text);
    });
  }

  getFrontPageHosts() {
    return this.djangoClient.getFrontPageHosts().subscribe((data: FrontPageInfo) => {
      this.hosts = this.mdService.convert(data.text);
    });
  }

  getScreenshot() {
    if (environment.production) {
      return  'url("' + '/static/ang/' + this.selectedScreenshot + '")';
    } else {
      return  'url("' + this.selectedScreenshot + '")';
    }
  }


}
