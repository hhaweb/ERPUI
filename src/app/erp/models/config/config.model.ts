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
    public label: string;
    public icon: string;
    public items: MenuItems[];
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