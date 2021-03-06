// samskipti við bakendan
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/rx';


export interface Seller {
  id: number;
  name: string;
  category: string;
  imagePath: string;
}

export interface SellerProduct {
  id: number;
  name: string;
  price: number;
  quantitySold: number;
  quantityInStock: number;
  imagePath: string;
}

@Injectable()
//SellersService á samskipti við bakendann
export class SellersService {
  errorHandler: SellersService
  constructor(private http: Http) { }

// GET all sellers
  getSellers(): Observable<Seller[]> {
    return this.http.get("http://localhost:5000/api/sellers").map(response => {
      return <Seller[]> response.json();
    });
  }

// GET seller with given id
  getSellerById(id: number): Observable<Seller>{
    return this.http.get(`http://localhost:5000/api/sellers/${id}`).map(response => {
      return <Seller> response.json();
    });
  }
// GET all products from one seller
  getSellerProducts(id: number): Observable<SellerProduct[]> {
    return this.http.get(`http://localhost:5000/api/sellers/${id}/products`).map(response => {
      return <SellerProduct[]> response.json();
    });
  }

  //POST add seller
  postSeller(id: number, name: string, category: string, imagePath: string): Observable<Seller> {
 console.log("inni í postSeller");
    var toAdd = JSON.stringify({
      name: name,
      category: category,
      imagePath: imagePath
    })

         // console.error(toAdd);

  let head = new Headers({'Content-Type': 'application/json'});

    return this.http.post("http://localhost:5000/api/sellers", toAdd, {headers : head}).map(response => {
      console.log(response);

      return <Seller> response.json();
    });

  }

//PUT update seller
  putSeller(id: number, name: string, category: string, imagePath: string): Observable<Seller> {
  console.log("inni í putSeller");
  
    var toEdit = JSON.stringify({
      id: id,
      name: name,
      category: category,
      imagePath: imagePath
    })

    console.log(toEdit);

    let head = new Headers({'Content-Type': 'application/json'});

    return this.http.put(`http://localhost:5000/api/sellers/${id}`, toEdit, {headers : head}).map(response => {
      console.log(response);

      return <Seller> response.json();
    });
  }

   deleteProduct(id: number, prodId: number): Observable<boolean> {
    console.log("inni í deleteProduct");


    //let head = new Headers({'Content-Type': 'application/json'});

    return this.http.delete(`http://localhost:5000/api/sellers/${id}/products/${prodId}`,prodId).map(success => {
      console.log("eg er inní delete skipun");
      return true;
    });

  }

  //POST add product
  postProduct(id: number, name: string, price: any, quantityInStock: any, imagePath: string): Observable<SellerProduct> {
    console.log("inni í postProduct");

    var toAdd = JSON.stringify({
      name: name,
      price: price,
      quantityInStock: quantityInStock,
      path: imagePath
    });

    console.log(toAdd);

    let head = new Headers({'Content-Type': 'application/json'});

    return this.http.post(`http://localhost:5000/api/sellers/${id}/products`, toAdd, {headers : head}).map(response => {
      console.log(response);

      return <SellerProduct> response.json();
    });
  }

  //PUT edit product
  putProduct(id: number, prodId: number, name: string, price: any, quantityInStock: any, imagePath: string): Observable<SellerProduct> {
    console.log("inni í putProduct");

    var toAdd = JSON.stringify({
      name: name,
      price: price,
      quantityInStock: quantityInStock,
      imagePath: imagePath
    });

    console.log(toAdd);

    let head = new Headers({'Content-Type': 'application/json'});

    return this.http.put(`http://localhost:5000/api/sellers/${id}/products/${prodId}`, toAdd, {headers : head}).map(response => {
      console.log(response);

      return <SellerProduct> response.json();
    });
  }

}
