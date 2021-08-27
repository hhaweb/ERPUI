import { Observable } from 'rxjs';
import { JsUtilityService } from '../utility-services/js-utility.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../../models/item/item';
import { APIUrls } from '../../models/api-url/api-urls';
import { HttpResponseData } from '../../models/config/response.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor( 
    private httpClient: HttpClient,
    private jsUtilityService: JsUtilityService) { }

    getItemList(): Observable<Item[]> {
      return this.httpClient.get<Item[]>(
        APIUrls.ItemUrl.itemList,
      );
    }

    saveItem(item: Item): Observable<HttpResponseData> {
      return this.httpClient.post<HttpResponseData>(
        APIUrls.ItemUrl.saveItem,
        item
      );
    }

    deleteItem(id: string): Observable<HttpResponseData> {
      let params = new HttpParams();
      params = params.append('id', id);
      return this.httpClient.get<HttpResponseData>(APIUrls.ItemUrl.deleteItem,{params});
    }
}
