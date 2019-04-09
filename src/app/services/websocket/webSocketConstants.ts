import {Injectable} from '@angular/core';

enum WSActions {
  // Used for testing, it'll simply echo the message received back to the sender
  EchoMessage = -1,
// Used when there is an error getting data from postgres or through the api
  WebSocketError = 0,
  ChatMessage = 1,
  Authenticate = 2,
  Notification = 3,
  SignLocation = 4,
  IrregularityLocation = 5,
  ListOrders = 6,
  AssignedOrders = 7,
  SetLocationStatus = 8,
  NewOrder = 9,
  UpdatedOrder = 10,
  UpdatedDriverLocation = 11,
}

@Injectable()
export class WebSocketConstants {
  public WSActions = WSActions;
}
