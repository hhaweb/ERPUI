import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject } from 'rxjs';
import { APIUrls } from '../../models/api-url/api-urls';
import { SystemConfigResponse } from '../../models/config/config.model';
import { HttpResponseData } from '../../models/config/response.model';
import { TokenResponse } from '../../models/login/login.model';
import { ERPRoutes } from '../../models/routes/erp-routes';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // this subscription will fire when user is logged in or logged out
  public UserLoggedIn = new Subject<boolean>();
  constructor(    
    private httpClient: HttpClient,
    private router: Router,
    private cookieService: CookieService) {
      this.UserLoggedIn.next(false);
     }

     loginToWebApi(userName: string, password: string): Observable<TokenResponse> {
      const userData = {
        username: encodeURIComponent(userName),
        password: encodeURIComponent(password)
      }
      console.log('EncodeUri password= ',encodeURIComponent(password));
      return this.httpClient.post<TokenResponse>(APIUrls.SystemUrl.Login, userData);
    }

    isAuthorized(): boolean {
      const authorizationData = this.cookieService.get('authorizationData'); 
      return authorizationData ? true : false;
    }

    getSystemConfig(): Observable<SystemConfigResponse> {
      return this.httpClient.get<SystemConfigResponse>(
        APIUrls.SystemUrl.GetSystemConfig
      );
    }

    logout() {
      this.userLogout().subscribe(
        (response: HttpResponseData) => {
          if (!response.status) {
            console.log('logout unsuccessful');
          }
        },
        (err: any) => {
          console.log(err);
        }
      );
      this.UserLoggedIn.next(false);
      this.cookieService.delete('authorizationData');
      void this.router.navigate(['/' + ERPRoutes.Login]);
    }
  
    userLogout() {
      return this.httpClient.post(APIUrls.SystemUrl.Logout, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        withCredentials: true,
      });
    }
}
