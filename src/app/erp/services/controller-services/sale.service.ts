import { Payment, PaymentList } from 'src/app/erp/models/sale/sale';
import { APIUrls } from './../../models/api-url/api-urls';
import { HttpResponseData } from './../../models/config/response.model';
import { Observable } from 'rxjs';
import { PaymentSearchModel, Sale, SaleHeader, SaleHeaderList, SaleListSearchModel } from './../../models/sale/sale';
import { JsUtilityService } from './../utility-services/js-utility.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  
  constructor( private httpClient: HttpClient,
    private jsUtilityService: JsUtilityService) { }


    saveSale(sale: Sale): Observable<HttpResponseData> {
      return this.httpClient.post<HttpResponseData>(
        APIUrls.SaleUrls.saveSale,
        sale
      );
    }

    getSaleHeadeListByLazyLoad(inputParam: SaleListSearchModel): Observable<SaleHeader> {
      return this.httpClient.post<SaleHeader>(
        APIUrls.SaleUrls.saleList, inputParam
      );
    }

    getSaleById(saleId: number): Observable<Sale> {
      let params = new HttpParams();
      params = params.append('saleId', saleId.toString());
      return this.httpClient.get<Sale>(
        APIUrls.SaleUrls.getSaleById, {params}
      );
    }

    delete(saleId: number): Observable<HttpResponseData> {
      let params = new HttpParams();
      params = params.append('saleId', saleId.toString());
      return this.httpClient.get<HttpResponseData>(
        APIUrls.SaleUrls.deleteSale, {params}
      );
    }

    exportSaleHeader(inputParam: SaleListSearchModel): any {
      return this.httpClient
        .post(APIUrls.SaleUrls.exportSaleHeader, inputParam, {
          responseType: 'blob',
          observe: 'response',
        })
        .pipe(
          catchError((res: any) => {
            return this.jsUtilityService.convertBlobToText(res.error);
          })
        );
    }

    getPaymentListByLazyLoad(inputParam: PaymentSearchModel): Observable<PaymentList> {
      return this.httpClient.post<PaymentList>(
        APIUrls.SaleUrls.paymentList, inputParam
      );
    }

    savePayment(inputParam: Payment): Observable<HttpResponseData> {
      return this.httpClient.post<HttpResponseData>(
        APIUrls.SaleUrls.savePayment, inputParam
      );
    }

    deletePayment(paymentId: number): Observable<HttpResponseData> {
      let params = new HttpParams();
      params = params.append('paymentId', paymentId.toString());
      return this.httpClient.get<HttpResponseData>(
        APIUrls.SaleUrls.deletePayment, {params}
      );
    }

    getPayentById(paymentId: number): Observable<Payment> {
      let params = new HttpParams();
      params = params.append('paymentId', paymentId.toString());
      return this.httpClient.get<Payment>(
        APIUrls.SaleUrls.getPaymentById, {params}
      );
    }

    

    exportPayment(inputParam: PaymentSearchModel): any {
      return this.httpClient
        .post(APIUrls.SaleUrls.exportPayment, inputParam, {
          responseType: 'blob',
          observe: 'response',
        })
        .pipe(
          catchError((res: any) => {
            return this.jsUtilityService.convertBlobToText(res.error);
          })
        );
    }
}
