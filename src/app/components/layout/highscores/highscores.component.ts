import {Component, OnInit} from '@angular/core';
import {GameTable, PlayerStats} from '../../../services/django-client/Classes';
import {DjangoClientService} from '../../../services/django-client/django-client.service';
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-highscores',
  templateUrl: './highscores.component.html',
  styleUrls: ['./highscores.component.css']
})
export class HighscoresComponent implements OnInit {
  highscores: PlayerStats[];

  pageSize = 20;
  collectionSize: number;
  page = 1;

  constructor(private djangoClientService: DjangoClientService, private titleService: Title, private meta: Meta) {
    this.meta.addTag({ name: 'description', content: 'Warcraft Maul Highscores, old highscores from the hostbot.' });
    this.meta.addTag({ name: 'author', content: 'Henning Berge' });
    this.meta.addTag({ name: 'author', content: 'Promises' });
    this.meta.addTag({ name: 'author', content: 'runi95' });
    this.meta.addTag({ name: 'keywords', content: 'Warcraft, Maul, Warcraft 3, MaulBot, botmod, reimagined, wintermaul, warcraftmaul, wcm' });
  }

  ngOnInit() {
    this.getHighScores();
    this.titleService.setTitle('Highscores - Maulbot');
    this.meta.addTag({ name: 'description', content: 'Warcraft Maul Highscores, old highscores from the hostbot.' });
    this.meta.addTag({ name: 'author', content: 'Henning Berge' });
    this.meta.addTag({ name: 'author', content: 'Promises' });
    this.meta.addTag({ name: 'author', content: 'runi95' });
    this.meta.addTag({ name: 'keywords', content: 'Warcraft, Maul, Warcraft 3, MaulBot, botmod, reimagined, wintermaul, warcraftmaul, wcm' });

  }

  shouldShow(index: number): boolean {
    const indexPage: number = Math.floor(index / this.pageSize) + 1;
    return this.page === indexPage;


  }

  hasRankIMG(rank) {
    switch (rank) {
      case 0:
      case 1:
      case 2:
        return true;
      default:
        return false;
    }
  }

  getRankIMG(rank) {
    switch (rank) {
      case 0:
        return '/static/ang/assets/img/gold.png';
      case 1:
        return '/static/ang/assets/img/silver.png';
      case 2:
        return '/static/ang/assets/img/bronze.png';
    }
  }

  getHighScores() {
    return this.djangoClientService.getHighscores().subscribe((data: PlayerStats[]) => {
      this.highscores = data;
      this.collectionSize = this.highscores.length;
    });
  }

  getDiffColour(highestDiff: number) {
    if (highestDiff >= 400) {
      return 'fourHundredPercent';
    }
    if(highestDiff >= 300){
      return 'diff-hard';
    }
    if(highestDiff >= 200){
      return 'diff-medium';
    }
    if (highestDiff >= 100){
      return 'diff-easy';
    }
  }

  format(n) {
    const sep = "."; // Default to period as decimal separator
    const decimals = 2; // Default to 2 decimals

    return n.toLocaleString().split(sep)[0]
      + sep
      + n.toFixed(decimals).split(sep)[1];
  }

}
