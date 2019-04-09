import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../../account/auth/auth.service';
import {Suggestion, SuggestionDetail} from '../../../services/django-client/Classes';
import {DjangoClientService} from '../../../services/django-client/django-client.service';
import {ActivatedRoute} from '@angular/router';
import {SuggestionModalContent} from '../../../services/suggestion-modal/suggestion-modal-content';
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent implements OnInit {

  selectedSuggestion: any;
  typeOptions: string[] = ['Bug Report', 'Improvement', 'Unit Text Data', 'Other (Unspecified)'];
  statusOptions: string[] = ['Unapproved', 'Approved', 'Finished', 'Rejected', 'Needs Discussion'];
  userSuggestions: Suggestion[];
  suggestions: Suggestion[];
  @ViewChild('theForm') theForm;

  closeResult: string;
  commentUpdating = false;

  constructor(private route: ActivatedRoute,
              private modalService: NgbModal,
              public _authService: AuthService,
              private djangoClientService: DjangoClientService,
              private titleService: Title,
              private meta: Meta) {
  }

  ngOnInit() {
    this.titleService.setTitle('Suggestions - Maulbot');
    this.meta.addTag({ name: 'description', content: `Give suggestions on how you want to see Warcraft Maul Reimagined in the future.` });
    this.meta.addTag({ name: 'author', content: 'Henning Berge' });
    this.meta.addTag({ name: 'author', content: 'Promises' });
    this.meta.addTag({ name: 'author', content: 'runi95' });
    this.meta.addTag({ name: 'keywords', content: 'Warcraft, Maul, Warcraft 3, MaulBot, botmod, reimagined, wintermaul, warcraftmaul, wcm' });

    this.showSuggestion();
    if (this._authService.loggedIn()) {
      this.getMySuggestions();
    }
    if (this.route.snapshot.paramMap.get('id')) {
      this.openById(this.route.snapshot.paramMap.get('id'));
    }

  }

  showSuggestion() {
    return this.djangoClientService.listSuggestions().subscribe((data: Suggestion[]) => this.suggestions = data);
  }

  getMySuggestions() {
    return this.djangoClientService.getMySuggestions().subscribe((data: Suggestion[]) => this.userSuggestions = data);
  }

  updateMySuggestions(event: boolean) {
    this.getMySuggestions();
  }

  updateSelectedSuggestion(event: number) {
    this.commentUpdating = true;
    this.djangoClientService.getSuggestionDetail(event).subscribe((data: SuggestionDetail) => {
      this.selectedSuggestion = data;
      this.commentUpdating = false;
    });
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

  onSubmit(): void {
  }

  // openById(id) {
  //   const modalRef = this.modalService.open(SuggestionModalContent, {size: 'vl', backdropClass: 'SuggestionModal'});
  //   modalRef.componentInstance.id = id;
  // }

  openById(id) {
    const modalRef = this.modalService.open(SuggestionModalContent, {size: 'vl', backdropClass: 'SuggestionModal'});
    modalRef.componentInstance.id = id;
    // modalRef.componentInstance.event.subscribe((event) => {
      // this.allSuggestions = null;
      // this.getSuggestions();
    // });
  }

}
