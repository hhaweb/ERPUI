import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BroadcasterService } from './broadcaster.service';
@Injectable()
export class FullScreenService {
  constructor(private broadcasterService: BroadcasterService) {}

  fire(): void {
    this.broadcasterService.broadcast(FullScreenService);
  }

  on(): Observable<any> {
    return this.broadcasterService.on<any>(FullScreenService);
  }
}
