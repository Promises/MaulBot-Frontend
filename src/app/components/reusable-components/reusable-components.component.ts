import {AfterViewInit, Component, OnInit} from '@angular/core';
import {BlogPostForm} from "../../services/django-client/Classes";
import {MarkdownParserService} from "../../services/markdown-parser/markdown-parser.service";
import {environment} from "../../../environments/environment";
import {HttpClient} from "../../../../node_modules/@angular/common/http";
import 'brace/index';
declare let ace: any;
import 'brace/theme/dracula';
import 'brace/mode/sql';



@Component({
  selector: 'app-reusable-components',
  templateUrl: './reusable-components.component.html',
  styleUrls: ['./reusable-components.component.css']
})
export class ReusableComponentsComponent implements OnInit, AfterViewInit {

  model = new BlogPostForm('', '', null);
  file = '/static/ang/assets/Markdown-Cheatsheet.md';
  plainFile: string;
  options: any = {maxLines: 1000, printMargin: false};

  constructor(private mdService: MarkdownParserService,
              private http: HttpClient
  ) {
    if (!environment.production) {
      this.file = '/assets/Markdown-Cheatsheet.md';
    }
  }


  ngOnInit() {
    this.getMarkDown();

  }


  onChange(code) {
    console.log("new code", code);
  }

  getMarkDown() {
    this.http.get(this.file, {responseType: 'text'}).subscribe(data => {
      this.plainFile = data;
    });
  }

  onSubmit() {
  }

  convert(input: string) {
    return this.mdService.convert(input);
  }

  ngAfterViewInit() {
    const Range = ace.require('ace/range')['Range'];

  }

}
