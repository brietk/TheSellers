import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SellersService, Seller, SellerProduct } from '../sellers.service';

/*
export interface SellerProduct {
  id: number;
  productName: string;
  price: number;
  quantitySold: number;
  quantityInStock: number;
  imagePath: string;
}
*/

@Component({
  selector: 'app-product-dlg',
  templateUrl: './product-dlg.component.html',
  styleUrls: ['./product-dlg.component.css']
})

export class ProductDlgComponent implements OnInit {

  productName: string;
  price: number;
  quantitySold: number;
  quantityInStock: number;
  imagePath: string;
  
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() { 
  
  }

  onCancel(){
    //loka glugganum
    this.activeModal.dismiss();
  }

  onOK(){
    const product: SellerProduct = { id: 0, 
                                     productName: this.productName, 
                                     price: this.price, 
                                     quantitySold: 0, 
                                     quantityInStock: this.quantityInStock,  
                                     imagePath: this.imagePath };
    this.activeModal.close(product);
  }

  

}