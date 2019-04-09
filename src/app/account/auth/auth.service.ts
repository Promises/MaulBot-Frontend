import {LOCAL_STORAGE, WINDOW} from '@ng-toolkit/universal';
import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

import * as moment from 'moment';
import {environment} from '../../../environments/environment';
import {WebSocketService} from '../../services/websocket/webSocket.service';
import {WebSocketConstants} from '../../services/websocket/webSocketConstants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public suffix = environment.API_URL;

  private _registerUrl = this.suffix + '/api/user/register';
  private _loginUrl = this.suffix + '/api/token/';
  private _refreshUrl = this.suffix + '/api/token/refresh/';
  private _verifyUrl = this.suffix + '/api/token/verify/';
  public verifiying = false;
  private jwToken: any;
  public plainToken: string;
  public wsIncommingMessages;


  constructor(@Inject(WINDOW) private window: Window,
              @Inject(LOCAL_STORAGE) private localStorage: any,
              private http: HttpClient,
              private router: Router,
              private webSocketService: WebSocketService,
              private webSocketConstants: WebSocketConstants) {
    if (this.getToken()) {
      // Load token from localStorage
      this.wsIncommingMessages = this.webSocketService.incommingMessages;

      const token = this.getToken();
      // Parse token to JWTToken object without using extra dependencies
      this.jwToken = this.parsePlainJWT(token);
      this.plainToken = token;
      // Setup Websocket subscription to send a message on connect
      this.webSocketService.setAuth(this);
      this.webSocketService.createSocket();
      // Request user data from backend'
      if (!this.isTokenExpired()) {
        this.setLoginStatus(true);
      } else {
        this.logoutUser();
      }

    }
    this.webSocketService.incommingMessages.subscribe((data) => {
      if (data.Action === this.webSocketConstants.WSActions.Authenticate) {
        this.webSocketService.statusChanged.next(true);
        this.webSocketService.authenticatedSocket = true;
      }
    });

    this.webSocketService.connectionStatusChanged.subscribe((isConnected) => {
      if (isConnected) {
        // this.webSocketService.send('I am connected!', 1);
        this.webSocketService.send(this.plainToken, this.webSocketConstants.WSActions.Authenticate);

      }
    });
    this.webSocketService.statusChanged.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.webSocketService.send('I am connected!', 1);
      }
    });

  }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }

  logoutUser() {
    this.localStorage.removeItem('token');
    this.localStorage.removeItem('refreshtoken');
    this.localStorage.removeItem('tokenExpire');
    this.localStorage.removeItem('refreshtokenExpire');
    this.localStorage.removeItem('username');
    this.localStorage.removeItem('staff');
    this.router.navigate(['/']);
  }

  loggedIn() {
    return !!this.localStorage.getItem('token');
  }

  verifyTokenCall(payload) {
    return this.http.post<any>(this._verifyUrl, payload);
  }

  verifyToken() {
    this.verifiying = true;
    const payload = {'token': this.getToken()};
    this.verifyTokenCall(payload).subscribe(
      res => {
        if (!res.detail) {
          this.window.location.reload();
        } else {
          this.refreshToken();
        }
      },
      error1 => {
        this.refreshToken();
      }
    );
  }


  refreshTokenCall(payload) {
    return this.http.post<any>(this._refreshUrl, payload);
  }

  parsePlainJWT(str: string) {
    return JSON.parse(window.atob(str.split('.')[1]));
  }


  refreshToken() {
    const payload = {'refresh': this.getRefreshToken()};
    this.refreshTokenCall(payload).subscribe(
      res => {
        if (res.access) {
          const tokenJWT = res.access;
          const jwtData = tokenJWT.split('.')[1];
          const decodedJwtJsonData = this.window.atob(jwtData);
          const decodedJwtData = JSON.parse(decodedJwtJsonData);
          this.localStorage.setItem('token', tokenJWT);
          this.localStorage.setItem('tokenExpire', decodedJwtData.exp);
          this.localStorage.setItem('username', decodedJwtData.name);
          this.localStorage.setItem('staff', decodedJwtData.staff);
          this.verifiying = false;
          this.window.location.reload();

        } else {
          this.logoutUser();
          this.verifiying = false;

        }
      },
      error1 => {
        this.logoutUser();
        this.verifiying = false;
      }
    );
  }

  isAdmin() {
    const staffFromStorage = this.localStorage.getItem('staff');
    const isStaff = JSON.parse(staffFromStorage);
    return isStaff;
  }

  getToken() {
    return this.localStorage.getItem('token');
  }

  getRefreshToken() {
    return this.localStorage.getItem('refreshtoken');
  }

  getTokenExpirationDate(): Date {
    const date = new Date(0);
    date.setUTCSeconds(this.jwToken.exp);
    return date;
  }

  isTokenExpired(): boolean {
    const date = this.getTokenExpirationDate();
    if (date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }

  getRefreshTokenExpiration() {
    const expiration = this.localStorage.getItem('refreshtokenExpire');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  private setLoginStatus(b: boolean) {
    return;
  }
}
