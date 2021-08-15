import { ConfigData } from './erp/models/config/config.model';
import { ERPRoutes } from './erp/models/routes/erp-routes';
import { Component, NgZone, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MenuService } from './app.menu.service';
import { PrimeNGConfig } from 'primeng/api';
import {AppComponent} from './app.component';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { ErpUtilityService } from './erp/services/utility-services/erp-utility.service';
import { AuthenticationService } from './erp/services/utility-services/authentication.service';
import { AuthorizationService } from './erp/services/utility-services/authorization.service';
import { FullScreenService } from './erp/services/utility-services/full-screen.service';
import { ConfigDataLoadedEvent } from './erp/share/config-data-loaded.event';
import { SystemMessagesLoadedEvent } from './erp/share/system-messages-loaded.event';

@Component({
    selector: 'app-main',
    templateUrl: './app.main.component.html',
    animations: [
        trigger('mask-anim', [
            state('void', style({
                opacity: 0
            })),
            state('visible', style({
                opacity: 0.8
            })),
            transition('* => *', animate('250ms cubic-bezier(0, 0, 0.2, 1)'))
        ])
    ]
})
export class AppMainComponent implements OnInit, OnDestroy{
    showFullScreen: boolean;
    menuClick: boolean;
    configData: ConfigData;
    userMenuClick: boolean;

    topbarUserMenuActive: boolean;

    menuActive: boolean;

    menuHoverActive: boolean;
    configDialogActive: boolean;
    constructor(
        private menuService: MenuService, 
        private primengConfig: PrimeNGConfig, 
        public app: AppComponent,
        private router: Router,
        public renderer: Renderer2,
        public zone: NgZone,
        private pageTitleService: Title,
        private cookieService: CookieService,
        private erpUtilityService: ErpUtilityService,
        private authenticationService: AuthenticationService,
        private authorizationService: AuthorizationService,
        private fullScreenService: FullScreenService,
        private configDataLoadedEvent: ConfigDataLoadedEvent,
        private systemMessagesLoadedEvent: SystemMessagesLoadedEvent) {}
    ngOnInit() {
        this.fullScreenService.on().subscribe(() => {
            this.showFullScreen = true;
          });
        if (this.authenticationService.isAuthorized()) {
            this.authenticationService.UserLoggedIn.next(true);
           // this.loadApplicationData();
          } else {
            // this.redirectToLogin();
          }
    }

    ngOnDestroy() {

    }

    changeOfRoutes() {
    this.pageTitleService.setTitle('Mini ERP');   
    this.showFullScreen = false;
    if (!this.authenticationService.isAuthorized()) {
        this.redirectToLogin();
    } 
    }

    redirectToLogin() {
        if (!this.authorizationService.isAllowAnonymous()) {
            // Generate returnUrl Parameters
            void this.router.navigate([ERPRoutes.Login], {
            queryParams: {
                return: this.router.routerState.snapshot.url,
            },
            });
        }
    }

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        } else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    onWrapperClick() {
        if (!this.menuClick) {
            this.menuActive = false;

            if (this.app.horizontal) {
                this.menuService.reset();
            }

            this.menuHoverActive = false;
            this.unblockBodyScroll();
        }

        if (!this.userMenuClick) {
            this.topbarUserMenuActive = false;
        }

        this.userMenuClick = false;
        this.menuClick = false;
    }

    onMenuButtonClick(event: Event) {
        this.menuClick = true;

        if (!this.app.horizontal || this.isMobile()) {
            this.menuActive = !this.menuActive;

            if (this.menuActive) {
                this.blockBodyScroll();
            } else {
                this.unblockBodyScroll();
            }
        }

        event.preventDefault();
    }

    onTopbarUserMenuButtonClick(event) {
        this.userMenuClick = true;
        this.topbarUserMenuActive = !this.topbarUserMenuActive;

        event.preventDefault();
    }

    onTopbarUserMenuClick(event) {
        this.userMenuClick = true;

        if (event.target.nodeName === 'A' || event.target.parentNode.nodeName === 'A') {
            this.topbarUserMenuActive = false;
        }
    }

    onTopbarSubItemClick(event) {
        event.preventDefault();
    }

    onSidebarClick(event: Event) {
        this.menuClick = true;
    }

    isMobile() {
        return window.innerWidth <= 1024;
    }

    isTablet() {
        const width = window.innerWidth;
        return width <= 1024 && width > 640;
    }

    onRippleChange(event) {
        this.app.ripple = event.checked;
        this.primengConfig.ripple = event.checked;
    }
 
}
