import { Supplier } from './../../models/customer/customer';
import { HttpResponseData } from './../../models/config/response.model';
import { CustomerUrls } from './../../models/api-url/customer-urls';
import { APIUrls } from './../../models/api-url/api-urls';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../../models/customer/customer';
import { JsUtilityService } from '../utility-services/js-utility.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private httpClient: HttpClient,
    private jsUtilityService: JsUtilityService
  ) { }

  getCustomerList(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(
      APIUrls.CustomerUrls.customerList
    );
  }

  saveCustomer(customer: Customer): Observable<HttpResponseData> {
    return this.httpClient.post<HttpResponseData>(
      APIUrls.CustomerUrls.saveCustomer, customer
    );
  };
  

  deleteCustomer(id: number): Observable<HttpResponseData> {
    let params = new HttpParams();
    params = params.append('id', id.toString());
    return this.httpClient.get<HttpResponseData>(
      APIUrls.CustomerUrls.deleteCustomer, {params}
    );
  };

  getSupplierList(): Observable<Supplier[]> {
    return this.httpClient.get<Supplier[]>(
      APIUrls.CustomerUrls.supplierList
    );
  }

  saveSupplier(supplier: Supplier): Observable<HttpResponseData> {
    return this.httpClient.post<HttpResponseData>(
      APIUrls.CustomerUrls.saveSupplier, supplier
    );
  }

  deleteSupplier(id: number): Observable<HttpResponseData> {
    let params = new HttpParams();
    params = params.append('id', id.toString());
    return this.httpClient.get<HttpResponseData>(
      APIUrls.CustomerUrls.deleteSupplier, {params}
    );
  }

 getCustomerById(id: number): Observable<Customer> {
  let params = new HttpParams();
  params = params.append('id', id.toString());
  return this.httpClient.get<Customer>(
    APIUrls.CustomerUrls.getCustomerById, {params}
  );
 }

 
 getSupplierById(id: number): Observable<Supplier> {
  let params = new HttpParams();
  params = params.append('supplierId', id.toString());
  return this.httpClient.get<Supplier>(
    APIUrls.CustomerUrls.getSupplierById, {params}
  );
 }
}
