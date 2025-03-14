import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersUrl = 'assets/users.json';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(this.usersUrl);
  }
}
