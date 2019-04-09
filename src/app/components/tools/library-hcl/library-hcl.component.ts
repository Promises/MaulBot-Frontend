import { WINDOW } from '@ng-toolkit/universal';
import {Component, OnInit, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-library-hcl',
  templateUrl: './library-hcl.component.html',
  styleUrls: ['./library-hcl.component.css']
})
export class LibraryHCLComponent implements OnInit {
  markdown: any;
  file = '/static/ang/assets/Wc3Libraries/HCL.txt';
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
