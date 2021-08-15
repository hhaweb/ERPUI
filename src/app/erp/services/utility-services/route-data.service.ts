import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable()
export class RouteDataService {
  routeName: string;
  serviceData: any;
  previousRoute: string[] = [];

  constructor(private router: Router) {
    router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((e) => {
        this.previousRoute.push(e.url);
        if (this.previousRoute.length > 10) {
          // only keep last 10 url
          this.previousRoute.splice(0, this.previousRoute.length - 10);
        }
      });
  }

  public get<T>(routeName: string): T {
    if (routeName === this.routeName) {
      const returnObject = this.serviceData as T;

      // clear existing data to make sure, it is ready for next route
      this.routeName = null;
      this.serviceData = null;
      return returnObject;
    }
    return null;
  }

  public set(routeName: string, serviceData: any) {
    this.routeName = routeName;
    this.serviceData = serviceData;
  }
}
