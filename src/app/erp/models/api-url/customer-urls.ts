import { environment } from 'src/environments/environment';
const controllerName = 'customer';
const baseUrl: string = environment.API_BASE + '/' + controllerName + '/';
export const CustomerUrls = {
    customerList: baseUrl + 'customer-list',
    saveCustomer: baseUrl + 'customer-save',
    deleteCustomer: baseUrl + 'customer-delete'
}