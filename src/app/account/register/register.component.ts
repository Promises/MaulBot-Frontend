import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Comment, SignUpError} from '../../services/django-client/Classes';
import {Router} from '@angular/router';
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error: SignUpError;


  registerUserData = {
    'email': '',
    'username': '',
    'password': '',
    'password1': '',
  };
  formError: String;

  constructor(private _auth: AuthService, private router: Router, private titleService: Title, private meta: Meta) {
  }

  ngOnInit() {
    this.titleService.setTitle('Register - Maulbot');
    this.meta.addTag({ name: 'description', content: 'Sign up to leave suggestions, comment on updates and patches.' });
    this.meta.addTag({ name: 'author', content: 'Henning Berge' });
    this.meta.addTag({ name: 'author', content: 'Promises' });
    this.meta.addTag({ name: 'author', content: 'runi95' });
    this.meta.addTag({ name: 'keywords', content: 'Warcraft, Maul, Warcraft 3, MaulBot, botmod, reimagined, wintermaul, warcraftmaul, wcm' });
  }

  onSubmit() {

  }

  registerUser() {
    if (this.registerUserData.password !== this.registerUserData.password1) {
      this.formError = 'The passwords do not match.';
    } else {
      this._auth.registerUser(this.registerUserData)
        .subscribe(
          res => {
            this.router.navigate(['/login']);
          },
          err => {
            this.error = err.error;
          }
        );
    }

  }
}
