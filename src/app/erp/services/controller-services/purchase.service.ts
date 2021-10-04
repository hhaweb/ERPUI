import { APIUrls } from './../../models/api-url/api-urls';
import { HttpResponseData } from 'src/app/erp/models/config/response.model';
import { Observable } from 'rxjs';
import { ClosingModel, Purchase, PurchaseHeader, PurchaseListSearchModel, PurchasePayment, PurchasePaymentList } from './../../models/purchase/purchase';
import { JsUtilityService } from './../utility-services/js-utility.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private httpClient: HttpClient,
    private jsUtilityService: JsUtilityService) { }

    ///// Purchase API //////
    savePurchase(purchase: Purchase): Observable<HttpResponseData> {
      return this.httpClient.post<HttpResponseData>(
        APIUrls.PurchaseUrls.savePurchase,
        purchase
      );
    }  

    deletePurchase(purchaseId: number): Observable<HttpResponseData> {
      let params = new HttpParams();
      params = params.append('purchaseId', purchaseId.toString());
      return this.httpClient.get<HttpResponseData>(
        APIUrls.PurchaseUrls.deletePurchase, {params}
      );
    }

    getPurchaseById(purchaseId: number): Observable<Purchase> {
      let params = new HttpParams();
      params = params.append('purchaseId', purchaseId.toString());
      return this.httpClient.get<Purchase>(
        APIUrls.PurchaseUrls.getPurchaseById, {params}
      );
    }

    getPurchaseHeaderByLazyLoad(inputModel: PurchaseListSearchModel): Observable<PurchaseHeader> {
      return this.httpClient.post<PurchaseHeader>(
        APIUrls.PurchaseUrls.getPurchaseHeaderByLazyLoad,
        inputModel
      );
    }  

    ///// Purchase Payment API //////
    savePurchasePayment(purchasePayment: PurchasePayment): Observable<HttpResponseData> {
      return this.httpClient.post<HttpResponseData>(
        APIUrls.PurchaseUrls.savePurchasePayment,
        purchasePayment
      );
    }  

    deletePurchasePayment(purchaseId: number): Observable<HttpResponseData> {
      let params = new HttpParams();
      params = params.append('purchaseId', purchaseId.toString());
      return this.httpClient.get<HttpResponseData>(
        APIUrls.PurchaseUrls.deletePurchasePayment, {params}
      );
    }

    getPurchasePaymetnByLazyLoad(inputModel: PurchaseListSearchModel): Observable<PurchasePaymentList[]> {
      return this.httpClient.post<PurchasePaymentList[]>(
        APIUrls.PurchaseUrls.getPurchasePaymentByLazyLoad,
        inputModel
      );
    } 

    getPurchasePaymentById(purchasePaymentId: number): Observable<PurchasePayment> {
      let params = new HttpParams();
      params = params.append('purchasePaymentId', purchasePaymentId.toString());
      return this.httpClient.get<PurchasePayment>(
        APIUrls.PurchaseUrls.getPurchasePaymentById, {params}
      );
    }
    
    getClosingAll() {
      return this.httpClient.get<ClosingModel[]>(
        APIUrls.PurchaseUrls.getAllClosing);
    } 
}
