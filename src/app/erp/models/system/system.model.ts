export class MaintenanceMessageModel {
    public Message: string;
    public MessageType: string;
  }
  
  export class SystemMessagesResponse {
    MaintenanceMessage: MaintenanceMessageModel;
    IsOutOfOffice: boolean;
    // Notifications: NotificationItem[];
  }

  

  




  
  export class MenusModel {
    public Name: string;
    public Icon: string;
    public IsAvailable: boolean;
  }
  
  export class ConfigData {
    public SystemConfigData: SystemConfigResponse;
    public UserInfo: string;
  }
  
  export class SystemConfigResponse {
    public TopMenuItems: TopMenuItem[];
    public RoutePermissions: RoutePermission[];
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