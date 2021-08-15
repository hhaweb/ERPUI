import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SystemMessagesResponse } from '../models/system/system.model';
import { BroadcasterService } from '../services/utility-services/broadcaster.service';


@Injectable()
export class SystemMessagesLoadedEvent {
  constructor(private broadcasterService: BroadcasterService) {}

  fire(data: any): void {
    this.broadcasterService.broadcast(SystemMessagesLoadedEvent, data);
  }

  on(): Observable<SystemMessagesResponse> {
    return this.broadcasterService.on<SystemMessagesResponse>(
      SystemMessagesLoadedEvent
    );
  }
}
