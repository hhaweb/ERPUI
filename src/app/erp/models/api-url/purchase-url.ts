import { environment } from 'src/environments/environment';
const controllerName = 'purchase';
const baseUrl: string = environment.API_BASE + '/' + controllerName + '/';
export const PurchaseUrls  = {
    savePurchase: baseUrl + 'save-purchase',
    deletePurchase: baseUrl + 'delete-purchase',
    getPurchaseHeaderByLazyLoad: baseUrl + 'get-purchase-header-lazy',
    getPurchaseById: baseUrl + 'get-purchase-id',

    savePurchasePayment: baseUrl + 'save-purchase-payment',
    deletePurchasePayment: baseUrl + 'delete-purchase-payment',
    getPurchasePaymentByLazyLoad: baseUrl + 'get-purchase-payment-lazy',
    getPurchasePaymentById: baseUrl + 'get-purchase-payment-id',

    getAllClosing: baseUrl + 'get-all-closing',
}