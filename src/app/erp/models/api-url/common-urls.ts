import { environment } from 'src/environments/environment';
const controllerName = 'common';
const baseUrl: string = environment.API_BASE + '/' + controllerName + '/';
export const CommonUtls = {
    getDropDownListByName: baseUrl + 'get-dropdown-list-by-name',
    getCustomerByName: baseUrl + 'get-customer-by-name',
    getTotalCredit: baseUrl + 'get-total-credit',
    getSupplierByName: baseUrl + 'get-supplier-by-name',
    getTotalPurchaseCredit: baseUrl + 'get-total-purchase-credit'
}