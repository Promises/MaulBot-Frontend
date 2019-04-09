import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit , Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-library-mmd',
  templateUrl: './library-mmd.component.html',
  styleUrls: ['./library-mmd.component.css']
})
export class LibraryMMDComponent implements OnInit {
  markdown: any;
  file = '/static/ang/assets/Wc3Libraries/MMD.txt';
  plainFile: any;

  constructor(@Inject(WINDOW) private window: Window, private http: HttpClient) {

  }

  ngOnInit() {
    this.getMarkDown();
  }

  getMarkDown() {
    this.http.get(this.file, {responseType: 'text'}).subscribe(data => {
      this.plainFile = data;
      this.markdown = '```\n' + data + '\n```';
    });
  }

  downloadFILE() {
    this.window.open(this.file, '_blank');
  }

}
