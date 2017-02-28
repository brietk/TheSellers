// samskipti við bakendan
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/rx';

export interface Seller {
  id: number;
  name: string;
  category: string;
  imagePath: string;
}

@Injectable()
//SellersService á samskipti við bakendann
export class SellersService {

  constructor(private http: Http) { }

// get all sellers
  getSellers(): Observable<Seller[]> {
    return this.http.get("http://localhost:5000/api/sellers").map(response => {
      return <Seller[]> response.json();
    });
  }

// get seller with given id
  getSellerById(id: number): Observable<Seller>{
    return this.http.get(`http://localhost:5000/api/sellers/${id}`).map(response => {
      return <Seller> response.json();
    });
  }

}