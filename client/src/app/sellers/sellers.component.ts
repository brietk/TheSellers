import { Component, OnInit } from '@angular/core';
import { SellersService, Seller, SellerProduct } from '../sellers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SellerDlgComponent } from '../seller-dlg/seller-dlg.component';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.css']
})
export class SellersComponent implements OnInit {

    sellers: Seller[];

constructor(private modalService: NgbModal, private service: SellersService){}

  ngOnInit() {
    this.service.getSellers().subscribe(result => {
      this.sellers = result;
    });
  }

  addSeller(){ 
  const modalInstance = this.modalService.open(SellerDlgComponent);
  modalInstance.componentInstance.sellerName =  "Daníel";
  modalInstance.componentInstance.category = "Hannyrðir";
  modalInstance.componentInstance.imagePath =  "http://example.com";
  modalInstance.componentInstance.id =  "7";
  
  /*    name: "Daníel",
    category: "Hannyrðir",
    imagePath: "http://example.com",
    id: 7*/
  modalInstance.result.then(obj =>{
    console.log("Dialog was closed using OK");
    console.log(obj);
  }).catch(err => {
    console.log("Dialog was cancelled");
    console.log(err);
  });
  
}

}