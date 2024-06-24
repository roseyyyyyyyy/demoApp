import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { personData } from './userData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  addPersonData(data:personData):Observable<any>{
    return this.http.post<any>('https://65c0cfa6dc74300bce8cc64d.mockapi.io/Contact/profile', data)
  }
  getData():Observable<personData[]>{
    return this.http.get<personData[]>('https://65c0cfa6dc74300bce8cc64d.mockapi.io/Contact/profile')
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete<any>(`https://65c0cfa6dc74300bce8cc64d.mockapi.io/Contact/profile/${id}`);
  }
  updateData(id: number, data: personData): Observable<personData> {
    return this.http.put<personData>(`https://65c0cfa6dc74300bce8cc64d.mockapi.io/Contact/profile/${id}`, data);
  }
}
