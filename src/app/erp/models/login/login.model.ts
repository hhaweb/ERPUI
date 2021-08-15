import { TopMenuItem } from './../config/config.model';
export class TokenResponse {
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
    token: string;
    userEmail: string;
    id: string;
    userName: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
    type: string;
    roles: string[];
    TopMenuItem: string;
  }

  export class CurrentUser {
    public id: number;
    public username: string;
    public email: string;
  }
