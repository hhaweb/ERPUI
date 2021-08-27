import { Component } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { AuthenticationService } from './erp/services/utility-services/authentication.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    constructor(
        public app: AppMainComponent,
        private authenticationService: AuthenticationService,
        ) {}
    logout() {
        this.authenticationService.logout();
    }
}
