import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AccountInfo, ProfileInfo, Suggestion, SuggestionDetail} from "../../../services/django-client/Classes";
import {DjangoClientService} from "../../../services/django-client/django-client.service";
import {SuggestionModalContent} from "../../../services/suggestion-modal/suggestion-modal-content";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {
  private profileName: string;
  profileInfo: ProfileInfo;
  suggestions: Suggestion[];

  servers = [
    {'SHORT': 'connect-eur.classic.blizzard.com', 'LONG': 'Northerend (Europe)'},
    {'SHORT': 'connect-usw.classic.blizzard.com', 'LONG': 'Lordaeron (U.S. West)'},
    {'SHORT': 'connect-use.classic.blizzard.com', 'LONG': 'Azeroth (U.S. East)'},
    {'SHORT': 'connect-kor.classic.blizzard.com', 'LONG': 'Kalimdor (Asia)'},
    {'SHORT': 'connect.entgaming.net', 'LONG': 'WC3Connect'}
  ];

  constructor(private route: ActivatedRoute, private djangoClientService: DjangoClientService, private _router: Router, private modalService: NgbModal,private titleService: Title, private meta: Meta) {
    this.profileName = this.route.snapshot.paramMap.get('username');
    this.route.params.subscribe(params => {
      this.profileName = params['username'];
      this.profileInfo = null;
      this.suggestions = null;
      this.getProfileInfo(); // reset and set based on new parameter this time
    });
  }

  ngOnInit() {
    this.titleService.setTitle(`${this.profileName} - Maulbot`);
    this.meta.addTag({ name: 'description', content: `Viewing user profile of ${this.profileName}, on maulbot.com` });
    this.meta.addTag({ name: 'author', content: 'Henning Berge' });
    this.meta.addTag({ name: 'author', content: 'Promises' });
    this.meta.addTag({ name: 'author', content: 'runi95' });
    this.meta.addTag({ name: 'keywords', content: 'Warcraft, Maul, Warcraft 3, MaulBot, botmod, reimagined, wintermaul, warcraftmaul, wcm' });

  }

  getProfileInfo() {
    return this.djangoClientService.getProfileInfo(this.profileName).subscribe((data: ProfileInfo) => {
      this.profileInfo = data;
      this.getProfileSuggestions();
    }, (error1 => {
      this._router.navigate(['404'], {skipLocationChange: true})
    }));
  }

  getProfileSuggestions() {
    return this.djangoClientService.getProfileSuggestions(this.profileName).subscribe((data: Suggestion[]) => {
      this.suggestions = data;
    })
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

  getSuggestionColor(status: number): string {
    switch (status) {
      case 0: {
        return 'black';
      }
      case 1: {
        return 'GoldenRod';
      }
      case 2: {
        return 'green';
      }
      case 3: {
        return 'red';
      }
      case 4: {
        return 'teal';
      }
    }
  }

  getSuggestionClass(type: string): string {
    if (type === 'TEXT') {
      return 'fas fa-align-justify';
    } else if (type === 'BUG') {
      return 'fas fa-bug';
    } else if (type === 'IM') {
      return 'far fa-code-branch';
    } else if (type === 'OTR') {
      return 'fas fa-info';
    } else {
      return 'fas fa-question';
    }
  }

  openById(id) {
    const modalRef = this.modalService.open(SuggestionModalContent, {size: 'vl', backdropClass: 'SuggestionModal'});
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.event.subscribe((event) => {
      this.getProfileSuggestions();
    });
  }
}
