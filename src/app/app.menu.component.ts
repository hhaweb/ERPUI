import { ConfigData } from './erp/models/config/config.model';
import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { ConfigDataLoadedEvent } from './erp/share/config-data-loaded.event';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(
        public appMain: AppMainComponent,
        private configDataLoadedEvent: ConfigDataLoadedEvent) {}

    ngOnInit() {
        const that = this;
        this.configDataLoadedEvent.on().subscribe((data: ConfigData) => {
          that.model = data.SystemConfigData.menus;
          console.log('enter menu', that.model);
        });
        if (
            this.appMain.configData &&
            this.appMain.configData.SystemConfigData.menus
          ) {
            that.model = this.appMain.configData.SystemConfigData.menus;
          }
    }
}
