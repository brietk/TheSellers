import { Component, OnInit } from '@angular/core';
//import { SellersService, Seller } from './sellers.service';
import { SellersService, SellerProduct } from './sellers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SellerDlgComponent } from './seller-dlg/seller-dlg.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
  export class AppComponent implements OnInit {
  //export class AppComponent {
  title = 'Söluaðilar!';
  //private sellers: Seller[];
  products: SellerProduct[];

constructor(private modalService: NgbModal, private service: SellersService){}

 ngOnInit(){
   /*
    this.service.getSellers().subscribe(result => {
      this.sellers = result;
    });
    */
    //TODO: ekki hafa 1 harðkóðað, heldur sækja úr urlinu.
    this.service.getSellerProducts(1).subscribe(result => {
      this.products = result;
    });
 }

addSeller(){ 
  const modalInstance = this.modalService.open(SellerDlgComponent);
  modalInstance.componentInstance.sellerName =  "Daníel";
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
// array
 // private sellers: Seller[];
 // private seller: Seller;

 /* constructor(private service: SellersService) {}

  ngOnInit(){
    this.service.getSellers().subscribe(result => {
      this.sellers = result;
    });´*/

    //harðkoðað með 2 - værum að sækja úr urlinu og fa þar svar
    /*var successHandler =(result) => {
      this.seller = result;
    };

    var errorHandler = (err) => {
      //TODO display toastr
      console.log("Something failed");
    };
    this.service.getSellerById(2).subscribe(successHandler, errorHandler);*/
    /*this.service.getSellerById(2).subscribe(result => {
      this.seller = result;
    })*/
 // }

//}
