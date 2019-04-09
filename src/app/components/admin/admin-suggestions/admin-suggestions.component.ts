import {Component, OnInit, isDevMode} from '@angular/core';
import {AdminStatusBar, AdminSuggestion, Suggestion, SuggestionDetail, UpdateSuggestion} from '../../../services/django-client/Classes';
import {DjangoClientService} from '../../../services/django-client/django-client.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SuggestionModalContent} from '../../../services/suggestion-modal/suggestion-modal-content';
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-admin-suggestions',
  templateUrl: './admin-suggestions.component.html',
  styleUrls: ['./admin-suggestions.component.css']
})
export class AdminSuggestionsComponent implements OnInit {
  allSuggestions: AdminSuggestion;
  selectedSuggestion: any;
  typeOptions: string[] = ['Bug Report', 'Improvement', 'Unit Text Data', 'Other (Unspecified)'];
  types = [
    {'SHORT': 'BUG', 'LONG': 'Bug Report'},
    {'SHORT': 'IM', 'LONG': 'Improvement'},
    {'SHORT': 'TEXT', 'LONG': 'Unit Text Data'},
    {'SHORT': 'OTR', 'LONG': 'Other (Unspecified)'}
  ];
  statusOptions: string[] = ['Unapproved', 'Approved', 'Finished', 'Rejected', 'Needs Discussion'];
  statusTypes = [
    {'id': 0, 'status': 'Unapproved'},
    {'id': 1, 'status': 'Approved'},
    {'id': 2, 'status': 'Finished'},
    {'id': 3, 'status': 'Rejected'},
    {'id': 4, 'status': 'Needs Discussion'}
  ];
  closeResult: string;
  commentUpdating = false;
  model: UpdateSuggestion;

  constructor(private modalService: NgbModal,
              private djangoClientService: DjangoClientService,private titleService: Title, private meta: Meta) {
    this.titleService.setTitle('New Suggestions - Maulbot');
    this.meta.addTag({ name: 'description', content: 'Suggestions on maulbot.' });
    this.meta.addTag({ name: 'author', content: 'Henning Berge' });
    this.meta.addTag({ name: 'author', content: 'Promises' });
    this.meta.addTag({ name: 'author', content: 'runi95' });
    this.meta.addTag({ name: 'keywords', content: 'Warcraft, Maul, Warcraft 3, MaulBot, botmod, reimagined, wintermaul, warcraftmaul, wcm' });
  }

  updateSelectedSuggestion(event: number) {
    this.commentUpdating = true;
    this.djangoClientService.getSuggestionDetail(event).subscribe((data: SuggestionDetail) => {
      this.selectedSuggestion = data;
      this.commentUpdating = false;
    });
  }

  ngOnInit() {
    this.getSuggestions();
  }

  getSuggestions() {
    return this.djangoClientService.getAdminSuggestions().subscribe((data: AdminSuggestion) => {
      this.allSuggestions = data;
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

  openById(id) {
    const modalRef = this.modalService.open(SuggestionModalContent, {size: 'vl', backdropClass: 'SuggestionModal'});
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.event.subscribe((event) => {
      this.allSuggestions = null;
      this.getSuggestions();
    });
  }


  get diagnostic() {
    return JSON.stringify(this.model);
  }

  updateSuggestion() {
    this.djangoClientService.updateSuggestionStatus(this.model).subscribe((data: any) => {
      this.getSuggestions();
      this.djangoClientService.getSuggestionDetail(this.selectedSuggestion.pk).subscribe((data2: SuggestionDetail) => {
        this.selectedSuggestion = data2;
        this.model = new UpdateSuggestion(this.selectedSuggestion.status, this.selectedSuggestion.pk);
      });
    });
  }
}
