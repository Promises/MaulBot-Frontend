import {Component, OnInit} from '@angular/core';
import {Blogpost} from '../../../services/blogposts-service/blogpost';
import {BlogpostsService} from '../../../services/blogposts-service/blogposts.service';
import {PaginationserviceService} from '../../../services/paginationservice/paginationservice.service';
import {AuthService} from '../../../account/auth/auth.service';
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-blogposts',
  templateUrl: './blogposts.component.html',
  styleUrls: ['./blogposts.component.css']
})
export class BlogpostsComponent implements OnInit {

  posts: Blogpost[];

  pageSize = 7;
  collectionSize: number;
  page = 1;

  constructor(private blogpostService: BlogpostsService,
              private pagerService: PaginationserviceService,
              private _authService: AuthService,
              private titleService: Title,
              private meta: Meta) {
    this.titleService.setTitle('Updates - Maulbot');
    this.meta.addTag({ name: 'description', content: 'Updates/patchlogs to Warcraft Maul Reimagined, and community.' });
    this.meta.addTag({ name: 'author', content: 'Henning Berge' });
    this.meta.addTag({ name: 'author', content: 'Promises' });
    this.meta.addTag({ name: 'author', content: 'runi95' });
    this.meta.addTag({ name: 'keywords', content: 'Warcraft, Maul, Warcraft 3, MaulBot, botmod, reimagined, wintermaul, warcraftmaul, wcm' });
  }

  ngOnInit() {
    this.getBlogposts();

  }

  shouldShow(index: number): boolean {
    const indexPage: number = Math.floor(index / this.pageSize) + 1;
    if (this.page === indexPage) {
      return true;
    }

    return false;
  }

  getBlogposts() {
    return this.blogpostService.getUrl().subscribe((data: Blogpost[]) => {
      this.posts = data;
      this.collectionSize = this.posts.length;
    });
  }


}
