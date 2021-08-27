import { ItemService } from './erp/services/controller-services/item-service.service';
import { AppMenuitemComponent } from './app.menuitem.component';
import { ShareModule } from './erp/share/share.module';
import { AppMenuComponent } from './app.menu.component';
import { AppTopBarComponent } from './app.topbar.component';
import { LoadingComponent } from './erp/share/loading/loading.component';
import { ToastComponent } from './erp/share/toast/toast.component';
import { AppMainComponent } from './app.main.component';
import { AuthorizationService } from './erp/services/utility-services/authorization.service';
import { SystemMessagesLoadedEvent } from './erp/share/system-messages-loaded.event';
import { MenuService } from './app.menu.service';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
// PrimeNG Components for demos
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ToastModule} from 'primeng/toast';
import { HttpsAuthRequestInterceptor } from './erp/services/utility-services/auth.interceptor';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { TextMaskModule } from 'angular2-text-mask';
import { MomentModule } from 'angular2-moment';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from './erp/services/utility-services/authentication.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RouteDataService } from './erp/services/utility-services/route-data.service';
import { FullScreenService } from './erp/services/utility-services/full-screen.service';
import { BroadcasterService } from './erp/services/utility-services/broadcaster.service';
import { AppComponent } from './app.component';
import { ConfigDataLoadedEvent } from './erp/share/config-data-loaded.event';
import {
    FaIconLibrary,
    FontAwesomeModule,
  } from '@fortawesome/angular-fontawesome';
  import {
    faChartBar,
    faChartLine,
    faChevronCircleDown,
    faChevronCircleRight,
    faCog,
    faCogs,
    faCommentDollar,
    faCommentDots,
    faCopy,
    faDatabase,
    faExclamationTriangle,
    faFileContract,
    faFileInvoiceDollar,
    faFileUpload,
    faGreaterThan,
    faGreaterThanEqual,
    faHammer,
    faHandshake,
    faInfoCircle,
    faListUl,
    faMailBulk,
    faRetweet,
    faSearch,
    faServer,
    faSignInAlt,
    faTheaterMasks,
    faUpload,
    faDownload,
    faUserCircle,
    faUserFriends,
    faUserPlus,
    faUsers,
    faUserShield,
    faTasks,
    faFilter,
    faPlus,
    faTimes,
    faExpandArrowsAlt,
    faArrowAltCircleDown,
    faArrowAltCircleUp,
    faTrash,
    faClone,
    faFileExcel,
    faBookOpen,
    faEnvelope,
    faImages,
    faCalendarAlt,
    faFileDownload,
    faPen,
    faBars,
    faArrowsAlt,
    faUserEdit,
    faUser,
    faTimesCircle,
    faNewspaper,
    faProjectDiagram,
    faClipboard,
    faBullhorn,
    faHistory,
    faIdCard,
    faRegistered,
    faClock,
    faMinusCircle,
    faExchangeAlt,
  } from '@fortawesome/free-solid-svg-icons';
import { JsUtilityService } from './erp/services/utility-services/js-utility.service';
import {TooltipModule} from 'primeng/tooltip';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        AppRoutingModule,
        FontAwesomeModule,
        TextMaskModule, 
        NgIdleKeepaliveModule.forRoot(),
        MomentModule,
        ButtonModule,
        InputTextModule,
        InputTextareaModule,
        ToastModule,
        HttpClientModule,
        CardModule,
        ShareModule,
        TooltipModule
    ],
    declarations: [
        AppComponent,
        AppMainComponent,
        AppTopBarComponent,
        AppMenuComponent,
        AppMenuitemComponent,
    ],
    providers: [
      ItemService,
      JsUtilityService,
      MessageService,
      ConfirmationService,
      RouteDataService,
      CookieService,
      FullScreenService,
      AuthenticationService,
      AuthorizationService,
      BroadcasterService,
      ConfigDataLoadedEvent,
      SystemMessagesLoadedEvent,
      MenuService,  
      {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpsAuthRequestInterceptor,
          multi: true,
      },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(library: FaIconLibrary) {
        this.buildFontAwesomeLibrary(library);
      }

      buildFontAwesomeLibrary(library: FaIconLibrary) {
        // Add an icon to the library for convenient access in other components
        library.addIcons(faUpload);
        library.addIcons(faCog);
        library.addIcons(faCogs);
        library.addIcons(faUsers);
        library.addIcons(faUserCircle);
        library.addIcons(faUserFriends);
        library.addIcons(faUserPlus);
        library.addIcons(faUserShield);
        library.addIcons(faFileUpload);
        library.addIcons(faCommentDots);
        library.addIcons(faDatabase);
        library.addIcons(faFileInvoiceDollar);
        library.addIcons(faChartLine);
        library.addIcons(faChartBar);
        library.addIcons(faSearch);
        library.addIcons(faTheaterMasks);
        library.addIcons(faInfoCircle);
        library.addIcons(faRetweet);
        library.addIcons(faFileContract);
        library.addIcons(faListUl);
        library.addIcons(faSignInAlt);
        library.addIcons(faChevronCircleDown);
        library.addIcons(faChevronCircleRight);
        library.addIcons(faMailBulk);
        library.addIcons(faExclamationTriangle);
        library.addIcons(faHandshake);
        library.addIcons(faCopy);
        library.addIcons(faServer);
        library.addIcons(faGreaterThanEqual);
        library.addIcons(faGreaterThan);
        library.addIcons(faHammer);
        library.addIcons(faCommentDollar);
        library.addIcons(faRegistered);
        library.addIcons(faTasks);
        library.addIcons(faFilter);
        library.addIcons(faPlus);
        library.addIcons(faTimes);
        library.addIcons(faExpandArrowsAlt);
        library.addIcons(faArrowAltCircleDown);
        library.addIcons(faArrowAltCircleUp);
        library.addIcons(faTrash);
        library.addIcons(faClone);
        library.addIcons(faFileExcel);
        library.addIcons(faBookOpen);
        library.addIcons(faEnvelope);
        library.addIcons(faImages);
        library.addIcons(faCalendarAlt);
        library.addIcons(faDownload);
        library.addIcons(faFileDownload);
        library.addIcons(faPen);
        library.addIcons(faBars);
        library.addIcons(faArrowsAlt);
        library.addIcons(faUserEdit);
        library.addIcons(faUser);
        library.addIcons(faTimesCircle);
        library.addIcons(faNewspaper);
        library.addIcons(faProjectDiagram);
        library.addIcons(faClipboard);
        library.addIcons(faBullhorn);
        library.addIcons(faUpload);
        library.addIcons(faHistory);
        library.addIcons(faIdCard);
        library.addIcons(faFileContract);
        library.addIcons(faClock);
        library.addIcons(faMinusCircle);
        library.addIcons(faExchangeAlt);
      }
 }
