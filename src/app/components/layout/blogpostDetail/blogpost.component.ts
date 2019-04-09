import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {BlogDetail, GameTable, NewComment} from '../../../services/django-client/Classes';
import {DjangoClientService} from '../../../services/django-client/django-client.service';
import {Blogpost} from '../../../services/blogposts-service/blogpost';
import {AuthService} from '../../../account/auth/auth.service';
import {MarkdownParserService} from "../../../services/markdown-parser/markdown-parser.service";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.css']
})
export class BlogpostComponent implements OnInit {
  id: string;
  post: BlogDetail;
  filename: string;
  hasfile = false;
  formComment = new NewComment();
  submitted = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private djangoClientService: DjangoClientService,
    private _authService: AuthService,
    private mdService: MarkdownParserService,
    private titleService: Title,
    private meta: Meta) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getBlogDetail();

    this.meta.addTag({ name: 'keywords', content: 'Warcraft, Maul, Warcraft 3, MaulBot, botmod, reimagined, wintermaul, warcraftmaul, wcm' });
  }

  getBlogDetail() {
    return this.djangoClientService.getBlogDetail(this.id).subscribe((data: BlogDetail) => {
      this.post = data;
      this.post.text = this.mdService.convert(this.post.text);
      this.titleService.setTitle(`${this.post.title} - Maulbot`);
      this.meta.addTag({ name: 'description', content: `Update: ${this.post.title}` });
      this.meta.addTag({ name: 'author', content: this.post.username });


      if (this.post.mapfile) {
        this.post.filename = this.post.mapfile.substring(this.post.mapfile.lastIndexOf('/') + 1);
        this.hasfile = true;
      }
      this.submitted = false;
    });
  }

  onSubmit() {
    this.submitted = true;
  }

  newComment() {
    //console.log(this.formComment);
    this.djangoClientService.newBlogComment(this.formComment, this.id).subscribe((data: any) => {
      this.formComment = new NewComment();
      this.getBlogDetail();
    });
  }


}
