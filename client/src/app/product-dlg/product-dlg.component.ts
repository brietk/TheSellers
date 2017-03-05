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

  //product: SellerProduct; 
  // næ ekki að láta object sendast í activeModal.
  productName: string;
  price: number;
  quantitySold: number;
  quantityInStock: number;
  imagePath: string;
  
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() { 
    //this.modalService.postProduct(this.productName, this.category, this.imagePath).descripe
  }

  onCancel(){
    //loka glugganum
    this.activeModal.dismiss();
  }

  onOK(){
    this.activeModal.close(this.productName);
    this.activeModal.close(this.price);
    this.activeModal.close(this.quantityInStock);
  }

  

}