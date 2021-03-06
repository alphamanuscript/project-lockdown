import { EventEmitter } from 'events';
import { UserInvitationEventData } from '../user';
import { TransactionCompletedEventData } from '../payment';
import * as EventName from './event-name';

export interface Event<T> {
  time: Date,
  data: T;
}

export interface Listener<T> {
  (event: Event<T>): any;
}

export function createEvent<T>(data: T) {
  return {
      time: new Date(),
      data
  }; 
}

export class EventBus extends EventEmitter {
  constructor() {
    super();
  }

  emitUserInvitationCreated(eventData: UserInvitationEventData): void {
    this.innerEmit(EventName.USER_INVITATION_CREATED, eventData);
  }

  onUserInvitationCreated(listener: Listener<UserInvitationEventData>): void {
    this.on(EventName.USER_INVITATION_CREATED, listener);
  }

  emitTransactionCompleted(eventData: TransactionCompletedEventData): void {
    this.innerEmit(EventName.TRANSACTION_COMPLETED, eventData);
  }

  onTransactionCompleted(listener: Listener<TransactionCompletedEventData>): void {
    this.on(EventName.TRANSACTION_COMPLETED, listener);
  }

  private innerEmit<T>(eventName: string, data: T) {
    const event = createEvent(data);
    console.log('Event emitted', JSON.stringify(event, null, 2));
    this.emit(eventName, event);
  }
}
