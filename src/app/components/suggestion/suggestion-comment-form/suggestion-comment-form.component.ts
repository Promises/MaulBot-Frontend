import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DjangoClientService} from '../../../services/django-client/django-client.service';
import {NewComment} from '../../../services/django-client/Classes';

@Component({
  selector: 'app-suggestion-comment-form',
  templateUrl: './suggestion-comment-form.component.html',
  styleUrls: ['./suggestion-comment-form.component.css']
})
export class SuggestionCommentFormComponent {

  @Input() pk: number;
  @Input() updating: boolean;


  formComment = new NewComment();

  submitted = false;
  @Output() update = new EventEmitter<number>();

  constructor(private djangoClientService: DjangoClientService) {
  }

  onSubmit() {
    this.submitted = true;
  }

  get diagnostic() {
    return JSON.stringify(this.formComment);
  }

  newComment() {
    // console.log(this.formComment);
    this.djangoClientService.newSuggestionComment(this.formComment, this.pk).subscribe((data: any) => {
      this.formComment = new NewComment();
      this.update.emit(this.pk);
      this.submitted = false;
    });
  }
}
