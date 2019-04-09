import {Injectable, Injector} from '@angular/core';
import {AuthService} from './auth.service';
import {HttpErrorResponse, HttpInterceptor} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) {
  }

  intercept(req, next) {
    let authService = this.injector.get(AuthService);
    let tokenizedReq = req.clone({});
    if (authService.loggedIn()) {
      tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authService.getToken()}`,
        }
      });
    }
    return next.handle(tokenizedReq).pipe(tap(
      () => {
      },
      (error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401 && !authService.verifiying) {
            console.log('got error');
            authService.verifyToken();
          }
        }
      }
      )
    );
  }
}
