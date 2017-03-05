import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
  }

  onCancel(){
    //loka glugganum
    this.activeModal.dismiss();
  }

  onOK(){
    this.activeModal.close(this.seller);

  }
}
