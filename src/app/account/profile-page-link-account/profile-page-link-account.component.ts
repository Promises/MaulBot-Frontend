import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LevelAvatar, LinkedPlayer, LinkedPlayerForm, LinkedPlayerToken,} from '../../services/django-client/Classes';
import {DjangoClientService} from '../../services/django-client/django-client.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-profile-page-link-account',
  templateUrl: './profile-page-link-account.component.html',
  styleUrls: ['./profile-page-link-account.component.css']
})
export class ProfilePageLinkAccountComponent implements OnInit {
  servers = [
    {'SHORT': 'connect-eur.classic.blizzard.com', 'LONG': 'Northerend (Europe)'},
    {'SHORT': 'connect-usw.classic.blizzard.com', 'LONG': 'Lordaeron (U.S. West)'},
    {'SHORT': 'connect-use.classic.blizzard.com', 'LONG': 'Azeroth (U.S. East)'},
    {'SHORT': 'connect-kor.classic.blizzard.com', 'LONG': 'Kalimdor (Asia)'},
    {'SHORT': 'connect.entgaming.net', 'LONG': 'WC3Connect'}
  ];
  linkedplayers: LinkedPlayer[];

  model = new LinkedPlayerForm('', this.servers[0].SHORT);
  submitted = false;
  selectableAvatars: LevelAvatar[];
  selectableSpecialAvatars: LevelAvatar[];

  hoveredAvatar: LevelAvatar;
  @Output() update = new EventEmitter<boolean>();


  constructor(private djangoClientService: DjangoClientService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.getLinkedPlayers();
    this.getUnlockedSpecialAvatars();
  }


  getServerLong(server) {
    for (const area of this.servers) {
      if (area.SHORT === server) {
        return area.LONG;
      }
    }
  }

  titleCaseWord(word: string) {
    if (!word) {
      return word;
    }
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

  getExperienceAtlevel(level: number) {
    let total = 0.0;
    for (let i = 1; i < level; i++) {
      total += Math.floor(i + 300 * Math.pow(2, i / 7.0));
    }
    return Math.floor(total / 4);
  }


  getPercent(player) {
    let totalExpForNextLevel = this.getExperienceAtlevel(player.total_lvl + 1);
    let totalExpForThisLevel = this.getExperienceAtlevel(player.total_lvl);
    let expBetweenLevels = totalExpForNextLevel - totalExpForThisLevel;
    let expFromLevel = player.total_exp - totalExpForThisLevel;

    return (this.roundNum((expFromLevel / expBetweenLevels) * 100)).toString() + '%';
  }

  getUnlockedAvatars() {
    return this.djangoClientService.getLevelAvatars().subscribe((data: LevelAvatar[]) => {
      this.selectableAvatars = data;
    });
  }

  getUnlockedSpecialAvatars() {
    return this.djangoClientService.getSpecialAvatars().subscribe((data: LevelAvatar[]) => {
      this.selectableSpecialAvatars = data;
    });
  }


  changeAvatar(avatar) {

  }

  get diagnostic() {
    return JSON.stringify(this.model);
  }


  onSubmit() {
    this.submitted = true;
  }

  getLinkedPlayers() {
    return this.djangoClientService.getLinkedPlayer().subscribe((data: LinkedPlayer[]) => {
      this.linkedplayers = data;
      if (this.linkedplayers) {
        if (this.linkedplayers.length > 0) {
          for (const linkedplayer of this.linkedplayers) {
            if (linkedplayer.status === 'Unapproved') {
              this.getTokenApi(linkedplayer);
            }
          }
          this.getUnlockedAvatars();
        }
      }
      this.submitted = false;
    });
  }

  getTokenApi(player) {
    return this.djangoClientService.getLinkedPlayerToken(player.pk).subscribe((data: LinkedPlayerToken) => {
      player.token = data.token;
    });
  }

  newSuggestion() {
    this.djangoClientService.newLinkedPlayer(this.model).subscribe((data: any) => {
      this.getLinkedPlayers();
    });
  }

  getTooltip(pk: number) {
    return this.sanitizer.bypassSecurityTrustHtml(`Hello <span style="color: red"> World</span>`);
  }

  mouseEnter(avatar) {
    this.hoveredAvatar = avatar;
  }

  mouseLeave() {
    this.hoveredAvatar = new LevelAvatar();
  }

  avatarChangeTo(avatar: LevelAvatar) {
    this.djangoClientService.setLevelAvatars(avatar).subscribe((data: any) => {
      this.update.emit(true);
    });
  }

  roundNum(number: number) {
    return Math.round(number * 100) / 100;
  }

  format(n) {
    const sep = "."; // Default to period as decimal separator
    const decimals = 2; // Default to 2 decimals

    return n.toLocaleString().split(sep)[0]
      + sep
      + n.toFixed(decimals).split(sep)[1];
  }

  avatarSpecialChangeTo(avatar: LevelAvatar) {
    this.djangoClientService.setSpecialAvatars(avatar).subscribe((data: any) => {
      this.update.emit(true);
    });
  }
}
