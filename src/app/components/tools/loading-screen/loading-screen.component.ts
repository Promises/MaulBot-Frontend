import {Component, OnInit} from '@angular/core';
import {DjangoClientService} from '../../../services/django-client/django-client.service';
import {LoadingScreen} from '../../../services/django-client/Classes';
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent implements OnInit {
  selectedFile: File = null;
  fileUploaded = false;
  uploadedLoadingScreens: LoadingScreen[];
  interval: any;
  errorResponse: any;

  constructor(private djangoClientService: DjangoClientService,private titleService: Title, private meta: Meta) {
  }

  ngOnInit() {
    this.titleService.setTitle(`Warcraft 3 Loading Screen Generator - Maulbot`);
    this.meta.addTag({ name: 'description', content: `Generate warcraft 3 ready to use loading screens from png files.` });
    this.meta.addTag({ name: 'author', content: 'Henning Berge' });
    this.meta.addTag({ name: 'author', content: 'Promises' });
    this.meta.addTag({ name: 'author', content: 'runi95' });
    this.meta.addTag({ name: 'keywords', content: 'Warcraft, Maul, Warcraft 3, MaulBot, botmod, reimagined, wintermaul, warcraftmaul, wcm' });

    this.getMyUploads();
    this.interval = setInterval(() => {
      this.getMyUploads();
    }, 30000);
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    this.errorResponse =  null;
    this.fileUploaded = true;
    const fd = new FormData();
    fd.append('original', this.selectedFile, this.selectedFile.name);
    this.djangoClientService.newLoadingScreen(fd).subscribe(res => {
      this.getMyUploads();
    }, error1 => {
      this.fileUploaded = false;
      this.errorResponse = error1.error;
    });
  }

  getMyUploads() {
    this.djangoClientService.getLoadingScreens().subscribe((data: LoadingScreen[]) => {
      this.uploadedLoadingScreens = data;
    });
  }
}
