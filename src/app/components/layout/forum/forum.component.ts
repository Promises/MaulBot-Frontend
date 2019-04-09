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

  forums = [
    {
      name: 'Suggestions',
      description: 'Forum to discuss and post suggestions',
      threads: 12734,
      posts: 1947328,
      last_post: {
        title: 'TestPost',
        author: 'Promises',
        post_date: '2019-04-02T23:24:59.557254'
      }
    }, {
      name: 'Suggestions 2',
      description: 'Forum to discuss and post suggestions',
      threads: 12734,
      posts: 1947328,
      last_post: {
        title: 'TestPost',
        author: 'Promises',
        post_date: '2019-04-02T23:24:59.557254'
      }
    }, {
      name: 'Suggestions 3',
      description: 'Forum to discuss and post suggestions',
      threads: 12734,
      posts: 1947328,
      last_post: {
        title: 'TestPost',
        author: 'Promises',
        post_date: '2019-04-02T23:24:59.557254'
      }
    },
  ];

  constructor(private dcS: DjangoClientService) {
  }

  ngOnInit() {
    this.dcS.getForums().subscribe((data) => {
      this.categories = data;
    });
  }

}
