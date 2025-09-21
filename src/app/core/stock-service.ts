import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  
  httpClient = inject(HttpClient);

  saveStock(data:any):Observable<any>{
    return this.httpClient.post(`${environment.apiUrl}/stock/save`,data);
  }
}
