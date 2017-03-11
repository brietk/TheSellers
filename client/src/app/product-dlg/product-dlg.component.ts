import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SellersService, Seller, SellerProduct } from '../sellers.service';
import { Form, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  isEditMode: boolean; 
  id: number;
  complexForm: FormGroup;
  
  constructor(public activeModal: NgbActiveModal, fb: FormBuilder) {this.complexForm = fb.group({
    'productName': [null, Validators.required],
    'price': [null, Validators.required],
    'quantityInStock': [null, Validators.required],
    'imagePath': false
  })}

  ngOnInit() {
  }

  onCancel(){
    //loka glugganum
    this.activeModal.dismiss();
  }

  onOK(){
    const product: SellerProduct = { id: this.id, 
                                     name: this.name, 
                                     price: this.price, 
                                     quantitySold: 0, 
                                     quantityInStock: this.quantityInStock,  
                                     imagePath: this.imagePath };
    if(this.imagePath === ""){
      product.imagePath = "https://umexpert.um.edu.my/Avatar/no-image-found.jpg";
    }
    this.activeModal.close(product);
  }
}