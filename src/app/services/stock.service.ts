import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private jsonUrl = 'assets/stockinventory.json'; // JSON file path

  constructor(private http: HttpClient) {}

  getStockSummary(): Observable<any> {
    return this.http.get<any>('assets/stockinventory.json');
  }
  getStockOrdersChartData(): Observable<any> {
    return this.http.get<any>('assets/available.json');
  }
}
