import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SellersService, SellerProduct } from '../sellers.service';
import { Router, ActivatedRoute } from "@angular/router";
=======
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
>>>>>>> 2ad12e33a2b6cd47b75b15f1b7f5ee528d41cd91

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

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    var successHandler = (result)=> { this.seller = result;}
    var errorHandler = (err) => { console.log("something failed");//TODO
  }
  };

  onCancel(){
    //loka glugganum
    this.activeModal.dismiss();
  }

  onOK(){
    this.activeModal.close(this.seller);

  }


}
