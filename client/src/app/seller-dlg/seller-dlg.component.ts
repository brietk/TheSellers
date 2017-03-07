import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SellersService, SellerProduct } from '../sellers.service';
import { Router, ActivatedRoute } from "@angular/router";
import {Form, FormGroup, FormBuilder, Validators} from '@angular/forms'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export class Seller {
  name: string;
  id: number;
  category: string;
  imagePath: string;
}


@Component({
  selector: 'app-seller-dlg',
  templateUrl: './seller-dlg.component.html',
  styleUrls: ['./seller-dlg.component.css']
})
export class SellerDlgComponent implements OnInit {

  seller: Seller;
  name: string;
  category: string;
  imagePath: string;
   complexForm : FormGroup;


constructor(public activeModal: NgbActiveModal, fb: FormBuilder) {this.complexForm = fb.group({
      'sellerName' : [null, Validators.required],
      'category': [null, Validators.required],
      'imagePath': false
    }) }
  ngOnInit() {}

  

  onCancel(){
    //loka glugganum
    this.activeModal.dismiss();
  }

  onOK(){
    const seller: Seller = { id: 0, 
                                name: this.name, 
                                category: this.category,
                                imagePath: this.imagePath };

    this.activeModal.close(seller);
  }


}
