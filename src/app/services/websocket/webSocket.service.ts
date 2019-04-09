import {Injectable} from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../account/auth/auth.service';
import {WebSocketConstants} from './webSocketConstants';


export class WebSocketMessage {
  constructor(
    public Action: number,
    public Message: any,
    public SenderID = 2,
  ) {
  }
}

@Injectable()
export class WebSocketService {
  public socket$: WebSocketSubject<any>;
  public incommingMessages = new Subject<WebSocketMessage>();
  public socketConnected = false;
  public authenticatedSocket = false;
  public statusChanged = new Subject<boolean>();
  public connectionStatusChanged = new Subject<boolean>();
  private openEvents = new Subject<Event>();
  private userAuth: AuthService;


  constructor(private webSocketConstants: WebSocketConstants) {
  }

  /**
   * Sets the local UserAuthService to avoid dependency loops
   * @param authService
   */
  public setAuth(authService) {
    this.userAuth = authService;
  }

  /**
   * Creates the socket itself, and sets up connection listener
   */
  public createSocket() {
    this.socket$ = webSocket({url: environment.CHAT_URL, openObserver: this.openEvents, /*protocol: this.userAuth.plainToken*/});
    this.openEvents
      .subscribe((data) => {
          switch (data.type) {
            case 'open':
              this.socketConnected = true;
              this.connectionStatusChanged.next(true);
              break;
            default:
              console.log(data.type);
              break;
          }
        },
        (err) =>
          () => console.warn('Completed!'));

    this.setupSubscription();
    this.incommingMessages.subscribe((msg) => {
    });
  }

  /**
   * sets up the main message subscription, in its own method to be able to be called recursively
   */
  public setupSubscription() {
    this.socket$
      .subscribe(
        (data) => this.incommingMessages.next(data),
        (err) => {
          this.handleError(err);
        },
        () => console.warn('Completed!')
      );
  }

  /**
   * handles bad responses and disconnections
   * at the moment it thinks everything is a disconnect
   * @param error
   */
  private handleError(error) {
    console.error(error);
    const localRef = this;
    // timeout with recursive call, to reopen connection if lost or unable to create connection
    setTimeout(function() {
      localRef.setupSubscription();
    }, 3000); // 3 seconds
  }

  /**
   * sends a message to the backend.
   * @param message
   * @param action
   */
  public send(message, action: number = 1): void {
    this.socket$.next(new WebSocketMessage(action, message));
  }


}
