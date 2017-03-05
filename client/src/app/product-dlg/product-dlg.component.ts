import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SellersService, Seller, SellerProduct } from '../sellers.service';

@Component({
  selector: 'app-product-dlg',
  templateUrl: './product-dlg.component.html',
  styleUrls: ['./product-dlg.component.css']
})

export class ProductDlgComponent implements OnInit {

  name: string;
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
                                     name: this.name, 
                                     price: this.price, 
                                     quantitySold: 0, 
                                     quantityInStock: this.quantityInStock,  
                                     imagePath: this.imagePath };
    this.activeModal.close(product);
  }
}