import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Suggestion, SuggestionForm} from '../../../services/django-client/Classes';
import {DjangoClientService} from '../../../services/django-client/django-client.service';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent{
  types = [
    {'SHORT': 'BUG', 'LONG': 'Bug Report'},
    {'SHORT': 'IM', 'LONG': 'Improvement'},
    {'SHORT': 'TEXT', 'LONG': 'Unit Text Data'},
    {'SHORT': 'OTR', 'LONG': 'Other (Unspecified)'}
  ];
  model = new SuggestionForm('', '', this.types[0].SHORT);

  submitted = false;
  @Output() update = new EventEmitter<boolean>();

  constructor(private djangoClientService: DjangoClientService) {
  }


  onSubmit() {
    this.submitted = true;
  }

  get diagnostic() {
    return JSON.stringify(this.model);
  }

  newSuggestion() {
    this.djangoClientService.newSuggestion(this.model).subscribe((data: any) => {
      this.update.emit(true);
    });
  }

  changeType(SHORT: string) {
    this.model.type = SHORT;
  }
}
