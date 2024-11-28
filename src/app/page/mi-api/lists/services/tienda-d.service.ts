import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, Productos } from '../interface/tienda-d';

@Injectable({
  providedIn: 'root'
})
export class TiendaDService {
  URL = 'http://localhost:3000/api/TiendaD'
  constructor(private http:HttpClient) { }

  getProducts(): Observable<Productos>{
    return this.http.get<Productos>(`${this.URL}`)
  }

  postProducto(newProducto:Product): Observable<Product>{
    return this.http.post<Product>(`${this.URL}`, newProducto)
  }

  putProducto(id:string, newProducto:Product): Observable<Product>{
    return this.http.put<Product>(`${this.URL}/${id}`, newProducto)
  }

  deleteProducto(id:string): Observable<Product>{
    return this.http.delete<Product>(`${this.URL}/${id}`)
  }

}
