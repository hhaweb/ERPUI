import { environment } from 'src/environments/environment';
const controllerName = 'customer';
const baseUrl: string = environment.API_BASE + '/' + controllerName + '/';
export const CustomerUrls = {
    customerList: baseUrl + 'customer-list',
    saveCustomer: baseUrl + 'customer-save',
    deleteCustomer: baseUrl + 'customer-delete',
    supplierList: baseUrl + 'supplier-list',
    saveSupplier: baseUrl + 'supplier-save',
    deleteSupplier: baseUrl + 'supplier-delete',
    getCustomerById: baseUrl + 'get-customer-by-id',
    getSupplierById: baseUrl + 'get-supplier-by-id',
}