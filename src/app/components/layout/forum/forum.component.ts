import {Component, OnInit} from '@angular/core';
import {DjangoClientService} from '../../../services/django-client/django-client.service';
import {ForumCategory} from '../../../services/django-client/Classes';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  categories: ForumCategory[] = [];

  constructor(private dcS: DjangoClientService) {
  }

  ngOnInit() {
    this.dcS.getForums().subscribe((data) => {
      this.categories = data;
    });
  }

}
