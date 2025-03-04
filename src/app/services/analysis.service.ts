import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  private jsonUrl = 'assets/stocksinventory.json'; // JSON file location

  constructor(private http: HttpClient) {}

  getAnalysisData(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrl);
  }
}
