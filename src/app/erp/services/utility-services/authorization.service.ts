import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { filter } from 'lodash';
import { CookieService } from 'ngx-cookie-service';
import { CurrentUser } from '../../models/login/login.model';
import { ERPRoutes } from '../../models/routes/erp-routes';

@Injectable()
export class AuthorizationService {
  AllowAnonymousUrls: string[];

  constructor(private cookieService: CookieService, private router: Router) {
    this.AllowAnonymousUrls = [
      '/' + ERPRoutes.Login,
      '/login/' + ERPRoutes.ForgotPassword,
      '/login/' + ERPRoutes.ResetPassword,
    ];
  }

  currentUserProfile(): CurrentUser {
    const userData = this.getCurrentUserFromCookie();
    return userData;
  }

  userHasRole(role: string): boolean {
    const userData = this.getCurrentUserFromCookie();
    if (!userData) {
      return false;
    }
    const roles: string[] = userData.userRoles.split(',');
    return roles.some((x) => x === role);
  }

  userAllowResource(resourceCode: string | string[]) {
    const userData = this.getCurrentUserFromCookie();
    if (!userData) {
      return false;
    }

    const permissions = filter(userData.Permissions, (p: any) => {
      return _.includes(resourceCode, p.ResourceCode);
    });
    return permissions.length > 0;
  }

  getCurrentUserFromCookie() {
    const currentUser = this.cookieService.get('currentUser');
    if (currentUser) {
      return JSON.parse(currentUser);
    }
    return null;
  }

  public isAllowAnonymous() {
    let route = this.router.url;
    if (this.router.url.indexOf('?') > -1) {
      route = this.router.url.substr(0, this.router.url.indexOf('?'));
    }
    if (this.AllowAnonymousUrls.indexOf(route) > -1) {
      return true;
    }
    return false;
  }
}
