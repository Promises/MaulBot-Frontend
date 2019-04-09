import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SuggestionDetail, UpdateSuggestion} from '../django-client/Classes';
import {DjangoClientService} from '../django-client/django-client.service';
import {AuthService} from '../../account/auth/auth.service';

@Component({
  selector: 'app-suggestion-modal',
  templateUrl: './suggestion-modal-content.html',
  styleUrls: ['./suggestion-modal-content.css']
})
export class SuggestionModalContent implements OnInit {
  @Input() id;
  @Output() event = new EventEmitter<boolean>();
  selectedSuggestion = new SuggestionDetail(0, 'Loading', '', '', '', '', 0, '', '', '', null);
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

  constructor(public activeModal: NgbActiveModal,
              public _authService: AuthService,
              private djangoClientService: DjangoClientService) {
  }

  ngOnInit() {
    console.log(this.id);
    this.getSuggestion();
  }

  getSuggestion() {
    this.djangoClientService.getSuggestionDetail(this.id).subscribe((data: SuggestionDetail) => {
      this.selectedSuggestion = data;
      this.model = new UpdateSuggestion(this.selectedSuggestion.status, this.selectedSuggestion.pk);
    });
  }

  updateSelectedSuggestion(event: number) {
    this.commentUpdating = true;
    this.djangoClientService.getSuggestionDetail(event).subscribe((data: SuggestionDetail) => {
      this.selectedSuggestion = data;
      this.commentUpdating = false;
    });
  }

  updateSuggestion() {
    this.djangoClientService.updateSuggestionStatus(this.model).subscribe((data: any) => {
      this.djangoClientService.getSuggestionDetail(this.selectedSuggestion.pk).subscribe((data2: SuggestionDetail) => {
        this.selectedSuggestion = data2;
        this.event.emit(true);
      });
    });
  }
}
