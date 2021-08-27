import { environment } from 'src/environments/environment';
const controllerName = 'auth';
const baseUrl: string = environment.API_BASE + '/' + controllerName + '/';
export const SystemUrls = {
    Login: baseUrl + 'Login',
    Logout: baseUrl + 'Logout',
    GetSystemConfig: baseUrl + 'GetSystemConfig'
}