import { LOCAL_STORAGE , WINDOW} from '@ng-toolkit/universal';
import {Component, OnInit, Inject} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {LoginError} from '../../services/django-client/Classes';
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {
    'username': '',
    'password': '',
  };
  error: LoginError;

  constructor(@Inject(WINDOW) private window: Window, @Inject(LOCAL_STORAGE) private localStorage: any, private _auth: AuthService,
              private router: Router,
              private titleService: Title, private meta: Meta) {
  }

  ngOnInit() {
    this.titleService.setTitle('Login - Maulbot');
    this.meta.addTag({ name: 'description', content: 'Log in to access extra Warcraft Maul content.' });
    this.meta.addTag({ name: 'author', content: 'Henning Berge' });
    this.meta.addTag({ name: 'author', content: 'Promises' });
    this.meta.addTag({ name: 'author', content: 'runi95' });
    this.meta.addTag({ name: 'keywords', content: 'Warcraft, Maul, Warcraft 3, MaulBot, botmod, reimagined, wintermaul, warcraftmaul, wcm' });
  }


  loginUser() {
    this._auth.loginUser(this.loginUserData).subscribe(
      res => {
        const tokenJWT = res.access;
        const refreshJWT = res.refresh;
        let jwtData = tokenJWT.split('.')[1];
        let decodedJwtJsonData = this.window.atob(jwtData);
        let decodedJwtData = JSON.parse(decodedJwtJsonData);
        this.localStorage.setItem('token', tokenJWT);
        this.localStorage.setItem('tokenExpire', decodedJwtData.exp);
        this.localStorage.setItem('username', decodedJwtData.name);
        this.localStorage.setItem('staff', decodedJwtData.staff);
        jwtData = refreshJWT.split('.')[1];
        decodedJwtJsonData = this.window.atob(jwtData);
        decodedJwtData = JSON.parse(decodedJwtJsonData);
        this.localStorage.setItem('refreshtoken', refreshJWT);
        this.localStorage.setItem('refreshtokenExpire', decodedJwtData.exp);
        this.router.navigate(['/']);
      },
      error1 => this.error = error1.error
    );
  }

}
