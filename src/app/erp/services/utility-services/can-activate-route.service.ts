import { AuthorizationService } from './authorization.service';
import { RoutePermission } from './../../models/config/config.model';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ERPRoutes } from '../../models/routes/erp-routes';
import { AuthenticationService } from './authentication.service';
import { ErpUtilityService } from './erp-utility.service';

@Injectable()
export class CanActivateRoute implements CanActivate {
  constructor(
    private router: Router,
    private erpUtilityService: ErpUtilityService,
    private cookieService: CookieService,
    private authenticationService: AuthenticationService,
    private authorizationService: AuthorizationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authenticationService.isAuthorized()) {
      if (route.params) {
        const key = Object.keys(route.params);
        let newParamsRoute = route.data.newRoute;
        key.map((x) => {
          newParamsRoute = newParamsRoute.replace(':' + x, route.params[x]);
        });
        this.redirectToLogin(newParamsRoute);
      } else {
        this.redirectToLogin(route.data.newRoute);
      }

      return false;
    }

    let routePermissions: RoutePermission[] = [];
    const routePermissionsString = this.cookieService.get('routePermissions');
    if (routePermissionsString) {
      routePermissions = JSON.parse(routePermissionsString);
    } else {
      return true;
    }

    const routePermission = routePermissions.find(
      (x) => x.route === route.data.newRoute
    );
    if (routePermission) {
      const isAuthorize = this.authorizationService.userAllowResource(
        routePermission.resource
      );
      if (!isAuthorize) {
        this.erpUtilityService.showError(
          'Unauthorized Access',
          'You are not authorized to view the page'
        );
        void this.router.navigate([ERPRoutes.Login]);
        return false;
      }
    }
    return true;
  }

  redirectToLogin(newRoute) {
    if (!this.authorizationService.isAllowAnonymous()) {
      // Generate returnUrl Parameters
      void this.router.navigate([ERPRoutes.Login], {
        queryParams: {
          return: newRoute,
        },
      });
    }
  }
}
