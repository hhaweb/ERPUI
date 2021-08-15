import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigData } from '../models/config/config.model';
import { BroadcasterService } from '../services/utility-services/broadcaster.service';
@Injectable()
export class ConfigDataLoadedEvent {
  constructor(private broadcasterService: BroadcasterService) {}

  fire(data: any): void {
    this.broadcasterService.broadcast(ConfigDataLoadedEvent, data);
  }

  on(): Observable<ConfigData> {
    return this.broadcasterService.on<ConfigData>(ConfigDataLoadedEvent);
  }
}
