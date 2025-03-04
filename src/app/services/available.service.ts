import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvailableService {

  private jsonUrl = 'assets/available.json'; // JSON file location
  
    constructor(private http: HttpClient) {}
  
    getAnalysisData(): Observable<any[]> {
      return this.http.get<any[]>(this.jsonUrl);
    }
}
