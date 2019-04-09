import {Component, OnDestroy, OnInit} from '@angular/core';
import {DjangoClientService} from '../../../services/django-client/django-client.service';
import {getOrSetAsInMap} from '@angular/animations/browser/src/render/shared';
import {GameTable} from '../../../services/django-client/Classes';
import {Blogpost} from '../../../services/blogposts-service/blogpost';

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.css']
})

export class GameTableComponent implements OnInit, OnDestroy {
  gamelist: GameTable[];
  interval: any;
  playersNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  selectedGame: number;


  constructor(private djangoClientService: DjangoClientService) {
  }

  showConfig() {
    this.djangoClientService.getGameTable()
      .subscribe();
  }


  ngOnInit() {
    this.getGameTable();
    this.interval = setInterval(() => {
      this.getGameTable();
    }, 2000);
  }

  getGameTable() {
    return this.djangoClientService.getGameTable().subscribe((data: GameTable[]) => {
      this.gamelist = data;
    });
  }


  getMapName(s) {
    if (s.lastIndexOf('/') > 0) {
      return s.substring(s.lastIndexOf('/') + 1);
    }
    if (s.lastIndexOf('\\') > 0) {
      return s.substring(s.lastIndexOf('\\') + 1);
    }
  }

  getDoubleDigit(i) {
    if (i < 10) {
      return '0' + i;
    } else {
      return i as string;
    }

  }

  cleanString(string) {
    return string.replace(/[^0-9a-zA-Z \]\[#]/g, '');
  }

  getMaximumPlayer(string) {
    if (string === 'MaulBot') {
      return '13';
    } else if (string === 'MaulBot.1') {
      return '9';
    } else if (string === 'MaulBot.2') {
      return '9';
    } else if (string === 'MaulBot.3') {
      return '8';
    } else {
      return '999';
    }
  }

  getNumberAsDoubleDigit(n) {
    return n > 9 ? '' + n : '0' + n;
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  setGame(id) {
    this.selectedGame = id;
  }
}
