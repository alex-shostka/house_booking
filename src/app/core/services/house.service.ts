import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  constructor(private http: HttpClient) {}

  getHouses(): Observable<any> {
    return this.http.get(environment.getHouses);
  }

  getHouse(id: number): Observable<any> {
    return this.http.get(`${environment.getHouses}/${id}`);
  }
}
