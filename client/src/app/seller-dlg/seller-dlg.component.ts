import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SellersService, SellerProduct } from '../sellers.service';
import { Router, ActivatedRoute } from "@angular/router";

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

  constructor(public activeModal: NgbActiveModal) { }

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
