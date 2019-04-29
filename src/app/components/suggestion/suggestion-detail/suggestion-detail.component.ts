import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../account/auth/auth.service';
import {DjangoClientService} from '../../../services/django-client/django-client.service';
import {SuggestionDetail, UpdateSuggestion} from '../../../services/django-client/Classes';
import {ActivatedRoute} from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';
import {MarkdownParserService} from '../../../services/markdown-parser/markdown-parser.service';

@Component({
  selector: 'app-suggestion-detail',
  templateUrl: './suggestion-detail.component.html',
  styleUrls: ['./suggestion-detail.component.css']
})
export class SuggestionDetailComponent implements OnInit {
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
  @Input() id;
  @Input() modal = false;
  @Input() activeModal;

  constructor(private route: ActivatedRoute,
              private mdService: MarkdownParserService,
              public _authService: AuthService,
              public djangoClientService: DjangoClientService,
              private titleService: Title, private meta: Meta) {
    if (!this.modal) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.route.params.subscribe(params => {
        this.id = params['id'];
        this.selectedSuggestion = new SuggestionDetail(0, 'Loading', '', '', '', '', 0, '', '', '', null);
        this.getSuggestion(); // reset and set based on new parameter this time
      });
    }

  }

  ngOnInit() {
    if (this.modal) {
      console.log(this.id);
      this.getSuggestion();
    }
    this.titleService.setTitle('Suggestions - Maulbot');
    this.meta.addTag({name: 'author', content: 'Henning Berge'});
    this.meta.addTag({name: 'author', content: 'Promises'});
    this.meta.addTag({name: 'author', content: 'runi95'});
    this.meta.addTag({name: 'keywords', content: 'Warcraft, Maul, Warcraft 3, MaulBot, botmod, reimagined, wintermaul, warcraftmaul, wcm'});
  }

  getSuggestion() {
    this.djangoClientService.getSuggestionDetail(this.id).subscribe((data: SuggestionDetail) => {
      this.selectedSuggestion = data;
      this.titleService.setTitle(`${this.selectedSuggestion.title} - Maulbot`);
      this.meta.addTag({name: 'description', content: this.selectedSuggestion.text});


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
      });
    });
  }


  convert(input: string) {
    return this.mdService.convert(input);
  }

  clickLink() {
    if (this.modal) {
      this.activeModal.close('Close click');
    }
  }
}
