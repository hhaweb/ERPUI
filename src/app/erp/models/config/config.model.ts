export class ConfigData {
    public SystemConfigData: SystemConfigResponse;
    public UserInfo: string;
  }
  
  export class SystemConfigResponse {
    public menus: TopMenuItem[];
    public RoutePermissions: RoutePermission[];
    public ConfigValues: ConfigValuesModel;
  }
  
  export class ConfigValuesModel {
    public PSTVersion: string;
    public CurrentQuarter: string;
    public CurrentWeek: string;
    // public ExchangeRates: ExchangeRateModel[];
    // public SystemMaintenanceMessage: string;
  }
  
  export class TopMenuItem {
    public name: string;
    public route: string;
    public iconClass: string;
    public hasChildren: boolean;
    public itemState: string;
    public isExternal: boolean;
    public routeParam: any;
    public queryParam: any;
    public includeResources: string;
    public children: TopMenuItem[];
    constructor() {
      this.itemState = 'collapsed';
    }
  }

  export class MenuItems {
    public label: string;
    public icon: string;
    public routerLink: string[];
  }
  
  export class RoutePermission {
    public route: string;
    public resource: string;
  }
  

  export class LoadingBarModel {
    showLoading: boolean;
    loadingMessage: string;
    showCancelButton: boolean;
    cancelAction: () => void;
  }