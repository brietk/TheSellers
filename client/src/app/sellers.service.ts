// samskipti við bakendan
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/rx';


export interface Seller {
  id: number;
  sellerName: string;
  category: string;
  imagePath: string;
}

export interface SellerProduct {
  id: number;
  productName: string;
  price: number;
  quantitySold: number;
  quantityInStock: number;
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
// get all products from one seller
  getSellerProducts(id: number): Observable<SellerProduct[]> {
    return this.http.get(`http://localhost:5000/api/sellers/${id}/products`).map(response => {
      return <SellerProduct[]> response.json();
    });
  }

  postProduct(productName: string, price: any, quantityInStock: any, imagePath: string): Observable<SellerProduct> {

    var toAdd = JSON.stringify({
      productName: name,
      price: price,
      quantityInStock: quantityInStock,
      imagePath: imagePath
    })

    console.error(toAdd);
    return this.http.post(`http://localhost:5000/api/sellers`, toAdd).map(response => {
      return <SellerProduct> response.json();
    });

  }

  }