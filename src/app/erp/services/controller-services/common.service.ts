import { Customer, Supplier } from './../../models/customer/customer';
import { APIUrls } from './../../models/api-url/api-urls';
import { SelectItem } from 'primeng/api';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsUtilityService } from '../utility-services/js-utility.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor( 
    private httpClient: HttpClient,
    private jsUtilityService: JsUtilityService) { }

    getCommonDropDownList(type: string): Observable<SelectItem[]> {
      let params = new HttpParams();
      params = params.append('type', type);
      return this.httpClient.get<SelectItem[]>(
        APIUrls.CommonUrls.getDropDownListByName, {params}
      );
    }

    getCustoemrByName(name: string): Observable<Customer[]> {
      let params = new HttpParams();
      params = params.append('name', name);
      return this.httpClient.get<Customer[]>(
        APIUrls.CommonUrls.getCustomerByName, {params}
      );
    }

    getSupplierByName(name: string): Observable<Supplier[]> {
      let params = new HttpParams();
      params = params.append('supplierName', name);
      return this.httpClient.get<Supplier[]>(
        APIUrls.CommonUrls.getSupplierByName, {params}
      );
    }

    getTotalCredit(id: number): Observable<number> {
      let params = new HttpParams();
      params = params.append('id', id.toString());
      return this.httpClient.get<number>(
        APIUrls.CommonUrls.getTotalCredit, {params}
      );
    }

    getTotalPurchaseCredit(supplierId: number): Observable<number> {
      let params = new HttpParams();
      params = params.append('supplierId', supplierId.toString());
      return this.httpClient.get<number>(
        APIUrls.CommonUrls.getTotalPurchaseCredit, {params}
      );
    }
}
