import { environment } from 'src/environments/environment';
const controllerName = 'sale';
const baseUrl: string = environment.API_BASE + '/' + controllerName + '/';
export const SaleUrls = {
    saleList: baseUrl + 'sale-list',
    saveSale: baseUrl + 'sale-save',
    deleteSale: baseUrl + 'delete-sale',
    getSaleById: baseUrl + 'get-sale-by-id',
    exportSaleHeader: baseUrl + 'export-sale-header-list',
    paymentList: baseUrl + 'payment-list',
    savePayment: baseUrl + 'save-payment',
    deletePayment: baseUrl + 'delete-payment',
    exportPayment: baseUrl + 'export-payment',
    getPaymentById: baseUrl + 'get-payment-id',
}