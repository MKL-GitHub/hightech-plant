import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Pet } from '../models/pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private BASE_URL = 'https://petstore.swagger.io/v2';

  constructor(private http: HttpClient) { }

  /**
   * Получение питомцев в виде потока данных
   * @returns {Observable<any>}
   */
  getPets(): Observable<any> {
    const params = new URLSearchParams();
    params.append('status', 'available,pending,sold')
    const url = this.BASE_URL + '/pet/findByStatus?' + params;

    return this.http.get(url).pipe(
      catchError((error: any) => {
        console.error("Ошибка при получении питомцев:", error);
        throw error;
      })
    );
  }
}
