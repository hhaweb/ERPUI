import { ERPRoutes } from './../../models/routes/erp-routes';
import { AppMainComponent } from './../../../app.main.component';
import { ConfigData, SystemConfigResponse } from './../../models/config/config.model';
import { ConfigDataLoadedEvent } from './../../share/config-data-loaded.event';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from './../../services/utility-services/authentication.service';
import { ConfirmationService } from 'primeng/api';
import { ErpUtilityService } from './../../services/utility-services/erp-utility.service';
import { FullScreenService } from './../../services/utility-services/full-screen.service';
import { AppComponent } from './../../../app.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TokenResponse } from '../../models/login/login.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userName: string;
  password: string;
  webApiToken: TokenResponse;
  returnUrl: string;


  constructor(
    private router: Router,
    public appMain: AppMainComponent,
    private activatedRoute: ActivatedRoute,
    private fullScreenService: FullScreenService,
    private erpUtilityService: ErpUtilityService,
    private confirmationService: ConfirmationService,
    private authenticationService: AuthenticationService,
    private cookieService: CookieService,
    private configDataLoadedEvent: ConfigDataLoadedEvent
  ) { }

  ngOnInit(): void {
  }

  emailBlur() {
    // if user didn't enter domain, append the brennan domain
    if (this.userName && this.userName.indexOf('@') < 0) {
      this.userName = this.userName + '@brennanit.com.au';
    }
    if (this.userName) {
      this.userName = this.userName.toLowerCase();
    }
  }

  ngAfterViewInit() {
    this.fullScreenService.fire();
  }

  login() {
    if (!this.userName || !this.password) {
      this.erpUtilityService.showError(
        'Invalid Input',
        'Please enter user name and password.'
      );
      return;
    }

    const that = this;
    this.erpUtilityService.showLoading('Logging in ...');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const res = this.authenticationService
      .loginToWebApi(this.userName, this.password)
      .subscribe(
        (response: TokenResponse) => {
          that.erpUtilityService.hideLoading();
          that.webApiToken = response;
          const today = new Date();
          const hours = today.getHours() + 1;
          that.authenticationService.UserLoggedIn.next(true);
          const expirationDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            hours,
            today.getMinutes(),
            0,
            0
          );
          that.cookieService.set(
            'authorizationData',
            JSON.stringify({
              token: that.webApiToken.token,
              userName: that.webApiToken.userName,
            //  refreshToken: that.webApiToken.refresh_token,
              useRefreshTokens: false,
            }),
            expirationDate,
            '/'
          );
          const loadSystemConfig = this.authenticationService.getSystemConfig();
          forkJoin([loadSystemConfig]).subscribe(
            (data: any) => {
          
              const systemConfigResponse: SystemConfigResponse = data[0];
              this.appMain.configData = new ConfigData();
              this.appMain.configData.SystemConfigData = systemConfigResponse;
              const activeRouteReturn =
                this.activatedRoute.snapshot.queryParams.return;
              if (activeRouteReturn) {
                this.returnUrl = activeRouteReturn;
              } 
              // else if (currentUser.DefaultRoute) {
              //   this.returnUrl =
              //     currentUser.DefaultRoute === 'home/index'
              //       ? 'home'
              //       : currentUser.DefaultRoute;
              // } 
              else {
               // this.returnUrl = ERPRoutes.Home;
              }
              // this.cookieService.set(
              //   'currentUser',
              //   JSON.stringify(currentUser),
              //   1,
              //   '/'
              // );
              // this.cookieService.set(
              //   'routePermissions',
              //   JSON.stringify(systemConfigResponse.RoutePermissions),
              //   1,
              //   '/'
              // );
              this.configDataLoadedEvent.fire(this.appMain.configData);
              void this.router.navigate([ERPRoutes.Home]);
              return;
              }
            ,
            (error: any) => {
              this.erpUtilityService.showErrorModal('Error', error);
            }
          );
        },
        (err) => {
          console.log(err);
          let errorMessage = err.error
            ? err.error.error_description
            : 'Login Failed';
          that.erpUtilityService.hideLoading();
          if (err.error && err.error.error === 'account_locked') {
            // popup dialog
            errorMessage = err.error.error_description;
            that.erpUtilityService.showErrorModal(
              'Account Locked',
              errorMessage
            );
          } else if (
            err.error &&
            err.error.error === 'external_access_not_allowed'
          ) {
            errorMessage = 'External Acccess Not Allowed';
            that.erpUtilityService.showErrorModal(
              'Account Locked',
              errorMessage
            );
          } else {
            if (!errorMessage) {
              errorMessage = 'Unknow error. Please contact administrator';
            }
            that.erpUtilityService.showError('Failed', errorMessage);
          }
        }
      );
  }
}
