import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Blogpost} from './blogpost';
import {environment} from '../../../environments/environment';

@Injectable()
export class BlogpostsService {
  suffix = environment.API_URL;

  apiUrl = this.suffix + '/api/blogPosts';

  constructor(private http: HttpClient) { }

  getUrl() {
    return this.http.get<Blogpost[]>(this.apiUrl);
  }

}
