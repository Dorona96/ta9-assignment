import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>('http://localhost:3000/items');
  }
  
  addItem(item: Omit<Item, 'id'>): Observable<Item> {
    return this.http.post<Item>('http://localhost:3000/items', item);
  }
  
  updateItem(item: Item): Observable<Item> {
    return this.http.put<Item>(`http://localhost:3000/items/${item.id}`, item);
  }
    
}
